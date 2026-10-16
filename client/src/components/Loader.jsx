import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-[80vh] bg-white'>
      <div className='relative w-16 h-16'>
        <div className='absolute inset-0 rounded-full border-4 border-slate-50'></div>
        <div className='absolute inset-0 rounded-full border-4 border-t-blue-600 animate-spin'></div>
      </div>
    </div>
  )
}

export default Loader
