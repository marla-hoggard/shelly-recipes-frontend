import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCocktail,
  faCookieBite,
  faUtensils,
  faWineBottle,
} from '@fortawesome/free-solid-svg-icons';
import { getCategoryColor } from './listHelpers';
import Breakfast from '../../HomePage/CategoryImages/Breakfast';
import Cheese from '../../HomePage/CategoryImages/Cheese';
import Fries from '../../HomePage/CategoryImages/Fries';
import { Category } from '../../../types/recipe.types';
import classes from './RecipeList.module.scss';

type Props = {
  category: Category;
};

const getCategoryIcon = (category: Category) => {
  switch (category) {
    case 'appetizer':
      return <Cheese />;
    case 'side':
      return <Fries />;
    case 'breakfast':
      return <Breakfast />;
    case 'dessert':
      return <FontAwesomeIcon className={classes.faIcon} icon={faCookieBite} transform="grow-32" />;
    case 'sauce':
      return <FontAwesomeIcon className={classes.faIcon} icon={faWineBottle} transform="grow-32" />;
    case 'beverage':
      return <FontAwesomeIcon className={classes.faIcon} icon={faCocktail} transform="grow-32" />;
    case 'entree':
    default:
      return <FontAwesomeIcon className={classes.faIcon} icon={faUtensils} transform="grow-32" />;
  }
};

const CategoryImage: React.FC<Props> = ({ category }) => {
  const color = getCategoryColor(category);
  const Icon = getCategoryIcon(category);

  return <div className={classNames(classes.categoryIcon, classes[color])}>{Icon}</div>;
};

export default CategoryImage;
