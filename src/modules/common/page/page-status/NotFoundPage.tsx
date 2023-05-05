import { ROUTES } from '@modules/app/constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LostImage from '@common/page/image/Lost.png';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const redirectToHomePage = () => {
    navigate(ROUTES.HOMEPAGE_ROUTE);
  };

  return (
    <>
      <div className="grid h-screen grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white lg:grid-cols-[max(50%,36rem),1fr]">
        <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
          <div className="max-w-lg">
            <p className="text-base font-semibold leading-8 text-sky-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10">
              <button
                type="button"
                className="text-sm font-semibold leading-7 text-sky-600"
                onClick={() => redirectToHomePage()}
                onKeyDown={() => redirectToHomePage()}
              >
                <span aria-hidden="true">&larr;</span> Let&apos;s head back, my friend.
              </button>
            </div>
          </div>
        </main>
        <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
          <img
            src={LostImage}
            alt="man holding a compass looking at a view of the sea by the rocks"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;