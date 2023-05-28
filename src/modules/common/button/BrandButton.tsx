import { type HeroIconType } from '@common/types';
import { truthyString } from '@common/utils';
import { FC } from 'react';

export enum ButtonClassTypeEnum {
  clear = 'clear',
  solid = 'solid',
  solidPink = 'solidPink',
}

enum ButtonType {
  button = 'button',
  submit = 'submit',
}

export interface BrandButtonProps {
  text: string;
  srText: string;
  buttonClassType: keyof typeof ButtonClassTypeEnum;
  isDisabled?: boolean;
  buttonType?: keyof typeof ButtonType;
  icon?: HeroIconType;
  handleOnClick?: (value?: any) => void;
}

export const BUTTON_STYLES = {
  clear:
    'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-300 enabled:hover:bg-sky-600 enabled:hover:text-white',
  solid:
    'text-white bg-sky-600 enabled:hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800',
  solidPink:
    'text-white bg-pink-600 enabled:hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800',
};

export const BrandButton: FC<BrandButtonProps> = ({
  text,
  srText,
  buttonType,
  buttonClassType,
  isDisabled,
  icon,
  handleOnClick,
}) => {
  const Icon = icon;

  return (
    <button
      /* eslint-disable react/button-has-type */
      type={buttonType ?? 'button'}
      disabled={isDisabled}
      className={truthyString(
        'group subpixel-antialiased inline-flex justify-center items-center rounded-md w-44 h-9 text-sm shadow-sm disabled:group:text-gray-400 disabled:cursor-not-allowed disabled:opacity-30',
        BUTTON_STYLES[buttonClassType]
      )}
      onClick={() => handleOnClick?.()}
    >
      <span className="sr-only">{srText}</span>
      {Icon && (
        <Icon
          className={truthyString(
            buttonClassType === 'clear' ? 'enabled:group-hover:text-white' : 'enabled:text-white',
            'font-light h-5 w-5 mr-1'
          )}
          aria-hidden="true"
        />
      )}
      {text}
    </button>
  );
};
