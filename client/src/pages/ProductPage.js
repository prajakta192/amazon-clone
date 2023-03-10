import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Card, Col, ListGroup, ListGroupItem, Row, Badge, Button, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import {Link, useParams} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import LoadingBox from '../components/LoadingBox';
import Ratings from '../components/Ratings';
import { Store } from '../Store';
import { errorMessage } from '../utils';

import { reducer } from '../Reducer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPage = () => {


  const { slug } = useParams(); // will use obj destructuring method

  //store for single product
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  //console.log(product)

  //fetching product with id
  useEffect(() => {
    const fetchProductsData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
      
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: errorMessage(err)});
      }
    };
    fetchProductsData();
  }, [slug]);
  
  //Add to cart

  const{curSymbol,state, dispatch:cxtDispatch} = useContext(Store)
const {cart} = state
//console.log(curSymbol)
 async function addToCartHandler(){
    //console.log('product', product, 'state', state)
    const existItem = cart.cartItem.find((item) => item._id === product._id);

    const quantity = existItem?existItem.quantity + 1:1;

    const {data} = await axios.get(`/api/products/${product._id}`)
    console.log('ProductPage' , {data})
    if(data.countInStock < quantity){
      toast(`Sorry, ${data.name} Product is out of stock. we will notify you once the product is back in stock.`);
      return;
      
    }

   return cxtDispatch({type : 'ADD_TO_CART', payload:{...product, quantity}}, toast('new product added to cart'));
   
   //navigate('/cart')
  }

  return (
   
    loading?<LoadingBox/>:error?<ErrorMessage variant='danger'>{error}</ErrorMessage>:
  <Container>
    <div>
      <Link className='Backto_arrow' to='/'>

    <i className="fa fa-solid fa-arrow-left"></i>
      </Link>
    </div>
  <Row style={{maxWidth:'100vw', paddingTop:'2.5rem'}}>
    <Col md={4}> 
      <img className='img-large' src={product.image} alt={product.name}/>
    </Col>
    <Col md={4}>
      <ListGroup variant='flush'>
        <ListGroupItem>
          <Helmet>

          <title>{product.name}</title>
          </Helmet>
        </ListGroupItem>
        <ListGroupItem>
          <Ratings ratings={product.rating} numReviews={product.numReviews}/>
        </ListGroupItem>
        <ListGroupItem>
        Price: {curSymbol}{product.price}
      </ListGroupItem>
      <ListGroupItem>
        Description : {product.description}
      </ListGroupItem>
      </ListGroup>
     
    </Col>
    <Col md={4}>
<Card>
  
    <ListGroup>
      <ListGroupItem>
      <Row>
    <Col>Price : {curSymbol}{product.price}</Col>
    </Row>
      </ListGroupItem>
      <ListGroupItem>
      <Row>
     
     <Col>Status:
     </Col>
     <Col>
     {product.countInStock > 0?
     <Badge bg="success">
     In Stock
   </Badge>:
   <Badge bg="danger">
   Unavailable
 </Badge>
   }
     </Col>
   </Row>
      </ListGroupItem>
      <ListGroupItem>
        {
          product.countInStock > 0 && (
            <ListGroupItem>
              <div className='d-grid'>
                <Button onClick={addToCartHandler} variant='primary'>Add to cart</Button>
              </div>
              <ToastContainer />
        </ListGroupItem>
          )
        }
      </ListGroupItem>
    </ListGroup>
    
</Card>
    </Col>
  </Row>
  </Container>
  );
};

export default ProductPage;
