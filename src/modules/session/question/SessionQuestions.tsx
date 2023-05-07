import { useDatabase } from '@common/database/hooks';
import { EmptyDataAction } from '@common/empty';
import { captureException } from '@common/error-monitoring';
import { useDragAndDropWithStrictMode } from '@common/hooks';
import { Loader } from '@common/loader';
import { type SelectMenuItemType } from '@common/types';
import { removeObjectFromArray, jumpPageToTop } from '@common/utils';
import { SessionQuestionAction, SessionQuestionsList } from '@modules/session/question';
import { SessionQuestionType } from '@modules/session/types';
import { getArrWithDataBackInOrder } from '@modules/session/utils';
import { FC, useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, type DropResult } from 'react-beautiful-dnd';

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
  isDragging: 'bg-gray-50',
  isNotDragging: 'bg-white',
};

export const SessionQuestions: FC<SessionQuestionsProps> = ({
  questionsData,
  sessionId,
  isTimed,
  settingsTime,
  shouldShowQuestionAction,
  setQuestionsCount,
  setShouldShowQuestionAction,
}) => {
  const [questions, setQuestions] = useState<SessionQuestionType[]>();
  const [currentQuestion, setCurrentQuestion] = useState<SessionQuestionType>();
  const [currentQuestionOrderIndex, setCurrentQuestionOrderIndex] = useState<number>();

  const { updateDBPartialDataOfSession, updateDBPartialDataOfSessionTableItem } = useDatabase();
  const { isDragAndDropEnabled } = useDragAndDropWithStrictMode();

  const handleSetQuestions = useCallback(
    (updatedQuestions: SessionQuestionType[]) => {
      setQuestions(updatedQuestions);
      // for start session button
      setQuestionsCount(updatedQuestions?.length || 0);
    },
    [setQuestions, setQuestionsCount]
  );

  useEffect(() => {
    if (questionsData) {
      handleSetQuestions(questionsData);
    }
  }, [questionsData, handleSetQuestions]);

  const handleAddQuestion = (question: SessionQuestionType, index: number) =>
    getArrWithDataBackInOrder(index, question, questions);

  const handleSubmitQuestion = (question: SessionQuestionType) => {
    // save in storage
    let hasError = null;
    // new questions won't have index, so default to 0
    const updatedQuestions = handleAddQuestion(question, currentQuestionOrderIndex || 0);
    try {
      updateDBPartialDataOfSession({ questions: updatedQuestions }, sessionId);
      updateDBPartialDataOfSessionTableItem({ questions: updatedQuestions.length }, sessionId);
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        captureException(error);
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
        captureException(error);
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
      const currentQuestionIndex = questions?.findIndex((question) => question.id === id) || 0;
      setCurrentQuestionOrderIndex(currentQuestionIndex);

      const questionsUpdated = handleAddQuestion(currentQuestion, currentQuestionIndex);

      handleSetQuestions(questionsUpdated);
      handleRemoveQuestionFromUIOnly(id, questionsUpdated);
    } else {
      const current = questions?.find((question) => question.id === id);
      const currentQuestionIndex = questions?.findIndex((question) => question.id === id) || 0;
      setCurrentQuestionOrderIndex(currentQuestionIndex);

      handleRemoveQuestionFromUIOnly(id);
      setCurrentQuestion(current);
    }

    setShouldShowQuestionAction(true);
  };

  // when user opens to edit or create and clicks cancel button
  const handleCancelAction = () => {
    if (currentQuestion) {
      const questionsUpdated = handleAddQuestion(currentQuestion, currentQuestionOrderIndex || 0);

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

    // save in storage
    let hasError = null;
    const updatedQuestions = getArrWithDataBackInOrder(
      draggedTo,
      question,
      questionsWithoutMovedQuestion
    );
    try {
      updateDBPartialDataOfSession({ questions: updatedQuestions }, sessionId);
    } catch (error) {
      hasError = error;
      if (error instanceof Error) {
        captureException(error);
      }
    } finally {
      if (!hasError && updatedQuestions) {
        handleSetQuestions(updatedQuestions);
      }
    }
  };

  const renderQuestionsOrEmptyAction = () => {
    if (!questions) return <Loader />;

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
        {isDragAndDropEnabled ? (
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
    <div className="bg-white xl:min-w-0 xl:flex-1 flex flex-col xl:h-[calc(100vh-75px)]">
      <div className="flex flex-col justify-start">
        {shouldShowQuestionAction && (
          <SessionQuestionAction
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
