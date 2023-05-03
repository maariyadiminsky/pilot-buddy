import { PlayCircleIcon, PlusIcon } from '@heroicons/react/20/solid';
import PageWrapper from '@modules/common/components/page/PageWrapper';
import SessionNotes from '@modules/session/SessionNotes';
import SessionQuestions from '@modules/session/SessionQuestions';
import SessionSettings from '@modules/session/SessionSettings';
import { type BrandButtonType } from '@common/components/button/BrandButton';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { DATABASE_ERROR, useDatabase } from '@common/hooks';
import { type SessionDataType } from '@modules/session/types';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { SESSION_DATA_INITIAL_STATE } from '@modules/session/constants';

const Session = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState<SessionDataType>();
  const [sessionName, setSessionName] = useState('');
  const [shouldShowQuestionAction, setShouldShowQuestionAction] = useState(false);
  // if there are questions disable start session button
  const [questionsCount, setQuestionsCount] = useState(0);
  const [isTimed, setIsTimed] = useState(false);
  const [settingsTime, setSettingsTime] = useState<SelectMenuItemType>(
    SESSION_DATA_INITIAL_STATE.settings.time
  );

  const { getDBSession, getDBSessionTableItem } = useDatabase();

  useEffect(() => {
    const getSession = async () => {
      let hasError = null;
      let sessionData;
      let sessionInTable;
      try {
        if (!id) return;

        sessionInTable = await getDBSessionTableItem(id);
        sessionData = await getDBSession(id);
      } catch (error) {
        hasError = error;
        if (error instanceof Error && error.message) {
          console.log(error);
          // todo: add error monitoring
          if (error.message === DATABASE_ERROR.SESSION_NOT_FOUND) {
            navigate('/');
          }
        }
      } finally {
        if (!hasError && sessionData && sessionInTable) {
          setSessionName(sessionInTable.name);
          setSession(sessionData);
          console.log('sessionData:', sessionData);
          setQuestionsCount(sessionData.questions.length);
        }
      }
    };

    getSession();
  }, [id]);

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

  if (!id) return null;

  return (
    <PageWrapper title={sessionName} headerActions={headerActions}>
      <div className="relative flex h-full min-w-full flex-col bg-inherit">
        <div className="w-full flex-grow xl:flex">
          <div className="min-w-0 flex-1 bg-inherit xl:flex">
            <SessionNotes notesData={session?.notes} sessionId={id} />
            <SessionQuestions
              questionsData={session?.questions}
              sessionId={id}
              isTimed={isTimed}
              setQuestionsCount={setQuestionsCount}
              settingsTime={settingsTime}
              shouldShowQuestionAction={shouldShowQuestionAction}
              setShouldShowQuestionAction={setShouldShowQuestionAction}
            />
          </div>
          <div className="flex flex-col items-start">
            <SessionSettings
              settings={session?.settings}
              isTimed={isTimed}
              setIsTimed={setIsTimed}
              settingsTime={settingsTime}
              setSettingsTime={setSettingsTime}
              sessionId={id}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Session;
