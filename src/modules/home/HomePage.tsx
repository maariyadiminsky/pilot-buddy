import DateDisplay from '@common/date/DateDisplay';
import React from 'react';
// style={{
//   position: 'relative',
//   width: '100%',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   flexDirection: 'column',
// }}
const HomePage: React.FC = () => (
  <div>
    <h1 className="text-xl text-red-200 font-bold underline">Welcome!</h1>
    This CRA Custom Template setup includes:
    <ul>
      <i>
        * React <br />
      </i>
      <i>
        * TypeScript <br />
      </i>
      <i>
        * Eslint <br />
      </i>
      <i>
        * Prettier <br />
      </i>
      <i>
        * SASS <br />
      </i>
      <i>
        * Axios <br />
      </i>
      <i>
        * React Testing Library <br />
      </i>
      <i>
        * Service Workers <br />
      </i>
      <i>
        * Modular file structure <br />
      </i>
    </ul>
    <p>Less setup headache, build what you want faster :)</p>
    <DateDisplay />
  </div>
);

export default HomePage;
