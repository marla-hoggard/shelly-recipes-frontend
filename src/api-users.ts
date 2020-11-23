import { CreateUserRequest, CreateUserResponse } from "./types/api.types";

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export const createUser = async (request: CreateUserRequest): Promise<CreateUserResponse> => {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const result = await response.json();
    return result || { error: "API Function Error" };
  } catch (error) {
    console.error(error);
    return { error: "API Function Error" };
  }
};
