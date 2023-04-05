import { CheckBadgeIcon, RectangleStackIcon } from '@heroicons/react/20/solid';

// todo: this will be the notes sections
const SessionStatsAndActions = () => (
  <div className="bg-zinc-50 xl:w-72 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
    <div className="py-6 px-8">
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-8">
          <div className="xl:mt-3 space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
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
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SessionStatsAndActions;
