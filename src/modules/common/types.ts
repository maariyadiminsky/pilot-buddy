import {
  PropsWithChildren,
  ForwardRefExoticComponent,
  SVGProps,
  PropsWithoutRef,
  RefAttributes,
  ReactNode,
} from 'react';

export enum WrapperTypeEnum {
  header = 'header',
  sidebar = 'sidebar',
}

export type ChildrenArrayType = PropsWithChildren | ReactNode;

export type HeroIconType = ForwardRefExoticComponent<
  PropsWithoutRef<SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
  } & RefAttributes<SVGSVGElement>
>;

// database
export interface UserType {
  id: string;
  email: string;
  password: string;
  name?: string;
  image?: string;
}
