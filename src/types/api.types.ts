export type Category =
  | "appetizer"
  | "entree"
  | "dessert"
  | "side"
  | "beverage"
  | "breakfast"
  | "sauce";

export type AddRecipeRequest = {
  title: string;
  source?: string;
  sourceUrl?: string;
  submittedBy: string;
  servings?: string;
  category: string; // Change to Category
  vegetarian?: boolean;
  ingredients: string[];
  steps: string[];
  tags?: string[];
};

type AddRecipeSuccess = {
  id: number;
  title: string;
};

type AddRecipeError = {
  error: {
    message: string;
    details?: string;
  };
};

export type AddRecipeResponse = AddRecipeSuccess | AddRecipeError;
