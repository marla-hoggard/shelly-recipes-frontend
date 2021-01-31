import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import currentUserReducer from './reducers/currentUser';

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
