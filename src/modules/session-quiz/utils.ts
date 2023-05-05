import { type SelectMenuItemType } from '@common/dropdown/SelectMenu';
import { SessionOrderEnum, type SessionQuestionType } from '@modules/session/types';
import shuffle from 'lodash/shuffle';

export const getTimeData = (time?: SelectMenuItemType) => {
  const timeNumber = time ? Number(time.name.split(' ')[0]) : 0;

  return {
    id: time?.id,
    timeUI: timeNumber,
    timeActual: timeNumber ? timeNumber * 1000 : 0,
  };
};

export const getQuestionOrder = (orderType: string, sessions: SessionQuestionType[]) => {
  switch (orderType) {
    case SessionOrderEnum.Random:
      return shuffle(sessions);
    case SessionOrderEnum.Sort:
    default:
      return sessions;
  }
};
