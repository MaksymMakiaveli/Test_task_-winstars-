import React from 'react';
import classes from './Header.module.scss';
import logo from '../../assets/img/logo.png';
import basket from '../../assets/img/add-to-basket.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { products, amount } = useSelector(
    (state: RootState) => state.BasketReducer
  );
  return (
    <div className={classes.header}>
      <div className={classes.box_header}>
        <div className={classes.box_logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className={classes.box_basket}>
          <p className={classes.amount_basket}>{amount}&nbsp;$</p>
          <div className={classes.box_badge}>
            <Link to="basket">
              <img className={classes.basket_icon} src={basket} alt="basket" />
            </Link>
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
