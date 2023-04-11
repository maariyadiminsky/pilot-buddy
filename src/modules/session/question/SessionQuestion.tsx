import {
  PencilSquareIcon,
  TrashIcon,
  StarIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/20/solid';

interface SessionQuestionBaseType {
  id: string;
  question: string;
  answer?: string | null;
}
interface SessionQuestionProps extends SessionQuestionBaseType {
  handleEditQuestion: (id: string) => void;
  handleRemoveQuestion: (id: string) => void;
}

export type SessionQuestionType = SessionQuestionBaseType;

const SessionQuestion = ({
  id,
  question,
  answer,
  handleEditQuestion,
  handleRemoveQuestion,
}: SessionQuestionProps) => (
  <li className="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6">
    <div className="flex items-center justify-between space-x-4">
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

      <div className="flex-shrink-0 flex-row items-end md:flex">
        <button
          type="button"
          onClick={() => handleEditQuestion(id)}
          className="inline-flex items-center bg-white mx-0 px-1 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
        >
          <PencilSquareIcon
            className="h-6 w-6 flex-shrink-0 text-gray-600 hover:text-sky-700"
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
            className="h-6 w-6 flex-shrink-0 text-gray-600 hover:text-sky-700"
            aria-hidden="true"
          />
          <span className="sr-only">Delete question</span>
        </button>
      </div>
    </div>
  </li>
);

export default SessionQuestion;
