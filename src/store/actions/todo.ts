import { TodoAction } from '../types/todo/todoAction';
import { FETCH_TODOS } from '../types/actionTypes';

export const getTodosSuccess = (): TodoAction => ({
  type: FETCH_TODOS,
  api: {
    url: '/todos',
    method: 'GET',
  },
});
