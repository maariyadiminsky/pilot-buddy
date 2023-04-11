import { type HeroIconType } from '@common/types';
import { truthyString } from '@common/utils';

enum ButtonClassTypeEnum {
  clear = 'clear',
  solid = 'solid',
  solidPink = 'solidPink',
}

enum ButtonType {
  button = 'button',
  submit = 'submit',
}

interface BrandButtonProps {
  text: string;
  srText: string;
  buttonClassType: keyof typeof ButtonClassTypeEnum;
  disabled?: boolean;
  buttonType?: keyof typeof ButtonType;
  icon?: HeroIconType;
  handleOnClick?: (value?: any) => void;
}

export type BrandButtonType = BrandButtonProps;

const styles = {
  clear:
    'bg-gray-100 text-gray-900 ring-1 ring-inset ring-gray-300 enabled:hover:bg-sky-700 disabled:text-gray-400 disabled:bg-gray-100 enabled:hover:text-white',
  solid:
    'enabled:text-white enabled:bg-sky-700 enabled:hover:bg-sky-600 disabled:text-gray-40 disabled:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800',
  solidPink:
    'enabled:text-white enabled:bg-pink-700 enabled:hover:bg-sky-700 disabled:text-gray-40 disabled:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800',
};

const BrandButton = ({
  text,
  srText,
  buttonType,
  buttonClassType,
  disabled,
  icon,
  handleOnClick,
}: BrandButtonProps) => {
  const Icon = icon;

  return (
    <button
      /* eslint-disable react/button-has-type */
      type={buttonType ?? 'button'}
      disabled={disabled}
      className={truthyString(
        'group subpixel-antialiased inline-flex justify-center items-center rounded-md w-44 h-9 text-sm shadow-sm disabled:group:text-gray-400 text-gray-900',
        styles[buttonClassType]
      )}
      onClick={() => handleOnClick?.()}
    >
      <span className="sr-only">{srText}</span>
      {Icon && (
        <Icon
          className={truthyString(
            buttonClassType === 'clear' ? ' group-hover:text-white' : 'text-white',
            'font-light h-5 w-5 mr-1',
            disabled ? ' group-hover:text-gray-400' : ''
          )}
          aria-hidden="true"
        />
      )}
      {text}
    </button>
  );
};
export default BrandButton;
