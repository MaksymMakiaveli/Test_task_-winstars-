import React from 'react';
import classes from './Todos.module.scss';
import cl from 'classnames';
import { Todo } from '../../store/types/todo';

interface TodosProps {
  todo: {
    id: number;
    value: string;
    checked: boolean;
  };
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
}
export const Todos: React.FC<TodosProps> = ({
  todo,
  updateTodo,
  deleteTodo,
}) => {
  const [checked, setChecked] = React.useState(todo.checked);
  const [animated, setAnimated] = React.useState(false);
  const [remove, setRemove] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [value, setValue] = React.useState(todo.value);

  const checkedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    setAnimated(!animated);
    updateTodo({ ...todo, checked: e.target.checked });
  };
  const editHandler = () => {
    setEdit(!edit);
  };
  const saveHandler = () => {
    setEdit(!edit);
    updateTodo({ ...todo, value: value });
  };
  const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const clickRemoveTodo = () => {
    setRemove(!remove);
    deleteTodo(todo.id);
  };
  return (
    <div
      className={cl(classes.todos, {
        [classes.todos_completed]: todo.checked,
        [classes.todos_animated]: animated,
        [classes.todos_deleted]: remove,
      })}
    >
      <input
        className={classes.checkbox}
        type="checkbox"
        checked={checked}
        onChange={checkedHandler}
        disabled={edit}
      />

      {!edit ? (
        <p className={classes.text}>{todo.value}</p>
      ) : (
        <input type="text" value={value} onChange={valueHandler} />
      )}
      <div className={classes.actions_box}>
        <button
          onClick={clickRemoveTodo}
          type="button"
          className={classes.close}
        >
          +
        </button>
        {checked ? null : !edit ? (
          <button onClick={editHandler} type="button" className={classes.edit}>
            Edit
          </button>
        ) : (
          <button onClick={saveHandler} type="button" className={classes.edit}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};
