import React from 'react';
import classes from './TodoListHeader.module.scss';
import TodoTitleIcon from '../../assets/image/check-sign.png';
import penIcon from '../../assets/image/pen.png';

interface TodoListHeaderProps {}

export const TodoListHeader: React.FC<TodoListHeaderProps> = () => {
  return (
    <div className={classes.header}>
      <div className={classes.img_box}>
        <img src={TodoTitleIcon} alt="Todo logo icon" />
      </div>
      <div className={classes.title_box}>
        <h2 className={classes.title}>
          Todo List
          <span>
            <img src={penIcon} alt="" />
          </span>
        </h2>
      </div>
    </div>
  );
};
