import React from 'react';
import classes from './ModalAddProduct.module.scss';
import cl from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../store/actions/product';

interface ModalAddProductProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface ValueInput {
  title: string;
  price: number;
  description: string;
}

export const ModalAddProduct: React.FC<ModalAddProductProps> = (props) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ValueInput>();

  const onSubmit: SubmitHandler<ValueInput> = (data, event) => {
    dispatch(createProduct(data));
    event?.target.reset();
    setOpen(false);
  };

  return (
    <div className={cl(classes.modal, { [classes.modal_open]: open })}>
      <div className={classes.wrapper_modal}>
        <div className={classes.modal_header}>
          <h3>Create new product</h3>
          <a
            href="#"
            onClick={() => setOpen(!open)}
            title="Close"
            className={classes.modal_close}
          >
            Close
          </a>
        </div>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.box_input}>
            <label htmlFor="title">Title</label>
            <input
              {...register('title', { required: true, maxLength: 20 })}
              name="title"
              type="text"
              id="title"
              className={classes.input}
            />
            {errors.title?.type === 'required' && (
              <p className={classes.error}>Title is required</p>
            )}
          </div>
          <div className={classes.box_input}>
            <label htmlFor="price">Price</label>
            <input
              {...register('price', { pattern: /^[0-9]*$/, required: true })}
              name="price"
              type="text"
              id="price"
              className={classes.input}
            />
            {errors.price?.type === 'pattern' && (
              <p className={classes.error}>Only numbers</p>
            )}
            {errors.price?.type === 'required' && (
              <p className={classes.error}>Price is required</p>
            )}
          </div>
          <div className={classes.box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              {...register('description')}
              name="description"
              rows={5}
              cols={10}
              id="description"
              className={classes.input}
            />
          </div>
          <div className={classes.box_button}>
            <button
              type="submit"
              disabled={Boolean(Object.keys(errors).length)}
              className={classes.button}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
