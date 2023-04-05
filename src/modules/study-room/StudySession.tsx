// todo add typescript
// @ts-nocheck
import { PlayCircleIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import SessionStatsAndActions from '@modules/study-room/components/SessionStatsAndActions';
import SessionQuestionsList from '@modules/study-room/components/SessionQuestionsList';
import SessionGoals from '@modules/study-room/components/SessionGoals';

import { useCallback, useMemo } from 'react';

// todo: get session name and add to PageWrapper title
const StudySession = () => {
  // eslint-disable-next-line
  const handleStartSession = (id: number) => {
    // handle start session
  };

  // eslint-disable-next-line
  const handleAddQuestion = (id: number) => {
    // handle add question, open modal
  };

  const getHeaderActions = useCallback(
    () =>
      [
        {
          text: 'Start Session',
          srText: 'Start session',
          icon: PlayCircleIcon,
          buttonType: 'solidRed',
          handleOnClick: (id: number) => handleStartSession(id),
        },
        {
          text: 'Add Question',
          srText: 'Add question to session',
          icon: PencilSquareIcon,
          buttonType: 'clear',
          handleOnClick: (id: number) => handleAddQuestion(id),
        },
      ] as BrandButtonType[],
    []
  );

  const headerActions = useMemo(() => getHeaderActions(), []);

  return (
    <PageWrapper title="Session Room" headerActions={headerActions}>
      <>
        <div className="relative flex h-screen min-w-full flex-col bg-inherit">
          <div className="w-full flex-grow xl:flex">
            <div className="min-w-0 flex-1 bg-inherit xl:flex">
              <SessionStatsAndActions />
              <SessionQuestionsList />
            </div>
            <SessionGoals />
          </div>
        </div>
      </>
    </PageWrapper>
  );
};

export default StudySession;
