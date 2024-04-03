import React from 'react'
import Header from './Header'

const About = () => {
  return (
    <div className='h-screen px-2 text-center bg-white text-black dark:bg-gray-800 dark:text-white transition-all duration-300'>
        <Header />
        <div className="m-4 text-2xl font-normal leading-none tracking-tight text-gray-900 dark:text-white">About</div>
        <p>Expense Tracker is programmed using React JS Library, Firebase Cloud Database, Tailwind CSS. </p>
    </div>
  )
}

export default About