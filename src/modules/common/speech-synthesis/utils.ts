import { type SettingsVoiceType } from '@modules/session/types';

export const setupSpeechSynthesisUtterance = (
  voiceSettings: SettingsVoiceType,
  voiceOptions: SpeechSynthesisVoice[],
  text?: string,
  speechSynth?: SpeechSynthesisUtterance
) => {
  const speechSynthesisUtterance = speechSynth || new SpeechSynthesisUtterance(text || '');
  const { voice: voiceData, pitch, rate, volume } = voiceSettings;

  speechSynthesisUtterance.voice =
    voiceOptions.find((voiceOption) => voiceOption.name === voiceData.name) || null;
  speechSynthesisUtterance.pitch = pitch;
  speechSynthesisUtterance.rate = rate;
  speechSynthesisUtterance.volume = volume;

  return speechSynthesisUtterance;
};
