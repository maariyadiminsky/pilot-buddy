import {
  PropsWithChildren,
  ForwardRefExoticComponent,
  SVGProps,
  PropsWithoutRef,
  RefAttributes,
} from 'react';

export enum WrapperTypeEnum {
  header = 'header',
  sidebar = 'sidebar',
}

export type ChildrenArrayType = PropsWithChildren;

export type HeroIconType = ForwardRefExoticComponent<
  PropsWithoutRef<SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & RefAttributes<SVGSVGElement>
>;
