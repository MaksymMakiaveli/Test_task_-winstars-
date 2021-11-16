import { BasketAction, BasketState } from '../types/basket';
import {
  GET_BASKET,
  SEND_PRODUCT_TO_BASKET,
  SUCCESS,
} from '../types/actionTypes';
import { concatActions } from '../../helpers';

const initialState: BasketState = {
  products: [],
  amount: 0,
};
export const BasketReducer = (
  basket = initialState,
  action: BasketAction
): BasketState => {
  switch (action.type) {
    case SEND_PRODUCT_TO_BASKET:
      return {
        ...basket,
      };
    case concatActions(SEND_PRODUCT_TO_BASKET, SUCCESS):
      const price = +action.response.price;
      console.log(typeof price);
      return {
        ...basket,
        products: [...basket.products, action.response],
        amount: basket.amount + price,
      };
    case GET_BASKET:
      return {
        ...basket,
      };
    case concatActions(GET_BASKET, SUCCESS):
      return {
        ...basket,
        ...action.response,
      };
    default:
      return basket;
  }
};
