import ProductState, { ProductAction } from '../types/product';
import { CREATE_PRODUCT, GET_PRODUCTS, SUCCESS } from '../types/actionTypes';
import { concatActions } from '../../helpers';

const initialState: ProductState = {
  products: [],
  loading: false,
};

export const ProductReducer = (
  state = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case concatActions(GET_PRODUCTS, SUCCESS):
      return {
        ...state,
        loading: false,
        products: action.response,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
      };
    case concatActions(CREATE_PRODUCT, SUCCESS):
      return {
        ...state,
        products: [...state.products, action.response],
      };
    default:
      return state;
  }
};
