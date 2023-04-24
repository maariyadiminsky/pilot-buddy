import Range from '@common/components/range/Range';
import { useSpeechSynthesis } from '@modules/speech-synthesis/hooks';
import VoiceSelectMenu from '@modules/speech-synthesis/VoiceSelectMenu';
import BrandButton, { type BrandButtonType } from '@common/components/button/BrandButton';

interface TextToSpeechProps {
  text: string;
}

const SpeechSynthesis = ({ text }: TextToSpeechProps) => {
  const {
    voice,
    pitch,
    rate,
    volume,
    isPaused,
    voiceOptions,
    handlePlay,
    handlePause,
    handleStop,
    handleVoiceChange,
    handlePitchChange,
    handleRateChange,
    handleVolumeChange,
  } = useSpeechSynthesis(text);

  const buttonActions = [
    {
      text: isPaused ? 'Resume' : 'Play',
      srText: 'play voice',
      buttonClassType: 'clear',
      handleOnClick: handlePlay,
    },
    {
      text: 'Pause',
      srText: 'pause voice',
      buttonClassType: 'clear',
      handleOnClick: handlePause,
    },
    {
      text: 'Stop',
      srText: 'stop voice',
      buttonClassType: 'clear',
      handleOnClick: handleStop,
    },
  ] as BrandButtonType[];

  // todo: add a loader if no voice options
  if (!voiceOptions?.length) return 'Loading...';

  return (
    <div className="flex flex-col">
      {voice && (
        <>
          <label className="sr-only">Choose a voice</label>
          <VoiceSelectMenu voice={voice} setVoice={handleVoiceChange} />
        </>
      )}
      <div className="flex flex-col items-start space-y-3 mt-6">
        <Range
          title="Volume"
          srText="change volume"
          value={volume}
          handleOnChange={handleVolumeChange}
          min="0"
          max="1"
          step="0.1"
        />
        <Range
          title="Pitch"
          srText="change pitch"
          value={pitch}
          handleOnChange={handlePitchChange}
          min="0.5"
          max="2"
          step="0.1"
        />
        <Range
          title="Speed"
          srText="change speed"
          value={rate}
          handleOnChange={handleRateChange}
          min="0.5"
          max="2"
          step="0.1"
        />
      </div>
      <div className="mt-6 flex space-x-2 w-60">
        {buttonActions?.map((action, index) => (
          <BrandButton key={index} {...{ ...action }} />
        ))}
      </div>
    </div>
  );
};

export default SpeechSynthesis;
