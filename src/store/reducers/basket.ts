import { BasketAction, BasketState } from '../types/basket';
import {
  ADD_PRODUCT_TO_BASKET,
  GET_BASKET,
  SUCCESS,
} from '../types/actionTypes';
import { concatActions } from '../../helpers';

const initialState: BasketState = {
  products: [],
  amount: 0,
  loading: false,
};
export const BasketReducer = (
  state = initialState,
  action: BasketAction
): BasketState => {
  switch (action.type) {
    case GET_BASKET:
      return {
        ...state,
        loading: true,
      };
    case concatActions(GET_BASKET, SUCCESS):
      return {
        ...state,
        products: action.response.products,
        amount: action.response.amount,
        loading: false,
      };
    case ADD_PRODUCT_TO_BASKET:
      return {
        ...state,
      };
    case concatActions(ADD_PRODUCT_TO_BASKET, SUCCESS):
      console.log(state.amount, typeof state.amount);
      console.log(action.response.price, action.response.price);
      return {
        ...state,
        products: [...state.products, action.response],
        amount: state.amount + +action.response.price,
      };
    default:
      return state;
  }
};
