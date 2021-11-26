import { combineReducers } from 'redux';
import { TodoReducer } from './todo.reducer';

const reducer = combineReducers({
  TodoReducer: TodoReducer,
});

export default reducer;
