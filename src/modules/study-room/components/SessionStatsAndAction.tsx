import { CheckBadgeIcon, RectangleStackIcon } from '@heroicons/react/20/solid';

const SessionStatsAndAction = () => (
  <div className="bg-inherit xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
    <div className="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-8">
          <div className="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
            {/* Meta info */}
            <div className="flex flex-col space-y-6 sm:flex-row sm:space-x-8 sm:space-y-0 xl:flex-col xl:space-x-0 xl:space-y-6">
              <div className="flex items-center space-x-2">
                <CheckBadgeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-500">Pro Member</span>
              </div>
              <div className="flex items-center space-x-2">
                <RectangleStackIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-500">8 Projects</span>
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row xl:flex-col">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 xl:w-full"
              >
                New Project
              </button>
              <button
                type="button"
                className="mt-3 inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 xl:ml-0 xl:mt-3 xl:w-full"
              >
                Invite Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SessionStatsAndAction;
