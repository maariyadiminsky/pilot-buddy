import {
  ChatBubbleLeftEllipsisIcon,
  CheckBadgeIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/20/solid';
import { questionData } from '@modules/session/SessionQuestions';
import { type SessionQuestionType } from '@modules/session/question/SessionQuestionsList';
import { useInitializeSpeechToText } from '@modules/speech-recognition/hooks/useInitializeSpeechToText';
import Dictaphone from '@modules/speech-recognition/Dictaphone';
import { SyntheticEvent, useState, useEffect, useRef, useMemo } from 'react';
import Modal, { type ModalRef } from '@common/components/modal/Modal';
import { usePrevious } from '@common/hooks';
import { getTimeData, getQuestionOrder } from '@modules/session-quiz/utils';
import { useSpeechSynthesis } from '@modules/speech-synthesis/hooks';
import { useParams, useNavigate } from 'react-router-dom';

interface SessionQuestionWithAnswerProps extends SessionQuestionType {
  quizAnswer: string;
}

type SessionQuestionWithAnswerType = SessionQuestionWithAnswerProps;

// todo: get this from storage
const isTimed = false;
const shouldHaveOrder = true;
const settingsOrder = 'Sort'; // sort or random
const shouldReadOutLoud = true;
const speechSynthesisData = {
  voice: { id: 0, name: 'Daniel' },
  pitch: 1,
  rate: 1,
  volume: 1,
};

// todo: questions will come from an api endpoint within storage
// temporarily using same data as in SessionQuestions
const SessionQuiz = () => {
  const { id: sessionId } = useParams();
  const navigate = useNavigate();

  const modalRef = useRef<ModalRef>(null);

  const questionsOrdered = useMemo(
    () => (shouldHaveOrder ? getQuestionOrder(settingsOrder, questionData) : questionData),
    []
  );

  const [currentQuestion, setCurrentQuestion] = useState<SessionQuestionType>(questionsOrdered[0]);
  const [questionsLeft, setQuestionsLeft] = useState(questionsOrdered.length);
  const [currentQuizAnswer, setCurrentQuizAnswer] = useState('');
  const [questionsWithAnswers, setQuestionsWithAnswers] =
    useState<SessionQuestionWithAnswerType[]>();
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);

  const previousQuestion = usePrevious(currentQuestion);

  const { handleVoicePlay, handleVoiceStop } = useSpeechSynthesis(
    undefined,
    speechSynthesisData.voice,
    speechSynthesisData.rate,
    speechSynthesisData.pitch,
    speechSynthesisData.volume
  );

  useEffect(() => {
    window.onpopstate = () => handleVoiceStop();
  });

  useEffect(() => {
    // voice setting is on and page loaded and
    // not last question item(edge case where page re-renders when they are in results page.)
    if (
      shouldReadOutLoud &&
      previousQuestion?.id === currentQuestion?.id &&
      currentQuestion.id !== questionsOrdered[questionsOrdered.length - 1].id
    ) {
      // todo - bug - plays default voice first
      // I suspect because window.speechSynthesis.getVoices() hasn't completed loading.
      handleVoicePlay(currentQuestion?.question);
    }
  }, [previousQuestion?.id, currentQuestion?.id]);

  const handleSetQuizAnswer = (event?: SyntheticEvent<Element>) => {
    if (event) event.preventDefault();

    if (shouldReadOutLoud) handleVoiceStop();

    const questionsLeftCount = questionsLeft - 1;

    setQuestionsLeft(questionsLeftCount);
    setQuestionsWithAnswers([
      ...(questionsWithAnswers || []),
      { ...currentQuestion, quizAnswer: currentQuizAnswer },
    ]);
    setCurrentQuizAnswer('');

    const current = questionsOrdered[questionsOrdered.length - questionsLeftCount];
    setCurrentQuestion({ ...current });

    if (shouldReadOutLoud && current) {
      handleVoicePlay(current?.question);
    }
  };

  const currentTime = useMemo(
    () => (isTimed ? getTimeData(currentQuestion?.time) : null),
    [currentQuestion?.time, currentQuestion?.id]
  );

  const [timeLeft, setTimeLeft] = useState(currentTime?.timeUI);

  // add time if user enabled Timed option
  useEffect(() => {
    if (!isTimed || !questionsLeft) return undefined;

    let timer: ReturnType<typeof setInterval>;

    if (previousQuestion?.id !== currentQuestion?.id) {
      setTimeLeft(currentTime?.timeUI);
    } else if (!timeLeft) {
      handleSetQuizAnswer();
    }

    if (timeLeft) {
      // a few milliseconds in case user is using speech to text
      // since there is a slight delay for the text to print
      timer = setInterval(() => setTimeLeft(timeLeft - 1), 1200);
    }

    return () => clearInterval(timer);
  }, [isTimed, currentQuestion?.id, timeLeft, questionsLeft]);

  const {
    SpeechRecognition,
    isMicrophoneAvailable,
    transcript,
    modalData,
    setModalError,
    clearModalData,
  } = useInitializeSpeechToText();

  useEffect(() => {
    if (isMicrophoneOn) {
      setCurrentQuizAnswer(transcript);
    }
  }, [isMicrophoneOn, transcript]);

  const handleSetMicrophoneOn = (value: boolean) => {
    clearModalData();
    setIsMicrophoneOn(value);
  };

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
                  onSubmit={handleSetQuizAnswer}
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
              <div className="flex flex-col justify-center space-y-6 h-[calc(100vh-250px)] w-full px-12">
                <div className="flex text-xl font-bold text-gray-900 justify-center ">Results</div>
                <div className="overflow-y-auto smooth-scroll space-y-4">
                  {questionsWithAnswers?.map(({ id, question, answer, quizAnswer }, index) => (
                    <div key={id} className="flex flex-col space-y-4">
                      <div className="flex justify-start items-start bg-gray-100 text-gray-500 font-semibold text-md p-4 rounded-sm">
                        {index + 1}. {question}
                      </div>
                      <div className="flex flex-col justify-start items-start space-y-3 ring-1 ring-inset ring-sky-200 bg-sky-50 text-gray-500 p-4 rounded-md">
                        <div className="flex flex-row space-x-3 text-sm">
                          <ChatBubbleLeftEllipsisIcon
                            className="-mr-1 h-4 w-4 text-green-400 -scale-x-100"
                            aria-hidden="true"
                          />
                          <div className="text-xs font-medium">Your answer</div>
                        </div>
                        <div className="font-light text-md">{quizAnswer}</div>
                      </div>
                      <div className="flex flex-col justify-start items-start space-y-3 ring-1 ring-inset ring-purple-300 bg-purple-200 text-gray-700 p-4 rounded-md">
                        <div className="flex flex-row space-x-3 text-sm">
                          <CheckBadgeIcon
                            className="-mr-1 h-4 w-4 text-rose-400"
                            aria-hidden="true"
                          />
                          <div className="text-xs font-medium">Actual answer</div>
                        </div>
                        <div className="font-light text-md">{answer}</div>
                      </div>
                      <div className="border border-gray-100 w-full flex justify-center" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionQuiz;
