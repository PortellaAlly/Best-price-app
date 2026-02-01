export interface Product {
  id?: number;
  name: string;
  price: number;
  url: string;
  image: string;
  store: string;
  created_at?: string;
}

export interface PriceHistory {
  price: number;
  checked_at: string;
}

export interface SearchResponse {
  success: boolean;
  count: number;
  breakdown?: {
    mercadoLivre: number;
    amazon: number;
    magalu: number;
    americanas: number;
  };
  products: Product[];
}