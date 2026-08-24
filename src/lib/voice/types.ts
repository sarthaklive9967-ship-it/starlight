export type VoiceInputState =
	| 'idle'
	| 'microphone-denied'
	| 'microphone-unavailable'
	| 'listening'
	| 'recognition-failure'
	| 'processing'
	| 'cancelled'
	| 'unsupported';

export type SpeechOutputState = 'idle' | 'speaking' | 'cancelled' | 'unsupported' | 'speech-failure';

export interface VoiceInputCapabilities {
	microphone: boolean;
	recognition: boolean;
	continuousRecognition: boolean;
	wakePhrase: boolean;
}

export interface SpeechOutputCapabilities {
	speechSynthesis: boolean;
}

export type VoiceInputListener = (state: VoiceInputState, detail?: string) => void;
export type SpeechOutputListener = (state: SpeechOutputState, detail?: string) => void;
