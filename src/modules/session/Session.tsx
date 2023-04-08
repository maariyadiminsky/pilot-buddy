// todo add typescript
// @ts-nocheck
import { PlayCircleIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import SessionNotes from '@modules/session/SessionNotes';
import SessionQuestionsList from '@modules/session/SessionQuestionsList';
import SessionGoals from '@modules/session/SessionGoals';

import { useState, useMemo } from 'react';

// todo: get session name and add to PageWrapper title
const Session = () => {
  const [shouldShowQuestionAction, setShouldShowQuestionAction] = useState(false);

  // eslint-disable-next-line
  const handleStartSession = (id: number) => {
    // handle start session
  };

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
          icon: PencilSquareIcon,
          buttonClassType: 'clear',
          disabled: shouldShowQuestionAction,
          handleOnClick: () => setShouldShowQuestionAction(true),
        },
      ] as BrandButtonType[],
    [shouldShowQuestionAction]
  );

  return (
    <PageWrapper title="Session Room" headerActions={headerActions}>
      <>
        <div className="relative flex min-h-screen min-w-full flex-col bg-inherit">
          <div className="w-full flex-grow xl:flex">
            <div className="min-w-0 flex-1 bg-inherit xl:flex">
              <SessionNotes />
              <SessionQuestionsList
                shouldShowQuestionAction={shouldShowQuestionAction}
                setShouldShowQuestionAction={setShouldShowQuestionAction}
              />
            </div>
            <SessionGoals />
          </div>
        </div>
      </>
    </PageWrapper>
  );
};

export default Session;
