import BrandButton from '@modules/common/button/BrandButton';
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { SessionsTableDataType } from '@modules/study-room/types';
import { useSessionAction } from '@modules/study-room/hooks';

interface SessionActionProps {
  currentSession?: SessionsTableDataType;
  handleSubmit: (value: SessionsTableDataType) => void;
  handleCancel: () => void;
}

const SessionAction = ({ currentSession, handleSubmit, handleCancel }: SessionActionProps) => {
  const { formDetails, handleFormSubmit } = useSessionAction(handleSubmit, currentSession);

  return (
    <>
      <form onSubmit={handleFormSubmit} className="pt-6 px-8 lg:px-28 xl:px-72">
        <div className="flex flex-row justify-between items-center">
          <h2 className="flex flex-row items-center py-4 text-gray-900 font-medium">
            <PlusIcon
              className="h-6 w-6 xl:h-5 xl:h5 flex-shrink-0 text-gray-900 hover:text-sky-600"
              aria-hidden="true"
            />
            {currentSession ? 'Edit' : 'Add'} Session
          </h2>
          <div className="flex flex-row justify-end items-center space-x-3">
            <button type="button" onClick={() => handleCancel()}>
              <XMarkIcon
                className="h-6 w-6 -mt-1 flex-shrink-0 text-gray-700 hover:text-sky-600 hover:cursor-pointer"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col mt-2">
          {formDetails.map(({ id, title, placeholder, showEmpty, getter, setter }) => (
            <div key={id} className="flex flex-col mb-6">
              <label
                htmlFor={id}
                className="justify-start items-start block text-sm font-semibold leading-6 text-sky-600"
              >
                {title}
              </label>
              <div className="h-9">
                <div className="relative flex w-full rounded-md shadow-sm">
                  <input
                    type="text"
                    name={id}
                    id={id}
                    className="flex w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                    value={getter}
                    onChange={(event) => setter(event.target.value)}
                    aria-label={id}
                  />
                </div>
                {showEmpty && (
                  <div className="flex items-center justify-start text-sm md:text-xs text-rose-500 pt-2 pb-0 mb-0">
                    Cannot be empty.
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-end items-end">
            <BrandButton
              buttonType="submit"
              text={currentSession ? 'Ok' : 'Submit'}
              srText={currentSession ? 'edit question' : 'add question'}
              buttonClassType="solid"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SessionAction;
