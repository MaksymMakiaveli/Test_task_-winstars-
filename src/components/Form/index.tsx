import React from 'react';
import classes from './Form.module.scss';
import { Todo } from '../../store/types/todo';
import cl from 'classnames';

interface FormProps {
  setTodos: (todo: Todo) => void;
}

export const Form: React.FC<FormProps> = ({ setTodos }) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setValue(e.target.value);
  };

  const sendTodos = () => {
    if (value === '') {
      const textError = 'The field must not be empty';
      setError(textError);
      return;
    }
    const objTodo: Todo = { id: Date.now(), value: value, checked: false };
    setTodos(objTodo);
    setValue('');
  };

  return (
    <form className={classes.form}>
      <div className={classes.form_box}>
        <input
          className={cl({ [classes.error]: error !== '' })}
          type="text"
          placeholder={error === '' ? 'write todo...' : error}
          name="todo"
          value={value}
          onChange={valueHandler}
        />
        <button onClick={sendTodos} type="button" name="todo">
          +
        </button>
      </div>
    </form>
  );
};
