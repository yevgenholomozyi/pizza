import React from 'react';
import { Pizza } from '../types';
import { WithAddToCartProps } from './AddToCart';
import SpecialOfferCSS from './SpecialOffer.module.css';

interface Props {
    pizza: Pizza;
}

const SpecialOffer: React.FC<Props> = ({ pizza }) => {
    const {id, name, price } = pizza;
    return (
        <div className = {SpecialOfferCSS.container}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <WithAddToCartProps>{({ addToCart }) => {
                return (
                    <button 
                    type = 'button'
                    onClick = {() => addToCart ({ id, name, price })}
                    >
                    Add to Cart
                    </button>
                )
            }}
            </WithAddToCartProps>
        </div>
    )
}

export default SpecialOffer;
