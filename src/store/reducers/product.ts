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
      const array: any = [];
      Object.values(action.response).forEach((val): void => {
        array.push(val);
      });
      const so = array.sort((a: any, b: any) => a.createdAt - b.createdAt);
      console.log(so);
      return {
        ...product,
        loading: false,
        products: so,
      };
    default:
      return product;
  }
};
