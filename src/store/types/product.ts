import { BaseAction, Concat } from './index';
import {
  CREATE_PRODUCT,
  // DELETE_PRODUCT,
  GET_PRODUCTS,
  SUCCESS,
} from './actionTypes';

export type Product = {
  id: string;
  title: string;
  price: number;
  img: string;
  description: string;
  createdAt: string;
};

interface ProductState {
  products: [] | Product[];
  loading: boolean;
}

export interface GetProducts extends BaseAction<typeof GET_PRODUCTS> {}

export interface GetProductsSuccess
  extends BaseAction<Concat<typeof GET_PRODUCTS, typeof SUCCESS>> {
  response: Product[];
}

export interface CreateProduct extends BaseAction<typeof CREATE_PRODUCT> {}
export interface CreateProductSuccess
  extends BaseAction<Concat<typeof CREATE_PRODUCT, typeof SUCCESS>> {
  response: Product;
}

// export interface DeleteProduct extends BaseAction<typeof DELETE_PRODUCT> {}
// export interface DeleteProductSuccess
//   extends BaseAction<Concat<typeof DELETE_PRODUCT, typeof SUCCESS>> {
//   id: string;
// }

export type ProductAction =
  | GetProducts
  | GetProductsSuccess
  | CreateProduct
  | CreateProductSuccess;

export default ProductState;
