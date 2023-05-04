import { type HeroIconType } from '@common/types';

export interface NavigationItem {
  id: number;
  routeId?: string;
  name: string;
  route: string;
  icon?: HeroIconType;
  current: boolean;
}
