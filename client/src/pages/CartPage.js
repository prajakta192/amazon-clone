import React, { useContext } from 'react'
import {Row,Col, ListGroup, Button, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { Store } from '../Store'

const CartPage = () => {
const {state, dispatch} = useContext(Store);
const {cart} = state
console.log(state,dispatch, cart)

  return (
    <div>

    <Helmet>
      <title>Shopping Cart</title>
    </Helmet>
    {
                    cart.cartItem.length === 0 ?
  (

                    <ErrorMessage>
                        Cart is empty. <Link to='/'>Go Shopping</Link>
                    </ErrorMessage>
  ):
  (
        <Row>
            <Col md={8}>
              
  
    <ListGroup style={{border:'1px solid lightgray'}}>
        {
            cart.cartItem.map((item) => (
              <ListGroup.Item key={item._id} style={{borderBottom:'1px solid lightgray', paddingTop: '1.2em'}}>
                <Row className='align-items-center'>
                <Col md={4}>
                <Link to={`/products/${item.slug}`}>
                    <img src={item.image} alt={item.name} className='img-fluid rounded img-thumbnail'/>
                   <h6>
                   {item.name}
                    </h6>
                   </Link>
                </Col>
                <Col md={3}>
                    <Button variant='light' disabled={item.quantity === 0}
                    >
                        <i className='fa fa-minus-circle'></i>
                    </Button>
                    <span>{item.quantity}</span>
                    <Button variant='light' disabled={item.quantity === item.countInStock}
                    >
                        <i className='fa fa-plus-circle'></i>
                    </Button>
                </Col>
                <Col md={3}>
                    {item.price}
                </Col>
                <Col md={2}>
                <Button variant='light'
                    >
                        <i className='fa fa-trash'></i>
                    </Button>
                </Col>
                </Row>
                </ListGroup.Item> 
            ))
        }
    </ListGroup>
  
               
 </Col>
<Col md={4}>
    <Card>
        <Card.Body>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h6>
                        Subtotal ({cart.cartItem.reduce((a,c) => a + c.quantity, 0)} items) : {cart.cartItem.reduce((a,c) => a + c.price* c.quantity, 0)}
                    </h6>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
                
            </Col>
          
        </Row>
        )
    }
   
    </div>
  )
}

export default CartPage
