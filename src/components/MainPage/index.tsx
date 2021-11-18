import React from 'react';
import { Card } from '../Card';
import classes from './MainPage.module.scss';
import { AddButton } from '../AddButton';
import { ModalAddProduct } from '../ModalAddProduct';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GetProducts } from '../../store/actions/application';
import SimpleBar from 'simplebar-react';

interface MainPageProps {}

export const MainPage: React.FC<MainPageProps> = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const dispatch = useDispatch();
  const { loading, products } = useSelector(
    (state: RootState) => state.ApplicationReducer
  );

  React.useEffect(() => {
    if (products.length === 0) {
      dispatch(GetProducts());
    }
  }, []);

  if (loading) {
    <p>Loading...</p>;
  }
  return (
    <section className={classes.mainPage}>
      <SimpleBar style={{ maxHeight: 800 }}>
        <div className={classes.box_mainPage}>
          {products.map((el) => (
            <Card key={el.id} product={el} />
          ))}
        </div>
      </SimpleBar>
      <ModalAddProduct open={openModal} setOpen={setOpenModal} />
      <AddButton openModal={setOpenModal} />
    </section>
  );
};
