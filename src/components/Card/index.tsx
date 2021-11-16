import React from 'react';
import classes from './Card.module.scss';
import iphone from '../../assets/img/iphone.jpeg';
import { useDispatch } from 'react-redux';
import { sendProductToBasket } from '../../store/actions/basket';

interface CardProps {
  id: string;
  title: string;
  price: number;
}

export const Card: React.FC<CardProps> = (props) => {
  const { title, price, id } = props;
  const dispatch = useDispatch();

  const addToBasket = () => {
    dispatch(sendProductToBasket(id));
  };

  return (
    <div className={classes.card}>
      <div className={classes.box_card}>
        <div className={classes.box_image}>
          <img src={iphone} alt="" />
        </div>

        <div className={classes.box_info}>
          <div className={classes.box_topCard}>
            <h3 className={classes.title}>{title}</h3>
            <span className={classes.postData}>12.07 12:00</span>
          </div>
          <div className={classes.box_bottomCard}>
            <span className={classes.price}>{price}$</span>
            <button onClick={() => addToBasket()} className={classes.buttonBuy}>
              Add to basket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
