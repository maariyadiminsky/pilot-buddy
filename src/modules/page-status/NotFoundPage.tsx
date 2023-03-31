import { ROUTES } from '@common/api/constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Call this function to redirect the user to the homepage.
   */
  const redirectToHomePage = () => {
    navigate(ROUTES.HOMEPAGE_ROUTE);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ fontSize: '4em' }}>Oops 404!</h1>
      <button
        type="button"
        style={{ cursor: 'pointer' }}
        onClick={() => redirectToHomePage()}
        onKeyDown={() => redirectToHomePage()}
      >
        Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;
