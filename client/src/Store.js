import { createContext, useReducer } from "react";


export const Store = createContext()

const initialValue = {
    cart:{
        cartItem:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('CartItems')):[]
    }
}

function cartReducer(state,action){
    switch(action.type){
        case 'ADD_TO_CART':
const newItem = action.payload;
const existItem = state.cart.cartItem.find((item) => item._id === newItem._id)

const cartItem = existItem?state.cart.cartItem.map((item) => item._id === existItem._id?newItem:item):[...state.cart.cartItem, newItem];
localStorage.setItem('CartItems', JSON.stringify(cartItem))
return {...state, cart:{...state.cart, cartItem}}
      
case 'CART_REMOVE_ITEM':{
        const cartItem = state.cart.cartItem.filter((item) => item._id !== action.payload._id);
localStorage.setItem('CartItems', JSON.stringify(cartItem))

        return {...state, cart:{...state.cart, cartItem}}
       }
            default :
            return state;
    }
}
export function StoreProvider(props){
    const[state, dispatch] = useReducer(cartReducer, initialValue)
    const value = {state, dispatch}
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}