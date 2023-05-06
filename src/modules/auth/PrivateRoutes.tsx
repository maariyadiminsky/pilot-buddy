import { ROUTES } from '@modules/app';
import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface PrivateRoutesProps {
  isLoggedIn: boolean;
}

export const PrivateRoutes: FC<PrivateRoutesProps> = ({ isLoggedIn }) =>
  isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN_ROUTE} />;
