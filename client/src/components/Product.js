import React from 'react'
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap'
import Ratings from './Ratings';
const Product = ({product, curSymbol}) => {
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
            <div style={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
  
                <span>
                  <strong>{curSymbol} {product.price} </strong>
                </span>
                <span>
  
                <Button> Add to cart</Button>
                </span>
            </div>
              </div>
            </div>
  )
}

export default Product
