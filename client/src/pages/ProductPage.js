import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Card, Col, ListGroup, ListGroupItem, Row, Badge, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Ratings from '../components/Ratings';
import {reducer} from '../Reducer'



const ProductPage = () => {
 //console.log(products)
  //const param = useParams(); //returns obj. with key/value of currrent URL.
  //console.log(param.id);

  const { slug } = useParams(); // will use obj destructuring method

  console.log(slug)
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  console.log(product)

  useEffect(() => {
    const fetchProductsData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
      
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchProductsData();
  }, [slug]);
  
  
  return (loading?<div>...Loading</div>:error?<div>{error}</div>:
  <Row style={{maxWidth:'100vw'}}>
    <Col md={5}> 
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
        Price: ${product.price}
      </ListGroupItem>
      <ListGroupItem>
        Description : {product.description}
      </ListGroupItem>
      </ListGroup>
     
    </Col>
    <Col md={3}>
<Card>
  <Card.Body>
    <ListGroup>
      <ListGroupItem>
      <Row>
    <Col>Price : {product.price}</Col>
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
                <Button variant='primary'>Add to cart</Button>
              </div>
        </ListGroupItem>
          )
        }
      </ListGroupItem>
    </ListGroup>
   
    
  </Card.Body>
</Card>
    </Col>
  </Row>
  );
};

export default ProductPage;
