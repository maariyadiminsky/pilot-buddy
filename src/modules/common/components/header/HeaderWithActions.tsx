import { type HeroIconType } from '@common/types';
import { truthyString, getUniqId } from '@common/utils';

enum ButtonTypeEnum {
  clear = 'clear',
  solid = 'solid',
}

type ButtonType = keyof typeof ButtonTypeEnum;

const styles = {
  clear:
    'sm:order-0 order-1 ml-3 inline-flex items-center rounded-md bg-gray-100 text-gray-900 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-0',
  solid:
    'sm:order-1 order-0 inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800 sm:ml-3',
};

export interface HeaderActionItemType {
  text: string;
  srText: string;
  buttonType: ButtonType;
  icon?: HeroIconType;
  handleOnClick?: () => void;
}

interface HeaderWithActionsProps {
  title?: string;
  actions?: HeaderActionItemType[];
}

const HeaderWithActions = ({ title, actions }: HeaderWithActionsProps) => (
  <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
    <div className="min-w-0 flex-1">
      <h1 className="text-lg font-normal leading-6 text-gray-900 sm:truncate">{title}</h1>
    </div>
    <div className="mt-4 flex sm:ml-4 sm:mt-0">
      {actions?.map(({ text, srText, buttonType, icon, handleOnClick }) => {
        const Icon = icon;

        return (
          <button
            key={getUniqId(text)}
            type="button"
            className={truthyString('inline-flex justify-center font-light', styles[buttonType])}
            onClick={() => handleOnClick?.()}
          >
            <span className="sr-only">{srText}</span>
            {Icon && (
              <Icon
                className={truthyString(
                  buttonType === 'clear' ? 'text-gray-500' : 'text-white',
                  'font-light h-5 w-5 mr-1'
                )}
                aria-hidden="true"
              />
            )}
            {text}
          </button>
        );
      })}
    </div>
  </div>
);

export default HeaderWithActions;
