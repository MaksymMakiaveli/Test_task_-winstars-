import { combineReducers } from 'redux';
import { ProductReducer } from './product';
import { BasketReducer } from './basket';

const reducer = combineReducers({
  ProductReducer,
  BasketReducer,
});

export default reducer;
