import { BaseAction, Concat } from './index';
import {
  BASKET_HANDLING,
  BUY_ALL_AT_BASKET,
  GET_BASKET,
  GET_PRODUCTS,
  PRODUCTS_HANDLING,
  SUCCESS,
} from './actionTypes';

export type Product = {
  id: string;
  title: string;
  price: number;
  img: string;
  description: string;
  createdAt: string;
};
export type Basket = {
  basketProducts: [] | Product[];
  amount: number;
};
export interface ApplicationState {
  products: [] | Product[];
  basket: Basket;
  loading: boolean;
}

export interface GetProducts extends BaseAction<typeof GET_PRODUCTS> {}
export interface GetProductsSuccess
  extends BaseAction<Concat<typeof GET_PRODUCTS, typeof SUCCESS>> {
  response: Product[];
}
export interface GetBasket extends BaseAction<typeof GET_BASKET> {}
export interface GetBasketSuccess
  extends BaseAction<Concat<typeof GET_BASKET, typeof SUCCESS>> {
  response: Basket;
}

export interface ProductsHandling
  extends BaseAction<typeof PRODUCTS_HANDLING> {}
export interface ProductsHandlingSuccess
  extends BaseAction<Concat<typeof PRODUCTS_HANDLING, typeof SUCCESS>> {
  response: {
    type: 'CREATE' | 'DELETE';
    data: Product;
  };
}
export interface BasketHandling extends BaseAction<typeof BASKET_HANDLING> {}
export interface BasketHandlingSuccess
  extends BaseAction<Concat<typeof BASKET_HANDLING, typeof SUCCESS>> {
  response: {
    type: 'CREATE' | 'DELETE';
    data: Product;
  };
}

export interface BuyAllAtBasket extends BaseAction<typeof BUY_ALL_AT_BASKET> {}
export interface BuyAllAtBasketSuccess
  extends BaseAction<Concat<typeof BUY_ALL_AT_BASKET, typeof SUCCESS>> {}

export type ApplicationActions =
  | GetProducts
  | GetProductsSuccess
  | GetBasket
  | GetBasketSuccess
  | ProductsHandling
  | ProductsHandlingSuccess
  | BasketHandling
  | BasketHandlingSuccess
  | BuyAllAtBasket
  | BuyAllAtBasketSuccess;
