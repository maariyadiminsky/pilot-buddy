import { type PinnedSessionType, type SessionsTableDataType } from '@modules/study-room/types';

interface COLOR_TYPE {
  background: string;
  text: string;
}

interface COLORS_TYPE {
  [key: string]: COLOR_TYPE;
}

const COLORS = {
  sky: {
    background: 'bg-sky-600',
    text: 'text-sky-600',
  },
  pink: {
    background: 'bg-pink-600',
    text: 'text-pink-600',
  },
  red_500: {
    background: 'bg-red-500',
    text: 'text-red-500',
  },
  purple: {
    background: 'bg-purple-600',
    text: 'text-purple-600',
  },
  red_600: {
    background: 'bg-red-600',
    text: 'text-red-600',
  },
} as COLORS_TYPE;

export const getRandomBrandColorData = () => {
  const COLOR_KEYS = Object.keys(COLORS);
  return COLORS[COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)]];
};

export const getInitials = (text: string) =>
  text
    .split(' ')
    .map((textItem) => textItem.charAt(0))
    .join('')
    .replace(/[\W_]+/g, '');

export const getTextBasedOnAmount = (type: string, total: number) =>
  `${total} ${type.charAt(0).toUpperCase()}${type.slice(1)}${total > 1 ? 's' : ''}`;

export const sessionsOrderedByTopic = (sessions: SessionsTableDataType[]) =>
  sessions.sort((s1, s2) => {
    if (s1.topic > s2.topic) {
      return 1;
    }

    if (s1.topic < s2.topic) {
      return -1;
    }

    return 0;
  });

// export const reorderQuestionsBasedOnUserDragChoice = (
//   question: SessionQuestionType,
//   questions: SessionQuestionType[],
//   draggedToIndex: number
// ) => [...questions.slice(0, draggedToIndex), question, ...questions.slice(draggedToIndex)];

export const sessionsWithNewSessionInOrder = (
  newSession: SessionsTableDataType,
  sessionsData: SessionsTableDataType[]
) => {
  const firstSessionWithTopicIndex = sessionsData.findIndex(
    ({ topic }) => topic.trim() === newSession.topic.trim()
  );

  // if not topic exists, it means it's a new topic so place in correct order
  if (firstSessionWithTopicIndex === -1) {
    return sessionsOrderedByTopic([...sessionsData, newSession]);
  }

  return [
    ...sessionsData.slice(0, firstSessionWithTopicIndex),
    newSession,
    ...sessionsData.slice(firstSessionWithTopicIndex),
  ];
};

export const getPinnedSessionsIds = (pinnedSessions: PinnedSessionType[]) =>
  pinnedSessions.map(({ sessionId }) => sessionId);

export const isSessionPinned = (id: string, pinnedSessions: string[]) =>
  pinnedSessions.indexOf(id) >= 0;
