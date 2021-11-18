import React from 'react';
import classes from './Card.module.scss';
import emptyImage from '../../assets/img/empty.png';
import { useDispatch } from 'react-redux';
import {
  addProductToBasket,
  deleteProductInBasket,
} from '../../store/actions/basket';
import { Product } from '../../store/types/product';
import { useLocation } from 'react-router-dom';

interface CardProps {
  product: Product;
}

export const Card: React.FC<CardProps> = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const postDateGeneration = () => {
    const date = new Date(+product.createdAt);
    return ` ${date.getHours()}:${date.getMinutes()}  - ${date.getDay()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };
  const addToBasket = () => {
    dispatch(addProductToBasket(product));
  };
  const deleteInBasket = () => {
    dispatch(deleteProductInBasket(product.id));
  };

  return (
    <div className={classes.card}>
      <div className={classes.box_card}>
        <div className={classes.box_image}>
          <img src={product.img === '' ? emptyImage : product.img} alt="" />
        </div>

        <div className={classes.box_info}>
          <div className={classes.box_topCard}>
            <h3 className={classes.title}>{product.title}</h3>
            <span className={classes.postData}>{postDateGeneration()}</span>
          </div>
          <div className={classes.box_bottomCard}>
            <span className={classes.price}>{product.price}&nbsp;$</span>
            {location.pathname === '/' ? (
              <button
                onClick={() => addToBasket()}
                className={classes.buttonBuy}
              >
                Add to basket
              </button>
            ) : (
              <button
                onClick={() => deleteInBasket()}
                className={classes.buttonDeleted}
              >
                Deleted
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
