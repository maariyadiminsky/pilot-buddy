// import PageWrapper from '@modules/common/components/page/PageWrapper';
// import { truthyString } from '@common/utils';
// import { CheckIcon } from '@heroicons/react/20/solid';
import { questionData } from '@modules/session/SessionQuestions';
import { type SessionQuestionType } from '@modules/session/question/SessionQuestionsList';
import { useInitializeSpeechToText } from '@modules/speech-recognition/hooks/useInitializeSpeechToText';
import Dictaphone from '@modules/speech-recognition/Dictaphone';
import { SyntheticEvent, useState, useEffect, useRef, useMemo } from 'react';
import Modal, { type ModalRef } from '@common/components/modal/Modal';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import { usePrevious } from '@common/hooks';

interface SessionQuestionWithAnswerProps extends SessionQuestionType {
  quizAnswer: string;
}

type SessionQuestionWithAnswerType = SessionQuestionWithAnswerProps;

// todo: get this from storage
const isTimed = false;

const getTimeData = (time?: SelectMenuItemType) => {
  const timeNumber = time ? Number(time.name.split(' ')[0]) : 0;

  return {
    id: time?.id,
    timeUI: timeNumber,
    timeActual: timeNumber ? timeNumber * 1000 : 0,
  };
};

// todo: questions will come from an api endpoint within storage
// temporarily using same data as in SessionQuestions
const SessionQuiz = () => {
  const modalRef = useRef<ModalRef>(null);

  const [currentQuestion, setCurrentQuestion] = useState<SessionQuestionType>(questionData?.[0]);
  const [questionsLeft, setQuestionsLeft] = useState(questionData.length);
  const [currentQuizAnswer, setCurrentQuizAnswer] = useState('');
  const [questionsWithAnswers, setQuestionsWithAnswers] =
    useState<SessionQuestionWithAnswerType[]>();
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);

  const handleSetQuizAnswer = (event?: SyntheticEvent<Element>) => {
    if (event) event.preventDefault();

    const questionsLeftCount = questionsLeft - 1;

    setQuestionsLeft(questionsLeftCount);
    setQuestionsWithAnswers([
      ...(questionsWithAnswers || []),
      { ...currentQuestion, quizAnswer: currentQuizAnswer },
    ]);
    setCurrentQuizAnswer('');
    setCurrentQuestion({ ...questionData[questionData.length - questionsLeftCount] });
  };

  const previousQuestion = usePrevious(currentQuestion);

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
    <div className="min-h-screen bg-white sm:bg-inherit flex flex-col items-center justify-center 2xl:mx-96">
      <div className="flex flex-col w-full px-20">
        {questionsLeft ? (
          <div
            className={`flex flex-row ${
              isTimed ? 'justify-between' : 'justify-end'
            } items-center w-full py-3 text-sm font-light text-gray-600`}
          >
            {isTimed && <div>Time: {timeLeft}</div>}
            <div>
              {questionsLeft}/{questionData.length} question{questionData.length > 1 ? 's' : ''}
            </div>
          </div>
        ) : null}
        <div className="flex flex-col w-full justify-center items-center mb-20 pb-20 pt-16 px-3 sm:px-10 sm:min-h-min space-y-10 sm:border sm:border-sky-100 sm:rounded-2xl sm:shadow-xl bg-white">
          {questionsLeft ? (
            <>
              <div className="font-semibold text-center w-full text-xl sm:text-2xl text-gray-900">
                {currentQuestion.question}
              </div>
              <form
                onSubmit={handleSetQuizAnswer}
                className="px-3 w-full flex flex-col space-y-10 justify-center items-center"
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
            <div className="h-52">Done!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionQuiz;
