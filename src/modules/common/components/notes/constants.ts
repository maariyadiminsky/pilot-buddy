import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  LinkIcon,
  LightBulbIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';

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
    iconColor: 'text-sky-700',
    bgColor: 'bg-white',
  },
];
