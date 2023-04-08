import { getUniqId } from '@common/utils';
import { ChevronRightIcon, StarIcon, QuestionMarkCircleIcon } from '@heroicons/react/20/solid';

interface SessionQuestionProps {
  question: string;
  answer?: string | null;
}

const SessionQuestion = ({ question, answer }: SessionQuestionProps) => (
  <li
    key={getUniqId()}
    className="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
  >
    <div className="flex items-center justify-between space-x-4">
      <div className="min-w-0 space-y-3">
        <div className="flex justify-start items-start space-x-1">
          <div className="w-8">
            <QuestionMarkCircleIcon className="text-pink-600 h-6 w-6" aria-hidden="true" />
          </div>
          <div className="w-96 text-base font-medium text-pink-600">
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
      <div className="md:hidden">
        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>

      <div className="hidden flex-shrink-0 flex-col items-end space-y-3 md:flex">
        <p className="flex items-center space-x-4">
          <button type="button" className="flex justify-center items-center group pr-1">
            <ChevronRightIcon
              className="h-7 w-7 opacity-75 flex-shrink-0 text-gray-700 group-hover:text-sky-700"
              aria-hidden="true"
            />

            <span className="sr-only">Edit note</span>
          </button>
        </p>
      </div>
    </div>
  </li>
);

export default SessionQuestion;
