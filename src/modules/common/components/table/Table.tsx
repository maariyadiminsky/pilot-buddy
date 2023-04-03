import { truthyString } from '@common/utils';
import { PlayCircleIcon, PencilIcon } from '@heroicons/react/20/solid';

const sessions = [
  {
    id: 1,
    name: 'Hobby Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad',
    topic: 'Private Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad ',
    questions: 12,
  },
  {
    id: 2,
    name: 'Startup',
    topic: 'Commercial Test dass',
    questions: 1,
  },
  // More plans...
];

const Table = () => (
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Topic
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Questions
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Select</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(({ id, name, topic, questions }, planIdx) => (
            <tr key={id}>
              <td
                className={truthyString(
                  planIdx === 0 ? '' : 'border-t border-transparent',
                  'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                )}
              >
                <div className="font-medium text-gray-900 w-36 md:w-60 xl:w-72 truncate">
                  {name}
                </div>
                {/* mobile */}
                <div className="mt-1 flex flex-col text-gray-500 xs:block sm:hidden">
                  <span className="xs:block sm:hidden">
                    <span className="sm:hidden xs:inline">·</span> {questions} Question
                    {questions > 1 ? 's' : ''}
                  </span>
                </div>
                {planIdx !== 0 ? (
                  <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" />
                ) : null}
              </td>
              {/* desktop */}
              <td
                className={truthyString(
                  planIdx === 0 ? '' : 'border-t border-gray-200',
                  'px-3 py-3.5 text-sm text-gray-500 sm:table-cell'
                )}
              >
                <div className="w-36 lg:w-60 xl:w-72 truncate">{topic}</div>
              </td>
              <td
                className={truthyString(
                  planIdx === 0 ? '' : 'border-t border-gray-200',
                  'hidden px-3 py-3.5 text-sm text-gray-500 sm:table-cell'
                )}
              >
                {questions}
              </td>
              <td
                className={truthyString(
                  planIdx === 0 ? '' : 'border-t border-transparent',
                  'relative py-3.5 pl-3 pr-4 text-center text-sm font-medium sm:pr-6'
                )}
              >
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white mx-0.5 px-4 xl:px-8 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                >
                  <PlayCircleIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Start test</span>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white mx-0.5 px-4 xl:px-8 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                >
                  <PencilIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Edit test</span>
                </button>
                {planIdx !== 0 ? (
                  <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Table;
