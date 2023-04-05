// todo add typescript
// @ts-nocheck
import PageWrapper from '@modules/common/components/page/PageWrapper';
import SessionStatsAndAction from '@modules/study-room/components/SessionStatsAndAction';
import SessionQuestionsList from '@modules/study-room/components/SessionQuestionsList';
import SessionGoals from '@modules/study-room/components/SessionGoals';

// todo: get session name and add to PageWrapper title
const StudySession = () => {
  // eslint-disable-next-line
  const handleCreateSession = () => {
    // handle add session
    // pass data here eventually
  };

  return (
    <PageWrapper title="Session Room">
      <>
        <div className="relative flex min-h-full min-w-full flex-col bg-inherit">
          <div className="w-full flex-grow xl:flex px-8">
            <div className="min-w-0 flex-1 bg-inherit xl:flex">
              <SessionStatsAndAction />
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
