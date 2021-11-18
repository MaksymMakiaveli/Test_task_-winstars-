import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';
import { CREATE_PRODUCT, GET_PRODUCTS, SUCCESS } from '../types/actionTypes';
import { concatActions } from '../../helpers';
import { Product, ProductAction } from '../types/product';
import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  getDocs,
} from 'firebase/firestore';

export const getProducts =
  (): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<ProductAction>) => {
    const db = getFirestore();
    try {
      const getCollectionRef = collection(db, 'products');
      const getCollectionSnap = await getDocs(getCollectionRef);
      if (getCollectionSnap.empty) {
        return;
      }
      const response: Product[] = [];
      getCollectionSnap.forEach((el) => {
        const value: Product = <Product>el.data();
        response.push(value);
      });
      dispatch({ type: GET_PRODUCTS });
      dispatch({ type: concatActions(GET_PRODUCTS, SUCCESS), response });
    } catch (e) {
      console.log(e);
    }
  };

export const createProduct =
  (
    product: Omit<Product, 'id' | 'createdAt'>
  ): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<ProductAction>) => {
    const id = uuidv4();
    const db = getFirestore();
    try {
      const data: Product = {
        id,
        createdAt: Date.now().toString(),
        ...product,
      };
      const setDocRef = doc(db, `products/${id}`);
      const docRef = doc(db, `products/${id}`);
      await setDoc(setDocRef, data);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return;
      }
      const response: Product = <Product>docSnap.data();
      dispatch({ type: CREATE_PRODUCT });
      dispatch({ type: concatActions(CREATE_PRODUCT, SUCCESS), response });
    } catch (e) {
      console.log(e);
    }
  };
