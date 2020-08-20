export type Category =
  | "appetizer"
  | "entree"
  | "dessert"
  | "side"
  | "beverage"
  | "breakfast"
  | "sauce"
  | "";

export type Ingredient = {
  ingredient: string;
  footnote?: string;
};

export type AddRecipeRequest = {
  title: string;
  source?: string;
  sourceUrl?: string;
  submittedBy: string;
  servings?: string;
  category: Category;
  vegetarian?: boolean;
  tags?: string[];
  ingredients: Ingredient[];
  steps: string[];
  notes?: string[];
};

export type EditRecipeRequest = Partial<AddRecipeRequest>;

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

export type GetRecipeSuccess = {
  id: number;
  title: string;
  source: string | null;
  sourceUrl: string | null;
  submittedBy: string;
  servings: string | null;
  category: Category;
  vegetarian: boolean;
  ingredients: Ingredient[];
  steps: string[];
  notes: string[];
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
  notes?: string[];
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
