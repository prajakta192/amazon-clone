import React from 'react';
//import data from '../config/data';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

//console.log(data);

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const result = await axios.get('/api/products');
      //console.log(result.data);
      setProducts(result.data);
    };
    fetchProductsData();
  }, []);

  console.log(products);

  return (
    <main>
      <h1>Featured Products</h1>
      <section className='products'>
        {products.map((product) => (
          <div className='product' key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className='product_info'>
              <Link to={`/product/${product.slug}`}>
                <span>{product.name}</span>
              </Link>
              <span>
                <strong>{product.price}</strong>
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
