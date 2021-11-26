import { Todo, TodoActions, TodoState } from '../types/todo';
import { CREATE_TODO, GET_TODOS, UPDATE_TODO } from '../types/actionTypes';

const initialState: TodoState = {
  todos: [],
};

export const TodoReducer = (
  state = initialState,
  action: TodoActions
): TodoState => {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.response],
      };
    case GET_TODOS:
      return {
        ...state,
        todos: action.response,
      };
    case UPDATE_TODO:
      const todo = state.todos.map((el: Todo) => {
        if (el.id === action.response.id) {
          el.checked = action.response.checked;
          el.value = action.response.value;
        }
        return el;
      });
      return {
        ...state,
        todos: todo,
      };
    default:
      return state;
  }
};
