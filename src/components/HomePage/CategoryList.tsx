import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCocktail,
  faCookieBite,
  faFish,
  faGrinStars,
  faHamburger,
  faSeedling,
  faTorah,
  faUtensils,
  faWineBottle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import Breakfast from './CategoryImages/Breakfast';
import Cheese from './CategoryImages/Cheese';
import Chicken from './CategoryImages/Chicken';
import Fries from './CategoryImages/Fries';
import Pasta from './CategoryImages/Pasta';
import { BrowseCategories } from '../../types/recipe.types';
import classes from './CategoryList.module.scss';
import { Link } from 'react-router-dom';

type CardProps = {
  name: BrowseCategories;
  displayName: string;
  icon: React.ReactNode;
};

const FAIcon: React.FC<{ icon: IconDefinition }> = ({ icon }) => (
  <FontAwesomeIcon className={classes.faIcon} icon={icon} transform="grow-70" />
);

const CATEGORY_DATA: CardProps[] = [
  {
    name: 'all',
    displayName: 'All Recipes',
    icon: <FAIcon icon={faUtensils} />,
  },
  {
    name: 'featured',
    displayName: 'Featured',
    icon: <FAIcon icon={faGrinStars} />,
  },
  {
    name: 'appetizers',
    displayName: 'Starters',
    icon: <Cheese className={classes.icon} />,
  },
  {
    name: 'entrees',
    displayName: 'Entrees',
    icon: <FAIcon icon={faHamburger} />,
  },
  {
    name: 'breakfast',
    displayName: 'Breakfast',
    icon: <Breakfast className={classes.icon} />,
  },
  {
    name: 'sides',
    displayName: 'Sides',
    icon: <Fries className={classes.icon} />,
  },
  {
    name: 'desserts',
    displayName: 'Desserts',
    icon: <FAIcon icon={faCookieBite} />,
  },
  {
    name: 'chicken',
    displayName: 'Chicken',
    icon: <Chicken className={classes.icon} />,
  },
  {
    name: 'seafood',
    displayName: 'Seafood',
    icon: <FAIcon icon={faFish} />,
  },
  {
    name: 'pasta',
    displayName: 'Pasta',
    icon: <Pasta className={classes.icon} />,
  },
  {
    name: 'vegetarian',
    displayName: 'Vegetarian',
    icon: <FAIcon icon={faSeedling} />,
  },
  {
    name: 'passover',
    displayName: 'Passover',
    icon: <FAIcon icon={faTorah} />,
  },
  {
    name: 'sauces',
    displayName: 'Sauces & Marinades',
    icon: <FAIcon icon={faWineBottle} />,
  },
  {
    name: 'beverages',
    displayName: 'Beverages',
    icon: <FAIcon icon={faCocktail} />,
  },
];

const CategoryCard: React.FC<CardProps & { color: string }> = ({
  name,
  displayName,
  icon,
  color,
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
