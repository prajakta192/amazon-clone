import React, {useState } from 'react';
import { Container } from 'react-bootstrap';
import {Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ShippingPage from './pages/ShippingPage';
import SigninPage from './pages/SigninPage';

function App() {
//state for theme
const [theme, setTheme] = useState('light')


function toggleTheme() {
  if(theme === 'light') {setTheme('dark')}
  else{
    setTheme('light')
  }
}

  return (
   
    <main>

     <Header toggleTheme={toggleTheme}/>
     <Container fluid  className={`${theme}_theme mt-2 py-4`}>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/products/:slug' element={<ProductPage/>} />
      {/* <Route path='/cart' element={<CartPage curSymbol={curSymbol} />}/> */}
      <Route path = '/signin' element={<SigninPage/>} />
      <Route path='/shipping' element={<ShippingPage/>}/>
      </Routes>
      <CartPage/>
     </Container>
    </main>
    
  );
}

export default App;
