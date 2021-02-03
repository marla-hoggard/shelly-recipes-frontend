import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBacon,
  faCocktail,
  faCookieBite,
  faDrumstickBite,
  faFish,
  faGrinStars,
  faUtensils,
  faSeedling,
  faWineBottle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import Fries from './CategoryImages/Fries';
import Pasta from './CategoryImages/Pasta';
import { SearchParams } from '../../types/recipe.types';
import classes from './CategoryList.module.scss';
import Cheese from './CategoryImages/Cheese';

type CardProps = {
  name: string;
  displayName: string;
  icon: React.ReactNode;
  searchParams: SearchParams; // Or url string?
};

const FAIcon: React.FC<{ icon: IconDefinition }> = ({ icon }) => (
  <FontAwesomeIcon className={classes.faIcon} icon={icon} transform="grow-70" />
);

const CATEGORIES: CardProps[] = [
  {
    name: 'featured',
    displayName: 'Featured',
    icon: <FAIcon icon={faGrinStars} />,
    searchParams: {},
  },
  {
    name: 'appetizer',
    displayName: 'Starters',
    icon: <Cheese />,
    searchParams: {},
  },
  {
    name: 'entree',
    displayName: 'Entrees',
    icon: <FAIcon icon={faUtensils} />,
    searchParams: {},
  },
  {
    name: 'breakfast',
    displayName: 'Breakfast',
    icon: <FAIcon icon={faBacon} />,
    searchParams: {},
  },
  {
    name: 'sides',
    displayName: 'Sides',
    icon: <Fries />,
    searchParams: {},
  },
  {
    name: 'desserts',
    displayName: 'Desserts',
    icon: <FAIcon icon={faCookieBite} />,
    searchParams: {},
  },
  {
    name: 'chicken',
    displayName: 'Chicken',
    icon: <FAIcon icon={faDrumstickBite} />,
    searchParams: {},
  },
  {
    name: 'seafood',
    displayName: 'Seafood',
    icon: <FAIcon icon={faFish} />,
    searchParams: {},
  },
  {
    name: 'pasta',
    displayName: 'Pasta',
    icon: <Pasta />,
    searchParams: {},
  },
  {
    name: 'vegetarian',
    displayName: 'Vegetarian',
    icon: <FAIcon icon={faSeedling} />,
    searchParams: {},
  },
  {
    name: 'sauce',
    displayName: 'Sauces & Marinades',
    icon: <FAIcon icon={faWineBottle} />,
    searchParams: {},
  },
  {
    name: 'beverage',
    displayName: 'Beverages',
    icon: <FAIcon icon={faCocktail} />,
    searchParams: {},
  },
];

const CategoryCard: React.FC<CardProps & { color: string }> = ({
  name,
  displayName,
  icon,
  color,
  searchParams,
}) => {
  return (
    <div className={classes.card} style={{ backgroundColor: color }}>
      {displayName}
      {icon}
    </div>
  );
};

const getColor = (i: number) => {
  const colors = ['green', 'purple', '#333333'];
  return colors[i % colors.length];
};

const CategoryList: React.FC = () => (
  <>
    <div className={classes.sectionTitle}>Browse by Category</div>
    <div className={classes.browseList}>
      {CATEGORIES.map((category, index) => (
        <CategoryCard key={category.name} color={getColor(index)} {...category} />
      ))}
    </div>
  </>
);

export default CategoryList;
