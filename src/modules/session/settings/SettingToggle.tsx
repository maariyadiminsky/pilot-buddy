import { truthyString } from '@common/utils';
import { Switch } from '@headlessui/react';
import { FC, ReactNode } from 'react';

interface SettingToggleProps {
  title: string;
  description: string;
  getter: boolean;
  setter: (value: boolean) => void;
  children?: ReactNode;
}

export type SettingToggleType = SettingToggleProps;

export const SettingToggle: FC<SettingToggleProps> = ({
  title,
  description,
  getter,
  setter,
  children,
}) => (
  <Switch.Group as="div" className="flex items-center justify-between">
    <div className="flex flex-grow flex-col space-y-3 my-6">
      <div className="flex flex-row space-x-3">
        <Switch.Label as="span" className="text-sm font-medium leading-6 text-gray-900" passive>
          {title}
        </Switch.Label>
        <Switch
          checked={getter}
          onChange={setter}
          className={truthyString(
            getter ? 'bg-sky-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2'
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
      </div>
      <Switch.Description as="span" className="text-sm text-gray-500">
        {description}
      </Switch.Description>
      {children}
    </div>
  </Switch.Group>
);
