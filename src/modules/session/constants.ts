import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  LinkIcon,
  LightBulbIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import {
  SessionTimeEnum,
  SessionOrderEnum,
  NoteEnum,
  type SessionDataType,
} from '@modules/session/types';

export const TIME_OPTIONS = [
  { id: 0, name: SessionTimeEnum['5 Seconds'] },
  { id: 1, name: SessionTimeEnum['10 Seconds'] },
  { id: 2, name: SessionTimeEnum['15 Seconds'] },
  { id: 3, name: SessionTimeEnum['20 Seconds'] },
];

export const ORDER_OPTIONS = [
  {
    id: 0,
    name: SessionOrderEnum.Sort,
    description: 'Questions will appear just as they are currently sorted now.',
  },
  {
    id: 1,
    name: SessionOrderEnum.Random,
    description: 'Questions will appear in random order.',
  },
];

export const SESSION_DATA_INITIAL_STATE = {
  questions: [],
  notes: [],
  settings: {
    isTimed: false,
    shouldHaveOrder: false,
    shouldReadOutLoud: false,
    time: TIME_OPTIONS[0],
    order: ORDER_OPTIONS[0],
    voice: {
      voice: { id: 0, name: 'Daniel' },
      pitch: 1,
      rate: 1,
      volume: 1,
    },
  },
};

export const getInitialSessionData = (sessionId: string, userId: string) =>
  ({ id: sessionId, userId, ...SESSION_DATA_INITIAL_STATE } as SessionDataType);

export const getNoteIconFromName = (name: string) => {
  switch (name) {
    case NoteEnum.Important:
      return ExclamationTriangleIcon;
    case NoteEnum.Question:
      return QuestionMarkCircleIcon;
    case NoteEnum.Info:
      return InformationCircleIcon;
    case NoteEnum.Location:
      return MapPinIcon;
    case NoteEnum.Link:
      return LinkIcon;
    case NoteEnum.Idea:
    default:
      return LightBulbIcon;
  }
};

export const NOTE_TYPES = [
  {
    name: 'Important',
    value: 'important',
    icon: ExclamationTriangleIcon,
    iconColor: 'text-white',
    bgColor: 'bg-rose-500',
  },
  {
    name: 'Question',
    value: 'question',
    icon: QuestionMarkCircleIcon,
    iconColor: 'text-white',
    bgColor: 'bg-yellow-500',
  },
  {
    name: 'Idea',
    value: 'idea',
    icon: LightBulbIcon,
    iconColor: 'text-white',
    bgColor: 'bg-green-500',
  },
  {
    name: 'Info',
    value: 'info',
    icon: InformationCircleIcon,
    iconColor: 'text-white',
    bgColor: 'bg-sky-600',
  },
  {
    name: 'Location',
    value: 'location',
    icon: MapPinIcon,
    iconColor: 'text-white',
    bgColor: 'bg-purple-600',
  },
  {
    name: 'Link',
    value: 'link',
    icon: LinkIcon,
    iconColor: 'text-sky-600',
    bgColor: 'bg-white',
  },
];
