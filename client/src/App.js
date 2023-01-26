import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to='/'>amazona</Link>
      </header>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/product/:id' element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
