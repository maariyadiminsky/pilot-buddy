import { Draggable, type DroppableProvidedProps } from 'react-beautiful-dnd';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { type ReactNode } from 'react';
import { SessionQuestionType } from '@modules/session/types';
import { truthyString } from '@common/utils';

import {
  PencilSquareIcon,
  TrashIcon,
  StarIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
  Bars3Icon,
} from '@heroicons/react/20/solid';

interface SessionQuestionsListProps extends DroppableProvidedProps {
  placeholder: ReactNode;
  questions: SessionQuestionType[];
  settingsTime?: SelectMenuItemType;
  isTimed: boolean;
  handleRemoveQuestion: (id: string) => void;
  handleEditQuestion: (id: string) => void;
}

const DragStyles = {
  isDragging: 'bg-sky-50 rounded-md border-r border-l border-t border-b border-1 border-gray-300',
  isNotDragging: 'bg-white hover:bg-sky-50',
};

const SessionQuestionsList = ({
  placeholder,
  questions,
  settingsTime,
  isTimed,
  handleRemoveQuestion,
  handleEditQuestion,
}: SessionQuestionsListProps) => (
  <ul className="border-b border-gray-200 border-t h-full xl:overscroll-contain overflow-y-auto smooth-scroll pb-4">
    {questions.map(({ id, question, answer, time }, index) => {
      const correctTime = time || settingsTime;
      const isLastItem = index === questions.length - 1;

      return (
        <Draggable key={id} draggableId={id} index={index}>
          {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
            <li
              ref={innerRef}
              /* fix: https://github.com/atlassian/react-beautiful-dnd/issues/1541 */
              {...draggableProps}
              {...dragHandleProps}
              className={truthyString(
                'relative py-5',
                isLastItem && 'border-b border-t border-gray-200',
                isDragging ? DragStyles.isDragging : DragStyles.isNotDragging
              )}
            >
              <div className="flex flex-row items-center justify-between px-4 space-x-4">
                <div className="flex flex-row items-center space-x-6">
                  <Bars3Icon
                    className="h-4 w-4 flex-shrink-0 text-gray-400 hover:text-sky-600"
                    aria-hidden="true"
                  />
                  <div className="flex items-center justify-between space-x-4">
                    <div className="min-w-0 space-y-3">
                      <div className="flex justify-start items-start space-x-1">
                        <div className="w-8">
                          <QuestionMarkCircleIcon
                            className="text-pink-600 h-6 w-6"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="w-full text-sm font-medium text-pink-600">
                          <span className="font-semibold">Q:</span> {question}
                          <span className="sr-only">{question}</span>
                        </div>
                      </div>
                      {answer && (
                        <div className="flex justify-start items-start space-x-1">
                          <div className="w-8">
                            <span
                              className="bg-sky-100 h-6 w-6 flex items-center justify-center rounded-full"
                              aria-hidden="true"
                            >
                              <StarIcon
                                className="h-4 w-4 text-sky-600 flex items-center justify-center"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="w-full text-sm font-small italic text-sky-600">
                            <span className="font-semibold text-base not-italic">A:</span> {answer}
                            <span className="sr-only">{answer}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-end items-end space-y-2">
                  <div className="flex-shrink-0 flex-row justify-end items-end md:flex">
                    <button
                      type="button"
                      onClick={() => handleEditQuestion(id)}
                      className="inline-flex items-center mx-0 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      <PencilSquareIcon
                        className="h-7 w-7 flex-shrink-0 text-gray-600 hover:text-sky-600"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Edit question</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(id)}
                      className="inline-flex items-center mx-0 px-1 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      <TrashIcon
                        className="h-7 w-7 flex-shrink-0 text-gray-600 hover:text-sky-600"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Delete question</span>
                    </button>
                  </div>
                  {isTimed && correctTime && (
                    <div className="flex flex-row justify-end space-x-0.5">
                      <ClockIcon
                        className="h-3 w-3 mt-0.5 flex-shrink-0 font-medium text-sky-600"
                        aria-hidden="true"
                      />
                      <div className="flex justify-end text-sky-600 text-xs font-medium pr-2">
                        {correctTime.name}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          )}
        </Draggable>
      );
    })}
    {/* drag-and-drop required placeholder */}
    {placeholder}
  </ul>
);

export default SessionQuestionsList;
