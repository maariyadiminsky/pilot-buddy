import { type SessionType } from '@modules/study-room/session/SessionAction';
import { type PinnedSessionType } from '@modules/study-room/session/PinnedSessions';

enum COLOR_TYPE {
  background = 'background',
  text = 'text',
}

const COLORS = ['sky-600', 'pink-600', 'red-500', 'purple-600', 'red-600'];
export const getRandomBrandColor = (colorType: keyof typeof COLOR_TYPE) => {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  switch (colorType) {
    case COLOR_TYPE.text:
      return `text-${color}`;
    case COLOR_TYPE.background:
    default:
      return `bg-${color}`;
  }
};

export const getInitials = (text: string) =>
  text
    .split(' ')
    .map((textItem) => textItem.charAt(0))
    .join('')
    .replace(/[\W_]+/g, '');

export const getTextBasedOnAmount = (type: string, total: number) =>
  `${total} ${type.charAt(0).toUpperCase()}${type.slice(1)}${total > 1 ? 's' : ''}`;

export const sessionsOrderedByTopic = (sessions: SessionType[]) =>
  sessions.sort((s1, s2) => {
    if (s1.topic > s2.topic) {
      return 1;
    }

    if (s1.topic < s2.topic) {
      return -1;
    }

    return 0;
  });

export const sessionsWithNewSessionInOrder = (
  newSession: SessionType,
  sessionsData: SessionType[]
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
