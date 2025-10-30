import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className='h-full  flex flex-col'>

      <Navbar />
      <Hero />

      </div>
  );
}

export default App;
