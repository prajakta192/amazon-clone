import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  
const [currency, setCurrency] = useState('INR');
const [curSymbol, setCurSymbol] = useState('₹')

//state for theme
const [theme, setTheme] = useState('light')

useEffect(() => {
  if(currency === 'INR') {setCurSymbol('₹')}
    else if(currency === 'USD') {setCurSymbol('$')}
  
},[currency])

function toggleTheme() {
  if(theme === 'light') {setTheme('dark')}
  else{
    setTheme('light')
  }
}

const [state,setState] = useState(false)

function drawerToggleClickHandler() {
  setState({
    state: !state
  })
}


//console.log(currency, curSymbol);

  return (
    <BrowserRouter>
    <main>

     <Header setCurrency={setCurrency} toggleTheme={toggleTheme}  toggle={drawerToggleClickHandler} />
     <Container fluid  className={`${theme}_theme mt-2`}>
      <Routes>
        <Route path='/' element={<HomePage curSymbol={curSymbol}/>} />
        <Route path='/products/:slug' element={<ProductPage curSymbol={curSymbol}/>} />
      <Route path='/cart' element={<CartPage  show={state} curSymbol={curSymbol} />}/>
      </Routes>
     </Container>
    </main>
    </BrowserRouter>
  );
}

export default App;
