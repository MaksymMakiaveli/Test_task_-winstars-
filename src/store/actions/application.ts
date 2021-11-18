import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';
import { Dispatch } from 'redux';
import { ActionTypes } from './index';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

import {
  BASKET_HANDLING,
  BUY_ALL_AT_BASKET,
  GET_BASKET,
  GET_PRODUCTS,
  PRODUCTS_HANDLING,
  SUCCESS,
} from '../types/actionTypes';
import { concatActions } from '../../helpers';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../types/application';

export const GetProducts =
  (): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<ActionTypes>) => {
    const db = getFirestore();
    try {
      const getProductsRef = collection(db, 'products');
      const productsSnap = await getDocs(getProductsRef);
      if (productsSnap.empty) {
        return;
      }
      const response: Product[] = [];
      productsSnap.forEach((el) => {
        const product: Product = <Product>el.data();
        response.push(product);
      });
      dispatch({ type: GET_PRODUCTS });
      dispatch({ type: concatActions(GET_PRODUCTS, SUCCESS), response });
    } catch (e) {
      console.log(e);
    }
  };
export const GetBasket =
  (): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<ActionTypes>) => {
    const db = getFirestore();
    try {
      const getBasketRef = collection(db, 'basketProducts');
      const getBasketAmountRef = doc(db, 'basket', 'amount');
      const basketProductsSnap = await getDocs(getBasketRef);
      const basketAmountSnap = await getDoc(getBasketAmountRef);
      if (basketProductsSnap.empty) {
        return;
      }
      const basketProducts: Product[] = [];
      const amountString: { amount: number } = <{ amount: number }>(
        basketAmountSnap.data()
      );
      const amount = amountString.amount;
      basketProductsSnap.forEach((el) => {
        const product: Product = <Product>el.data();
        basketProducts.push(product);
      });

      dispatch({ type: GET_BASKET });
      dispatch({
        type: concatActions(GET_BASKET, SUCCESS),
        response: { basketProducts, amount },
      });
    } catch (e) {
      console.log(e);
    }
  };

export const ProductsHandling =
  (product: Product): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<ActionTypes>, getState) => {
    const db = getFirestore();
    try {
      const getBasketProductRef = doc(db, 'basketProducts', product.id);
      const getBasketAmountRef = doc(db, 'basket', 'amount');
      const getProductRef = doc(db, 'products', product.id);
      await setDoc(getBasketProductRef, product);
      await deleteDoc(getProductRef);
      dispatch({ type: PRODUCTS_HANDLING });
      dispatch({ type: BASKET_HANDLING });
      dispatch({
        type: concatActions(PRODUCTS_HANDLING, SUCCESS),
        response: {
          type: 'DELETE',
          data: product,
        },
      });
      dispatch({
        type: concatActions(BASKET_HANDLING, SUCCESS),
        response: {
          type: 'CREATE',
          data: product,
        },
      });
      const amount = getState().ApplicationReducer.basket.amount;
      await setDoc(getBasketAmountRef, { amount });
    } catch (e) {
      console.log(e);
    }
  };

export const BasketHandling =
  (product: Product): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<ActionTypes>, getState) => {
    const db = getFirestore();
    try {
      const getBasketProductRef = doc(db, 'basketProducts', product.id);
      const getBasketAmountRef = doc(db, 'basket/amount');
      const getProductRef = doc(db, 'products', product.id);
      await setDoc(getProductRef, product);
      await deleteDoc(getBasketProductRef);
      dispatch({ type: PRODUCTS_HANDLING });
      dispatch({ type: BASKET_HANDLING });
      dispatch({
        type: concatActions(PRODUCTS_HANDLING, SUCCESS),
        response: {
          type: 'CREATE',
          data: product,
        },
      });
      dispatch({
        type: concatActions(BASKET_HANDLING, SUCCESS),
        response: {
          type: 'DELETE',
          data: product,
        },
      });
      const amount = getState().ApplicationReducer.basket.amount;
      await setDoc(getBasketAmountRef, { amount });
    } catch (e) {
      console.log(e);
    }
  };

export const CreateProduct =
  (
    product: Omit<Product, 'id' | 'createdAt'>
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<ActionTypes>) => {
    const db = getFirestore();
    const id = uuidv4();
    try {
      const getProductRef = doc(db, 'products', id);
      const dataProduct = {
        id,
        createdAt: Date.now().toString(),
        ...product,
      };
      await setDoc(getProductRef, dataProduct);
      dispatch({ type: PRODUCTS_HANDLING });
      dispatch({
        type: concatActions(PRODUCTS_HANDLING, SUCCESS),
        response: {
          type: 'CREATE',
          data: dataProduct,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

export const BuyAll =
  (basketProducts: Product[]): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<ActionTypes>) => {
    const db = getFirestore();
    try {
      const getAmountRef = doc(db, 'basket', 'amount');
      basketProducts.map(async (el) => {
        const getBasketRef = doc(db, 'basketProduct', el.id);
        await deleteDoc(getBasketRef);
      });
      await deleteDoc(getAmountRef);
      dispatch({ type: BUY_ALL_AT_BASKET });
      dispatch({ type: concatActions(BUY_ALL_AT_BASKET, SUCCESS) });
    } catch (e) {
      console.log(e);
    }
  };
