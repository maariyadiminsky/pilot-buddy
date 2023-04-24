import { removeObjectFromArray, jumpPageToTop } from '@common/utils';
import EmptyDataAction from '@common/components/empty/EmptyDataAction';
import QuestionAction from '@modules/session/question/SessionQuestionAction';
import { useState, useEffect } from 'react';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { DragDropContext, Droppable, type DropResult } from 'react-beautiful-dnd';
import SessionQuestionsList, {
  type SessionQuestionType,
} from '@modules/session/question/SessionQuestionsList';

export const questionData = [
  {
    id: '0',
    question: 'What is the biggest ballooon in the world?',
    answer: 'dsfdsfsd',
    time: { id: '0', name: '5 seconds' },
  },
  {
    id: '1',
    question: '342342jkh4h54k5khjdsjklclksdf',
    answer:
      'fgfghfghfg fghfgh fghfgklhfglhjgf lg fgfghfghfg fghfgh fghfgklhfglhjgf lg fgfghfghfg fghfgh fghfgklhfglhjgf lg fgfghfghfg fghfgh fghfgklhfglhjgf lg fgfghfghfg fghfgh fghfgklhfglhjgf lggfdhgdhgfhfghfgfgfghfghfg fghfgh fghfgklhfglhjgf lgfhj fglkjh lgkfj hlkjgf jfg hjgdlfk hjdglfh jdfj kd jsf klgslkj sjk djklsjkl fsdljk sjkd klsd sljkd  jkds fjklgsd',
    time: { id: '1', name: '10 seconds' },
  },
  {
    id: '2',
    question: 'sfddsfdsfsdfsdfds sdfsdfsdfsdfds sd fsdfsdfs',
    answer: '4534tfdggdf ',
    time: { id: '2', name: '5 seconds' },
  },
  {
    id: '3',
    question: 'eeeeesfdsf 765bgfdfdgfd',
    answer: 'sdfdsffdssd',
    time: { id: '3', name: '5 seconds' },
  },
  {
    id: '4',
    question: 'sfsd',
    answer: null,
    time: { id: '4', name: '5 seconds' },
  },
];

interface SessionQuestionsProps {
  isTimed: boolean;
  settingsTime: SelectMenuItemType;
  shouldShowQuestionAction: boolean;
  setQuestionsCount: (value: number) => void;
  setShouldShowQuestionAction: (value: boolean) => void;
}

const DropStyles = {
  isDragging: 'bg-slate-100',
  isNotDragging: 'bg-white',
};

const SessionQuestions = ({
  isTimed,
  settingsTime,
  shouldShowQuestionAction,
  setQuestionsCount,
  setShouldShowQuestionAction,
}: SessionQuestionsProps) => {
  const [questions, setQuestions] = useState<SessionQuestionType[]>(questionData);
  const [currentQuestion, setCurrentQuestion] = useState<SessionQuestionType>();

  const handleSetQuestions = (updatedQuestions: SessionQuestionType[]) => {
    setQuestions(updatedQuestions);
    setQuestionsCount(updatedQuestions?.length || 0);
  };

  // Issue: https://medium.com/@wbern/getting-react-18s-strict-mode-to-work-with-react-beautiful-dnd-47bc909348e4
  // Cleanest fix: https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1503025577
  const [isComponentMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    // for start session button
    setQuestionsCount(questions?.length || 0);
  }, []);

  const handleAddQuestion = (question: SessionQuestionType) => {
    const questionsWithNewQuestion = [...questions, { ...question }];
    handleSetQuestions(questionsWithNewQuestion);
    return questionsWithNewQuestion;
  };

  const handleSubmitQuestion = (question: SessionQuestionType) => {
    handleAddQuestion(question);
    setCurrentQuestion(undefined);
    setShouldShowQuestionAction(false);

    // handle saving question here
  };

  const handleRemoveQuestion = (id: string, customQuestions?: SessionQuestionType[]) => {
    handleSetQuestions(removeObjectFromArray(customQuestions || questions, id, 'id'));

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

  const handleDragEnd = (data: DropResult) => {
    const { destination, source, draggableId } = data;

    // if user dragged outside possible drop area
    if (!destination) return;

    const draggedTo = destination.index;

    // if placement is the same
    if (destination.droppableId === source.droppableId && draggedTo === source.index) return;

    // otherwise find the question and place in correct order
    const question = questions.find(({ id }) => id === draggableId);

    // if question doesn't exist
    if (!question) return;

    // get questions array without question
    const questionsWithoutMovedQuestion = removeObjectFromArray(questions, draggableId, 'id');

    // add question to correct index
    handleSetQuestions([
      ...questionsWithoutMovedQuestion.slice(0, draggedTo),
      question,
      ...questionsWithoutMovedQuestion.slice(draggedTo),
    ]);
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
      <DragDropContext onDragEnd={handleDragEnd}>
        {isComponentMounted ? (
          <Droppable droppableId="session-questions" direction="vertical">
            {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
              <div
                ref={innerRef}
                className={`${isDraggingOver ? DropStyles.isDragging : DropStyles.isNotDragging}`}
              >
                <SessionQuestionsList
                  {...{
                    ...droppableProps,
                    placeholder,
                    questions,
                    settingsTime,
                    isTimed,
                    handleRemoveQuestion,
                    handleEditQuestion,
                  }}
                />
              </div>
            )}
          </Droppable>
        ) : null}
      </DragDropContext>
    );
  };

  return (
    <div className="bg-white xl:min-w-0 xl:flex-1 flex flex-col h-[calc(100vh-75px)] overflow-y-auto smooth-scroll">
      <div className="flex flex-col justify-start">
        {shouldShowQuestionAction && (
          <QuestionAction
            isTimed={isTimed}
            settingsTime={settingsTime}
            currentQuestion={currentQuestion}
            handleSubmit={handleSubmitQuestion}
            handleCancelAction={handleCancelAction}
          />
        )}
      </div>
      {renderQuestionsOrEmptyAction()}
    </div>
  );
};

export default SessionQuestions;
