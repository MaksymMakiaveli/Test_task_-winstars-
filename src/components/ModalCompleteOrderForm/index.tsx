import React from 'react';
import { CompletedOrderForm } from '../CompletedOrderForm';
import { Basket } from '../../store/types/application';
import classes from './ModalCompleteOrderForm.module.scss';
import cl from 'classnames';

interface ModalCompleteOrderFormProps {
  basket: Basket;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ModalCompleteOrderForm: React.FC<ModalCompleteOrderFormProps> = (
  props
) => {
  const { basket, open, setOpen } = props;
  return (
    <div className={cl(classes.modalForm, { [classes.modalOpen]: open })}>
      <button className={classes.bg_Modal} onClick={() => setOpen(!open)} />
      <div className={classes.modal}>
        <CompletedOrderForm basket={basket} />
      </div>
    </div>
  );
};
