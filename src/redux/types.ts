export interface UserDetails {
  email: string;
  id: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface TokenDetail {
  address: `0x${string}`;
  name: string;
  symbol: string;
  price: string;
}

export interface Token {
  token1: TokenDetail;
  token2: TokenDetail;
}

export interface SettleInvoiceType {
  memo: string;
  step: number;
  relayer: Token | null;
  paymentMode: PaymentModeType | null;
  amount: number;
  dollarPrice: number;
}

export type PaymentModeType = "payMyself" | "split";
