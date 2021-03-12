import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Confirmation.module.scss';

const Confirmation: React.FC = () => {
  const history = useHistory();

  const goToAdd = useCallback(() => {
    history.push('/new');
  }, [history]);

  return (
    <div className={classes.pageContainer}>
      <div className={classes.confirmationContainer}>
        <div className={classes.message}>Thank you for sharing!!</div>
        <div>
          <button className={classes.button} onClick={goToAdd}>
            Add another recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
