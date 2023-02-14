import React, { useContext} from 'react'
import {Row,Col, ListGroup, Button, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { Store } from '../Store'

const CartPage = ({show,curSymbol}) => {

    
const {state, dispatch} = useContext(Store);
const {cart} = state
// console.log(state,dispatch, cart)
const minusItemHandler = (item,i) => {
console.log(item,i);

}


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
   
        <Row style={{minHeight:'100%',margin:'1rem'}}>
            <Col md={12} className='padding_0'>
              
  
    <ListGroup style={{border:'1px solid lightgray'}}>
        {
            cart.cartItem.map((item,index) => (
              <ListGroup.Item key={item._id} style={{borderBottom:'1px solid lightgray'}}>
                <Row className='align-items-center'>
                <Col md={5} style={{textAlign:'center'}}>
                <Link to={`/products/${item.slug}`}>
                    <img src={item.image} alt={item.name} className='img-fluid rounded img-thumbnail'/>
                    
                   <h6 style={{fontSize:'.67em', marginTop:'.6em'}}>
                   {item.name}
                    </h6>
                     </Link>
                     </Col>
                <Col md={3} className='d-flex align-items-center' style={{gap:'10px'}}>
                    <Button variant='light' style={{padding:0}} disabled={item.quantity === 0}  onClick={() => minusItemHandler(item,index)}
                    >
                        <i className='fa fa-minus-circle'></i>
                    </Button>
                    <span>{item.quantity}</span>
                    <Button variant='light' style={{padding:0}} disabled={item.quantity === item.countInStock}
                    >
                        <i className='fa fa-plus-circle'></i>
                    </Button>
                </Col>
                <Col md={2}>
                {curSymbol}{item.price}
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
<Col md={12} style={{textAlign:'center'}} className='padding_0'>
    <Card>
    
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h6 style={{fontSize:'.9rem'}}>
                        Subtotal ({
                          cart.cartItem.reduce((a,c) => a + c.quantity, 0) } items ): {curSymbol}{cart.cartItem.reduce((a,c) => a + c.price* c.quantity, 0)}
                    </h6>
                </ListGroup.Item>
            </ListGroup>
        
    </Card>
                
            </Col>
            <Col md={12} className='padding_0 text-center'>
                <ListGroup>
                    <ListGroup.Item>
                         <Button type='button' varaint='primary' disabled={cart.cartItem.length === 0}>
                            Proceed to Pay
                         </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
          
        </Row>
        )
    }
   
    </div>
  )
}

export default CartPage
