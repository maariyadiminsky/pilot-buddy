import { type NavigationItem } from '@common/components/sidebar/types';
import NavigationItems from '@common/components/sidebar/NavigationItems';

interface PinnedNavigationProps {
  navigation: NavigationItem[];
  handleSetCurrent: (value: number, isPinnedNav: true) => void;
}

const PinnedNavigation = ({ navigation, handleSetCurrent }: PinnedNavigationProps) =>
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

export default PinnedNavigation;
