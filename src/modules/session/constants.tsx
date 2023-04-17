import { SessionTimeEnum, SessionOrderEnum } from './types';
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  LinkIcon,
  LightBulbIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';

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
    bgColor: 'bg-purple-700',
  },
  {
    name: 'Link',
    value: 'link',
    icon: LinkIcon,
    iconColor: 'text-sky-600',
    bgColor: 'bg-white',
  },
];
