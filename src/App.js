import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { BrowserRouter, RouterProvider, Routes } from 'react-router';
import { Route } from 'react-router';
import WalletGenerator from './components/WalletGenerator';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
    <Route path='/' element={<Hero />} />
    <Route path='/wallet' element={<WalletGenerator/>} />
      </Routes>      
    </BrowserRouter>
  
  );
}

export default App;
