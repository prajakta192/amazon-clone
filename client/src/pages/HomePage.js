import React, { useReducer } from 'react';
//import data from '../config/data';
import axios from 'axios';
import { useEffect} from 'react';
import Reducer from '../Reducer';
import Product from '../components/Product';
//console.log(data);




const HomePage = ({curSymbol, theme}) => {
  //console.log(curSymbol)

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
    <section className={`${theme}_theme products_section`}>
      <h1>Featured Products</h1>
      <section className='products'>
        {
        loading?<div>...Loading</div>:error?<div>{error}</div>:(
          products.map((product) => (
          
            <Product product={product} curSymbol={curSymbol} key={product.slug}/>
          
          ))
        )
        }
      </section>
      
    </section>
  );
};

export default HomePage;
