import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { useWalletsFormState } from '../../store/selectors';
import {
  addWallet, updateWallet, removeWallet, clearWallet,
} from '../../store/slicers/wallets-form-state-slice';

import Footer from '../Footer';
import AddDocumentIcon from '../icons/AddDocumentIcon';
import Wallet from '../wallet/Wallet';

const walletInitialState = {
  id: uuid(),
  address: '',
  amount: 0,
  currency: '',
};

export default function Form() {
  const dispatch = useDispatch();
  const walletsFormState = useWalletsFormState();

  const updateWalletLocal = (id: string, name: string, value: string) => {
    dispatch(updateWallet({ id, name, value }));
  };

  const addWalletLocal = () => {
    walletInitialState.id = uuid();
    dispatch(addWallet([walletInitialState]));
  };

  const removeWalletLocal = (id: string) => {
    dispatch(removeWallet(id));
  };

  const clearWalletLocal = (id: string) => {
    dispatch(clearWallet(id));
  };

  return (
    <form className="form">
      {
        walletsFormState.map((item) => (
          <Wallet
            key={item.id}
            wallet={item}
            updateWallet={updateWalletLocal}
            removeWallet={removeWalletLocal}
            clearWallet={clearWalletLocal}
          />
        ))
      }

      <button
        type="button"
        className="button button--icon button--add-wallet"
        onClick={addWalletLocal}
      >
        <AddDocumentIcon />
        Add new wallet
      </button>

      <Footer />
    </form>
  );
}
