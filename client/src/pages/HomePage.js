import React from 'react';
import data from '../config/data';
import { Link } from 'react-router-dom';

console.log(data);

const HomePage = () => {
  return (
    <main>
      <h1>Featured Products</h1>
      <section className='products'>
        {data.products.map((product) => (
          <div className='product' key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className='product_info'>
              <span>{product.name}</span>
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
