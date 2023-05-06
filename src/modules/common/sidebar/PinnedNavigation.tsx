import { NavigationItems } from '@common/sidebar/NavigationItems';
import { type NavigationItem } from '@common/sidebar/types';
import { FC } from 'react';

interface PinnedNavigationProps {
  navigation: NavigationItem[];
  handleSetCurrent: (value: number, isPinnedNav: true) => void;
}

export const PinnedNavigation: FC<PinnedNavigationProps> = ({ navigation, handleSetCurrent }) =>
  navigation?.length ? (
    <div className="px-4">
      <div className="flex justify-start items-end mt-6 pb-1 text-xs font-semibold">Pinned</div>
      <div className="pt-4 border-t border-gray-200">
        <div className="space-y-1 px-2">
          <NavigationItems
            navigation={navigation}
            handleSetCurrent={(id) => handleSetCurrent(id, true)}
          />
        </div>
      </div>
    </div>
  ) : null;
