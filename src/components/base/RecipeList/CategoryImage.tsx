import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCocktail,
  faCookieBite,
  faHamburger,
  faWineBottle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { getCategoryColor } from './categoryHelpers';
import Breakfast from '../../HomePage/CategoryImages/Breakfast';
import Cheese from '../../HomePage/CategoryImages/Cheese';
import Fries from '../../HomePage/CategoryImages/Fries';
import { Category } from '../../../types/recipe.types';
import classes from './RecipeList.module.scss';

type Props = {
  category: Category;
};

const SVGIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={classes.svgContainer}>{children}</div>
);

const FAIcon: React.FC<{ icon: IconDefinition }> = ({ icon }) => (
  <FontAwesomeIcon className={classes.faIcon} icon={icon} transform="grow-32" />
);

const getCategoryIcon = (category: Category) => {
  switch (category) {
    case 'appetizer':
      return (
        <SVGIcon>
          <Cheese className={classes.svgIcon} />
        </SVGIcon>
      );
    case 'side':
      return (
        <SVGIcon>
          <Fries className={classes.svgIcon} />
        </SVGIcon>
      );
    case 'breakfast':
      return (
        <SVGIcon>
          <Breakfast className={classes.svgIcon} />
        </SVGIcon>
      );
    case 'dessert':
      return <FAIcon icon={faCookieBite} />;
    case 'sauce':
      return <FAIcon icon={faWineBottle} />;
    case 'beverage':
      return <FAIcon icon={faCocktail} />;
    case 'entree':
    default:
      return <FAIcon icon={faHamburger} />;
  }
};

const CategoryImage: React.FC<Props> = ({ category }) => {
  const color = getCategoryColor(category);
  const Icon = getCategoryIcon(category);

  return <div className={classNames(classes.categoryIcon, classes[color])}>{Icon}</div>;
};

export default CategoryImage;
