
import { BrowserRouter, Route } from 'react-router'
import './App.css'
import Hero from './components/Hero'
import SeedPhrase from './components/SeedPhrase'
import { Routes } from 'react-router'
function App() {


  return (
    <>
  <BrowserRouter basename='/'>
  <Routes>
    <Route path='/' element={<Hero/>}/>
    <Route path='/seedPhrase' element={<SeedPhrase/>} />
  </Routes>
  </BrowserRouter>

    </>
  )
}

export default App
