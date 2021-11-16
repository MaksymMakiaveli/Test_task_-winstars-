import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';
import { getDatabase, onValue, set, ref } from 'firebase/database';
import { GET_PRODUCTS, SUCCESS } from '../types/actionTypes';
import { concatActions } from '../../helpers';
import { Product } from '../types/product';
import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';

export const getProducts =
  (): ThunkAction<any, RootState, any, any> => (dispatch: Dispatch) => {
    const db = getDatabase();
    const productsRef = ref(db, `product`);
    onValue(productsRef, (data) => {
      const response = data.val();
      if (response === null) {
        return;
      }

      dispatch({ type: GET_PRODUCTS });
      dispatch({ type: concatActions(GET_PRODUCTS, SUCCESS), response });
    });
  };

export const createProduct =
  (
    product: Omit<Product, 'id' | 'createdAt'>
  ): ThunkAction<any, RootState, any, any> =>
  () => {
    const id = uuidv4();
    const db = getDatabase();
    const productsRef = ref(db, `product/${id}`);
    set(productsRef, {
      id,
      createdAt: Date.now().toString(),
      ...product,
    });
  };
