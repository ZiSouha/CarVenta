import React from 'react'

const Title = ({ title, subTitle, align }) => {
  return (
    <div className={`space-y-4 ${align === "left" ? "text-left items-start" : "text-center items-center"} flex flex-col`}>
      <h2 className='text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none'>
        {title}
      </h2>
      <p className='text-slate-500 font-medium text-sm md:text-base max-w-xl leading-relaxed'>
        {subTitle}
      </p>
      <div className={`h-1 w-12 bg-[var(--color-primary)] rounded-full ${align === "left" ? "" : "mx-auto"}`}></div>
    </div>
  )
}

export default Title
