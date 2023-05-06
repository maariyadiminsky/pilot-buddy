import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { FC } from 'react';

export const Homepage: FC = () => (
  <div className="relative isolate overflow-hidden bg-white h-screen">
    <svg
      className="absolute inset-0 -z-10 h-full w-full stroke-gray-300 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
          width={200}
          height={200}
          x="50%"
          y={-1}
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
      />
    </svg>
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
        <h1 className="mt-24 sm:mt-32 lg:mt-16 text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl">
          Ace Pilot Exams with Confidence
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          PilotBuddy is your all-in-one study companion, designed to help you master essential
          aviation concepts and prepare for private, commercial, and instrument pilot exams with
          ease.
        </p>
        <div className="mt-10 flex justify-start">
          <Link to="/auth">
            <button
              type="button"
              className="flex justify-center items-center group space-x-3 bg-sky-600 hover:bg-sky-500 px-6 py-3 rounded-md"
            >
              <span className="text-white">Get Started</span>
              <ArrowRightIcon
                className="h-5 w-5 opacity-90 flex-shrink-0 text-white"
                aria-hidden="true"
              />
              <span className="sr-only">Login</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <img
              src="https://i.ibb.co/4RpKDJh/Screen-Shot-2023-04-27-at-11-04-21-AM.png"
              alt="App screenshot"
              width={2432}
              height={1442}
              className="w-[60rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
