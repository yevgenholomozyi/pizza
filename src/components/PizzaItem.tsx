import React from 'react';
import PizzaCSS from './Pizza.module.css';
import { Pizza } from '../types';
import { useAddToCart } from './AddToCart';

interface Props {
  pizza: Pizza;
}

const PizzaItem: React.FC<Props> = ({ pizza }) => {
  const { id, name, price } = pizza;
  const addToCart = useAddToCart();
  const addToCartHandler = () => {
    addToCart({ id, name, price })
  }
  return (
    <li
      className = {PizzaCSS.container}
    >
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <button type="button" onClick = {addToCartHandler}>Add to Cart</button>
    </li>
  );
};

export default PizzaItem;

