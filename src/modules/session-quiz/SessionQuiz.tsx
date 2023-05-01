import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { useInitializeSpeechToText } from '@modules/speech-recognition/hooks';
import Dictaphone from '@modules/speech-recognition/Dictaphone';
import { useState, useEffect, useRef } from 'react';
import Modal, { type ModalRef } from '@common/components/modal/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import { SessionDataType } from '@modules/session/types';
import {
  useSessionQuiz,
  useSessionQuizTime,
  useSessionQuizDictaphone,
} from '@modules/session-quiz/hooks';
import SessionQuizResults from '@modules/session-quiz/SessionQuizResults';

import { questions as questionsData } from '@modules/session/Session'; // todo: remove after get this from storage

const SESSION_DATA_INITIAL_STATE = {
  questions: questionsData,
  notes: [],
  settings: {
    isTimed: false,
    shouldHaveOrder: false,
    shouldReadOutLoud: true,
    time: undefined,
    order: undefined,
    voice: {
      voice: { id: 0, name: 'Daniel' },
      pitch: 1,
      rate: 1,
      volume: 1,
    },
  },
} as SessionDataType;

// todo: questions will come from an api endpoint within storage
// temporarily using same data as in SessionQuestions
const SessionQuiz = () => {
  const modalRef = useRef<ModalRef>(null);
  const { id: sessionId } = useParams();
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState<SessionDataType>(SESSION_DATA_INITIAL_STATE);
  const { questions, settings } = sessionData;

  // session data and voice if enabled
  const {
    currentQuizAnswer,
    setCurrentQuizAnswer,
    questionsWithAnswers,
    questionsOrdered,
    questionsLeft,
    currentQuestion,
    previousQuestion,
    handleAddQuizAnswer,
    handleVoiceStop,
  } = useSessionQuiz(questions, settings);

  useEffect(() => {
    // todo replace SESSION_DATA_INITIAL_STATE here with sessionData from storage.
    setSessionData(SESSION_DATA_INITIAL_STATE);
  }, []);

  // dictaphone
  const {
    SpeechRecognition,
    isMicrophoneAvailable,
    transcript,
    modalData,
    setModalError,
    clearModalData,
  } = useInitializeSpeechToText();

  const { isMicrophoneOn, handleSetMicrophoneOn } = useSessionQuizDictaphone(
    transcript,
    setCurrentQuizAnswer,
    clearModalData
  );

  // time if enabled
  const { timeLeft } = useSessionQuizTime(
    settings.isTimed,
    questionsLeft,
    handleAddQuizAnswer,
    currentQuestion?.time,
    currentQuestion?.id,
    previousQuestion?.id
  );

  const { isTimed } = settings;

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
                isTimed ? 'justify-between' : 'justify-end'
              } items-center w-full py-3 text-sm font-light text-gray-600`}
            >
              {isTimed && <div>Time: {timeLeft}</div>}
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
                        time={isTimed ? currentQuestion.time?.name : undefined}
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
