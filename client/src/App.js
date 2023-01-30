import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
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

<header>
  <Link to='/'>amazona</Link>
  <div style={{display:'flex', justifyContent:'space-between'}}>

  <select name='currency' onChange={(e) => {setCurrency(e.target.value)}} >
    <option value='INR'>INR</option>
    <option value='USD'>USD</option>
  </select>
  <div className="toggle-btn-section"><div className="toggle-checkbox m-vertical-auto">
    <input className="toggle-btn__input" type="checkbox" name="checkbox" />
    <button type="button" className="toggle_btn" onClick={toggleTheme}></button></div></div>
  </div>
</header>
<Routes>
  <Route path='/' element={<HomePage curSymbol={curSymbol}/>} />
  <Route path='/product/:id' element={<ProductPage />} />
</Routes>
</main>
    </BrowserRouter>
  );
}

export default App;
