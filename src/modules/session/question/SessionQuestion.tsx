import {
  PencilSquareIcon,
  TrashIcon,
  StarIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
} from '@heroicons/react/20/solid';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';

interface SessionQuestionBaseType {
  id: string;
  question: string;
  answer?: string | null;
  time?: SelectMenuItemType;
}

export type SessionQuestionType = SessionQuestionBaseType;
interface SessionQuestionProps extends SessionQuestionBaseType {
  isTimed: boolean;
  handleEditQuestion: (id: string) => void;
  handleRemoveQuestion: (id: string, customQuestions?: SessionQuestionType[]) => void;
}

const SessionQuestion = ({
  id,
  question,
  answer,
  time,
  isTimed,
  handleEditQuestion,
  handleRemoveQuestion,
}: SessionQuestionProps) => (
  <li className="relative py-5 hover:bg-gray-50 px-10">
    <div className="flex items-start justify-between space-x-4">
      <div className="min-w-0 space-y-3">
        <div className="flex justify-start items-start space-x-1">
          <div className="w-8">
            <QuestionMarkCircleIcon className="text-pink-600 h-6 w-6" aria-hidden="true" />
          </div>
          <div className="w-96 text-sm font-medium text-pink-600">
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
                  className="h-4 w-4 text-sky-700 flex items-center justify-center"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div className="w-96 text-sm font-small italic text-sky-700">
              <span className="font-semibold text-base not-italic">A:</span> {answer}
              <span className="sr-only">{answer}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-start items-end space-y-2">
        <div className="flex-shrink-0 flex-row justify-end items-end md:flex">
          <button
            type="button"
            onClick={() => handleEditQuestion(id)}
            className="inline-flex items-center bg-white mx-0 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
          >
            <PencilSquareIcon
              className="h-7 w-7 flex-shrink-0 text-gray-600 hover:text-sky-700"
              aria-hidden="true"
            />
            <span className="sr-only">Edit question</span>
          </button>
          <button
            type="button"
            onClick={() => handleRemoveQuestion(id)}
            className="inline-flex items-center bg-white mx-0 px-1 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
          >
            <TrashIcon
              className="h-7 w-7 flex-shrink-0 text-gray-600 hover:text-sky-700"
              aria-hidden="true"
            />
            <span className="sr-only">Delete question</span>
          </button>
        </div>
        {isTimed && time && (
          <div className="flex flex-row justify-end space-x-0.5">
            <ClockIcon
              className="h-3 w-3 mt-0.5 flex-shrink-0 font-medium text-sky-700"
              aria-hidden="true"
            />
            <div className="flex justify-end text-sky-700 text-xs font-medium pr-2">
              {time.name}
            </div>
          </div>
        )}
      </div>
    </div>
  </li>
);

export default SessionQuestion;
