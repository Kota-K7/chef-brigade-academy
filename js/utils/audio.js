let currentUtterance = null;
let originalText = "";
let seekOffset = 0;
let isSpeaking = false;
let playbackRate = 1.0;
let onBoundaryCallback = null;
let onEndCallback = null;

/**
 * Basic backward compatibility wrapper for speech synthesis.
 */
export function speakFrench(text, rate = 1.0) {
  playText(text, rate);
}

/**
 * Speaks text with word boundary tracking, pausing, and seeking capability.
 * @param {string} text - Text to speak.
 * @param {number} rate - Speed rate.
 * @param {function} onBoundary - Callback function on boundary (charIndex, totalLength).
 * @param {function} onEnd - Callback function on end.
 * @param {number} startCharIndex - Offset index to slice string and play.
 */
export function playText(text, rate = 1.0, onBoundary = null, onEnd = null, startCharIndex = 0) {
  if (!('speechSynthesis' in window)) {
    console.warn("Speech synthesis not supported on this browser.");
    return;
  }
  
  // Cancel current speech
  window.speechSynthesis.cancel();
  
  const cleanText = text.replace(/["'➔]/g, '').trim();
  originalText = cleanText;
  seekOffset = startCharIndex;
  playbackRate = rate;
  onBoundaryCallback = onBoundary;
  onEndCallback = onEnd;
  isSpeaking = true;
  
  const textToSpeak = cleanText.substring(startCharIndex);
  if (!textToSpeak.trim()) {
    isSpeaking = false;
    if (onEndCallback) onEndCallback();
    return;
  }
  
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = 'fr-FR';
  utterance.rate = rate;
  
  // Choose standard French voice
  const voices = window.speechSynthesis.getVoices();
  const frenchVoice = voices.find(voice => voice.lang === 'fr-FR' || voice.lang.startsWith('fr'));
  if (frenchVoice) {
    utterance.voice = frenchVoice;
  }
  
  utterance.onboundary = (event) => {
    if (event.name === 'word' && onBoundaryCallback) {
      const absoluteCharIndex = seekOffset + event.charIndex;
      onBoundaryCallback(absoluteCharIndex, originalText.length);
    }
  };
  
  utterance.onend = () => {
    if (currentUtterance === utterance) {
      isSpeaking = false;
      if (onEndCallback) onEndCallback();
    }
  };
  
  utterance.onerror = (e) => {
    console.warn("SpeechSynthesis error:", e);
    isSpeaking = false;
    if (onEndCallback) onEndCallback();
  };
  
  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function pauseSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.pause();
  }
}

export function resumeSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.resume();
  }
}

export function cancelSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
  }
}

// Force system to load voices on app startup
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
