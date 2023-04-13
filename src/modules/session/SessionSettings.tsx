import SettingToggle, { type SettingToggleType } from '@modules/session/settings/SettingToggle';
import { ReactNode } from 'react';

interface SessionSettingProps {
  settings: SettingToggleType[];
  children?: ReactNode;
}

const SessionSettings = ({ settings, children }: SessionSettingProps) => (
  <div className="bg-zinc-50 lg:flex-shrink-0 lg:border-l lg:border-gray-200 flex xl:w-96 px-8 h-[calc(100vh-74px)] w-full">
    <div className="lg:w-80">
      <div className="pt-8">
        <h2 className="text-sm font-semibold">Settings</h2>
      </div>
      <ul className="flex flex-col divide-y divide-gray-200 -mt-3">
        {settings.map((setting, index) => (
          <SettingToggle key={index} {...setting} />
        ))}
      </ul>
      {children}
    </div>
  </div>
);
export default SessionSettings;
