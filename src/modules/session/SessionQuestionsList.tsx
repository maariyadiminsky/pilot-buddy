import DropdownMenu from '@modules/common/components/dropdown/DropdownMenu';
import SessionQuestion from '@modules/session/question/SessionQuestion';
import QuestionAction from '@modules/session/question/QuestionAction';
import { getUniqId } from '@common/utils';

const questionData = [
  {
    id: '0',
    question: 'dsfdsfdsf df sdfsdsd sdfsdfsdfssd  fdsfsd ',
    answer: 'dsfdsfsd',
  },
  {
    id: '1',
    question: '342342jkh4h54k5khjdsjklclksdf',
    answer:
      'gfdhgdhgfhfghfgfgfghfghfg fghfgh fghfgklhfglhjgf lgfhj fglkjh lgkfj hlkjgf jfg hjgdlfk hjdglfh jdfj kd jsf klgslkj sjk djklsjkl fsdljk sjkd klsd sljkd  jkds fjklgsd',
  },
  {
    id: '2',
    question: 'sfddsfdsfsdfsdfds sdfsdfsdfsdfds sd fsdfsdfs',
    answer: '4534tfdggdf ',
  },
  {
    id: '3',
    question: 'eeeeesfdsf 765bgfdfdgfd',
    answer: 'sdfdsffdssd',
  },
  {
    id: '4',
    question: 'eeeeesfdsf 765bgfdfdgfd',
    answer: null,
  },
];

const getDropdownActions = () => [
  {
    text: 'Create',
    srText: 'Create new session',
    handleOnClick: () => console.log('derp'),
  },
  {
    text: 'Delete all',
    srText: 'Remove all sessions',
    handleOnClick: () => console.log('derp'),
  },
];

interface SessionQuestionsListProps {
  shouldShowQuestionAction: boolean;
  setShouldShowQuestionAction: (value: boolean) => void;
}

const SessionQuestionsList = ({
  shouldShowQuestionAction,
  setShouldShowQuestionAction,
}: SessionQuestionsListProps) => (
  <div className="bg-white lg:min-w-0 lg:flex-1 flex flex-col">
    <div className="border-b border-t border-gray-200 xl:border-t-0">
      <div className="flex flex-col justify-end py-4">
        {shouldShowQuestionAction ? (
          <QuestionAction setShouldShowQuestionAction={setShouldShowQuestionAction} />
        ) : (
          <div className="flex justify-end items-center pr-4">
            <DropdownMenu name="pinned-items" actions={getDropdownActions()} type="sort" />
          </div>
        )}
      </div>
    </div>
    <ul className="divide-y divide-gray-200 border-b border-gray-200">
      {questionData.map((question) => (
        <SessionQuestion key={getUniqId()} {...question} />
      ))}
    </ul>
  </div>
);

export default SessionQuestionsList;
