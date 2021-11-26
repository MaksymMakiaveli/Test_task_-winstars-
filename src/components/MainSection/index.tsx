import React from 'react';
import { TodoListHeader } from '../TodoListHeader';
import classes from './MainSection.module.scss';
import { TodoListMain } from '../TodoListMain';

interface MainSectionProps {}

export const MainSection: React.FC<MainSectionProps> = () => {
  return (
    <section className={classes.mainSection}>
      <div className={classes.mainSection_wrapper}>
        <TodoListHeader />
        <TodoListMain />
      </div>
    </section>
  );
};
