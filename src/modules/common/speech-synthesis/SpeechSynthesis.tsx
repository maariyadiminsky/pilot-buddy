import { BrandButton } from '@common/button';
import { Range } from '@common/range';
import { VoiceSelectMenu } from '@common/speech-synthesis';
import { useSpeechSynthesis } from '@common/speech-synthesis/hooks';
import { type BrandButtonType } from '@common/types';
import { type SettingsVoiceType } from '@modules/session/types';
import { FC, useMemo } from 'react';

interface SpeechSynthesisProps {
  text: string;
  settingsVoice: SettingsVoiceType;
  setSettingsVoice: (value: SettingsVoiceType) => void;
}

export const SpeechSynthesis: FC<SpeechSynthesisProps> = ({
  text,
  settingsVoice,
  setSettingsVoice,
}) => {
  const {
    voice,
    isPaused,
    handleVoicePlay,
    handleVoicePause,
    handleVoiceStop,
    handleVoiceChange,
    handlePitchChange,
    handleRateChange,
    handleVolumeChange,
  } = useSpeechSynthesis(text, settingsVoice, setSettingsVoice);

  const buttonActions = useMemo(
    () => [
      {
        text: isPaused ? 'Resume' : 'Play',
        srText: 'play voice',
        buttonClassType: 'clear',
        handleOnClick: handleVoicePlay,
      },
      {
        text: 'Pause',
        srText: 'pause voice',
        buttonClassType: 'clear',
        handleOnClick: handleVoicePause,
      },
      {
        text: 'Stop',
        srText: 'stop voice',
        buttonClassType: 'clear',
        handleOnClick: handleVoiceStop,
      },
    ],
    [isPaused, handleVoicePlay, handleVoicePause, handleVoiceStop]
  ) as BrandButtonType[];

  // todo: add a loader if no voice options

  return (
    <div className="flex flex-col">
      {voice && (
        <>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="sr-only">Choose a voice</label>
          <VoiceSelectMenu voice={voice?.voice} setVoice={handleVoiceChange} />
        </>
      )}
      <div className="flex flex-col items-start space-y-3 mt-6">
        <Range
          title="Volume"
          srText="change volume"
          value={voice?.volume || 1}
          handleOnChange={handleVolumeChange}
          min="0"
          max="1"
          step="0.1"
        />
        <Range
          title="Pitch"
          srText="change pitch"
          value={voice?.pitch || 1}
          handleOnChange={handlePitchChange}
          min="0.5"
          max="2"
          step="0.1"
        />
        <Range
          title="Speed"
          srText="change speed"
          value={voice?.rate || 1}
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
