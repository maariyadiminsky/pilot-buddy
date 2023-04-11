import { PlusIcon } from '@heroicons/react/20/solid';
import BrandButton from '@common/components/button/BrandButton';

interface EmptyDataActionsProps {
  title: string;
  description: string;
  handleOnClick: (value: boolean) => void;
}

const EmptyDataAction = ({ title, description, handleOnClick }: EmptyDataActionsProps) => (
  <div className="flex flex-col justify-center items-center text-center mt-12">
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="mx-auto h-12 w-12 text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
      />
    </svg>

    <h3 className="mt-3 text-sm font-semibold text-gray-900">{title}</h3>
    <p className="mt-3 text-sm text-gray-500">{description}</p>
    <div className="mt-6">
      <BrandButton
        handleOnClick={handleOnClick}
        icon={PlusIcon}
        buttonType="button"
        text="Add Question"
        srText="add question"
        buttonClassType="solidPink"
      />
    </div>
  </div>
);

export default EmptyDataAction;
