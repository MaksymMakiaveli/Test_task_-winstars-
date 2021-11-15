import React from 'react';
import { Header } from './Header';
import { MainPage } from './MainPage';

export const App: React.FC = () => {
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
