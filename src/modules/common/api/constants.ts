const baseUrl = 'http://exampleurl';

export const getData = (userId: number): string => `${baseUrl}/data/${userId}`;

export const ROUTES = {
  HOMEPAGE_ROUTE: '/'
};
