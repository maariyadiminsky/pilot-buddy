import { type BrandButtonProps } from '@common/button';
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

export type BrandButtonType = BrandButtonProps;

export interface MenuOptionType {
  text: string;
  srText: string;
  icon?: HeroIconType;
  handleOnClick?: () => void;
}

export interface SelectMenuItemType {
  id: number;
  name: string;
  description?: string;
}

export interface ModalRef {
  setModalOpen: (value: boolean) => void;
}

export interface ModalDataType {
  title?: ReactNode;
  children?: ReactNode;
  confirmChildren?: ReactNode;
  cancelChildren?: ReactNode;
  handleConfirm?: () => void;
}

// database
export interface UserType {
  id: string;
  email: string;
  password: string;
  name?: string;
  image?: string;
}
