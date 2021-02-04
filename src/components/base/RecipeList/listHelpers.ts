import { Category } from '../../../types/recipe.types';

export const getCategoryColor = (category: Category) => {
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
