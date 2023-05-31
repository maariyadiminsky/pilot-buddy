# :sparkles: Pilot Buddy

[What You Can Do](#what-you-can-do) | [👩🏻‍💻 DEMO](https://youtu.be/btpWFZC8mWw) | [Setup](#setup) | [Future Improvements](#future-improvements) |

Introducing PilotBuddy, your comprehensive guide to mastering aviation studies. This app, thoughtfully developed with React, TypeScript and React Testing Library, puts user experience at the forefront by ensuring full responsiveness and accessibility. The dedication to user privacy and security is highlighted by the integration of IndexedDB storage along with robust user login authentication and page authorization flows.

PilotBuddy truly stands out with its innovative features such as speech recognition and synthesis, immersing users in an interactive study environment. With the ability to craft personalized quizzes, add your own questions, and compare answers post-quiz, learning has never been more engaging.

Whether you're studying for private, commercial, or instrument pilot exams, PilotBuddy is designed to be your constant companion, striving to make your learning journey seamless and enjoyable. I've put my :heart: into creating an app that supports you in reaching new heights in your aviation career.

[➡️ Check out the Demo!](https://youtu.be/btpWFZC8mWw)

[![See Pilot Buddy DEMO](https://i.ibb.co/JFkYK4f/Screen-Shot-2023-05-31-at-9-48-31-AM.png)](https://youtu.be/btpWFZC8mWw)

[![See Pilot Buddy DEMO](https://i.ibb.co/4RpKDJh/Screen-Shot-2023-04-27-at-11-04-21-AM.png)](https://youtu.be/btpWFZC8mWw)

## What You Can Do

_Please note: Some of these features are shown in the video above._

- Authentication flow for sign up or sign in.
  - If user exists, or user tries to create an existing user, they sees an error in ui.
  - Multiple users can create an account on the same laptop.
- Authorization flow for page.
  - Study room, session and test/quiz pages can only be accessed by logged in users.
- Sidebar
  - User can add a custom profile image or name.
  - If a user uploads an image over 1mb, they will receive a warning.
  - Pinned sessions wil be displayed in the sidebar.
- Study Room
  - User will see an empty data placeholder if there are no sessions.
  - User can create, edit and remove sessions.
  - User can only start a session test if they have at least one question.
  - If a session has at least one question user will be asked to confirm if they really want to remove it.
  - User can pin sessions for easier access, especially later when they have a lot of sessions/tests to take.
  - Pins will show at the top and on the sidebar, up to 4 for focused study.
  - When user scrolls the table of sessions the header titles will blur creating a beautiful UI effect.
- Session
  - User will see an empty data placeholder if there are no questions.
  - User can create, edit or remove notes with different icons for aid while studying a session.
  - You can show or hide the note creation form any time.
  - User can create a question with question and answer(optional).
  - When creating a question the create question button will be disabled.
  - User can use voice recognition feature to record their question and answer.
  - User can drag and drop their questions.
  - User can change the order, choose either current drag and drop sort or random.
  - User can use voice synthesis but choosing a voice they would like to speak their question during the test, similar to how it will be in the check rides with an actual person.
  - User can adjust the volume, pitch, and speed of the voice from three selections.
- Quiz
  - User can start their session quiz if they have at least one question.
  - User can record their answer.
  - Timed answers will move on automatically or user can hit the next button.
  - Number of questions is displayed.
  - Chosen voice via voice synthesis selection in the session's page will be displayed here.
  - Results page will show the question, answer created in the session and answer given in the quiz to compare.
- Other
  - View homepage with headline and preview of app.
  - All pages responsive, and accessible.
  - Designs are consistent so they flow together seamlessly.
  - Loader is added where data is loading.
  - 404 page will be displayed if they go to a non existing page.
  - Breadcrumbs to show where user is currently in the app and how pages relate to each other.
  - Truncation of words on several parts of the app for better display.
  - Permission request modal opens if a user has never given microphone permission for this app(in my demo I have already given permission before).
  - Do not display certain elements on certain pages.
  - ...and so much more. Check out the commits!

## Setup

### Prod

WIP

### Dev

#### Add Environment Variables

```
REACT_APP_DB_ENCRYPTION_KEY='' // create your own key
REACT_APP_LOG_ROCKET_APP_ID='' // get this when you sign up for logrocket and go through their steps
REACT_APP_SPEECHLY_APP_ID='' // not required
REACT_APP_USE_SPEECHLY='' // not required
```

#### Start Development Environment

- run `yarn install` then `yarn start`.
- run `yarn test`, or `yarn test:coverage` to see coverage, `yarn test -- [component/page/utils method name].spec.tsx` to run specific test.
- go to `https://localhost:3000/`. You might get a security warning, this is because I am using https while developing without a SSL certificate, feel free to go to Advanced -> Proceed if you're on Chrome.

## Future Improvements

- The current test coverage for the project is 42%. I am planning to enhance this by adding more tests for additional components, hooks, and methods. The goal is also to provide a more comprehensive and detailed test suite for the existing test files.

- At the moment, some components are overloaded with logic, which can complicate the structure. My objective is to improve this by decoupling the logic from the rendering aspect of these components. This will include migrating some logic to standalone utility/service files, while other logic will remain in dedicated logic components. The rendering will then be handled by its own streamlined component, leading to a cleaner and more manageable codebase.
