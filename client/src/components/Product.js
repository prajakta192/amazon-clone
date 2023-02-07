import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import Ratings from './Ratings';
import { Store } from '../Store';
import { toast} from 'react-toastify';
import axios from 'axios';


const Product = ({product, curSymbol}) => {
  
  const{state, dispatch:cxtDispatch} = useContext(Store);
  const {cart} = state;


  async function addToCartHandler (){
    //console.log('product', product, 'state', state)

    const existItem = cart.cartItem.find((item) => item._id === product._id);

    const quantity = existItem?existItem.quantity + 1:1;

    const {data} = await axios.get(`/api/products/${product._id}`)
    if(data.countInStock < quantity){
      toast(`Sorry, ${data.name} Product is out of stock. we will notify you once the product is back in stock.`);
      return;
      
    }

   return cxtDispatch({type : 'ADD_TO_CART', payload:{...product, quantity}}, toast('new product added to cart'));

   
  } 


  return (
    <div className='product' key={product.slug}>
               
              <Link to={`/products/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className='product_info'>
                <Link to={`/products/${product.slug}`}>
                  <span>{product.name}</span>
                </Link>
            <Ratings ratings = {product.rating} numReviews = {product.numReviews}/>
            <div className='mt-2' style={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
  
                <span>
                  <strong>{curSymbol} {product.price} </strong>
                </span>
                <span>
  
                <Button className='btn-sm xx_small-font' onClick={addToCartHandler}> Add to cart</Button>
               
                </span>
            </div>
              </div>
            </div>
             
  )
}

export default Product
