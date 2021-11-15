import React from 'react';
import classes from './Card.module.scss';
import iphone from '../../assets/img/iphone.jpeg';

interface CardProps {}

export const Card: React.FC<CardProps> = () => {
  return (
    <div className={classes.card}>
      <div className={classes.box_card}>
        <div className={classes.box_image}>
          <img src={iphone} alt="" />
        </div>

        <div className={classes.box_info}>
          <div className={classes.box_topCard}>
            <h3 className={classes.title}>Iphone 12 PRO</h3>
            <span className={classes.postData}>12.07 12:00</span>
          </div>
          <div className={classes.box_bottomCard}>
            <span className={classes.price}>1200$</span>
            <button className={classes.buttonBuy}>Add to basket</button>
          </div>
        </div>
      </div>
    </div>
  );
};
