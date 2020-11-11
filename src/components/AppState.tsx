        /* This is an example   */
import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem { // scaffolds the cart items
    id: number; 
    name: string; 
    price: number; 
    quantity: number; 
}

interface StateValue { // structurases cart items into an array to use it as state value
    cart: {
        items: CartItem[];
    };
}

interface Action<T> { // scaffolds an action type with the generic type
    type: T;
}

interface AddToCartAction extends Action<'ADD_TO_CART'> { // creates an action with a type and a payload
    payload: {
        item: Omit <CartItem, 'quantity'> // payload is a CartItem exept the quantity
    };
}

interface InitializeCartAction extends Action<'INITIALIZE_CART'> { // creates an action with a type and a payload
    payload: {
        cart: StateValue['cart']; // square brekets are to access the types of propperty inside a StateValue
    };
}

const defaultStateValue: StateValue = { 
    cart: {
        items: []
    }
}

export const AppDispatchContext = createContext< // creating a contex to be shared with other components
    React.Dispatch<AddToCartAction> | undefined 
    >(undefined); 

const reducer = (state: StateValue, action: AddToCartAction | InitializeCartAction) => { // creating a reducer to dispatch an action to the state
    if (action.type === 'ADD_TO_CART') {                        // update a state depending on a particular type       
        const itemToAdd = action.payload.item;                    
        const itemExists = state.cart.items.find(               // find a payload item in the items array in the state
        (item) => item.id === itemToAdd.id
        );
        return {                                                // update a state
        ...state, 
        cart: {                                                    
          ...state.cart, 
          items: itemExists                                    // if there is an item from the payload int the state...
          ? state.cart.items.map((item) => {
            if (item.id === itemToAdd.id) {     
              return { ...item, quantity: item.quantity + 1 };  // ...update it
            }
            return item;                                        // ...otherwise return an item with no changes
          })
          : [...state.cart.items, { ...itemToAdd, quantity: 1 }], 
        },
    };
    } else if (action.type === 'INITIALIZE_CART') {
        return {...state, cart: action.payload.cart}

    }
    return state;
};
export const AppStateContext = createContext(defaultStateValue);        // create a context for the state
export const setStateContext = createContext<                           // create a context for the state update for optimiation purposes
React.Dispatch<React.SetStateAction<StateValue>> | undefined>(undefined); 
export const useStateDispatch = () => {         // a custom hook to change a state
    const dispatch = useContext(AppDispatchContext);
    if (!dispatch) {
        throw new Error('useStateDispatch was called outside the of the SetState provider')
    }
    return dispatch;
}

const AppStateComponent: React.FC = ({ children }) => {                 // component to handle the state
    // the useReducer hook returns an array of two values: a state and a function to update the value
    const [state, dispatch] = useReducer(reducer, defaultStateValue);   
    const { cart } = state;

    /* Bellow are 2 useEffect hooks. They are to call side effects (like componentDidUpdate or componentDidMount lc methods in classbase components) */

    useEffect(() => {           // get data from the LS and put the into the state
        const cart = window.localStorage.getItem('cart');
        if(cart) {
            dispatch({type: 'INITIALIZE_CART', payload: {cart: JSON.parse(cart)}})
        }
    }, []) // an empty array ensures that this useEffect will be called only ONCE 

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }, [ // the dependency list, useEffect will be called only if one of the dependecies changed
        cart
    ]);

    

    return (
        <AppStateContext.Provider value = {state}> 
            <AppDispatchContext.Provider value = {dispatch}> 
            {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    )

}

export default AppStateComponent;