import { TodoState } from '../types/todo/todoReducer';
import { TodoAction } from '../types/todo/todoAction';
import { FETCH_TODOS, SUCCESS } from '../types/actionTypes';
import { concatActions } from '../../helpers';

const initialState: TodoState = {
  todos: [],
  loading: false,
};

export const TodoReducer = (
  todo = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...todo,
        loading: true,
      };
    case concatActions(FETCH_TODOS, SUCCESS):
      return {
        ...todo,
        todos: action.response,
        loading: false,
      };
    default:
      return todo;
  }
};
