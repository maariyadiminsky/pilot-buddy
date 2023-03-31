import DateDisplay from '@common/date/DateDisplay';
import React from 'react';
import styles from './home.module.scss';

const HomePage: React.FC = () => (
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
    <h1 style={{ fontSize: '4em' }} className={styles['home-title']}>
      Welcome!
    </h1>
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
