import React from 'react';
import classes from './TodoListMain.module.scss';
import { Select } from '../Select';
import { Form } from '../Form';
import { Todos } from '../Todos';
import { Todo } from '../../store/types/todo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  CreateTodo,
  DeleteTodo,
  GetTodos,
  UpdateTodo,
} from '../../store/actions/todo.action';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

interface TodoListMainProps {}

const listItem = ['All', 'Completed', 'Not completed'];

export const TodoListMain: React.FC<TodoListMainProps> = () => {
  const { todos } = useSelector((state: RootState) => state.TodoReducer);
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState('All');

  React.useEffect(() => {
    if (!todos.length) {
      dispatch(GetTodos());
    }
  }, []);

  const setTodos = (todo: Todo) => {
    dispatch(CreateTodo(todo));
  };
  const updateTodo = (todo: Todo) => {
    dispatch(UpdateTodo(todo));
  };
  const deleteTodo = (id: number) => {
    dispatch(DeleteTodo(id));
  };

  const filterTodos = (val: string) => {
    setStatus(val);
  };
  const filteredTodos = todos.filter((el) => {
    if (status === 'Not completed') {
      return !el.checked;
    }
    if (status === 'Completed') {
      return el.checked;
    }
    return el;
  });

  return (
    <div className={classes.main}>
      <div className={classes.main_wrapper}>
        <div className={classes.select_box}>
          <Select
            listItem={listItem}
            defaultValue="All"
            filterTodos={filterTodos}
          />
        </div>
        <div className={classes.form_box}>
          <Form setTodos={setTodos} />
        </div>
        <SimpleBar style={{ maxHeight: 650, marginTop: 20 }}>
          <div className={classes.todos}>
            {filteredTodos.map((todo: Todo) => (
              <Todos
                key={todo.id}
                todo={todo}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};
