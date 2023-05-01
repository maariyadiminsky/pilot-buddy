import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { SessionDataType } from '@modules/session/types';
import {
  TIME_OPTIONS,
  ORDER_OPTIONS,
  SESSION_DATA_INITIAL_STATE,
} from '@modules/session/constants';
import { useState, useEffect } from 'react';

export const questions = [
  {
    id: '0',
    question: 'What is the biggest ballooon in the world?',
    answer: 'dsfdsfsd',
    time: { id: 0, name: '5 seconds' },
  },
  {
    id: '1',
    question: '342342jkh4h54k5khjdsjklclksdf',
    answer:
      'fgfghfghfg fghfgh fghfgklhfglhjgf lg fgfghfghfg fghfgh fghfgklhfglhjgf lg fgfghfghfg fghfgh fghfgklhfglhjgf lg fgfghfghfg fghfgh fghfgklhfglhjgf lg fgfghfghfg fghfgh fghfgklhfglhjgf lggfdhgdhgfhfghfgfgfghfghfg fghfgh fghfgklhfglhjgf lgfhj fglkjh lgkfj hlkjgf jfg hjgdlfk hjdglfh jdfj kd jsf klgslkj sjk djklsjkl fsdljk sjkd klsd sljkd  jkds fjklgsd',
    time: { id: 1, name: '10 seconds' },
  },
  {
    id: '2',
    question: 'sfddsfdsfsdfsdfds sdfsdfsdfsdfds sd fsdfsdfs',
    answer: '4534tfdggdf ',
    time: { id: 2, name: '5 seconds' },
  },
  {
    id: '3',
    question: 'eeeeesfdsf 765bgfdfdgfd',
    answer: 'sdfdsffdssd',
    time: { id: 3, name: '5 seconds' },
  },
  {
    id: '4',
    question: 'sfsd',
    answer: null,
    time: { id: 4, name: '5 seconds' },
  },
];

export const useSession = () => {
  const [sessionData, setSessionData] = useState<SessionDataType>(SESSION_DATA_INITIAL_STATE);

  useEffect(() => {
    // todo replace SESSION_DATA_INITIAL_STATE here with sessionData from storage.
    setSessionData({ ...SESSION_DATA_INITIAL_STATE, questions });
  }, []);

  const [shouldShowQuestionAction, setShouldShowQuestionAction] = useState(false);
  // if there are questions disable start session button
  const [questionsCount, setQuestionsCount] = useState(sessionData?.questions?.length || 0);
  const [shouldReadOutLoud, setShouldReadOutLoud] = useState(
    sessionData?.settings.shouldReadOutLoud || false
  );
  const [shouldHaveOrder, setShouldHaveOrder] = useState(
    sessionData?.settings.shouldHaveOrder || false
  );
  const [isTimed, setIsTimed] = useState(sessionData?.settings.isTimed || false);
  // time and order selected in settings
  const [settingsOrder, setSettingsOrder] = useState<SelectMenuItemType>(
    sessionData?.settings.order || ORDER_OPTIONS[0]
  );
  const [settingsTime, setSettingsTime] = useState<SelectMenuItemType>(
    sessionData?.settings.time || TIME_OPTIONS[0]
  );

  return {
    sessionData,
    shouldShowQuestionAction,
    setShouldShowQuestionAction,
    questionsCount,
    setQuestionsCount,
    shouldReadOutLoud,
    setShouldReadOutLoud,
    shouldHaveOrder,
    setShouldHaveOrder,
    isTimed,
    setIsTimed,
    settingsOrder,
    setSettingsOrder,
    settingsTime,
    setSettingsTime,
  };
};
