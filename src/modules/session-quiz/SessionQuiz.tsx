import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { useInitializeSpeechToText } from '@modules/speech-recognition/hooks';
import Dictaphone from '@modules/speech-recognition/Dictaphone';
import { SyntheticEvent, useState, useEffect, useMemo, useRef } from 'react';
import Modal, { type ModalRef } from '@common/components/modal/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import { type SessionDataType, type SessionQuestionType } from '@modules/session/types';
import SessionQuizResults from '@modules/session-quiz/SessionQuizResults';
import { SESSION_DATA_INITIAL_STATE } from '@modules/session/constants';
import { questionsData } from '@modules/session/hooks'; // todo: remove after get this from storage
import { usePrevious } from '@common/hooks';
import { getQuestionOrder, getTimeData } from '@modules/session-quiz/utils';
import { SessionQuestionWithAnswerType } from '@modules/session-quiz/types';
import { useSpeechSynthesis } from '@modules/speech-synthesis/hooks';

// todo: questions will come from an api endpoint within storage
// temporarily using same data as in SessionQuestions
const SessionQuiz = () => {
  const modalRef = useRef<ModalRef>(null);
  const { id: sessionId } = useParams();
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState<SessionDataType | null>(null);

  useEffect(() => {
    // todo replace SESSION_DATA_INITIAL_STATE here with sessionData from storage.
    setSessionData({ ...SESSION_DATA_INITIAL_STATE, questions: questionsData });
  }, []);
  // session data and voice if enabled
  const questionsOrdered = useMemo(
    () =>
      sessionData?.settings.shouldHaveOrder && sessionData?.settings.order
        ? getQuestionOrder(sessionData?.settings.order.name, questionsData)
        : questionsData,
    [questionsData]
  );

  const [currentQuestion, setCurrentQuestion] = useState<SessionQuestionType>(questionsOrdered[0]);
  const [questionsLeft, setQuestionsLeft] = useState(questionsOrdered.length);
  const [currentQuizAnswer, setCurrentQuizAnswer] = useState('');
  const [questionsWithAnswers, setQuestionsWithAnswers] =
    useState<SessionQuestionWithAnswerType[]>();

  const previousQuestion = usePrevious(currentQuestion);

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
    sessionData?.settings.voice
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

  const lastQuestionId = useMemo(
    () => (questionsOrdered?.length ? questionsOrdered[questionsOrdered.length - 1].id : null),
    [questionsOrdered]
  );

  useEffect(() => {
    // read once on load
    // and not last question item(edge case where page re-renders when they are in results page.)
    if (
      sessionData?.settings.shouldReadOutLoud &&
      previousQuestion?.id === currentQuestion.id &&
      currentQuestion.id !== lastQuestionId &&
      voiceOptions?.length
    ) {
      handleVoicePlay(currentQuestion.question);
    }
  }, [
    previousQuestion?.id,
    currentQuestion.id,
    sessionData?.settings.shouldReadOutLoud,
    voiceOptions?.length,
  ]);

  // quiz
  const handleAddQuizAnswer = (event?: SyntheticEvent<Element>) => {
    if (event) event.preventDefault();

    if (sessionData?.settings.shouldReadOutLoud) handleVoiceStop();

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

    if (sessionData?.settings.shouldReadOutLoud && current) {
      handleVoicePlay(current?.question);
    }
  };

  // time
  const currentTime = useMemo(
    () => (sessionData?.settings.isTimed ? getTimeData(currentQuestion.time) : null),
    [currentQuestion.time, currentQuestion.id]
  );

  const [timeLeft, setTimeLeft] = useState(currentTime?.timeUI);

  useEffect(() => {
    if (!sessionData?.settings.isTimed || !questionsLeft) return undefined;

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
    sessionData?.settings.isTimed,
    previousQuestion?.id,
    currentQuestion?.id,
    timeLeft,
    questionsLeft,
  ]);

  return (
    <div className="min-h-screen bg-white sm:bg-inherit">
      <button
        type="button"
        onClick={() => {
          handleVoiceStop();
          navigate(`/sessions/${sessionId}`);
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
                sessionData?.settings.isTimed ? 'justify-between' : 'justify-end'
              } items-center w-full py-3 text-sm font-light text-gray-600`}
            >
              {sessionData?.settings.isTimed && <div>Time: {timeLeft}</div>}
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
                  {currentQuestion.question}
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
                          sessionData?.settings.isTimed ? currentQuestion.time?.name : undefined
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
