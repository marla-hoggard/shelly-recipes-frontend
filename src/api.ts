import { AddRecipeResponse, AddRecipeRequest } from "./types/api.types";

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
