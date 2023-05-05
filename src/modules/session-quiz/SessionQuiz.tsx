import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { useInitializeSpeechToText } from '@modules/speech-recognition/hooks';
import Dictaphone from '@modules/speech-recognition/Dictaphone';
import { SyntheticEvent, useState, useEffect, useMemo, useRef } from 'react';
import Modal, { type ModalRef } from '@common/components/modal/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import { type SessionDataType, type SessionQuestionType } from '@modules/session/types';
import SessionQuizResults from '@modules/session-quiz/SessionQuizResults';
import { DATABASE_ERROR, useDatabase, usePrevious } from '@common/hooks';
import { getQuestionOrder, getTimeData } from '@modules/session-quiz/utils';
import { SessionQuestionWithAnswerType } from '@modules/session-quiz/types';
import { useSpeechSynthesis } from '@modules/speech-synthesis/hooks';
import Loader from '@common/components/loader/Loader';
import { ROUTES } from '@modules/app/constants';

const SessionQuiz = () => {
  const modalRef = useRef<ModalRef>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionDataType | null>(null);

  const { getDBSession } = useDatabase();

  useEffect(() => {
    const getSession = async () => {
      let hasError = null;
      let sessionData;
      try {
        if (!id) return;

        sessionData = await getDBSession(id);
        if (!sessionData?.questions || !sessionData.questions.length) {
          navigate(ROUTES.NOT_FOUND_ROUTE);
        }
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
        if (!hasError && sessionData) {
          setSession(sessionData);
        }
      }
    };

    getSession();
  }, [id]);

  // session data and voice if enabled
  const questionsOrdered = useMemo(
    () =>
      session?.settings.shouldHaveOrder && session?.settings.order && session?.questions
        ? getQuestionOrder(session?.settings.order.name, session?.questions)
        : session?.questions,
    [session?.questions]
  );

  const [currentQuestion, setCurrentQuestion] = useState<SessionQuestionType | undefined>(
    questionsOrdered?.[0]
  );
  const [questionsLeft, setQuestionsLeft] = useState(questionsOrdered?.length || 0);
  const [currentQuizAnswer, setCurrentQuizAnswer] = useState('');
  const [questionsWithAnswers, setQuestionsWithAnswers] =
    useState<SessionQuestionWithAnswerType[]>();

  const previousQuestion = usePrevious(currentQuestion);

  useEffect(() => {
    if (questionsOrdered?.length) {
      setCurrentQuestion(questionsOrdered?.[0]);
      setQuestionsLeft(questionsOrdered.length);
    }
  }, [questionsOrdered]);

  // speech recognition and speech synthesis
  const {
    SpeechRecognition,
    isMicrophoneAvailable,
    transcript,
    modalData,
    setModalError,
    clearModalData,
    resetTranscript,
  } = useInitializeSpeechToText();

  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);

  const handleSetMicrophoneOn = (value: boolean) => {
    clearModalData();
    setIsMicrophoneOn(value);
  };

  const resetAndTurnOffMicrophone = () => {
    resetTranscript();
    handleSetMicrophoneOn(false);
  };

  const { handleVoicePlay, handleVoiceStop, voiceOptions } = useSpeechSynthesis(
    undefined,
    session?.settings.voice
  );

  useEffect(() => {
    if (isMicrophoneOn) {
      setCurrentQuizAnswer(transcript);
    }
  }, [isMicrophoneOn, transcript]);

  useEffect(() => {
    // stop voice when user goes back to last page
    window.onpopstate = () => handleVoiceStop();
  }, []);

  const currentTime = useMemo(
    () =>
      session?.settings.isTimed
        ? getTimeData(currentQuestion?.time || session?.settings.time)
        : null,
    [currentQuestion?.time, currentQuestion?.id]
  );

  const [timeLeft, setTimeLeft] = useState(currentTime?.timeUI);

  // quiz
  const handleAddQuizAnswer = (event?: SyntheticEvent<Element>) => {
    if (!currentQuestion || !questionsOrdered) return;

    if (event) event.preventDefault();

    if (session?.settings.shouldReadOutLoud) handleVoiceStop();

    const questionsLeftCount = questionsLeft - 1;

    setQuestionsLeft(questionsLeftCount);
    setQuestionsWithAnswers([
      ...(questionsWithAnswers || []),
      { ...currentQuestion, quizAnswer: currentQuizAnswer },
    ]);
    setCurrentQuizAnswer('');
    resetAndTurnOffMicrophone();

    const current = questionsOrdered[questionsOrdered.length - questionsLeftCount];
    setCurrentQuestion({ ...current });
  };

  useEffect(() => {
    if (!session?.settings.isTimed || !questionsLeft) return undefined;

    let timer: ReturnType<typeof setInterval>;

    if (previousQuestion?.id !== currentQuestion?.id) {
      setTimeLeft(currentTime?.timeUI);
    } else if (!timeLeft) {
      handleAddQuizAnswer();
    }

    if (timeLeft) {
      // a few milliseconds in case user is using speech to text
      // since there is a slight delay for the text to print
      timer = setInterval(() => setTimeLeft(timeLeft - 1), 1200);
    }

    return () => clearInterval(timer);
  }, [
    session?.settings.isTimed,
    previousQuestion?.id,
    currentQuestion?.id,
    timeLeft,
    questionsLeft,
  ]);

  useEffect(() => {
    const shouldHaveVoiceReadQuestions = session?.settings.shouldReadOutLoud;
    const voiceOptionsHaveLoaded = voiceOptions.length;

    if (
      currentQuestion &&
      shouldHaveVoiceReadQuestions &&
      voiceOptionsHaveLoaded &&
      questionsLeft !== 0
    ) {
      handleVoicePlay(currentQuestion.question);
    }
  }, [
    currentQuestion?.id,
    session?.settings.shouldReadOutLoud,
    voiceOptions.length,
    questionsLeft,
  ]);

  if (!questionsOrdered) {
    return (
      <div className="flex justify-center items-center xl:h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white sm:bg-inherit">
      <button
        type="button"
        onClick={() => {
          handleVoiceStop();
          navigate(`/sessions/${id}`);
        }}
        className="flex items-start h-20 group hover:cursor-pointer mx-10 pt-10 2xl:mx-72"
      >
        <ArrowUturnLeftIcon className="h-8 w-8 text-gray-500 group-hover:text-sky-600" />
      </button>
      <div className="justify-center flex flex-col mx-6 md:mx-24 2xl:mx-96 mt-10">
        <div className="flex flex-col w-full pb-20">
          {questionsLeft ? (
            <div
              className={`flex flex-row ${
                session?.settings.isTimed ? 'justify-between' : 'justify-end'
              } items-center w-full py-3 text-sm font-light text-gray-600`}
            >
              {session?.settings.isTimed && <div>Time: {timeLeft}</div>}
              <div>
                {questionsLeft}/{questionsOrdered.length} question
                {questionsOrdered.length > 1 ? 's' : ''}
              </div>
            </div>
          ) : null}
          <div className="flex flex-col w-full justify-center items-center mb-20 pb-20 pt-16 px-3 sm:px-10 space-y-10 sm:border sm:border-sky-100 sm:rounded-2xl sm:shadow-xl bg-white">
            {questionsLeft ? (
              <>
                <div className="font-semibold text-center w-full text-2xl text-gray-900">
                  {currentQuestion?.question}
                </div>
                <form
                  onSubmit={handleAddQuizAnswer}
                  className="px-3 2xl:px-24 w-full flex flex-col space-y-10 justify-center items-center"
                >
                  <div className="relative overflow-hidden flex w-full rounded-lg shadow-sm ring-1 p-1 pt-2 py-10 ring-inset bg-white ring-sky-600 focus-within:ring-2 focus-within:ring-sky-700">
                    <label htmlFor="quizAnswer" className="sr-only">
                      Share the answer to the question here
                    </label>
                    <textarea
                      rows={6}
                      name="quizAnswer"
                      id="quizAnswer"
                      aria-label="quizAnswer"
                      className="block whitespace-pre-wrap w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-md sm:leading-6"
                      value={currentQuizAnswer}
                      placeholder={isMicrophoneOn ? 'Please wait a moment...' : ''}
                      onChange={(event) => setCurrentQuizAnswer(event.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-end pr-3 pb-3 group">
                      <Dictaphone
                        SpeechRecognition={SpeechRecognition}
                        isOn={isMicrophoneOn}
                        isMicrophoneAvailable={isMicrophoneAvailable}
                        setIsOn={(value) => handleSetMicrophoneOn(value)}
                        setModalError={setModalError}
                        setModalOpen={modalRef.current?.setModalOpen}
                        microphoneSize="md"
                        time={
                          session?.settings.isTimed && currentQuestion?.time?.name
                            ? currentQuestion?.time?.name
                            : undefined
                        }
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn group flex items-center bg-sky-600 rounded-md px-12 p-2 text-lg font-md"
                  >
                    <span className="relative pr-4 pb-1 text-white">Next Question</span>
                    <svg
                      viewBox="0 0 46 16"
                      height="10"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                      id="arrow-horizontal"
                      className="-translate-x-2 fill-white transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:scale-x-105 group-hover:fill-white"
                    >
                      <path
                        transform="translate(30)"
                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                        data-name="Path 10"
                        id="Path_10"
                      />
                    </svg>
                  </button>
                </form>
                <Modal ref={modalRef} {...modalData} />
              </>
            ) : (
              <SessionQuizResults questionsWithAnswers={questionsWithAnswers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionQuiz;
