import { AddRecipeResponse, AddRecipeRequest, GetRecipeResponse } from "./types/api.types";

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
  request: Partial<AddRecipeRequest>,
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
