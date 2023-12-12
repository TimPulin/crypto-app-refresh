import { useWalletsFormState } from '../store/selectors';
import Currency from './Currency';

export default function Footer() {
  const walletsFormState = useWalletsFormState();

  const amountTotal = () => {
    const amountArr = walletsFormState.map((item) => item.amount);
    return amountArr.reduce((total, item) => total + item, 0);
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        Receive amount
        <Currency name="usdt" amount={amountTotal()} />
      </div>
      <button type="button" className="button button--primary button--disabled button--withdraw">Withdraw</button>
    </footer>
  );
}
