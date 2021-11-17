import { BaseAction, Concat } from './index';
import { GET_PRODUCTS, SUCCESS } from './actionTypes';

export type Product = {
  id: string;
  title: string;
  price: number;
  img: string;
  description: string;
  createdAt: Date;
};

interface ProductState {
  products: [] | Product[];
  loading: boolean;
}

export interface GetProducts extends BaseAction<typeof GET_PRODUCTS> {}

export interface GetProductsSuccess
  extends BaseAction<Concat<typeof GET_PRODUCTS, typeof SUCCESS>> {
  response: Product;
}

export type ProductAction = GetProducts | GetProductsSuccess;

export default ProductState;
