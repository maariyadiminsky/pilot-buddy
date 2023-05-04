import { type HeroIconType } from '@common/types';

export interface NavigationItem {
  id: number;
  name: string;
  route: string;
  icon: HeroIconType;
  current: boolean;
}
