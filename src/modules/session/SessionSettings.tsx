import SettingToggle, { type SettingToggleType } from '@modules/session/settings/SettingToggle';

interface SessionSettingProps {
  settings: SettingToggleType[];
}

const SessionSettings = ({ settings }: SessionSettingProps) => (
  <div className="bg-zinc-50 lg:flex-shrink-0 lg:border-l lg:border-gray-200 flex px-8 xl:w-96">
    <div className="lg:w-80">
      <div className="pb-2 pt-6">
        <h2 className="text-sm font-semibold">Settings</h2>
      </div>
      <ul className="flex flex-col divide-y divide-gray-200 -mt-3">
        {settings.map((setting, index) => (
          <SettingToggle key={index} {...setting} />
        ))}
      </ul>
    </div>
  </div>
);
export default SessionSettings;
