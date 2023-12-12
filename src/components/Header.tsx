import Currency from './Currency';

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title">From</h1>
      <div className="header__top">
        <span className="header__balance">
          <span className="header__circle" />
          balance usdt (erc-20)
        </span>
        <Currency amount={141241.5121} name="usdt" />
      </div>
      <div className="header__bottom">
        0x5E22eA4a96501Fb15E2e509AC7581f2e4c991c78
      </div>
    </header>
  );
}
