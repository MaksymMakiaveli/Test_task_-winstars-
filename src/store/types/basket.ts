import { Product } from './product';
import { BaseAction, Concat } from './index';
import { ADD_PRODUCT_TO_BASKET, GET_BASKET, SUCCESS } from './actionTypes';

export interface BasketState {
  products: [] | Product[];
  amount: number;
  loading: boolean;
}

export interface AddProductToBasket
  extends BaseAction<typeof ADD_PRODUCT_TO_BASKET> {}

export interface AddProductToBasketSuccess
  extends BaseAction<Concat<typeof ADD_PRODUCT_TO_BASKET, typeof SUCCESS>> {
  response: Product;
}

export interface GetBasket extends BaseAction<typeof GET_BASKET> {}
export interface GetBasketSuccess
  extends BaseAction<Concat<typeof GET_BASKET, typeof SUCCESS>> {
  response: BasketState;
}

export type BasketAction =
  | AddProductToBasket
  | AddProductToBasketSuccess
  | GetBasket
  | GetBasketSuccess;
