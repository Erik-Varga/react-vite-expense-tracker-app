import React from 'react'
import { BsCashCoin } from 'react-icons/bs'

const Logo = () => {
  return (
    <div className='relative'>
        <span className="flex justify-center items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">Expense Tracker</h1>
            <BsCashCoin className="text-2xl md:text-3xl lg:text-4xl" />
        </span>
    </div>
  )
}

export default Logo