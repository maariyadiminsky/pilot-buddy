const baseUrl = 'http://exampleurl';

export const getData = (userId: number): string => `${baseUrl}/data/${userId}`;

export const ROUTES = {
  HOMEPAGE_ROUTE: '/',
  NOT_FOUND_ROUTE: '/404',
  PROFILE_ROUTE: '/profile',
  LOGIN_ROUTE: '/auth',
  STUDY_ROOM_ROUTE: '/study-room',
  SESSION_ROUTE: '/sessions/:id',
  SESSION_START_ROUTE: '/sessions/:id/start',
};

export const ROUTE_PATHS = Object.values(ROUTES);
