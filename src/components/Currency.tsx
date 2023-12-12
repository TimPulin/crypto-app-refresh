import { useEffect, useState } from 'react';

type CurrencyPropsType = {
  name: string;
  amount?: number;
};

export default function Currency(props: CurrencyPropsType) {
  const { name, amount = null } = props;
  const [nameLocal, setNameLocal] = useState('usdt');
  const [codeLocal, setCodeLocal] = useState('(erc-20)');

  useEffect(() => {
    if (name) setNameLocal(name);
    if (name.toLowerCase() === 'usdt' || name === '') {
      setCodeLocal('(erc-20)');
    } else {
      setCodeLocal('');
    }
  }, [name]);

  const formatAmount = () => {
    let amountLocal: string;
    if (amount !== null) {
      amountLocal = new Intl
        .NumberFormat('ru', { useGrouping: true, minimumFractionDigits: 2 })
        .format(amount)
        .replace(',', '.');
    } else {
      amountLocal = '';
    }
    return amountLocal;
  };

  return (
    <div className="currency">
      {formatAmount()}
      <div className="currency__name">
        {nameLocal}
        {codeLocal && (
          <span className="currency__code">{codeLocal}</span>
        )}
      </div>
    </div>
  );
}
Currency.defaultProps = {
  amount: null,
};
