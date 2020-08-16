export type Category =
  | "appetizer"
  | "entree"
  | "dessert"
  | "side"
  | "beverage"
  | "breakfast"
  | "sauce"
  | "";

export type AddRecipeRequest = {
  title: string;
  source?: string;
  sourceUrl?: string;
  submittedBy: string;
  servings?: string;
  category: Category;
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

type GetRecipeSuccess = {
  id: number;
  title: string;
  source: string | null;
  sourceUrl: string | null;
  submittedBy: string;
  servings: string | null;
  category: Category;
  vegetarian: boolean;
  ingredients: string[];
  steps: string[];
  tags: string[];
  createdAt: string;
};

type GetRecipeError = {
  error: {
    message: string;
    hint?: string;
  };
};

export type GetRecipeResponse = GetRecipeSuccess | GetRecipeError;

export type Recipe = {
  id: number;
  title: string;
  source: string | null;
  sourceUrl: string | null;
  submittedBy: string;
  servings: string | null;
  category: Category;
  vegetarian: boolean;
  createdAt: string;
  tags: string[];
  ingredients?: string[];
  steps?: string[];
};

type GetAllRecipesSuccess = {
  data: Recipe[];
};

type GetAllRecipesError = {
  error: {
    details: string;
    query?: string;
  };
};

export type GetAllRecipesResponse = GetAllRecipesSuccess | GetAllRecipesError;
