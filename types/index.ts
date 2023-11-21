export type PriceHistoryItem = {
  price: number;
};

export type User = {
  email: string;
};

export type Product = {
  _id?: string;
  url: string;
  title: string;
  currencySymbol: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  discountRate: number;
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  category: string;
  stars: number;
  ratings: number;
  available: boolean;
  image: string;
  description: string;
  users?: User[];
};

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};