import { Product } from './product';
import { BaseAction, Concat } from './index';
import { GET_BASKET, SEND_PRODUCT_TO_BASKET, SUCCESS } from './actionTypes';

export interface BasketState {
  products: [] | Product[];
  amount: number;
}

export interface SendProductToBasket
  extends BaseAction<typeof SEND_PRODUCT_TO_BASKET> {}

export interface SendProductToBasketSuccess
  extends BaseAction<Concat<typeof SEND_PRODUCT_TO_BASKET, typeof SUCCESS>> {
  response: Product;
}

export interface GetBasket extends BaseAction<typeof GET_BASKET> {}
export interface GetBasketSuccess
  extends BaseAction<Concat<typeof GET_BASKET, typeof SUCCESS>> {
  response: BasketState;
}

export type BasketAction =
  | SendProductToBasket
  | SendProductToBasketSuccess
  | GetBasket
  | GetBasketSuccess;
