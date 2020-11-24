import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  token: string;
  isAdmin: boolean;
}

interface CurrentUserState {
  currentUser: User | null;
}

const initialState: CurrentUserState = {
  currentUser: null,
};

export const currentUser = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload: user }: PayloadAction<User>): void => {
      state.currentUser = user;
    },
    resetCurrentUser: (state): void => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, resetCurrentUser } = currentUser.actions;

export const selectCurrentUser = ({ currentUser: state }: RootState): User | null =>
  state.currentUser;

export const selectIsAuthenticated = ({ currentUser: state }: RootState): boolean =>
  !!state.currentUser;

export const selectIsAdmin = ({ currentUser: state }: RootState): boolean =>
  !!state.currentUser?.isAdmin;

export const selectCurrentUserFullName = ({ currentUser: state }: RootState): string =>
  state.currentUser ? `${state.currentUser.firstName} ${state.currentUser.lastName}` : "";

export default currentUser.reducer;
