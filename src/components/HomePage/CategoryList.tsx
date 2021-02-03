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
import { Link } from 'react-router-dom';

type CardProps = {
  name: string;
  displayName: string;
  icon: React.ReactNode;
  searchParams: SearchParams; // Or url string?
};

const FAIcon: React.FC<{ icon: IconDefinition }> = ({ icon }) => (
  <FontAwesomeIcon className={classes.faIcon} icon={icon} transform="grow-70" />
);

export const CATEGORY_DATA: CardProps[] = [
  {
    name: 'featured',
    displayName: 'Featured',
    icon: <FAIcon icon={faGrinStars} />,
    searchParams: { featured: true },
  },
  {
    name: 'appetizers',
    displayName: 'Starters',
    icon: <Cheese />,
    searchParams: { category: 'appetizer' },
  },
  {
    name: 'entrees',
    displayName: 'Entrees',
    icon: <FAIcon icon={faUtensils} />,
    searchParams: { category: 'entree' },
  },
  {
    name: 'breakfast',
    displayName: 'Breakfast',
    icon: <FAIcon icon={faBacon} />,
    searchParams: { category: 'breakfast' },
  },
  {
    name: 'sides',
    displayName: 'Sides',
    icon: <Fries />,
    searchParams: { category: 'side' },
  },
  {
    name: 'desserts',
    displayName: 'Desserts',
    icon: <FAIcon icon={faCookieBite} />,
    searchParams: { category: 'dessert' },
  },
  {
    name: 'chicken',
    displayName: 'Chicken',
    icon: <FAIcon icon={faDrumstickBite} />,
    searchParams: { wildcard: 'chicken' },
  },
  {
    name: 'seafood',
    displayName: 'Seafood',
    icon: <FAIcon icon={faFish} />,
    searchParams: { wildcard: 'seafood, fish' },
  },
  {
    name: 'pasta',
    displayName: 'Pasta',
    icon: <Pasta />,
    searchParams: { wildcard: 'pasta' },
  },
  {
    name: 'vegetarian',
    displayName: 'Vegetarian',
    icon: <FAIcon icon={faSeedling} />,
    searchParams: { vegetarian: true },
  },
  {
    name: 'sauces',
    displayName: 'Sauces & Marinades',
    icon: <FAIcon icon={faWineBottle} />,
    searchParams: { category: 'sauce' },
  },
  {
    name: 'beverages',
    displayName: 'Beverages',
    icon: <FAIcon icon={faCocktail} />,
    searchParams: { category: 'beverage' },
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
    <Link className={classes.card} style={{ backgroundColor: color }} to={`/browse/${name}`}>
      {displayName}
      {icon}
    </Link>
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
      {CATEGORY_DATA.map((category, index) => (
        <CategoryCard key={category.name} color={getColor(index)} {...category} />
      ))}
    </div>
  </>
);

export default CategoryList;
