import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAppleAlt,
  faPizzaSlice,
  faDrumstickBite,
  faHamburger,
  faIceCream,
} from '@fortawesome/free-solid-svg-icons';
import classes from './Loading.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.loadingText}>Loading...</div>
      <div className="fa-layers fa-fw">
        <FontAwesomeIcon className={classes.pizza} icon={faPizzaSlice} />
        <FontAwesomeIcon className={classes.hamburger} icon={faHamburger} />
        <FontAwesomeIcon className={classes.drumstick} icon={faDrumstickBite} />
        <FontAwesomeIcon className={classes.icecream} icon={faIceCream} />
        <FontAwesomeIcon className={classes.apple} icon={faAppleAlt} />
      </div>
    </div>
  );
};

export default Loading;
