import axios from 'axios';
import React, { useContext} from 'react'
import {Row,Col, ListGroup, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ErrorMessage from '../components/ErrorMessage';
import { Store } from '../Store'

const CartPage = ({show,curSymbol}) => {

    
const {state, dispatch:cxtDispatch} = useContext(Store);
const {cart} = state
// console.log(state,dispatch, cart)




const updateCartHandler = async (item,quantity) => {
console.log(item,quantity);
const {data} = await axios.get(`/api/products/${item._id}`);
    if(data.countInStock < quantity){
        toast('Sorry, Product is out of Stock');
        return;
    }
    return cxtDispatch({type : 'ADD_TO_CART', payload:{...item, quantity}});
}

const removeItemHandler = (item) => {
    cxtDispatch({type : 'CART_REMOVE_ITEM', payload:item})
}

  return (
    <div>

   
    {
                    cart.cartItem.length === 0 ?
  (

                    <ErrorMessage>
                        Cart is empty. <Link to='/'>Go Shopping</Link>
                    </ErrorMessage>
  ):
  (
   
    
        <Row style={{
            padding:'2rem',columnGap:'3.5rem'}}>

                <Col md={12} style={{marginBottom:'1rem', fontFamily:'cursive'}}>
                <h3>Shopping Cart</h3>
                </Col>
            <Col md={7} className='padding_0'>
              
  
    <ListGroup style={{border:'1px solid lightgray'}}>
        {
            cart.cartItem.map((item,index) => (
              <ListGroup.Item key={item._id} style={{borderBottom:'1px solid lightgray'}}>
                <Row className='align-items-center text-center'>
                <Col sm={5} style={{textAlign:'center'}}>
                <Link to={`/products/${item.slug}`}>
                    <img src={item.image} alt={item.name} className='img-fluid rounded img-thumbnail'/>
                    
                   <h6 style={{fontSize:'.67em', marginTop:'.6em'}}>
                   {item.name}
                    </h6>
                     </Link>
                     </Col>
                <Col sm={3} className='d-flex align-items-center justify-content-center' style={{gap:'10px'}}>
                    <Button variant='light' style={{padding:0}} disabled={item.quantity === 1}  onClick={() => updateCartHandler(item, item.quantity - 1)}
                    >
                        <i className='fa fa-minus-circle'></i>
                    </Button>
                    <span>{item.quantity}</span>
                    <Button variant='light' style={{padding:0}} disabled={item.quantity === item.countInStock} onClick={() => updateCartHandler(item, item.quantity + 1)}
                    >
                        <i className='fa fa-plus-circle'></i>
                    </Button>
                </Col>
                <Col sm={2}>
                {curSymbol}{item.price}
                </Col>
                <Col sm={2}>
                <Button variant='light' onClick={() => removeItemHandler(item)}
                    >
                        <i className='fa fa-trash'></i>
                    </Button>
                </Col>
                </Row>
                <ToastContainer/>
                </ListGroup.Item> 
            ))
        }
    </ListGroup>
  
               
 </Col>
<Col md={4} style={{textAlign:'center'}} className='padding_0'>
    <Card>
    
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h6 style={{fontSize:'.9rem'}}>
                        Subtotal ({
                          cart.cartItem.reduce((a,c) => a + c.quantity, 0) } items ): {curSymbol}{cart.cartItem.reduce((a,c) => a + c.price* c.quantity, 0)}
                    </h6>
                </ListGroup.Item>
            </ListGroup>
        
    <Col md={12} className='padding_0 text-center'>
                <ListGroup>
                    <ListGroup.Item>
                         <Button type='button' varaint='primary' disabled={cart.cartItem.length === 0}>
                            Proceed to Checkout
                         </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
    </Card>
                
            </Col>
            
          
        </Row>
        )
    }
   
    </div>
  )
}

export default CartPage
