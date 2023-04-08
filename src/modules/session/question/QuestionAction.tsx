import BrandButton from '@common/components/button/BrandButton';
import { MicrophoneIcon, PencilSquareIcon } from '@heroicons/react/20/solid';

interface QuestionActionProps {
  // id: string;
  // question: string;
  // answer?: string;
  setShouldShowQuestionAction: (value: boolean) => void;
}

const QuestionAction = ({ setShouldShowQuestionAction }: QuestionActionProps) => (
  <div className="pb-10 px-6">
    <h2 className="flex flex-row items-center py-4 text-gray-900 font-medium">
      <PencilSquareIcon
        className="h-6 w-6 xl:h-5 xl:h5 flex-shrink-0 text-gray-700 hover:text-sky-700"
        aria-hidden="true"
      />
      Add Question
    </h2>
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
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 group">
          <MicrophoneIcon
            className="h-5 w-5 text-gray-400 group-hover:text-sky-700 group-hover:cursor-pointer"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
    <div className="flex flex-col mt-2">
      <div className="flex justify-between">
        <label htmlFor="answer" className="block text-sm font-semibold leading-6 text-sky-700">
          Answer (Optional)
        </label>
      </div>
      <div className="relative flex w-full rounded-md shadow-sm">
        <input
          type="text"
          name="answer"
          id="answer"
          className="flex w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-700 sm:text-sm sm:leading-6"
          placeholder="Write your answer or use Voice Recognition --->"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 group">
          <MicrophoneIcon
            className="h-5 w-5 text-gray-400 group-hover:text-sky-700 group-hover:cursor-pointer"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="flex justify-end items-end pt-4">
        <BrandButton
          handleOnClick={() => setShouldShowQuestionAction(false)}
          buttonType="submit"
          text="Submit"
          srText="add question"
          buttonClassType="solid"
        />
      </div>
    </div>
  </div>
);

export default QuestionAction;
