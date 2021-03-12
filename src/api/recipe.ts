import {
  AddRecipeResponse,
  AddRecipeRequest,
  GetRecipeResponse,
  EditRecipeRequest,
  Recipe,
} from '../types/recipe.types';
import { BACKEND_BASE_URL } from '../constants';

export const addRecipe = async (request: AddRecipeRequest): Promise<AddRecipeResponse> => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/recipe/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    const result = await response.json();
    return result || { error: { message: 'API Function Error' } };
  } catch (error) {
    console.error(error);
    return { error: { message: 'API Function Error' } };
  }
};

export const editRecipe = async (
  recipeId: number,
  request: EditRecipeRequest,
): Promise<AddRecipeResponse> => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/recipe/${recipeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    const result = await response.json();
    return result || { error: { message: 'API Function Error' } };
  } catch (error) {
    console.error(error);
    return { error: { message: 'API Function Error' } };
  }
};

export const getRecipe = async (recipeId: number): Promise<GetRecipeResponse> => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/recipe/${recipeId}`);
    const result = await response.json();
    return result || { error: { message: 'API Function Error' } };
  } catch (error) {
    console.error(error);
    return { error: { message: 'API Function Error' } };
  }
};

export const getAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/recipes`);
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getConfirmedRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/recipes?confirmed=true`);
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
