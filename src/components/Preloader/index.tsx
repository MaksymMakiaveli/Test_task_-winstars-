import React from 'react';
import spinner from '../../assets/img/preloader.svg';

export const Preloader: React.FC = () => (
  <div className="preloader">
    <img src={spinner} alt="" />
  </div>
);
