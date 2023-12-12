import { configureStore } from '@reduxjs/toolkit';
import { updateWalletsFormReducer } from './slicers/wallets-form-state-slice';

export const store = configureStore({
  reducer: {
    walletsFormInstance: updateWalletsFormReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
