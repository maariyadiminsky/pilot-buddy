import { PlayCircleIcon, PlusIcon } from '@heroicons/react/20/solid';
import SessionNotes from '@modules/session/notes/SessionNotes';
import SessionQuestions from '@modules/session/question/SessionQuestions';
import SessionSettings from '@modules/session/settings/SessionSettings';
import { type BrandButtonType } from '@common/components/button/BrandButton';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect, useContext } from 'react';
import { PageContext } from '@common/components/page/PageProvider';
import { DATABASE_ERROR, useDatabase } from '@common/hooks';
import { type SessionDataType } from '@modules/session/types';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { SESSION_DATA_INITIAL_STATE } from '@modules/session/constants';
import { ROUTES } from '@modules/app/constants';

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
        sessionData = await getDBSession(id);
        sessionInTable = await getDBSessionTableItem(id);
      } catch (error) {
        hasError = error;
        if (error instanceof Error && error.message) {
          console.log(error);
          // todo: add error monitoring
          if (error.message === DATABASE_ERROR.SESSION_NOT_FOUND) {
            navigate(ROUTES.NOT_FOUND_ROUTE);
          }
        }
      } finally {
        if (!hasError && sessionData && sessionInTable) {
          setSessionName(sessionInTable.name);
          setSession(sessionData);
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

  const { setPageTitle, setPageHeaderActions } = useContext(PageContext);

  useEffect(() => {
    setPageTitle(sessionName);
    setPageHeaderActions(headerActions);
  }, [sessionName]);

  if (!id) return null;

  return (
    <>
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
    </>
  );
};

export default Session;
