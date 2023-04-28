export const APPROVED_VOICES = ['Daniel', 'Karen', 'Google US English'];

export const VOICE_OPTIONS = APPROVED_VOICES.map((option, index) => ({
  id: index,
  name: option,
}));
