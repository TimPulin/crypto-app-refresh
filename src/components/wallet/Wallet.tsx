import Currency from '../Currency';
import InputCustom from '../input-custom/InputCustom';

import { WalletType } from '../../utils/types';

type WalletPropsType = {
  wallet: WalletType;
  updateWallet: (id: string, name: string, value: string) => void;
  removeWallet: (id: string) => void;
  clearWallet: (id: string) => void;
};

const regexpTestFloat = /(^$)|(^\d+(\.|,)?\d*$)/;

export default function Wallet(props: WalletPropsType) {
  const {
    wallet, updateWallet, removeWallet, clearWallet,
  } = props;

  const updateWalletLocal = (name: string, value:string) => {
    updateWallet(wallet.id, name, value);
  };

  return (
    <div className="wallet" id={wallet.id}>
      <button
        type="button"
        className="button button--poor button--remove"
        onClick={() => removeWallet(wallet.id)}
      >
        REMOVE
      </button>
      <InputCustom
        placeholder="wallet address"
        name="address"
        value={wallet.address}
        onChange={updateWalletLocal}
      />
      <InputCustom
        JSXElement={<Currency name={wallet.currency} />}
        placeholder="amount"
        name="amount"
        value={wallet.amount}
        regexpTest={regexpTestFloat}
        onChange={updateWalletLocal}
      />
      <button
        type="button"
        className="button button--poor button--clear"
        onClick={() => clearWallet(wallet.id)}
      >
        CLEAR
      </button>
    </div>
  );
}
