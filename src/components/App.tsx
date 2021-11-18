import React from 'react';
import { Header } from './Header';
import { MainPage } from './MainPage';
import { useDispatch } from 'react-redux';
import { GetBasket } from '../store/actions/application';
import { Routes, Route } from 'react-router-dom';
import 'simplebar/dist/simplebar.min.css';
import { Basket } from './Bakset';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(GetBasket());
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
          <Routes>
            <Route path="basket/" element={<Basket />} />
          </Routes>
        </div>
      </main>
    </>
  );
};
