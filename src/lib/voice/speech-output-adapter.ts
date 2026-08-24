import { getSpeechOutputCapabilities } from './capabilities';
import type { SpeechOutputCapabilities, SpeechOutputListener, SpeechOutputState } from './types';

/** A cancellable wrapper around SpeechSynthesis that never leaves utterances queued on teardown. */
export class SpeechOutputAdapter {
	readonly capabilities: SpeechOutputCapabilities = getSpeechOutputCapabilities();
	state: SpeechOutputState = 'idle';
	private current?: SpeechSynthesisUtterance;
	private listeners = new Set<SpeechOutputListener>();
	private destroyed = false;

	onStateChange(listener: SpeechOutputListener): () => void {
		this.listeners.add(listener);
		listener(this.state);
		return () => this.listeners.delete(listener);
	}

	speak(text: string, options: SpeechSynthesisUtteranceInit = {}): boolean {
		if (this.destroyed || !text.trim()) return false;
		if (!this.capabilities.speechSynthesis) {
			this.setState('unsupported', 'Speech synthesis is not available in this browser.');
			return false;
		}
		this.cancel();
		const utterance = new SpeechSynthesisUtterance(text);
		Object.assign(utterance, options);
		utterance.onstart = () => this.setState('speaking');
		utterance.onend = () => {
			if (this.current === utterance) this.current = undefined;
			if (!this.destroyed && this.state !== 'cancelled') this.setState('idle');
		};
		utterance.onerror = (event) => {
			if (this.current === utterance) this.current = undefined;
			if (!this.destroyed && event.error !== 'canceled' && event.error !== 'interrupted') this.setState('speech-failure', event.error);
		};
		this.current = utterance;
		window.speechSynthesis.speak(utterance);
		return true;
	}

	cancel(): void {
		if (!this.capabilities.speechSynthesis) return;
		this.clearUtteranceHandlers();
		window.speechSynthesis.cancel();
		if (!this.destroyed) this.setState('cancelled');
	}

	destroy(): void {
		this.destroyed = true;
		this.clearUtteranceHandlers();
		if (this.capabilities.speechSynthesis) window.speechSynthesis.cancel();
		this.listeners.clear();
	}

	private clearUtteranceHandlers(): void {
		if (!this.current) return;
		this.current.onstart = this.current.onend = this.current.onerror = null;
		this.current = undefined;
	}
	private setState(state: SpeechOutputState, detail?: string): void {
		if (this.destroyed) return;
		this.state = state;
		this.listeners.forEach((listener) => listener(state, detail));
	}
}
