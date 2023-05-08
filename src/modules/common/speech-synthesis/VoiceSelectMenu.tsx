import { SelectMenu } from '@common/dropdown';
import { VOICE_OPTIONS } from '@common/speech-synthesis/constants';
import { type SelectMenuItemType } from '@common/types';
import { MegaphoneIcon } from '@heroicons/react/20/solid';
import { FC } from 'react';

interface VoiceSelectProps {
  voice: SelectMenuItemType;
  setVoice: (value: SelectMenuItemType) => void;
}

export const VoiceSelectMenu: FC<VoiceSelectProps> = ({ voice, setVoice }) => (
  <SelectMenu
    options={VOICE_OPTIONS}
    icon={MegaphoneIcon}
    currentlySelected={voice}
    handleSelect={setVoice}
  />
);
