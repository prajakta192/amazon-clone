import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
const [currency, setCurrency] = useState('INR');
const [curSymbol, setCurSymbol] = useState('₹')



useEffect(() => {
  if(currency === 'INR') {setCurSymbol('₹')}
    else if(currency === 'USD') {setCurSymbol('$')}
  
},[currency])


console.log(currency, curSymbol);

  return (
    <BrowserRouter>
      <header>
        <Link to='/'>amazona</Link>
        <select name='currency' onChange={(e) => {setCurrency(e.target.value)}} >
          <option value='INR'>INR</option>
          <option value='USD'>USD</option>
        </select>
      </header>
      <Routes>
        <Route path='/' element={<HomePage curSymbol={curSymbol}/>} />
        <Route path='/product/:id' element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
