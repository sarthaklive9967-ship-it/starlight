import type { SpeechOutputCapabilities, VoiceInputCapabilities } from './types';

/** Feature detection is deliberately runtime-only so the adapters remain SSR safe. */
export function getVoiceInputCapabilities(): VoiceInputCapabilities {
	if (typeof window === 'undefined' || typeof navigator === 'undefined') {
		return { microphone: false, recognition: false, continuousRecognition: false, wakePhrase: false };
	}

	const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
	const recognition = typeof Recognition === 'function';
	return {
		microphone: Boolean(navigator.mediaDevices?.getUserMedia),
		recognition,
		// Continuous mode is a property of the browser recognition implementation.
		continuousRecognition: recognition && 'continuous' in Recognition.prototype,
		wakePhrase: recognition && 'continuous' in Recognition.prototype,
	};
}

export function getSpeechOutputCapabilities(): SpeechOutputCapabilities {
	return { speechSynthesis: typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined' };
}
