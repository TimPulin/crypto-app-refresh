export enum InputTypeNameEnum {
  text = 'text',
  number = 'number',
  file = 'file',
}

export type WalletType = {
  [index:string]: string | number;
  id : string;
  address : string;
  amount :number;
  currency : string;
};
