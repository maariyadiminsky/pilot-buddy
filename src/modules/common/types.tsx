import {
  PropsWithChildren,
  ForwardRefExoticComponent,
  SVGProps,
  PropsWithoutRef,
  RefAttributes,
} from 'react';

export enum WrapperType {
  Header = 'header',
  Sidebar = 'sidebar',
}

export type ChildrenType = PropsWithChildren;

export type HeroIconType = ForwardRefExoticComponent<
  PropsWithoutRef<SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & RefAttributes<SVGSVGElement>
>;
