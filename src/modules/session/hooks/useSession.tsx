import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { type SessionQuestionType, type SettingsVoiceType } from '@modules/session/types';
import { SESSION_DATA_INITIAL_STATE } from '@modules/session/constants';
import { useState, useEffect } from 'react';

export const questionsData = [
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
    answer: undefined,
    time: { id: 4, name: '5 seconds' },
  },
];

export const useSession = () => {
  const [questions, setQuestions] = useState<SessionQuestionType[]>([]);

  const [shouldShowQuestionAction, setShouldShowQuestionAction] = useState(false);
  // if there are questions disable start session button
  const [questionsCount, setQuestionsCount] = useState(0);
  const [shouldReadOutLoud, setShouldReadOutLoud] = useState(
    SESSION_DATA_INITIAL_STATE.settings.shouldReadOutLoud
  );
  const [shouldHaveOrder, setShouldHaveOrder] = useState(
    SESSION_DATA_INITIAL_STATE.settings.shouldHaveOrder
  );
  const [isTimed, setIsTimed] = useState(SESSION_DATA_INITIAL_STATE.settings.isTimed);
  // time and order selected in settings
  const [settingsOrder, setSettingsOrder] = useState<SelectMenuItemType>(
    SESSION_DATA_INITIAL_STATE.settings.order
  );
  const [settingsTime, setSettingsTime] = useState<SelectMenuItemType>(
    SESSION_DATA_INITIAL_STATE.settings.time
  );
  const [settingsVoice, setSettingsVoice] = useState<SettingsVoiceType>(
    SESSION_DATA_INITIAL_STATE.settings.voice
  );

  useEffect(() => {
    // todo, get form storage
    const data = { ...SESSION_DATA_INITIAL_STATE, questions: questionsData };

    if (data) {
      setQuestions(data.questions);
      setQuestionsCount(data.questions.length || 0);
      setShouldReadOutLoud(data.settings.shouldReadOutLoud);
      setShouldHaveOrder(data.settings.shouldHaveOrder);
      setIsTimed(data.settings.isTimed);
      setSettingsOrder(data.settings.order || SESSION_DATA_INITIAL_STATE.settings.order);
      setSettingsTime(data.settings.time || SESSION_DATA_INITIAL_STATE.settings.time);
      setSettingsVoice(data.settings.voice || SESSION_DATA_INITIAL_STATE.settings.voice);
    }
  }, []);

  return {
    questions,
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
    settingsVoice,
    setSettingsVoice,
  };
};
