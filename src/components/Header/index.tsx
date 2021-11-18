import React from 'react';
import classes from './Header.module.scss';
import logo from '../../assets/img/logo.png';
import basketIcon from '../../assets/img/add-to-basket.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { ModalCompleteOrderForm } from '../ModalCompleteOrderForm';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { basket } = useSelector(
    (state: RootState) => state.ApplicationReducer
  );
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <div className={classes.header}>
      <div className={classes.box_header}>
        <div className={classes.box_logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className={classes.box_button}>
          <button
            onClick={() => setOpenModal(!openModal)}
            className={classes.button}
          >
            Form Buy
          </button>
        </div>
        <div className={classes.box_basket}>
          <p className={classes.amount_basket}>{basket.amount}&nbsp;$</p>
          <div className={classes.box_badge}>
            <Link to="basket">
              <img
                className={classes.basket_icon}
                src={basketIcon}
                alt="basket"
              />
            </Link>
            {basket.basketProducts.length ? (
              <div className={classes.badge}>
                <span className={classes.badge_value}>
                  {basket.basketProducts.length + 1 >= 10
                    ? '10+'
                    : basket.basketProducts.length}
                </span>
              </div>
            ) : null}
          </div>
        </div>
        <ModalCompleteOrderForm
          basket={basket}
          open={openModal}
          setOpen={setOpenModal}
        />
      </div>
    </div>
  );
};
