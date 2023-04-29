import { SyntheticEvent, useState, useEffect, useContext } from 'react';
import bcrypt from 'bcryptjs';
import { openDB, IDBPDatabase, IDBPObjectStore } from 'idb';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import {
  setCookie,
  encryptData,
  decryptData,
  ENCRYPTION_KEY,
  getSessionToken,
} from '@modules/auth/utils';
import { AuthContext } from '@modules/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  password: string;
  key: string;
}
interface DatabaseType extends IDBPDatabase<DatabaseType> {
  users: IDBPObjectStore<User, string>;
}

const limiter = new RateLimiterMemory({
  points: 3, // 3 login attempts per minute
  duration: 60, // Per minute
});

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // in the case the user manually navigates to /auth.
  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn]);

  const setHandler = (handler: (value: any) => void, value: any) => {
    handler(value);
    setError(null);
  };

  const handleSession = async (event: SyntheticEvent<Element>) => {
    event.preventDefault();

    let hasError;

    try {
      // Create the database if it doesn't exist
      await openDB<DatabaseType>('my-db', 1, {
        upgrade(theDb) {
          if (!theDb.objectStoreNames.contains('users')) {
            theDb.createObjectStore('users', { keyPath: 'email' });
          }
        },
      });

      // Open the database
      const db = await openDB<DatabaseType>('my-db', 1);

      // sign in or sign up
      if (isSignIn) {
        try {
          await limiter.consume(email);
        } catch (loginLimitError) {
          hasError = loginLimitError;
          setError('Too many attempts. Please try again in a minute.');
          return;
        }

        // Handle sign-in scenario
        const encryptedEmail = encryptData(email);

        if (!encryptedEmail) {
          // todo: add to error monitoring
          throw new Error('Encrypted Email not encrypting.');
        }

        // find the user
        let user;

        try {
          user = await db.get('users', encryptedEmail);
        } catch (userDBError) {
          if (
            userDBError instanceof Error &&
            userDBError.message.includes('One of the specified object stores was not found')
          ) {
            // Handle the userDBError here
            hasError = userDBError;
            setError('Incorrect email or password.');
            console.log('INCORRECT EMAIL OR PASS');
            return;
          }

          // Handle other errors here
          throw userDBError;
        }

        const decryptedPassword = decryptData(user.password);
        const isPasswordCorrect =
          decryptedPassword && (await bcrypt.compare(password, decryptedPassword));

        if (isPasswordCorrect) {
          setCookie('sessionToken', getSessionToken(), {
            path: '/',
            secure: true,
          });
        } else {
          const incorrectPasswordError = 'Incorrect password';
          hasError = incorrectPasswordError;
          setError(incorrectPasswordError);
          return;
        }
      } else {
        // Handle sign-up scenario
        const hashedPassword = await bcrypt.hash(password, 10);
        const encryptedEmail = encryptData(email);
        const encryptedPassword = encryptData(hashedPassword);

        if (!encryptedEmail || !encryptedPassword) {
          // todo: add to error monitoring
          throw new Error('Could not encrypt email or password');
        }

        await db.put('users', {
          email: encryptedEmail,
          password: encryptedPassword,
          key: ENCRYPTION_KEY,
        });

        setCookie('sessionToken', getSessionToken(), { path: '/', secure: true });
      }
    } catch (catchError) {
      hasError = catchError;

      // todo: add to error monitoring
      console.log(catchError);
    } finally {
      setEmail('');
      setPassword('');
      setIsLoggedIn(Boolean(!hasError));
    }
  };

  return (
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
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-3 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
            {isSignIn ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <div className="h-3 py-3 text-sm text-red-600 flex justify-center -ml-2">{error}</div>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-md sm:rounded-lg sm:px-12 border border-gray-100">
            <form className="space-y-6" onSubmit={handleSession}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={(event) => setHandler(setEmail, event.target.value)}
                    aria-label={email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    value={password}
                    onChange={(event) => setHandler(setPassword, event.target.value)}
                    aria-label={password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                >
                  Sign {isSignIn ? 'In' : 'Up'}
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            {isSignIn ? 'Not a member?' : 'Already a member?'}{' '}
            <button
              type="button"
              onClick={() => setHandler(setIsSignIn, !isSignIn)}
              className="font-semibold leading-6 text-sky-600 hover:text-sky-500"
            >
              Sign {isSignIn ? 'up.' : 'in.'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
