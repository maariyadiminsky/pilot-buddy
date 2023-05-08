import { ChatBubbleLeftEllipsisIcon, CheckBadgeIcon } from '@heroicons/react/20/solid';
import { SessionQuestionWithAnswerType } from '@modules/session-quiz/types';
import { FC } from 'react';

interface SessionQuizResultsProps {
  questionsWithAnswers?: SessionQuestionWithAnswerType[];
}

export const SessionQuizResults: FC<SessionQuizResultsProps> = ({ questionsWithAnswers }) => (
  <div className="flex flex-col justify-center space-y-6 h-[calc(100vh-250px)] w-full px-12">
    <div className="flex text-xl font-bold text-gray-900 justify-center ">Results</div>
    <div className="overflow-y-auto smooth-scroll space-y-4">
      {questionsWithAnswers?.map(({ id, question, answer, quizAnswer }, index) => (
        <div key={id} className="flex flex-col space-y-4">
          <div className="flex justify-start items-start bg-gray-100 text-gray-500 font-semibold text-md p-4 rounded-sm">
            {index + 1}. {question}
          </div>
          <div className="flex flex-col justify-start items-start space-y-3 ring-1 ring-inset ring-sky-200 bg-sky-50 text-gray-500 p-4 rounded-md">
            <div className="flex flex-row space-x-3 text-sm">
              <ChatBubbleLeftEllipsisIcon
                className="-mr-1 h-4 w-4 text-green-400 -scale-x-100"
                aria-hidden="true"
              />
              <div className="text-xs font-medium">Your answer</div>
            </div>
            <div className="font-light text-md">{quizAnswer}</div>
          </div>
          <div className="flex flex-col justify-start items-start space-y-3 ring-1 ring-inset ring-purple-300 bg-purple-200 text-gray-700 p-4 rounded-md">
            <div className="flex flex-row space-x-3 text-sm">
              <CheckBadgeIcon className="-mr-1 h-4 w-4 text-rose-400" aria-hidden="true" />
              <div className="text-xs font-medium">Actual answer</div>
            </div>
            <div className="font-light text-md">{answer}</div>
          </div>
          <div className="border border-gray-100 w-full flex justify-center" />
        </div>
      ))}
    </div>
  </div>
);
