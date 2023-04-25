import { MegaphoneIcon } from '@heroicons/react/20/solid';
import SelectMenu, { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { VOICE_OPTIONS } from '@modules/speech-synthesis/constants';

interface VoiceSelectProps {
  voice: SelectMenuItemType;
  setVoice: (value: SelectMenuItemType) => void;
}

const VoiceSelectMenu = ({ voice, setVoice }: VoiceSelectProps) => (
  <SelectMenu
    options={VOICE_OPTIONS}
    icon={MegaphoneIcon}
    currentlySelected={voice}
    handleSelect={setVoice}
  />
);

export default VoiceSelectMenu;
