import { getUniqId } from '@common/utils';

enum ButtonType {
  Clear = 'clear',
  Solid = 'solid',
}

const styles = {
  button: {
    clear:
      'sm:order-0 order-1 ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-0',
    solid:
      'sm:order-1 order-0 inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 sm:ml-3',
  },
};

interface ActionItem {
  text: string;
  type: ButtonType;
}

interface HeaderWithActionsProps {
  title: string;
  actions?: ActionItem[];
}

const HeaderWithActions = ({ title, actions }: HeaderWithActionsProps) => (
  <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
    <div className="min-w-0 flex-1">
      <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">{title}</h1>
    </div>
    <div className="mt-4 flex sm:ml-4 sm:mt-0">
      {actions?.map(({ text, type }) => (
        <button key={getUniqId(text)} type="button" className={styles.button[type]}>
          {text}
        </button>
      ))}
    </div>
  </div>
);

export default HeaderWithActions;
