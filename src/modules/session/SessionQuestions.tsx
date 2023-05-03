import { removeObjectFromArray, jumpPageToTop } from '@common/utils';
import EmptyDataAction from '@common/components/empty/EmptyDataAction';
import QuestionAction from '@modules/session/question/SessionQuestionAction';
import { useState, useEffect } from 'react';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { DragDropContext, Droppable, type DropResult } from 'react-beautiful-dnd';
import SessionQuestionsList from '@modules/session/question/SessionQuestionsList';
import { SessionQuestionType } from '@modules/session/types';
import { useDatabase } from '@common/hooks';

interface SessionQuestionsProps {
  questionsData?: SessionQuestionType[];
  sessionId: string;
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
  questionsData,
  sessionId,
  isTimed,
  settingsTime,
  shouldShowQuestionAction,
  setQuestionsCount,
  setShouldShowQuestionAction,
}: SessionQuestionsProps) => {
  const [questions, setQuestions] = useState<SessionQuestionType[]>();
  const [currentQuestion, setCurrentQuestion] = useState<SessionQuestionType>();

  const { updateDBPartialDataOfSession, updateDBPartialDataOfSessionTableItem } = useDatabase();

  const handleSetQuestions = (updatedQuestions: SessionQuestionType[]) => {
    setQuestions(updatedQuestions);
    // for start session button
    setQuestionsCount(updatedQuestions?.length || 0);
  };

  useEffect(() => {
    if (!questions?.length) {
      handleSetQuestions(questionsData || []);
    }
  }, [questionsData?.length]);

  // Issue: https://medium.com/@wbern/getting-react-18s-strict-mode-to-work-with-react-beautiful-dnd-47bc909348e4
  // Cleanest fix: https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1503025577
  const [isComponentMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddQuestion = (question: SessionQuestionType) => [
    ...(questions || []),
    { ...question },
  ];

  const handleSubmitQuestion = (question: SessionQuestionType) => {
    // save in storage
    let hasError = null;
    const updatedQuestions = handleAddQuestion(question);
    try {
      updateDBPartialDataOfSession({ questions: updatedQuestions }, sessionId);
      updateDBPartialDataOfSessionTableItem({ questions: updatedQuestions.length }, sessionId);
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        console.log(error);
        // todo: add error monitoring
      }
    } finally {
      if (!hasError && updatedQuestions) {
        setCurrentQuestion(undefined);
        handleSetQuestions(updatedQuestions);
        setShouldShowQuestionAction(false);
      }
    }
  };

  const handleRemoveQuestionFromUIOnly = (id: string, customQuestions?: SessionQuestionType[]) => {
    handleSetQuestions(removeObjectFromArray(customQuestions || questions || [], id, 'id'));
  };

  const handleRemoveQuestion = (id: string, customQuestions?: SessionQuestionType[]) => {
    // save in storage
    let hasError = null;
    const updatedQuestions = removeObjectFromArray(customQuestions || questions || [], id, 'id');
    try {
      updateDBPartialDataOfSession({ questions: updatedQuestions }, sessionId);
      updateDBPartialDataOfSessionTableItem({ questions: updatedQuestions.length }, sessionId);
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        console.log(error);
        // todo: add error monitoring
      }
    } finally {
      if (!hasError && updatedQuestions) {
        handleSetQuestions(updatedQuestions);
      }
    }
  };

  const handleEditQuestion = (id: string) => {
    jumpPageToTop();
    // in the case they were editing before and just hit edit again
    // add back the last item user was editing.
    // This also acts as a cancel of the last edit.
    if (currentQuestion) {
      const questionsUpdated = handleAddQuestion(currentQuestion);
      handleSetQuestions(questionsUpdated);
      handleRemoveQuestionFromUIOnly(id, questionsUpdated);
    } else {
      handleRemoveQuestionFromUIOnly(id);
    }

    setCurrentQuestion(questions?.find((question) => question.id === id));
    setShouldShowQuestionAction(true);
  };

  // when user opens to edit or create and clicks cancel button
  const handleCancelAction = () => {
    if (currentQuestion) {
      const questionsUpdated = handleAddQuestion(currentQuestion);
      handleSetQuestions(questionsUpdated);
      setCurrentQuestion(undefined);
    }

    setShouldShowQuestionAction(false);
  };

  const handleDragEnd = (data: DropResult) => {
    if (!questions) return;

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
    if (!questions) return <div>Loading...</div>;

    if (!questions.length) {
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

    const heightMobile = questions.length > 6 ? 'h-[calc(100vh-350px)]' : 'h-full';
    const height = shouldShowQuestionAction
      ? 'xl:h-[calc(100vh-375px)]'
      : 'xl:h-[calc(100vh-75px)]';

    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {isComponentMounted ? (
          <Droppable droppableId="session-questions" direction="vertical">
            {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
              <div
                ref={innerRef}
                className={`${
                  isDraggingOver ? DropStyles.isDragging : DropStyles.isNotDragging
                } ${heightMobile} ${height}`}
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
    <div className="bg-white xl:min-w-0 xl:flex-1 flex flex-col">
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
