import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';
import { Dispatch } from 'redux';
import { ActionTypes } from './index';
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  getDoc,
  collection,
  deleteDoc,
} from 'firebase/firestore';
import { Todo } from '../types/todo';
import { CREATE_TODO, GET_TODOS, UPDATE_TODO } from '../types/actionTypes';

export const GetTodos =
  (): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<ActionTypes>) => {
    const db = getFirestore();
    try {
      const getTodosRef = collection(db, 'todos');
      const todosSnap = await getDocs(getTodosRef);
      if (todosSnap.empty) {
        return;
      }
      const response: Todo[] = [];
      todosSnap.forEach((el) => {
        const todo: Todo = el.data() as Todo;
        response.push(todo);
      });
      dispatch({ type: GET_TODOS, response });
    } catch (e) {
      console.log(e);
    }
  };
export const CreateTodo =
  (todo: Todo): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<ActionTypes>) => {
    const db = getFirestore();
    try {
      const getTodosRef = doc(db, 'todos', todo.id.toString());
      await setDoc(getTodosRef, todo);
      dispatch({ type: CREATE_TODO, response: todo });
    } catch (e) {
      console.log(e);
    }
  };
export const UpdateTodo =
  (todo: Todo): ThunkAction<any, RootState, any, any> =>
  async (dispatch: Dispatch<ActionTypes>) => {
    const db = getFirestore();
    try {
      const getTodosRef = doc(db, 'todos', todo.id.toString());
      await updateDoc(getTodosRef, todo);
      const todoSnap = await getDoc(getTodosRef);
      const todos = todoSnap.data() as Todo;
      dispatch({ type: UPDATE_TODO, response: todos });
    } catch (e) {
      console.log(e);
    }
  };
export const DeleteTodo =
  (id: number): ThunkAction<any, RootState, any, any> =>
  async () => {
    const db = getFirestore();
    try {
      const getTodosRef = doc(db, 'todos', id.toString());
      await deleteDoc(getTodosRef);
    } catch (e) {
      console.log(e);
    }
  };
