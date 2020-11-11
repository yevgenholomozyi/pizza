import React, { createRef } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import CartCSS from './Cart.module.css';
import { AppStateContext } from './AppState';
interface Props {};
interface State {
    isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
    #containerRef: React.RefObject<HTMLDivElement>
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.#containerRef = createRef();
    }

    handleOutsideClick = (e: MouseEvent) => {
        const { current } = this.#containerRef;
        if (current && !current.contains(e.target as Node )) {
            this.setState(({isOpen: false}));
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick);
    }

    handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if ((event.target as HTMLElement).nodeName === "SPAN") {
            console.log('This is a span');
        }
        this.setState((prevState) => ({isOpen: !prevState.isOpen}));
    }

    render() {
        return (
            <AppStateContext.Consumer>{(state) => {
                const itemsCount = state.cart.items.reduce((acc, item) => {
                    return acc + item.quantity
                }, 0)
                return (
                    <div 
                        className={CartCSS.cartContainer}
                        ref = {this.#containerRef}
                    >
                        <button 
                            type="button" 
                            onClick = {this.handleClick}
                            className={CartCSS.button}
                        >
                            <FiShoppingCart/>
                            <span>{itemsCount} pizzas(s)</span>
                        </button>
                        <div className={CartCSS.cartDropDown} style={{
                            display: this.state.isOpen ? 'block' : 'none'
                        }}>
                            <ul>
                                {state.cart.items.map(pizza => {
                                    return <li key = {pizza.id}>{pizza.name} &times; {pizza.quantity}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            }}</AppStateContext.Consumer>
        )
    }
};
export default Cart;