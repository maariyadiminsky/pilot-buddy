import { removeObjectFromArray, jumpPageToTop } from '@common/utils';
import ActionMenu from '@common/components/dropdown/ActionMenu';
import EmptyDataAction from '@common/components/empty/EmptyDataAction';
import SessionQuestion, {
  type SessionQuestionType,
} from '@modules/session/question/SessionQuestion';
import QuestionAction from '@modules/session/question/SessionQuestionAction';
import { useState } from 'react';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';

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
  isTimed: boolean;
  settingsTime: SelectMenuItemType;
  shouldShowQuestionAction: boolean;
  setShouldShowQuestionAction: (value: boolean) => void;
}

const SessionQuestionsList = ({
  isTimed,
  settingsTime,
  shouldShowQuestionAction,
  setShouldShowQuestionAction,
}: SessionQuestionsListProps) => {
  const [questions, setQuestions] = useState<SessionQuestionType[]>(questionData);
  const [currentQuestion, setCurrentQuestion] = useState<SessionQuestionType>();

  const handleAddQuestion = (question: SessionQuestionType) => {
    const questionsWithNewQuestion = [...questions, { ...question }];
    setQuestions(questionsWithNewQuestion);
    return questionsWithNewQuestion;
  };

  const handleSubmitQuestion = (question: SessionQuestionType) => {
    handleAddQuestion(question);
    setCurrentQuestion(undefined);
    setShouldShowQuestionAction(false);

    // handle saving question here
  };

  const handleRemoveQuestion = (id: string, customQuestions?: SessionQuestionType[]) => {
    setQuestions(removeObjectFromArray(customQuestions || questions, id, 'id'));

    // save to local or hidden folder in google drive
  };

  const handleEditQuestion = (id: string) => {
    jumpPageToTop();
    // in the case they were editing before and just hit edit again
    // add back the last item user was editing.
    // This also acts as a cancel of the last edit.
    if (currentQuestion) {
      const currentQuestions = handleAddQuestion(currentQuestion);
      handleRemoveQuestion(id, currentQuestions);
    } else {
      handleRemoveQuestion(id);
    }

    setCurrentQuestion(questions.find((question) => question.id === id));
    setShouldShowQuestionAction(true);
  };

  // when user opens to edit or create and clicks cancel button
  const handleCancelAction = () => {
    if (currentQuestion) {
      handleAddQuestion(currentQuestion);
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
          buttonText="Add Question"
          handleOnClick={() => setShouldShowQuestionAction(true)}
        />
      );
    }

    return (
      <ul className="divide-y divide-gray-200 border-b border-gray-200 border-t">
        {questions.map((question) => {
          const questionWithTime = {
            ...question,
            time: question.time || settingsTime,
          };
          return (
            <SessionQuestion
              key={question.id}
              {...questionWithTime}
              isTimed={isTimed}
              handleRemoveQuestion={handleRemoveQuestion}
              handleEditQuestion={handleEditQuestion}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <div className="bg-white lg:min-w-0 lg:flex-1 flex flex-col h-[calc(100vh-75px)] overflow-y-auto smooth-scroll">
      <div className="flex flex-col justify-start py-4">
        {shouldShowQuestionAction ? (
          <QuestionAction
            isTimed={isTimed}
            settingsTime={settingsTime}
            currentQuestion={currentQuestion}
            handleSubmit={handleSubmitQuestion}
            handleCancelAction={handleCancelAction}
          />
        ) : (
          <div className="flex justify-end items-center pr-4">
            <ActionMenu name="pinned-items" actions={getDropdownActions()} type="sort" />
          </div>
        )}
      </div>
      {renderQuestionsOrEmptyAction()}
    </div>
  );
};

export default SessionQuestionsList;
