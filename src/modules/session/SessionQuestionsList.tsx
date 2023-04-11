import { getUniqId, removeObjectFromArray } from '@common/utils';
import DropdownMenu from '@common/components/dropdown/DropdownMenu';
import EmptyDataAction from '@common/components/empty/EmptyDataAction';
import SessionQuestion, {
  type SessionQuestionType,
} from '@modules/session/question/SessionQuestion';
import QuestionAction from '@modules/session/question/SessionQuestionAction';
import { useState } from 'react';

const getDropdownActions = () => [
  {
    text: 'Create',
    srText: 'Create new session',
    handleOnClick: () => console.log('derp'),
  },
  {
    text: 'Delete all',
    srText: 'Remove all sessions',
    handleOnClick: () => console.log('derp'),
  },
];

interface SessionQuestionsListProps {
  shouldShowQuestionAction: boolean;
  setShouldShowQuestionAction: (value: boolean) => void;
}

const SessionQuestionsList = ({
  shouldShowQuestionAction,
  setShouldShowQuestionAction,
}: SessionQuestionsListProps) => {
  const [questions, setQuestions] = useState<SessionQuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<SessionQuestionType>();

  const handleSubmitQuestion = (question: SessionQuestionType) => {
    setQuestions([...questions, { ...question }]);
    setCurrentQuestion(undefined);
    setShouldShowQuestionAction(false);

    // handle saving question here
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(removeObjectFromArray(questions, id, 'id'));

    // save to local or hidden folder in google drive
  };

  const handleEditQuestion = (id: string) => {
    setCurrentQuestion(questions.find((question) => question.id === id));
    handleRemoveQuestion(id);
    setShouldShowQuestionAction(true);
  };

  const handleCancelAction = () => {
    if (currentQuestion) {
      setQuestions([...questions, { ...currentQuestion }]);
      setCurrentQuestion(undefined);
    }

    setShouldShowQuestionAction(false);
  };

  const renderQuestionsOrEmptyAction = () => {
    if (!questions?.length) {
      // if user is creating a new question there is
      // no need to show the empty data action component
      if (shouldShowQuestionAction) return null;

      return (
        <EmptyDataAction
          title="Add your first question"
          description="Kick off your study session by adding some questions!"
          handleOnClick={() => setShouldShowQuestionAction(true)}
        />
      );
    }

    return (
      <ul className="divide-y divide-gray-200 border-b border-gray-200 border-t">
        {questions.map((question) => (
          <SessionQuestion
            key={getUniqId()}
            {...question}
            handleEditQuestion={handleEditQuestion}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-white lg:min-w-0 lg:flex-1 flex flex-col">
      <div className="flex flex-col justify-end py-4">
        {shouldShowQuestionAction ? (
          <QuestionAction
            currentQuestion={currentQuestion}
            handleSubmit={handleSubmitQuestion}
            handleCancelAction={handleCancelAction}
          />
        ) : (
          <div className="flex justify-end items-center pr-4">
            <DropdownMenu name="pinned-items" actions={getDropdownActions()} type="sort" />
          </div>
        )}
      </div>
      {renderQuestionsOrEmptyAction()}
    </div>
  );
};

export default SessionQuestionsList;
