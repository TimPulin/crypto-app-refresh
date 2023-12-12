import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { cloneDeep } from 'lodash';
import { WalletType } from '../../utils/types';

type WalletsFormType = {
  value: WalletType[]
};

type ActionAddWalletType = {
  type: string;
  payload: WalletType[];
};

type ActionUpdateWalletType = {
  type: string;
  payload: {
    id: string;
    name: string;
    value: string | number;
  }
};

type ActionRemoveWalletType = {
  type: string;
  payload: string;
};

type ActionClearWalletType = {
  type: string;
  payload: string;
};

export const walletInitialState = {
  id: uuid(),
  address: '',
  amount: 0,
  currency: '',
};

const initialState:WalletsFormType = {
  value: [walletInitialState],
};

export const updateWalletsFormSlice = createSlice({
  name: 'wallets-form-instance',
  initialState,
  reducers: {
    addWallet: (state:WalletsFormType, action:ActionAddWalletType) => {
      const tempValue = cloneDeep(state.value);
      state.value = [...tempValue, ...action.payload];
    },

    updateWallet: (state: WalletsFormType, action: ActionUpdateWalletType) => {
      const { id, name, value } = action.payload;
      const tempValue = cloneDeep(state.value);
      const currentWalletIndex = tempValue.findIndex((item) => item.id === id);
      if (name === 'amount') {
        tempValue[currentWalletIndex][name] = Number(value);
      } else {
        tempValue[currentWalletIndex][name] = value;
      }
      state.value = tempValue;
    },

    removeWallet: (state: WalletsFormType, action: ActionRemoveWalletType) => {
      const tempValue = cloneDeep(state.value);
      const currentWalletIndex = tempValue.findIndex((item) => item.id === action.payload);
      tempValue.splice(currentWalletIndex, 1);
      state.value = tempValue;
    },

    clearWallet: (state: WalletsFormType, action: ActionClearWalletType) => {
      const tempValue = cloneDeep(state.value);
      const currentWalletIndex = tempValue.findIndex((item) => item.id === action.payload);
      tempValue[currentWalletIndex].address = '';
      tempValue[currentWalletIndex].amount = 0;
      state.value = tempValue;
    },

  },
});

export const {
  addWallet, updateWallet, removeWallet, clearWallet,
} = updateWalletsFormSlice.actions;
export const updateWalletsFormReducer = updateWalletsFormSlice.reducer;
export type UpdateWalletsFormReducerType = {
  addWallet: (state:WalletsFormType, action:ActionAddWalletType) => void;
};
