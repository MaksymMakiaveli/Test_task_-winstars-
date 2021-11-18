import { ApplicationActions, ApplicationState } from '../types/application';
import {
  BASKET_HANDLING,
  BUY_ALL_AT_BASKET,
  GET_BASKET,
  GET_PRODUCTS,
  PRODUCTS_HANDLING,
  SUCCESS,
} from '../types/actionTypes';
import { concatActions } from '../../helpers';

const initialState: ApplicationState = {
  products: [],
  basket: {
    basketProducts: [],
    amount: 0,
  },
  loading: false,
};

export const ApplicationReducer = (
  state = initialState,
  action: ApplicationActions
): ApplicationState => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case concatActions(GET_PRODUCTS, SUCCESS):
      return {
        ...state,
        products: action.response,
        loading: false,
      };
    case GET_BASKET:
      return {
        ...state,
        loading: true,
      };
    case concatActions(GET_BASKET, SUCCESS): {
      return {
        ...state,
        basket: {
          ...state.basket,
          basketProducts: action.response.basketProducts,
          amount: action.response.amount,
        },
        loading: false,
      };
    }
    case PRODUCTS_HANDLING:
      return {
        ...state,
      };
    case concatActions(PRODUCTS_HANDLING, SUCCESS):
      if (action.response.type === 'CREATE') {
        return {
          ...state,
          products: [...state.products, action.response.data],
        };
      }
      if (action.response.type === 'DELETE') {
        const filteredProducts = state.products.filter(
          (el) => el.id !== action.response.data.id
        );
        return {
          ...state,
          products: filteredProducts,
        };
      }
      return {
        ...state,
      };
    case BASKET_HANDLING:
      return {
        ...state,
      };
    case concatActions(BASKET_HANDLING, SUCCESS):
      if (action.response.type === 'CREATE') {
        return {
          ...state,
          basket: {
            ...state.basket,
            basketProducts: [
              ...state.basket.basketProducts,
              action.response.data,
            ],
            amount: state.basket.amount + Number(action.response.data.price),
          },
        };
      }
      if (action.response.type === 'DELETE') {
        const filteredBasketProducts = state.basket.basketProducts.filter(
          (el) => el.id !== action.response.data.id
        );
        return {
          ...state,
          basket: {
            ...state.basket,
            basketProducts: filteredBasketProducts,
            amount: state.basket.amount - Number(action.response.data.price),
          },
        };
      }
      return {
        ...state,
      };
    case BUY_ALL_AT_BASKET:
      return {
        ...state,
      };
    case concatActions(BUY_ALL_AT_BASKET, SUCCESS):
      return {
        ...state,
        basket: {
          ...state.basket,
          basketProducts: [],
          amount: 0,
        },
      };
    default:
      return state;
  }
};
