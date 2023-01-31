import React, { useReducer } from 'react';
//import data from '../config/data';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect} from 'react';
import Reducer from '../Reducer';
import Ratings from '../components/Ratings';

//console.log(data);


const HomePage = ({curSymbol}) => {
  console.log(curSymbol)

  const [{ loading, error, products }, dispatch] = useReducer(Reducer, {
    products: [],
    loading: true,
    error: "",
  });
  //const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get('/api/products');
      //console.log(result.data);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      
      
      //setProducts(result.data);
    };
    fetchProductsData();
  }, []);

console.log(products);

  return (
    <main>
      <h1>Featured Products</h1>
      <section className='products'>
        {
        loading?<div>Loading</div>:error?<div>{error}</div>:
       

        products.map((product) => (
         
          <div className='product' key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className='product_info'>
              <Link to={`/product/${product.slug}`}>
                <span>{product.name}</span>
              </Link>
              <Ratings ratings= {product.rating} numReviews={product.numReviews}/>
               <span>
                <strong>{curSymbol} {product.price}</strong>
              </span>
            </div>
          </div>
        
        ))}
      </section>
    </main>
  );
};

export default HomePage;
