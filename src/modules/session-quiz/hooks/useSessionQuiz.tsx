import { questions as questionData } from '@modules/session/Session';
import { SyntheticEvent, useState, useMemo } from 'react';
import { usePrevious } from '@common/hooks';
import { getQuestionOrder } from '@modules/session-quiz/utils';
import { type SessionQuestionType, type SettingsType } from '@modules/session/types';
import { SessionQuestionWithAnswerType } from '@modules/session-quiz/types';
import { useSessionQuizVoice } from '@modules/session-quiz/hooks';

export const useSessionQuiz = (questionsData: SessionQuestionType[], settings: SettingsType) => {
  const { shouldHaveOrder, shouldReadOutLoud, voice, order } = settings;

  const questionsOrdered = useMemo(
    () => (shouldHaveOrder && order ? getQuestionOrder(order.name, questionData) : questionData),
    [questionsData]
  );

  const lastQuestionId = useMemo(() => questionsOrdered[questionsOrdered.length - 1].id, []);

  const [currentQuestion, setCurrentQuestion] = useState<SessionQuestionType>(questionsOrdered[0]);
  const [questionsLeft, setQuestionsLeft] = useState(questionsOrdered.length);
  const [currentQuizAnswer, setCurrentQuizAnswer] = useState('');
  const [questionsWithAnswers, setQuestionsWithAnswers] =
    useState<SessionQuestionWithAnswerType[]>();

  const previousQuestion = usePrevious(currentQuestion);

  // handle voice synthesis
  const { handleVoicePlay, handleVoiceStop } = useSessionQuizVoice(
    shouldReadOutLoud,
    lastQuestionId,
    voice,
    previousQuestion?.id,
    currentQuestion?.id,
    currentQuestion?.question
  );

  const handleAddQuizAnswer = (event?: SyntheticEvent<Element>) => {
    if (event) event.preventDefault();

    if (shouldReadOutLoud) handleVoiceStop();

    const questionsLeftCount = questionsLeft - 1;

    setQuestionsLeft(questionsLeftCount);
    setQuestionsWithAnswers([
      ...(questionsWithAnswers || []),
      { ...currentQuestion, quizAnswer: currentQuizAnswer },
    ]);
    setCurrentQuizAnswer('');

    const current = questionsOrdered[questionsOrdered.length - questionsLeftCount];
    setCurrentQuestion({ ...current });

    if (shouldReadOutLoud && current) {
      handleVoicePlay(current?.question);
    }
  };

  return {
    questionsOrdered,
    questionsLeft,
    currentQuestion,
    previousQuestion,
    handleAddQuizAnswer,
    currentQuizAnswer,
    questionsWithAnswers,
    setCurrentQuizAnswer,
    handleVoiceStop,
  };
};
