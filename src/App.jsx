
import { BrowserRouter, Route } from 'react-router'
import './App.css'
import Hero from './components/Hero'
import SeedPhrase from './components/SeedPhrase'
import { Routes } from 'react-router'
import GenerateSeed from './components/GenerateSeed'
function App() {


  return (
    <>
  <BrowserRouter basename='/'>
  <Routes>
    <Route path='/' element={<Hero/>}/>
    <Route path='/seedPhrase' element={<SeedPhrase/>} />
    <Route path='/generateseed' element={<GenerateSeed/>}/>
  </Routes>
  </BrowserRouter>

    </>
  )
}

export default App
