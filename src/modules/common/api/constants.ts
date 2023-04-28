const baseUrl = 'http://exampleurl';

export const getData = (userId: number): string => `${baseUrl}/data/${userId}`;

export const ROUTES = {
  HOMEPAGE_ROUTE: '/',
  LOGIN_ROUTE: '/auth',
  STUDY_ROOM_ROUTE: '/study-room',
  SESSION_ROUTE: '/sessions/:id',
  SESSION_START_ROUTE: '/sessions/:id/start',
};
