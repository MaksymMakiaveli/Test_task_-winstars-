import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';
import { Dispatch } from 'redux';
import { BasketAction, BasketState } from '../types/basket';
import { getDatabase, onValue, ref, remove, set } from 'firebase/database';
import {
  ADD_PRODUCT_TO_BASKET,
  GET_BASKET,
  SUCCESS,
} from '../types/actionTypes';
import { concatActions, objectToArray } from '../../helpers';
import { Product } from '../types/product';
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { ActionTypes } from './index';

export const addProductToBasket =
  (product: Product): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<ActionTypes>, getState) => {
    const db = getFirestore();
    try {
      const BasketProductsRef = doc(db, `basketProducts/${product.id}`);
      const basketAmountRef = doc(db, `basket/amount`);
      const deletedProductRef = doc(db, `products/${product.id}`);
      await setDoc(BasketProductsRef, product);
      const basketProduct = await getDoc(BasketProductsRef);
      if (!basketProduct.exists()) {
        return;
      }
      const response: Product = <Product>basketProduct.data();
      console.log('res', response);
      dispatch({ type: ADD_PRODUCT_TO_BASKET });
      dispatch({
        type: concatActions(ADD_PRODUCT_TO_BASKET, SUCCESS),
        response,
      });
      const newAmount = getState().BasketReducer.amount;
      console.log(newAmount);
      console.log(typeof newAmount);
      await setDoc(basketAmountRef, { newAmount });
      await deleteDoc(deletedProductRef);
    } catch (e) {
      console.log(e);
    }
  };

export const deleteProductInBasket =
  (id: string): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<BasketAction>, getState) => {
    const db = getDatabase();
    const productRef = ref(db, `product/${id}`);
    const basketRef = ref(db, `basketProducts/${id}`);
    const basketAmountRef = ref(db, `balance/`);

    onValue(basketRef, (snapshot) => {
      const response: Product = snapshot.val();
      if (response === null) {
        return;
      }
      const amount = getState().BasketReducer.amount - +response.price;
      set(productRef, response).then(() => {
        set(basketAmountRef, amount);
      });
      remove(basketRef);
    });
  };

export const getBasket =
  (): ThunkAction<any, RootState, any, any> => (dispatch: Dispatch) => {
    const db = getDatabase();
    const basketProductsRef = ref(db, `basketProducts`);
    const amountBasket = ref(db, `balance/`);
    onValue(basketProductsRef, (snapshotProduct) => {
      const dataProduct = snapshotProduct.val();
      if (dataProduct === null) {
        return;
      }
      const arrayProducts = objectToArray(dataProduct);
      onValue(amountBasket, (snapshotAmount) => {
        const dataAmount = snapshotAmount.val();
        const response: Omit<BasketState, 'loading'> = {
          products: arrayProducts,
          amount: dataAmount,
        };

        dispatch({ type: GET_BASKET });
        dispatch({ type: concatActions(GET_BASKET, SUCCESS), response });
      });
    });
  };
