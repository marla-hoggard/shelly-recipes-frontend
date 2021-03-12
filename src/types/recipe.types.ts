export type AddRecipeRequest = {
  title: string;
  submitted_by: string;
  servings?: string;
  message?: string;
  is_confirmed: boolean;
  ingredients: string[];
  steps: string[];
  footnotes?: string[];
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
  submitted_by: string;
  message: string;
  servings: string | null;
  ingredients: string[];
  steps: string[];
  footnotes: string[];
  created_at: string;
  is_confirmed: boolean;
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
  submitted_by: string;
  servings: string | null;
  message: string | null;
  is_confirmed: boolean;
  created_at: string;
  ingredients?: string[];
  steps?: string[];
  footnotes?: string[];
};
