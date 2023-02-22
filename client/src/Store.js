import { createContext, useEffect, useReducer, useState } from "react";
import CartPage from "./pages/CartPage";


export const Store = createContext()

const initialValue = {
    cart:{
        cartItem: localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
    }
}

function cartReducer(state,action){
    switch(action.type){
        case 'ADD_TO_CART':
const newItem = action.payload;
const existItem = state.cart.cartItem.find((item) => item._id === newItem._id)

const cartItem = existItem?state.cart.cartItem.map((item) => item._id === existItem._id?newItem:item):[...state.cart.cartItem, newItem];

localStorage.setItem('cartItems', JSON.stringify(cartItem));

return {...state, cart:{...state.cart, cartItem}}
      
case 'CART_REMOVE_ITEM':{
        const cartItem = state.cart.cartItem.filter((item) => item._id !== action.payload._id);
localStorage.setItem('cartItems', JSON.stringify(cartItem))

        return {...state, cart:{...state.cart, cartItem}}
       }
       case 'USER_SIGNIN' : 
       return{...state, userInfo:action.payload}
            default :
            return state;
    }
}
export function StoreProvider(props){
    const[state, dispatch] = useReducer(cartReducer, initialValue)
    
    //State for cart drawer
    const [isOpen, setIsOpen] = useState(false);
    const openCart = () => {
        setIsOpen(true)
    }
    const closeCart = () => {
        setIsOpen(false)
    }

    //state for currency
    const [currency, setCurrency] = useState('INR');
const [curSymbol, setCurSymbol] = useState('₹')

useEffect(() => {
    if(currency === 'INR') {setCurSymbol('₹')}
      else if(currency === 'USD') {setCurSymbol('$')}
    
  },[currency])

    const value = {openCart,closeCart, setCurrency, curSymbol,state, dispatch}

    return <Store.Provider value={value}>{props.children}
     <CartPage isOpen={isOpen} curSymbol={curSymbol} />
    </Store.Provider>
}