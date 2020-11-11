import React, { useEffect } from 'react';
import pizzas from '../data/pizzas.json';
import PizzaItem from './PizzaItem';
import Cart from './Cart';
import AppCSS from './App.module.css';
import PizzaSVG from '../svg/pizza.svg';
import AppStateComponent from './AppState';
import SpecialOffer from './SpecialOffer';

const App = () => {
  const specialOfferPizza = pizzas.find(pizza => pizza.specialOffer);
  return (
    <AppStateComponent>
      <div className={AppCSS.container}>
        <div className={AppCSS.header}>
          <PizzaSVG width={120} height={120} />
          <div className={AppCSS.siteTitle}>Super Pizza</div>
          <Cart />
        </div>
        {specialOfferPizza && <SpecialOffer pizza = {specialOfferPizza} />}
        <ul className = {AppCSS.pizzaList}>
          {pizzas.map((pizza) => {
          return <PizzaItem key={pizza.id} pizza={pizza} />;
        })}
        </ul>
      </div>
    </AppStateComponent>
   
  );
};

export default App;
