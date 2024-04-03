import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth } from './pages/auth/index'
import About from './pages/About';
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { Toaster } from 'react-hot-toast';
import HomeContainer from './pages/HomeContainer';
import TransactionContainer from './components/TransactionContainer';

function App() {
  const size = 30;

  // theme light & dark
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    setDark(!dark);
  }

  return (
    <div className='h-screen flex flex-col justify-between bg-white text-black dark:bg-slate-900 dark:text-white transition-all duration-300'>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />

          <Route path="/home-container" exact element={<HomeContainer />} />
          <Route path="/add/" exact element={<TransactionContainer />} />
          <Route path="/expense-tracker/about" exact element={<About />} />
        </Routes>
      </Router>

      <div className='flex items-center justify-center bg-white text-black dark:text-white dark:bg-gray-800 transition-all duration-300'>
        <button
          onClick={toggleTheme}
          className='text-gray-800 dark:text-white px-5 py-3 rounded hover:text-stone-700'>
          {dark ? <><IoMdSunny size={size} /></> : <><IoMdMoon size={size} /></>}
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default App
