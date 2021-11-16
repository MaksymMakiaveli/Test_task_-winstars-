import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';
import { Dispatch } from 'redux';
import { BasketAction, BasketState } from '../types/basket';
import { getDatabase, onValue, ref, remove, set } from 'firebase/database';
import {
  GET_BASKET,
  SEND_PRODUCT_TO_BASKET,
  SUCCESS,
} from '../types/actionTypes';
import { concatActions, objectToArray } from '../../helpers';

export const sendProductToBasket =
  (id: string): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<BasketAction>, getState) => {
    const db = getDatabase();
    const productRef = ref(db, `product/${id}`);
    const basketRef = ref(db, `basket/products/${id}`);
    const basketAmountRef = ref(db, `basket`);

    await onValue(productRef, async (snapshot) => {
      const response = await snapshot.val();
      if (response === null) {
        return;
      }
      dispatch({ type: SEND_PRODUCT_TO_BASKET });
      dispatch({
        type: concatActions(SEND_PRODUCT_TO_BASKET, SUCCESS),
        response,
      });
      const amount = getState().BasketReducer.amount;
      const products = getState().BasketReducer.products;
      await set(basketAmountRef, { amount });
      await set(basketRef, {
        products,
      });
      await remove(productRef);
    });
  };

export const getBasket =
  (): ThunkAction<any, RootState, any, any> => (dispatch: Dispatch) => {
    const db = getDatabase();
    const basketProductsRef = ref(db, `basket/products`);
    const amountBasket = ref(db, `basket/amount`);
    onValue(basketProductsRef, (snapshotProduct) => {
      const dataProduct = snapshotProduct.val();
      if (dataProduct === null) {
        return;
      }
      const arrayProducts = objectToArray(dataProduct);
      onValue(amountBasket, (snapshotAmount) => {
        const dataAmount = snapshotAmount.val();
        const response: BasketState = {
          products: arrayProducts,
          amount: dataAmount,
        };

        dispatch({ type: GET_BASKET });
        dispatch({ type: concatActions(GET_BASKET, SUCCESS), response });
      });
    });
  };
