// todo add typescript
// @ts-nocheck
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { PlayCircleIcon, PlusIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import SessionNotes from '@modules/session/SessionNotes';
import SessionQuestions from '@modules/session/SessionQuestions';
import SessionSettings from '@modules/session/SessionSettings';
import { type SettingsToggleTypeWithId } from '@modules/session/settings/SessionSetting';
import SpeechSynthesis from '@modules/speech-synthesis/SpeechSynthesis';
import TimeSelectMenu from './settings/TimeSelectMenu';
import OrderSelectMenu from './settings/OrderSelectMenu';
import { TIME_OPTIONS, ORDER_OPTIONS } from './constants';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';

// todo: get session name and add to PageWrapper title
const Session = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shouldShowQuestionAction, setShouldShowQuestionAction] = useState(false);
  // if there are questions disable start session button
  const [questionsCount, setQuestionsCount] = useState(0);
  const [shouldReadOutLoud, setShouldReadOutLoud] = useState(false);
  const [shouldHaveOrder, setShouldHaveOrder] = useState(false);
  const [isTimed, setIsTimed] = useState(false);
  // time and order selected in settings
  const [settingsOrder, setSettingsOrder] = useState<SelectMenuItemType>(ORDER_OPTIONS[0]);
  const [settingsTime, setSettingsTime] = useState<SelectMenuItemType>(TIME_OPTIONS[0]);

  const headerActions = useMemo(
    () =>
      [
        {
          text: 'Start Session',
          srText: 'Start session',
          icon: PlayCircleIcon,
          buttonClassType: 'solidPink',
          isDisabled: questionsCount === 0,
          handleOnClick: () => navigate(`/sessions/${id}/start`),
        },
        {
          text: 'Add Question',
          srText: 'Add question to session',
          icon: PlusIcon,
          buttonClassType: 'solid',
          isDisabled: shouldShowQuestionAction,
          handleOnClick: () => setShouldShowQuestionAction(true),
        },
      ] as BrandButtonType[],
    [shouldShowQuestionAction, questionsCount]
  );

  const settings = useMemo(
    () =>
      [
        {
          id: 0,
          title: 'Voice',
          description: 'During the session, your questions will be read aloud for you.',
          getter: shouldReadOutLoud,
          setter: setShouldReadOutLoud,
          settingChildren: shouldReadOutLoud && (
            <SpeechSynthesis text="This is how your question will sound." />
          ),
        },
        {
          id: 1,
          title: 'Order',
          description:
            "Choose the order in which you'd like the session's questions to be presented to you.",
          getter: shouldHaveOrder,
          setter: setShouldHaveOrder,
          settingChildren: shouldHaveOrder && (
            <OrderSelectMenu order={settingsOrder} setOrder={setSettingsOrder} />
          ),
        },
        {
          id: 2,
          title: 'Timed',
          description:
            "Every question has a timer and smoothly moves to the next (If the microphone is enabled during the quiz, it's duration aligns with the question's time).",
          getter: isTimed,
          setter: setIsTimed,
          settingChildren: isTimed && (
            <TimeSelectMenu time={settingsTime} setTime={setSettingsTime} />
          ),
        },
      ] as SettingsToggleTypeWithId,
    [shouldReadOutLoud, shouldHaveOrder, settingsOrder, isTimed, settingsTime]
  );

  return (
    <PageWrapper title="Session Room" headerActions={headerActions}>
      <div className="relative flex h-full min-w-full flex-col bg-inherit">
        <div className="w-full flex-grow xl:flex">
          <div className="min-w-0 flex-1 bg-inherit xl:flex">
            <SessionNotes />
            <SessionQuestions
              isTimed={isTimed}
              setQuestionsCount={setQuestionsCount}
              settingsTime={isTimed && settingsTime}
              shouldShowQuestionAction={shouldShowQuestionAction}
              setShouldShowQuestionAction={setShouldShowQuestionAction}
            />
          </div>
          <div className="flex flex-col items-start">
            <SessionSettings settings={settings} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Session;
