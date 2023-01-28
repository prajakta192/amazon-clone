import React, { useReducer } from 'react';
//import data from '../config/data';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//console.log(data);

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


const HomePage = ({curSymbol}) => {
  console.log(curSymbol)

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
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
