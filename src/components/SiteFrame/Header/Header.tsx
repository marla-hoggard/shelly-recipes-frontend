import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './Header.module.scss';

const Header: React.FC = () => {
  const history = useHistory();

  const goHome = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <div className={classes.headerContainer} onClick={goHome}>
      Shelly's Recipe Box
    </div>
  );
};

export default Header;
