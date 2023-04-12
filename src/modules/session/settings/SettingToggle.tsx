import { truthyString } from '@common/utils';
import { Switch } from '@headlessui/react';

interface SettingToggleProps {
  title: string;
  description: string;
  getter: boolean;
  setter: (value: boolean) => void;
}

export type SettingToggleType = SettingToggleProps;

const SettingToggle = ({ title, description, getter, setter }: SettingToggleProps) => (
  <Switch.Group as="div" className="flex items-center justify-between">
    <span className="flex flex-grow flex-col py-3">
      <Switch
        checked={getter}
        onChange={setter}
        className={truthyString(
          getter ? 'bg-sky-700' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={truthyString(
            getter ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
        {title}
      </Switch.Label>
      <Switch.Description as="span" className="text-sm text-gray-500">
        {description}
      </Switch.Description>
    </span>
  </Switch.Group>
);

export default SettingToggle;
