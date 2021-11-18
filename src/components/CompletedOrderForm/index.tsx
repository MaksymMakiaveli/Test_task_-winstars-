import React from 'react';
import classes from './CompletedOrderForm.module.scss';
import { useForm } from 'react-hook-form';
import { Basket } from '../../store/types/application';
import { useDispatch } from 'react-redux';
import { BuyAll } from '../../store/actions/application';

interface CompletedOrderFormProps {
  basket: Basket;
}

interface ValueInputs {
  name: string;
  surname: string;
  email: string;
  phone: number;
}

export const CompletedOrderForm: React.FC<CompletedOrderFormProps> = (
  props
) => {
  const { basket } = props;
  const patternLetters =
    /^[A-Za-z.!@?#"$%&:;() *\+,\/;\-=[\\\]\^_{|}<>\u0400-\u04FF]*$/;
  const patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValueInputs>({
    mode: 'onChange',
  });
  const dispatch = useDispatch();

  const onSubmit = (data: ValueInputs) => {
    const valueJSON = {
      ...data,
      ...basket,
    };
    alert(JSON.stringify(valueJSON));
    dispatch(BuyAll(basket.basketProducts));
    reset();
  };

  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="box_input">
          <label htmlFor="name">Name</label>
          <input
            {...register('name', { pattern: patternLetters, required: true })}
            name="name"
            type="text"
            id="name"
            className="input"
          />
          {errors.name?.type === 'pattern' && (
            <p className="error">Only letters</p>
          )}
          {errors.email?.type === 'required' && (
            <p className="error">Field is required</p>
          )}
        </div>
        <div className="box_input">
          <label htmlFor="surname">Surname</label>
          <input
            {...register('surname', {
              pattern: patternLetters,
              required: true,
            })}
            name="surname"
            type="text"
            id="surname"
            className="input"
          />
          {errors.surname?.type === 'pattern' && (
            <p className="error">Only letters</p>
          )}
          {errors.email?.type === 'required' && (
            <p className="error">Field is required</p>
          )}
        </div>
        <div className="box_input">
          <label htmlFor="email">Email</label>
          <input
            {...register('email', { pattern: patternEmail, required: true })}
            name="email"
            type="email"
            id="email"
            className="input"
          />
          {errors.email?.type === 'pattern' && (
            <p className="error">Invalid email</p>
          )}
          {errors.email?.type === 'required' && (
            <p className="error">Field is required</p>
          )}
        </div>
        <div className="box_input">
          <label htmlFor="phone">Phone number</label>
          <input
            {...register('phone')}
            name="phone"
            type="tel"
            id="phone"
            className="input"
          />
        </div>
        <p>
          Cost of all: <span>{basket.amount}&nbsp;$</span>
        </p>
        <div className="box_button">
          <button
            disabled={basket.basketProducts.length === 0}
            type="submit"
            className="button"
          >
            Buy
          </button>
        </div>
      </form>
    </div>
  );
};
