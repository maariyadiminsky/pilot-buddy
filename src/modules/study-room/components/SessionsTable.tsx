// todo add typescript
// @ts-nocheck
import { useState, useRef, useLayoutEffect } from 'react';
import { truthyString, getUniqId } from '@common/utils';
import { PlayCircleIcon, PencilIcon } from '@heroicons/react/20/solid';

const sessions = [
  {
    id: 1,
    name: 'Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad',
    topic: 'Private Pilot Exam sdfdsf fdsdfsd fsdsdfsd dasdsafasafasfasfasfasd dadasdasdasdsad ',
    questions: 12,
    color: 'bg-sky-700',
  },
  {
    id: 2,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 10,
    color: 'bg-yellow-600',
  },
  {
    id: 3,
    name: 'Instruments Test #1',
    topic: 'Instruments ',
    questions: 24,
    color: 'bg-purple-700',
  },
  {
    id: 4,
    name: 'Instruments Test #2',
    topic: 'Instruments',
    questions: 9,
    color: 'bg-yellow-600',
  },
  {
    id: 5,
    name: 'Practice',
    topic: 'Commercial',
    questions: 6,
    color: 'bg-sky-700',
  },
  {
    id: 6,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-pink-700',
  },
  {
    id: 7,
    name: 'Pilot Exam Test #2',
    topic: 'Private Pilot',
    questions: 17,
    color: 'bg-sky-700',
  },
  {
    id: 8,
    name: 'CM Codes',
    topic: 'Commercial Test dass',
    questions: 3,
    color: 'bg-yellow-600',
  },
  // More plans...
];

const SessionsTable = () => {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedSessions.length > 0 && selectedSessions.length < sessions.length;
    setChecked(selectedSessions.length === sessions.length);
    setIndeterminate(isIndeterminate);

    if (checkbox?.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedSessions]);

  const toggleAll = () => {
    setSelectedSessions(checked || indeterminate ? [] : sessions);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                <div className="flex flex-row items-center">
                  <input
                    type="checkbox"
                    className="-mt-0.5 ml-2 mr-4 h-4 w-4 rounded border-gray-300 text-sky-700 focus:ring-sky-700"
                    ref={checkbox}
                    checked={checked}
                    onChange={toggleAll}
                  />
                  {selectedSessions.length > 0 ? (
                    <div className="left-14 top-0 flex h-4 items-center space-x-2 bg-white sm:left-12">
                      <button
                        type="button"
                        className="inline-flex items-center rounded bg-white px-4 py-1 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                      >
                        Delete all sessions
                      </button>
                    </div>
                  ) : (
                    'Name'
                  )}
                </div>
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
            {sessions.map(({ name, topic, questions, color }, planIdx) => (
              <tr key={getUniqId()}>
                <td
                  className={truthyString(
                    planIdx === 0 ? '' : 'border-t border-transparent',
                    'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                  )}
                >
                  <div className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700">
                    <span
                      className={truthyString(
                        'invisible sm:visible sm:mr-4 sm:h-2.5 sm:w-2.5 sm:rounded-full',
                        color
                      )}
                      aria-hidden="true"
                    />
                    <div className="font-medium text-gray-900 w-36 md:w-60 xl:w-72 truncate">
                      {name}
                    </div>
                  </div>
                  {/* mobile */}
                  <div className="mt-1 flex flex-col text-gray-500 xs:block sm:hidden">
                    <span className="xs:block sm:hidden">
                      <span className="sm:hidden xs:inline pl-2">·</span> {questions} Question
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
                    className="inline-flex items-center rounded-md bg-white mx-0.5 px-4 xl:px-8 py-1 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    <PlayCircleIcon
                      className="h-6 w-6 flex-shrink-0 text-red-600 group-hover:text-red-700"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Start test</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white mx-0.5 px-4 xl:px-8 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    <PencilIcon
                      className="h-6 w-6 flex-shrink-0 text-sky-700 group-hover:text-sky-700"
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
};

export default SessionsTable;
