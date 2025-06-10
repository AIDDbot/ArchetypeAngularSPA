export type StockPrice = {
  symbol: string;
  price: number;
  date: number;
};

export const DEFAULT_STOCK_PRICE: StockPrice = {
  symbol: "",
  price: 0,
  date: 0,
};
