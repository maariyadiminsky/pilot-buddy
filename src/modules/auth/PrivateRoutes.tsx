import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { ROUTES } from '@modules/common/api/constants';

interface PrivateRoutesProps {
  isLoggedIn: boolean;
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ isLoggedIn }) =>
  isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN_ROUTE} />;

export default PrivateRoutes;
