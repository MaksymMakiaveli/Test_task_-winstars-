import { Todo } from './todoReducer';
import { FAIL, FETCH_TODOS, SUCCESS } from '../actionTypes';
import { BaseAction, Concat } from '../index';

export interface TodoAsync {
  loading: boolean;
  todo: Todo[];
  error: string;
}
export interface FetchTodosRequest extends BaseAction<typeof FETCH_TODOS> {}

export interface FetchTodosSuccess
  extends BaseAction<Concat<typeof FETCH_TODOS, typeof SUCCESS>> {
  response: Todo[];
}
export interface FetchTodosFailure
  extends BaseAction<Concat<typeof FETCH_TODOS, typeof FAIL>> {}

export type TodoAction =
  | FetchTodosRequest
  | FetchTodosSuccess
  | FetchTodosFailure;
