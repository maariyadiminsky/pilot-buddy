import { type SessionType } from './session/SessionAction';

const COLORS = ['bg-sky-600', 'bg-pink-600', 'bg-red-500', 'bg-purple-600', 'bg-red-600'];
export const getRandomBrandColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export const getInitials = (text: string) =>
  text
    .split(' ')
    .map((textItem) => textItem.charAt(0))
    .join('')
    .replace(/[\W_]+/g, '');

export const getTypeAmount = (type: string, total: number) =>
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
