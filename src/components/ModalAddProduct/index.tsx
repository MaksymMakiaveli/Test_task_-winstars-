import React from 'react';
import classes from './ModalAddProduct.module.scss';
import cl from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { CreateProduct } from '../../store/actions/application';
import { Product } from '../../store/types/application';

interface ModalAddProductProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface ValueInput {
  title: string;
  price: number;
  description: string;
  img: string;
}

export const ModalAddProduct: React.FC<ModalAddProductProps> = (props) => {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm<ValueInput>({
    mode: 'onChange',
    defaultValues: {
      img: '',
      description: '',
      title: '',
    },
  });

  const onSubmit: SubmitHandler<Product> = (data) => {
    dispatch(CreateProduct(data));
    resetField('img');
    resetField('description');
    resetField('title');
    resetField('price');
    setOpen(false);
  };
  return (
    <div className={cl(classes.modal, { [classes.modal_open]: open })}>
      <button onClick={() => setOpen(!open)} className={classes.bg_Modal} />
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
          <div className="box_input">
            <label htmlFor="title">Title</label>
            <input
              {...register('title', { required: true, maxLength: 20 })}
              name="title"
              type="text"
              id="title"
              className="input"
            />
            {errors.title?.type === 'required' && (
              <p className="error">Title is required</p>
            )}
          </div>
          <div className="box_input">
            <label htmlFor="price">Price</label>
            <input
              {...register('price', { pattern: /^[0-9]*$/, required: true })}
              name="price"
              type="number"
              id="price"
              className="input"
            />
            {errors.price?.type === 'pattern' && (
              <p className="error">Only numbers</p>
            )}
            {errors.price?.type === 'required' && (
              <p className="error">Price is required</p>
            )}
          </div>
          <div className="box_input">
            <label htmlFor="description">Description</label>
            <textarea
              {...register('description')}
              name="description"
              rows={5}
              cols={10}
              id="description"
              className="input"
            />
          </div>
          <div className="box_input">
            <label htmlFor="img">Image URL</label>
            <input
              {...register('img', {
                pattern: /(http[s]?:\/\/.*\.(?:png|jpg|gif|svg|jpeg))/i,
              })}
              name="img"
              type="text"
              id="img"
              className="input"
            />
            {errors.img?.type === 'pattern' && (
              <p className="error">Invalid URL image</p>
            )}
          </div>
          <div className="box_button">
            <button
              type="submit"
              disabled={Boolean(Object.keys(errors).length)}
              className="button"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
