import ProductState, { Product, ProductAction } from '../types/product';
import { GET_PRODUCTS, SUCCESS } from '../types/actionTypes';
import { concatActions, objectToArray } from '../../helpers';

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
      const prod = objectToArray<Product>(action.response);
      const prodSort = prod.sort((a: any, b: any) => a.createdAt - b.createdAt);
      return {
        ...product,
        loading: false,
        products: prodSort,
      };
    default:
      return product;
  }
};
