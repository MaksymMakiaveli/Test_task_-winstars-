import { BaseAction } from './index';
import {
  CREATE_TODO,
  DELETE_TODO,
  GET_TODOS,
  UPDATE_TODO,
} from './actionTypes';

export type Todo = {
  id: number;
  value: string;
  checked: boolean;
};

export interface TodoState {
  todos: Todo[] | [];
}

export interface GetTodos extends BaseAction<typeof GET_TODOS> {
  response: Todo[];
}
export interface CreateTodo extends BaseAction<typeof CREATE_TODO> {
  response: Todo;
}
export interface UpdateTodo extends BaseAction<typeof UPDATE_TODO> {
  response: Todo;
}

export interface DeleteTodo extends BaseAction<typeof DELETE_TODO> {}

export type TodoActions = CreateTodo | GetTodos | DeleteTodo | UpdateTodo;
