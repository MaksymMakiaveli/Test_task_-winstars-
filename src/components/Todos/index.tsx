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

  const checkedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    setAnimated(!animated);
    updateTodo({ ...todo, checked: e.target.checked });
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
      />
      <p className={classes.text}>{todo.value}</p>
      <button onClick={clickRemoveTodo} type="button" className={classes.close}>
        +
      </button>
    </div>
  );
};
