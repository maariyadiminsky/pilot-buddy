import BrandButton from '@common/components/button/BrandButton';
import { getUniqId } from '@common/utils';
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { type SessionQuestionType } from '@modules/session/question/SessionQuestion';
import Dictaphone from '@modules/speech-recognition/Dictaphone';
import { SyntheticEvent, useState, useRef, useEffect } from 'react';
import Modal, { type ModalRef } from '@common/components/modal/Modal';
import { useInitializeSpeechToText } from '@modules/speech-recognition/hooks/useInitializeSpeechToText';
import { type SelectMenuItemType } from '@common/components/dropdown/SelectMenu';
import TimeSelectMenu from '../settings/TimeSelectMenu';
import { TIME_OPTIONS } from '../constants';

interface SessionQuestionActionProps {
  isTimed: boolean;
  settingsTime: SelectMenuItemType;
  currentQuestion?: SessionQuestionType;
  handleSubmit: (value: SessionQuestionType) => void;
  handleCancelAction: () => void;
}

const SessionQuestionAction = ({
  isTimed,
  settingsTime,
  handleSubmit,
  handleCancelAction,
  currentQuestion,
}: SessionQuestionActionProps) => {
  const modalRef = useRef<ModalRef>(null);

  const [question, setQuestion] = useState(currentQuestion?.question || '');
  const [answer, setAnswer] = useState<string | null | undefined>(currentQuestion?.answer || '');
  const [shouldShowEmptyQuestionWarning, setShouldShowEmptyQuestionWarning] = useState(false);

  const [isQuestionMicrophoneOn, setIsQuestionMicrophoneOn] = useState(false);
  const [isAnswerMicrophoneOn, setIsAnswerMicrophoneOn] = useState(false);

  // time selected in edit panel
  // only visible if Timed toggle is selecte in Settings
  // Override initial settings
  const [time, setTime] = useState<SelectMenuItemType>(settingsTime || TIME_OPTIONS[0]);

  const {
    SpeechRecognition,
    isMicrophoneAvailable,
    transcript,
    modalData,
    setModalError,
    clearModalData,
  } = useInitializeSpeechToText();

  // when user edits a question
  useEffect(() => {
    if (currentQuestion) {
      setQuestion(currentQuestion.question);
      setAnswer(currentQuestion?.answer);
    }
  }, [currentQuestion]);

  // when user uses microphone update correct one
  useEffect(() => {
    if (isQuestionMicrophoneOn || isAnswerMicrophoneOn) {
      const method = isQuestionMicrophoneOn ? setQuestion : setAnswer;
      method(transcript);
    }
  }, [isQuestionMicrophoneOn, isAnswerMicrophoneOn, transcript]);

  const handleSetIsOn = (handleMicrophoneOn: (value: boolean) => void, value: boolean) => {
    clearModalData();
    handleMicrophoneOn(value);
  };

  const handleSetQuestion = (newText: string) => {
    setShouldShowEmptyQuestionWarning(false);
    setQuestion(newText);
  };

  const handleFormSubmit = (event: SyntheticEvent<Element>) => {
    event.preventDefault();

    if (!question) {
      setShouldShowEmptyQuestionWarning(true);
      return;
    }

    handleSubmit({
      ...(currentQuestion || {}),
      id: currentQuestion?.id || getUniqId(),
      question,
      answer,
      time: isTimed ? time || settingsTime : undefined,
    });

    setQuestion('');
    setAnswer('');
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="pb-10 px-8 lg:px-28 xl:px-52">
        <div className="flex flex-row justify-between items-center">
          <h2 className="flex flex-row items-center py-4 text-gray-900 font-medium">
            <PencilSquareIcon
              className="h-6 w-6 xl:h-5 xl:h5 flex-shrink-0 text-gray-700 hover:text-sky-700"
              aria-hidden="true"
            />
            {currentQuestion ? 'Edit' : 'Add a'} Question
          </h2>
          <div className="flex flex-row justify-end items-center space-x-3">
            <TimeSelectMenu time={time} setTime={setTime} />
            <button type="button" onClick={() => handleCancelAction()}>
              <XMarkIcon
                className="h-6 w-6 -mt-1 flex-shrink-0 text-gray-700 hover:text-sky-700 hover:cursor-pointer"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col mb-6">
          <label
            htmlFor="question"
            className="justify-start items-start block text-sm font-semibold leading-6 text-pink-600"
          >
            Question
          </label>
          <div className="relative flex w-full rounded-md shadow-sm">
            <input
              type="text"
              name="question"
              id="question"
              className="flex w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-700 sm:text-sm sm:leading-6"
              placeholder="Write your question or use Voice Recognition --->"
              value={question}
              onChange={(event) => handleSetQuestion(event.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 group">
              <Dictaphone
                SpeechRecognition={SpeechRecognition}
                isOn={isQuestionMicrophoneOn}
                isDisabled={Boolean(isAnswerMicrophoneOn)}
                isMicrophoneAvailable={isMicrophoneAvailable}
                setIsOn={(value) => handleSetIsOn(setIsQuestionMicrophoneOn, value)}
                setModalError={setModalError}
                setModalOpen={modalRef.current?.setModalOpen}
              />
            </div>
          </div>
          {shouldShowEmptyQuestionWarning && (
            <div className="flex items-center justify-start text-sm text-rose-500 pt-2 pb-0 mb-0">
              Question cannot be empty.
            </div>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <div className="flex justify-between">
            <label htmlFor="answer" className="block text-sm font-semibold leading-6 text-sky-700">
              Answer <span className="font-normal">(Optional)</span>
            </label>
          </div>
          <div className="relative flex w-full rounded-md shadow-sm">
            <input
              type="text"
              name="answer"
              id="answer"
              className="flex w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-700 sm:text-sm sm:leading-6"
              placeholder="Write your answer or use Voice Recognition --->"
              value={answer || ''}
              onChange={(event) => setAnswer(event.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 group">
              <Dictaphone
                SpeechRecognition={SpeechRecognition}
                isOn={isAnswerMicrophoneOn}
                isDisabled={Boolean(isQuestionMicrophoneOn)}
                isMicrophoneAvailable={isMicrophoneAvailable}
                setIsOn={(value) => handleSetIsOn(setIsAnswerMicrophoneOn, value)}
                setModalError={setModalError}
                setModalOpen={modalRef.current?.setModalOpen}
              />
            </div>
          </div>
          <div className="flex justify-end items-end pt-4">
            <BrandButton
              buttonType="submit"
              text="Submit"
              srText="add question"
              buttonClassType="solid"
            />
          </div>
        </div>
      </form>
      <Modal ref={modalRef} {...modalData} />
    </>
  );
};

export default SessionQuestionAction;
