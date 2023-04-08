import DropdownMenu from '@modules/common/components/dropdown/DropdownMenu';
import SessionQuestion, {
  type SessionQuestionType,
} from '@modules/session/question/SessionQuestion';
import QuestionAction from '@modules/session/question/SessionQuestionAction';
import { getUniqId, removeObjectFromArray } from '@common/utils';
import { useState } from 'react';

const questionData = [
  {
    id: '0',
    question: 'dsfdsfdsf df sdfsdsd sdfsdfsdfssd  fdsfsd ',
    answer: 'dsfdsfsd',
  },
  {
    id: '1',
    question: '342342jkh4h54k5khjdsjklclksdf',
    answer:
      'gfdhgdhgfhfghfgfgfghfghfg fghfgh fghfgklhfglhjgf lgfhj fglkjh lgkfj hlkjgf jfg hjgdlfk hjdglfh jdfj kd jsf klgslkj sjk djklsjkl fsdljk sjkd klsd sljkd  jkds fjklgsd',
  },
  {
    id: '2',
    question: 'sfddsfdsfsdfsdfds sdfsdfsdfsdfds sd fsdfsdfs',
    answer: '4534tfdggdf ',
  },
  {
    id: '3',
    question: 'eeeeesfdsf 765bgfdfdgfd',
    answer: 'sdfdsffdssd',
  },
  {
    id: '4',
    question: 'sfsd',
    answer: null,
  },
];

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
  const [questions, setQuestions] = useState<SessionQuestionType[]>(questionData);
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

  return (
    <div className="bg-white lg:min-w-0 lg:flex-1 flex flex-col">
      <div className="border-b border-t border-gray-200 xl:border-t-0">
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
      </div>
      <ul className="divide-y divide-gray-200 border-b border-gray-200">
        {questions.map((question) => (
          <SessionQuestion
            key={getUniqId()}
            {...question}
            handleEditQuestion={handleEditQuestion}
          />
        ))}
      </ul>
    </div>
  );
};

export default SessionQuestionsList;
