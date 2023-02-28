import axios from 'axios';
import React, { useContext} from 'react'
import {Row,Col, ListGroup, Button, Offcanvas, Stack } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ErrorMessage from '../components/ErrorMessage';
import { Store } from '../Store'

const CartPage = ({curSymbol,isOpen}) => {
    const navigate = useNavigate();
   // console.log(isOpen)
const {closeCart, state, dispatch:cxtDispatch} = useContext(Store);
const {cart} = state
// console.log(state,dispatch, cart)



const updateCartHandler = async (item,quantity) => {
//console.log(item,quantity);
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


const checkOutHandler = () => {
    //console.log('checkout');
    navigate('/signin?redirect=/shipping')
}
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
           
{
                cart.cartItem.length === 0 ?
(

                <ErrorMessage>
                      Cart is empty.<Link to="/">Go Shopping</Link>
                    
                </ErrorMessage>
):
(
    <Stack>
        
<ListGroup style={{border:'1px solid lightgray'}}>
    {
        cart.cartItem.map((item) => (
          <ListGroup.Item key={item._id} className='mb-3' style={{borderBottom:'1px solid lightgray'}}>
           
            <Row className="align-items-center">
           <Col xs={4}>
                <img src={item.image} alt={item.name} className='img-fluid rounded img-thumbnail'/>
              
               <h6 style={{fontSize:'.67em', marginTop:'.6em'}}>
               {item.name}
                </h6>
               </Col>
               <Col xs={4}>
                <Row>
                    <Col xs={4}>

                <Button variant='light' style={{padding:0}} disabled={item.quantity === 1}  onClick={() => updateCartHandler(item, item.quantity - 1)}
                >
                    <i className='fa fa-minus-circle'></i>
                    </Button>
                    </Col>
                    <Col xs={4}>

                <span>{item.quantity}</span>
                    </Col>
                    <Col xs={4}>

                <Button variant='light' style={{padding:0}} disabled={item.quantity === item.countInStock} onClick={() => updateCartHandler(item, item.quantity + 1)}
                >
                    <i className='fa fa-plus-circle'></i>
                </Button>
                    </Col>
                </Row>
                
            
          </Col>
          <Col xs={2}>
           <span> {curSymbol}{item.price * item.quantity}</span>
           </Col>
           <Col xs={2}>
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
<ListGroup>
            <ListGroup.Item>
<Row className='g-3'>

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
                     <Button type='button' varaint='primary' disabled={cart.cartItem.length === 0} onClick={checkOutHandler}>
                        Proceed to Checkout
                     </Button>
                </ListGroup.Item>
            </ListGroup>
        </Col>
        </Row>
</ListGroup.Item>
</ListGroup>
            
        
        
        </Stack>
   
    )
}

           
        </Offcanvas.Body>
    </Offcanvas>
  )
    
}

export default CartPage
