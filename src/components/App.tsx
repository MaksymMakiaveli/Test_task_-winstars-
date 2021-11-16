import React from 'react';
import { Header } from './Header';
import { MainPage } from './MainPage';
import { useDispatch } from 'react-redux';
import { getBasket } from '../store/actions/basket';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getBasket());
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <MainPage />
        </div>
      </main>
    </>
  );
};
