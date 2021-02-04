import { BrowseCategories, Category } from '../../../types/recipe.types';

export const getCategoryColor = (category: Category): string => {
  switch (category) {
    case 'appetizer':
      return 'red';
    case 'side':
      return 'orange';
    case 'breakfast':
      return 'yellow';
    case 'dessert':
      return 'blue';
    case 'sauce':
      return 'purple';
    case 'beverage':
      return 'black';
    case 'entree':
    default:
      return 'green';
  }
};

export const categoryToBrowsePath = (category: Category): BrowseCategories => {
  switch (category) {
    case 'appetizer':
      return 'appetizers';
    case 'side':
      return 'sides';
    case 'breakfast':
      return 'breakfast';
    case 'dessert':
      return 'desserts';
    case 'sauce':
      return 'sauces';
    case 'beverage':
      return 'beverages';
    case 'entree':
      return 'entrees';
    default:
      return 'all';
  }
};
