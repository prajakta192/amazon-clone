import React, { useContext } from 'react'
import {Button, Container, Nav, Navbar} from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import { Store } from '../Store'

const Header = ({toggleTheme}) => {


    //using Context
const{setCurrency,openCart, state} = useContext(Store);

const {cart} = state;

//console.log(cart)
  return (
    
        <Navbar className='bg-dark shadow-sm' expand="lg" sticky="top">
      <Container>
      <Helmet>
          <title>amazona</title>
        </Helmet>
        <Nav  className="me-auto">

        <Nav.Link to='/' as={NavLink}>amazona</Nav.Link>
        </Nav>
       
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" style={{gap:'1rem'}}>
          
          <select name='currency' onChange={(e) => {setCurrency(e.target.value)}} >
          <option value='INR'>INR</option>
          <option value='USD'>USD</option>
        </select>
            
        <div className="theme_cart">
        <input type="checkbox" onClick={toggleTheme}/>
     
            <Button  onClick={openCart} variant='outline-warning' className='rounded-circle' style={{ width: "2rem", height: "2rem", position: "relative", display:'flex',justifyContent:'center',alignItems:'center'}}>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
           
            {
              cart.cartItem.length > 0 && (
                <div
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{
                  color: "white",
                  width: "1rem",
                  height: "1rem",
                  fontSize:'12px',
                  fontWeight:'bold',
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%, 25%)",
                }}
              >
                 {cart.cartItem.reduce((a, c) => a + c.quantity,0)}
                 
                   
                  
                </div>
              )
            }
             </Button>
        </div>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header


