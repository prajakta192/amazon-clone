import React, { useContext } from 'react'
import {Badge } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Store } from '../Store'

const Header = (props) => {
    //console.log(props.setCurrency);
    const {setCurrency, toggleTheme}  = props;

    //using Context
const{state} = useContext(Store);

const {cart} = state;
console.log(cart)
  return (
    <div style={{marginBottom:'2rem'}}>
       <header>
        <Helmet>
          <title>amazona</title>
        </Helmet>
        <Link to='/'>amazona</Link>
        <div style={{display:'flex', flex:'1', justifyContent:'end',alignItems:'center', gap:'1em'}}>

        <select name='currency' onChange={(e) => {setCurrency(e.target.value)}} >
          <option value='INR'>INR</option>
          <option value='USD'>USD</option>
        </select>
        <div className="theme_cart">
        <input type="checkbox" onClick={toggleTheme}/>
            <Link to='/cart'>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            {
              cart.cartItem.length > 0 && (
                <Badge pill bg='danger'>
                  {cart.cartItem.reduce((a, c) => a + c.quantity,0)}
                </Badge>
                
              )
            }
            </Link>
        </div>
        </div>
      </header>
    </div>
  )
}

export default Header
