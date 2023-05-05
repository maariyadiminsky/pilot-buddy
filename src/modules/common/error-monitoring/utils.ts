import LogRocket from 'logrocket';

const shouldUseLogRocket =
  process.env.NODE_ENV === 'production' && process.env.REACT_APP_LOG_ROCKET_APP_ID;

// initialize LogRocket
if (shouldUseLogRocket) {
  LogRocket.init(process.env.REACT_APP_LOG_ROCKET_APP_ID || '');
}

// Identify the user in LogRocket
export const logRocketIdentifyUser = (userId: string, userData: { [key: string]: any }) => {
  if (shouldUseLogRocket) {
    LogRocket.identify(userId, userData);
  } else {
    console.log('LogRocket User Identified as(WHEN_IN_PROD):', userId, userData);
  }
};

// Log a specific error message
export const logError = (message: string, extraData?: any) => {
  if (shouldUseLogRocket) {
    LogRocket.log(message, extraData);
  } else {
    console.error('ERROR_LOG:', message, extraData);
  }
};

// Capture a caught exception
export const captureException = (error: Error, extraData?: any) => {
  if (shouldUseLogRocket) {
    LogRocket.captureException(error, { extra: extraData });
  } else {
    console.error('ERROR_EXCEPTION_MESSAGE:', error.message, 'FULL_ERROR:', error, extraData);
  }
};

// Log a custom event
export const logEvent = (eventName: string, extraData?: any) => {
  if (shouldUseLogRocket) {
    LogRocket.track(eventName, extraData);
  } else {
    console.log(`LOGGED_EVENT(WHEN_IN_PROD): ${eventName}`, extraData);
  }
};
