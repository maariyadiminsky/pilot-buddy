// import { CheckBadgeIcon, RectangleStackIcon } from '@heroicons/react/20/solid';

import Note from '@modules/common/components/notes/Note';

const Notes = () => (
  <div className="bg-zinc-50 xl:w-72 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
    <div className="py-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-8">
          <div className="xl:mt-3 space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
            <ul className="divide-y divide-gray-200">
              <Note />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Notes;
