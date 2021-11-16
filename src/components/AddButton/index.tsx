import React from 'react';
import classes from './AddButton.module.scss';

interface AddButtonProps {
  openModal: (open: boolean) => void;
}

export const AddButton: React.FC<AddButtonProps> = (props) => {
  const { openModal } = props;
  return (
    <div className={classes.box_button}>
      <button onClick={() => openModal(true)} className={classes.button}>
        +
      </button>
    </div>
  );
};
