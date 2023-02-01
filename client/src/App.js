import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
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
console.log(currency, curSymbol);

  return (
    <BrowserRouter>
     <main className={`${theme}_theme`}>

<Header setCurrency={setCurrency} toggleTheme={toggleTheme}/>

<Routes>

  <Route path='/' element={<HomePage curSymbol={curSymbol}/>} />
  <Route path='/products/:slug' element={<ProductPage />} />
</Routes>
</main>
    </BrowserRouter>
  );
}

export default App;
