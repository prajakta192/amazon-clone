import React, { useReducer } from 'react';
import axios from 'axios';
import { useEffect} from 'react';
import Reducer from '../Reducer';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import ErrorMessage from '../components/ErrorMessage';
import { ToastContainer } from 'react-toastify';

const HomePage = () => {
  
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

//console.log(products);

  return (
    <section className='pt-4'>
      <h1 style={{fontSize : '1rem'}}>Featured Products</h1>
      <section className='products'>
        {
        loading?<LoadingBox />:error?<ErrorMessage variant='danger'>{error}</ErrorMessage>:(
          products.map((product) => (
          
            <Product product={product} key={product.slug}/>
          
          ))
          
        )
        }
      </section>
      <ToastContainer />
    </section>
  );
};

export default HomePage;
