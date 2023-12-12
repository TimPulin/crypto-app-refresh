import { v4 as uuid } from 'uuid';
import { WalletType } from './types';

type WalletArrType = string[];

const EMPTY_SPACE = ' ';
const regexpSplit = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/;
const regexpAmountTest = /\d+.\d+/;
const regexpAddressTest = /^[\da-zA-Z]+$/;

function createWallet(walletArr: WalletArrType): WalletType | null {
  const [address, amount, currency] = walletArr;

  const wallet: WalletType = {
    id: uuid(),
    address: '',
    amount: 0,
    currency: '',
  };

  if (address && address.match(regexpAddressTest)) {
    wallet.address = address;
  } else {
    console.log(`некорректный адрес: ${address}`);
    return null;
  }

  if (amount) {
    const amountLocal = amount
      .replace(',', '.')
      .match(regexpAmountTest);

    wallet.amount = Number(amountLocal);
  } else {
    console.log(`некорректная сумма: ${Number(amount)}`);
    return null;
  }

  if (currency) {
    wallet.currency = currency;
  }
  return wallet;
}

function splitLine(line: string) {
  if (line.length && !line.includes(EMPTY_SPACE)) {
    const walletArr = line
      .split(regexpSplit)
      .filter((item:string) => item !== '');
    return walletArr;
  } return null;
}

export function parsStringToWalletList(str:string) {
  const walletsList:WalletType[] = [];

  const linesArr = str.split('\r');

  linesArr.forEach((item) => {
    const walletArr = splitLine(item);
    if (walletArr !== null) {
      const wallet = createWallet(walletArr);

      if (wallet !== null) {
        walletsList.push(wallet);
        return true;
      }
    }
    return null;
  });
  return walletsList;
}
