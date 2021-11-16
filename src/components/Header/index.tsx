import React from 'react';
import classes from './Header.module.scss';
import logo from '../../assets/img/logo.png';
import basket from '../../assets/img/add-to-basket.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { products, amount } = useSelector(
    (state: RootState) => state.BasketReducer
  );
  return (
    <div className={classes.header}>
      <div className={classes.box_header}>
        <div className={classes.box_logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={classes.box_basket}>
          <p className={classes.amount_basket}>{amount}$</p>
          <div className={classes.box_badge}>
            <img className={classes.basket_icon} src={basket} alt="basket" />
            {products.length ? (
              <div className={classes.badge}>
                <span className={classes.badge_value}>
                  {products.length + 1 >= 10 ? '10+' : products.length}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
