import { getVoiceInputCapabilities } from './capabilities';
import type { VoiceInputCapabilities, VoiceInputListener, VoiceInputState } from './types';

interface SpeechRecognitionEventLike extends Event {
	results: { isFinal: boolean; 0: { transcript: string } }[];
}
interface SpeechRecognitionErrorEventLike extends Event { error: string; message?: string }
interface RecognitionLike extends EventTarget {
	continuous: boolean;
	interimResults: boolean;
	lang: string;
	start(): void;
	stop(): void;
	abort(): void;
	onresult: ((event: SpeechRecognitionEventLike) => void) | null;
	onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
	onend: (() => void) | null;
}
type RecognitionConstructor = new () => RecognitionLike;

declare global {
	interface Window {
		SpeechRecognition?: RecognitionConstructor;
		webkitSpeechRecognition?: RecognitionConstructor;
	}
}

export interface VoiceInputAdapterOptions {
	language?: string;
	onTranscript?: (transcript: string) => void | Promise<void>;
}

/**
 * Owns the browser recognition instance and the permission probe stream. Call destroy()
 * when its route/component unmounts; no browser resource is retained after that point.
 */
export class VoiceInputAdapter {
	readonly capabilities: VoiceInputCapabilities = getVoiceInputCapabilities();
	state: VoiceInputState = 'idle';
	private recognition?: RecognitionLike;
	private stream?: MediaStream;
	private listeners = new Set<VoiceInputListener>();
	private wakePhrase?: string;
	private destroyed = false;
	private manuallyStopped = false;
	private readonly language: string;
	private readonly onTranscript?: VoiceInputAdapterOptions['onTranscript'];

	constructor(options: VoiceInputAdapterOptions = {}) {
		this.language = options.language ?? 'en-US';
		this.onTranscript = options.onTranscript;
	}

	onStateChange(listener: VoiceInputListener): () => void {
		this.listeners.add(listener);
		listener(this.state);
		return () => this.listeners.delete(listener);
	}

	async startPushToTalk(): Promise<void> {
		await this.start('push-to-talk');
	}

	/** Wake phrases are opt-in and only start on browsers exposing continuous recognition. */
	async enableWakePhrase(phrase: string): Promise<boolean> {
		if (!this.capabilities.wakePhrase) {
			this.setState('unsupported', 'Wake phrase recognition is not available in this browser.');
			return false;
		}
		this.wakePhrase = phrase.trim().toLocaleLowerCase();
		if (!this.wakePhrase) return false;
		await this.start('wake-phrase');
		return this.state === 'listening';
	}

	stop(): void {
		this.manuallyStopped = true;
		this.recognition?.stop();
		this.detachRecognition();
		this.releaseMedia();
		if (!this.destroyed) this.setState('cancelled');
	}

	cancel(): void {
		this.manuallyStopped = true;
		this.recognition?.abort();
		this.detachRecognition();
		this.releaseMedia();
		if (!this.destroyed) this.setState('cancelled');
	}

	destroy(): void {
		this.destroyed = true;
		this.manuallyStopped = true;
		this.recognition?.abort();
		this.releaseMedia();
		this.detachRecognition();
		this.listeners.clear();
	}

	private async start(mode: 'push-to-talk' | 'wake-phrase'): Promise<void> {
		if (this.destroyed) return;
		if (!this.capabilities.microphone) return this.setState('microphone-unavailable');
		if (!this.capabilities.recognition) return this.setState('unsupported', 'Speech recognition is not available in this browser.');
		this.cancel();
		this.manuallyStopped = false;
		try {
			this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		} catch (error) {
			const name = error instanceof DOMException ? error.name : '';
			this.setState(name === 'NotAllowedError' || name === 'SecurityError' ? 'microphone-denied' : 'microphone-unavailable');
			return;
		}
		if (this.destroyed || this.manuallyStopped) return this.releaseMedia();
		const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
		if (!Recognition) return this.setState('unsupported');
		this.detachRecognition();
		this.recognition = new Recognition();
		this.recognition.lang = this.language;
		this.recognition.continuous = mode === 'wake-phrase';
		this.recognition.interimResults = false;
		this.recognition.onresult = (event) => void this.handleResult(event, mode);
		this.recognition.onerror = (event) => this.handleError(event);
		this.recognition.onend = () => this.handleEnd(mode);
		try {
			this.recognition.start();
			this.setState('listening');
		} catch (error) {
			this.setState('recognition-failure', error instanceof Error ? error.message : 'Could not start speech recognition.');
			this.releaseMedia();
		}
	}

	private async handleResult(event: SpeechRecognitionEventLike, mode: 'push-to-talk' | 'wake-phrase'): Promise<void> {
		const transcript = Array.from(event.results).filter((result) => result.isFinal).map((result) => result[0].transcript.trim()).join(' ').trim();
		if (!transcript || this.destroyed) return;
		if (mode === 'wake-phrase' && !transcript.toLocaleLowerCase().includes(this.wakePhrase!)) return;
		this.setState('processing', transcript);
		try { await this.onTranscript?.(transcript); } finally {
			if (mode === 'push-to-talk') this.stop();
			else if (!this.destroyed) this.setState('listening');
		}
	}

	private handleError(event: SpeechRecognitionErrorEventLike): void {
		if (this.destroyed || this.manuallyStopped || event.error === 'aborted') return;
		if (event.error === 'not-allowed' || event.error === 'service-not-allowed') this.setState('microphone-denied', event.message);
		else if (event.error === 'audio-capture') this.setState('microphone-unavailable', event.message);
		else this.setState('recognition-failure', event.message || event.error);
		this.releaseMedia();
		this.detachRecognition();
	}

	private handleEnd(mode: 'push-to-talk' | 'wake-phrase'): void {
		if (this.destroyed) return;
		if (this.manuallyStopped || mode === 'push-to-talk' || this.state !== 'listening') {
			this.releaseMedia();
			this.detachRecognition();
			if (!this.manuallyStopped && this.state === 'listening') this.setState('cancelled');
		}
	}

	private releaseMedia(): void { this.stream?.getTracks().forEach((track) => track.stop()); this.stream = undefined; }
	private detachRecognition(): void {
		if (!this.recognition) return;
		this.recognition.onresult = this.recognition.onerror = this.recognition.onend = null;
		this.recognition = undefined;
	}
	private setState(state: VoiceInputState, detail?: string): void {
		if (this.destroyed) return;
		this.state = state;
		this.listeners.forEach((listener) => listener(state, detail));
	}
}
