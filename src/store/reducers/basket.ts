import { BasketAction, BasketState } from '../types/basket';
import { GET_BASKET, SUCCESS } from '../types/actionTypes';
import { concatActions } from '../../helpers';

const initialState: BasketState = {
  products: [],
  amount: 0,
  loading: false,
};
export const BasketReducer = (
  basket = initialState,
  action: BasketAction
): BasketState => {
  switch (action.type) {
    case GET_BASKET:
      return {
        ...basket,
        loading: true,
      };
    case concatActions(GET_BASKET, SUCCESS):
      return {
        ...basket,
        products: action.response.products,
        amount: action.response.amount,
        loading: false,
      };
    default:
      return basket;
  }
};
