import { type NavigationItem } from '@common/sidebar/types';
import { truthyString } from '@common/utils';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface NavigationItemsProps {
  navigation: NavigationItem[];
  handleSetCurrent: (value: number) => void;
}

export const NavigationItems: FC<NavigationItemsProps> = ({ navigation, handleSetCurrent }) => (
  <>
    {navigation.map(({ id, route, current, name, icon }) => {
      const Icon = icon;

      return (
        <Link
          key={id}
          to={route}
          onClick={() => handleSetCurrent(id)}
          className={truthyString(
            current
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900',
            !Icon && 'pl-3',
            'group flex items-center rounded-md px-2 py-2 text-sm font-medium pr-3'
          )}
          aria-current={current ? 'page' : undefined}
        >
          {Icon && (
            <Icon
              className={truthyString(
                current ? 'text-gray-600' : 'text-gray-400 group-hover:text-gray-500',
                'mr-3 h-6 w-6 flex-shrink-0'
              )}
              aria-hidden="true"
            />
          )}
          <div className="text-ellipsis overflow-hidden">{name}</div>
        </Link>
      );
    })}
  </>
);
