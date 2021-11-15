import React from 'react';
import classes from './Header.module.scss';
import logo from '../../assets/img/logo.png';
import basket from '../../assets/img/add-to-basket.png';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <div className={classes.header}>
      <div className={classes.box_header}>
        <div className={classes.box_logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={classes.box_basket}>
          <p className={classes.amount_basket}>120.30$</p>
          <div className={classes.box_badge}>
            <img className={classes.basket_icon} src={basket} alt="basket" />
            <div className={classes.badge}>
              <span className={classes.badge_value}>10+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
