import { SyntheticEvent, useState, useEffect, useMemo } from 'react';
import { getTimeData } from '@modules/session-quiz/utils';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';

export const useSessionQuizTime = (
  isTimed: boolean,
  questionsLeft: number,
  handleAddQuizAnswer: (value?: SyntheticEvent<Element>) => void,
  currentQuestionTime?: SelectMenuItemType,
  currentQuestionId?: string,
  previousQuestionId?: string
) => {
  const currentTime = useMemo(
    () => (isTimed ? getTimeData(currentQuestionTime) : null),
    [currentQuestionTime, currentQuestionId]
  );

  const [timeLeft, setTimeLeft] = useState(currentTime?.timeUI);

  // add time if user enabled Timed option
  useEffect(() => {
    if (!isTimed || !questionsLeft) return undefined;

    let timer: ReturnType<typeof setInterval>;

    if (previousQuestionId !== currentQuestionId) {
      setTimeLeft(currentTime?.timeUI);
    } else if (!timeLeft) {
      handleAddQuizAnswer();
    }

    if (timeLeft) {
      // a few milliseconds in case user is using speech to text
      // since there is a slight delay for the text to print
      timer = setInterval(() => setTimeLeft(timeLeft - 1), 1200);
    }

    return () => clearInterval(timer);
  }, [isTimed, previousQuestionId, currentQuestionId, timeLeft, questionsLeft]);

  return { timeLeft };
};
