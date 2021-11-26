import React from 'react';
import classes from './Select.module.scss';
import cl from 'classnames';

interface SelectProps {
  listItem: string[];
  defaultValue: string;
  filterTodos: (status: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  listItem,
  defaultValue = listItem[0],
  filterTodos,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  const openHandler = () => {
    setOpen(!open);
  };

  const valueHandler = (val: string) => {
    setValue(val);
    filterTodos(val);
  };
  return (
    <div className={classes.select_wrapper}>
      <div className={classes.value_box} onClick={openHandler}>
        <p className={classes.value}>{value}</p>
      </div>
      <ul
        className={cl(classes.select, {
          [classes.select_active]: open,
          [classes.select_disable]: !open,
        })}
      >
        {listItem.map((item) => (
          <li
            className={classes.select_item}
            onClick={() => {
              valueHandler(item);
              openHandler();
            }}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
