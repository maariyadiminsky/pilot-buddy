// todo add typescript
// @ts-nocheck
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { PlayCircleIcon, PlusIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import SessionNotes from '@modules/session/SessionNotes';
import SessionQuestionsList from '@modules/session/SessionQuestionsList';
import SessionSettings from '@modules/session/SessionSettings';
import { type SettingToggleType } from '@modules/session/settings/SettingToggle';
import TimeSelectMenu from './settings/TimeSelectMenu';
import { TIME_OPTIONS } from './constants';

import { useState, useMemo } from 'react';

// todo: get session name and add to PageWrapper title
const Session = () => {
  const [shouldShowQuestionAction, setShouldShowQuestionAction] = useState(false);

  const [shouldReadOutLoud, setShouldReadOutLoud] = useState(false);
  const [isTimed, setIsTimed] = useState(false);
  // time selected in settings
  const [settingsTime, setSettingsTime] = useState<SelectMenuItemType>(TIME_OPTIONS[0]);

  // eslint-disable-next-line
  const handleStartSession = (id: number) => {
    // handle start session
  };

  // const handleSetTime = (value: SelectMenuItemType) => setTimeSelected(value.name);

  const headerActions = useMemo(
    () =>
      [
        {
          text: 'Start Session',
          srText: 'Start session',
          icon: PlayCircleIcon,
          buttonClassType: 'solidPink',
          handleOnClick: (id: number) => handleStartSession(id),
        },
        {
          text: 'Add Question',
          srText: 'Add question to session',
          icon: PlusIcon,
          buttonClassType: 'clear',
          disabled: shouldShowQuestionAction,
          handleOnClick: () => setShouldShowQuestionAction(true),
        },
      ] as BrandButtonType[],
    [shouldShowQuestionAction]
  );

  const settings = useMemo(
    () =>
      [
        {
          title: 'Text-to-Speech',
          description: 'During the session, your questions will be read aloud for you.',
          getter: shouldReadOutLoud,
          setter: setShouldReadOutLoud,
        },
        {
          title: 'Timed',
          description: 'Each question is timed and automatically transitions to the next one.',
          getter: isTimed,
          setter: setIsTimed,
        },
      ] as SettingToggleType,
    [shouldReadOutLoud, isTimed]
  );

  return (
    <PageWrapper title="Session Room" headerActions={headerActions}>
      <>
        <div className="relative flex min-h-screen min-w-full flex-col bg-inherit">
          <div className="w-full flex-grow xl:flex">
            <div className="min-w-0 flex-1 bg-inherit xl:flex">
              <SessionNotes />
              <SessionQuestionsList
                isTimed={isTimed}
                settingsTime={isTimed && settingsTime}
                shouldShowQuestionAction={shouldShowQuestionAction}
                setShouldShowQuestionAction={setShouldShowQuestionAction}
              />
            </div>
            <div className="flex flex-col items-start">
              <SessionSettings settings={settings}>
                {isTimed && <TimeSelectMenu time={settingsTime} setTime={setSettingsTime} />}
              </SessionSettings>
            </div>
          </div>
        </div>
      </>
    </PageWrapper>
  );
};

export default Session;
