import ProductState, { ProductAction } from '../types/product';
import { GET_PRODUCTS, SUCCESS } from '../types/actionTypes';
import { concatActions } from '../../helpers';

const initialState: ProductState = {
  products: [],
  loading: false,
};

export const ProductReducer = (
  product = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...product,
        loading: true,
      };
    case concatActions(GET_PRODUCTS, SUCCESS):
      return {
        ...product,
        loading: false,
        products: [...product.products, action.response],
      };
    default:
      return product;
  }
};
