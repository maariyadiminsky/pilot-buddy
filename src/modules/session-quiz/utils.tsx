import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { type SessionQuestionType } from '@modules/session/question/SessionQuestionsList';
import { SessionOrderEnum } from '@modules/session/types';
import shuffle from 'lodash/shuffle';

export const getTimeData = (time?: SelectMenuItemType) => {
  const timeNumber = time ? Number(time.name.split(' ')[0]) : 0;

  return {
    id: time?.id,
    timeUI: timeNumber,
    timeActual: timeNumber ? timeNumber * 1000 : 0,
  };
};

export const getQuestionOrder = (
  orderType: keyof typeof SessionOrderEnum,
  sessions: SessionQuestionType[]
) => {
  switch (orderType) {
    case SessionOrderEnum.random:
      return shuffle(sessions);
    case SessionOrderEnum.sort:
    default:
      return sessions;
  }
};
