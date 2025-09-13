import React from 'react'

const Header = () => {
  return (
    <header className="top-0 left-0 w-full px-8 py-4k border-red-600 shadow-md bg-black z-50 border-b">
      <div className="flex justify-evenly items-center">
        <img className="w-25 h-25" src="/bg_favicon.png" alt="logo" />
        <p className="text-center faster-one-regular text-white text-3xl md:text-4xl font-bold tracking-widest">
          Begamer <span className="text-center text-red-600">Games</span>
        </p>
      </div>
    </header>
  )
}

export default Header
