import {
  AddRecipeResponse,
  AddRecipeRequest,
  GetRecipeResponse,
  GetAllRecipesResponse,
  EditRecipeRequest,
  SearchParams,
  Recipe,
} from "../types/recipe.types";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export const addRecipe = async (request: AddRecipeRequest): Promise<AddRecipeResponse> => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/recipe/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const result = await response.json();
    return result || { error: { message: "API Function Error" } };
  } catch (error) {
    console.error(error);
    return { error: { message: "API Function Error" } };
  }
};

export const editRecipe = async (
  recipeId: number,
  request: EditRecipeRequest,
): Promise<AddRecipeResponse> => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/recipe/${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const result = await response.json();
    return result || { error: { message: "API Function Error" } };
  } catch (error) {
    console.error(error);
    return { error: { message: "API Function Error" } };
  }
};

export const getRecipe = async (recipeId: number): Promise<GetRecipeResponse> => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/recipe/${recipeId}`);
    const result = await response.json();
    return result || { error: { message: "API Function Error" } };
  } catch (error) {
    console.error(error);
    return { error: { message: "API Function Error" } };
  }
};

export const getAllRecipes = async (): Promise<GetAllRecipesResponse> => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/recipes`);
    const result = await response.json();
    return result || { error: { details: "API Function Error" } };
  } catch (error) {
    console.error(error);
    return { error: { details: "API Function Error" } };
  }
};

export const searchRecipes = async (searchTerms: SearchParams): Promise<Recipe[]> => {
  const query = Object.entries(searchTerms)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  if (!query) {
    return [];
  }

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/search?${query}`);
    const result = await response.json();
    if (result.error) {
      console.error(result.error);
    }
    return result.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
