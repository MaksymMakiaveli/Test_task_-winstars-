import React from 'react';
import { Card } from '../Card';
import classes from './MainPage.module.scss';
import { AddButton } from '../AddButton';
import { ModalAddProduct } from '../ModalAddProduct';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getProducts } from '../../store/actions/product';

interface MainPageProps {}

export const MainPage: React.FC<MainPageProps> = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const dispatch = useDispatch();
  const { loading, products } = useSelector(
    (state: RootState) => state.ProductReducer
  );

  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (loading) {
    <p>Loading...</p>;
  }
  return (
    <section className={classes.mainPage}>
      <div className={classes.box_mainPage}>
        {products.map((el) => (
          <Card key={el.id} id={el.id} price={el.price} title={el.title} />
        ))}
      </div>
      <ModalAddProduct open={openModal} setOpen={setOpenModal} />
      <AddButton openModal={setOpenModal} />
    </section>
  );
};
