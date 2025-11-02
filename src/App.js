import logo from './logo.svg';
import './App.css';
import Hero from './components/Hero';
import { BrowserRouter, RouterProvider, Routes } from 'react-router';
import { Route } from 'react-router';
import WalletGenerator from './components/WalletGenerator';
import ImportOrAdd from './components/ImportOrAdd';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
    <Route path='/' element={<Hero />} />
    <Route path='/:chain' element={<ImportOrAdd />} />
    <Route path='/:chain/wallet' element={<WalletGenerator/>} />
      </Routes>      
    </BrowserRouter>
  
  );
}

export default App;
