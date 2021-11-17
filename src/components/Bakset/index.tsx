import React from 'react';
import classes from './Basket.module.scss';
import SimpleBar from 'simplebar-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card } from '../Card';
import { CompletedOrderForm } from '../CompletedOrderForm';
import { Preloader } from '../Preloader';

interface BasketProps {}

export const Basket: React.FC<BasketProps> = () => {
  const { products, amount, loading } = useSelector(
    (state: RootState) => state.BasketReducer
  );
  if (loading) {
    return <Preloader />;
  }
  return (
    <div className={classes.basket}>
      <div className={classes.basket_wrapper}>
        <SimpleBar style={{ maxHeight: 800, maxWidth: 650, width: '100%' }}>
          <div className={classes.card_box}>
            {products.map((el) => (
              <Card key={el.id} product={el} />
            ))}
          </div>
        </SimpleBar>
        <div className={classes.form_box}>
          <CompletedOrderForm amount={amount} />
        </div>
      </div>
    </div>
  );
};
