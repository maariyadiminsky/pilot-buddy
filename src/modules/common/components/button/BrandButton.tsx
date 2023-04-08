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
  buttonType?: keyof typeof ButtonType;
  buttonClassType: keyof typeof ButtonClassTypeEnum;
  icon?: HeroIconType;
  handleOnClick?: () => void;
}

export type BrandButtonType = BrandButtonProps;

const styles = {
  clear:
    'bg-gray-100 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-sky-700 hover:text-white sm:ml-0',
  solid:
    'bg-sky-700 text-white hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800 sm:ml-3',
  solidPink:
    'text-white bg-pink-700 hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800 sm:ml-3',
};

const BrandButton = ({
  text,
  srText,
  buttonType,
  buttonClassType,
  icon,
  handleOnClick,
}: BrandButtonProps) => {
  const Icon = icon;

  return (
    <button
      /* eslint-disable react/button-has-type */
      type={buttonType ?? 'button'}
      className={truthyString(
        'group subpixel-antialiased inline-flex justify-center items-center rounded-md w-44 h-9 text-sm shadow-sm',
        styles[buttonClassType]
      )}
      onClick={() => handleOnClick?.()}
    >
      <span className="sr-only">{srText}</span>
      {Icon && (
        <Icon
          className={truthyString(
            buttonClassType === 'clear' ? 'text-gray-900 group-hover:text-white' : 'text-white',
            'font-light h-5 w-5 mr-1'
          )}
          aria-hidden="true"
        />
      )}
      {text}
    </button>
  );
};
export default BrandButton;
