import React from 'react'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'
import { Apple, Play, Smartphone, Shield, Wifi } from 'lucide-react'

const Banner = () => {
  return (
    <section className='py-24 px-6 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-gradient-to-br from-[var(--color-primary)] to-[#0e7490] rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-cyan-900/40'>

          {/* Decorative Background Pattern */}
          <div className='absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white_0%,_transparent_40%)]'></div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center p-12 lg:p-20 relative z-10'>

            {/* Text Content */}
            <div className='space-y-10 text-center lg:text-left order-2 lg:order-1'>
              <div>
                <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6'>
                  Rent smarter. <br />
                  Drive faster.
                </h2>
                <p className='text-cyan-50 text-lg font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-90'>
                  Experience the ultimate convenience. Access our entire fleet, manage bookings, and unlock your vehicle directly from your smartphone.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                <button className='bg-white text-[var(--color-primary)] px-6 py-3.5 rounded-xl flex items-center gap-3 hover:bg-cyan-50 transition-colors font-semibold group shadow-lg shadow-cyan-900/10'>
                  <Apple size={24} className='fill-current' />
                  <div className='text-left leading-tight'>
                    <p className='text-[10px] font-bold uppercase tracking-wide opacity-60'>Download on the</p>
                    <p className='text-base font-bold'>App Store</p>
                  </div>
                </button>
                <button className='bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3.5 rounded-xl flex items-center gap-3 hover:bg-white/20 transition-colors font-semibold group'>
                  <Play size={24} className='fill-current' />
                  <div className='text-left leading-tight'>
                    <p className='text-[10px] font-bold uppercase tracking-wide opacity-80'>Get it on</p>
                    <p className='text-base font-bold'>Google Play</p>
                  </div>
                </button>
              </div>

              <div className='flex items-center justify-center lg:justify-start gap-8 border-t border-white/20 pt-8'>
                <div className='block'>
                  <p className='text-2xl font-bold text-white'>4.9</p>
                  <p className='text-cyan-100 text-xs font-semibold uppercase tracking-wider opacity-80'>App Store</p>
                </div>
                <div className='w-px h-8 bg-white/20'></div>
                <div className='block'>
                  <p className='text-2xl font-bold text-white'>50K+</p>
                  <p className='text-cyan-100 text-xs font-semibold uppercase tracking-wider opacity-80'>Downloads</p>
                </div>
              </div>
            </div>

            {/* App Visual */}
            <div className='relative flex justify-center lg:justify-end order-1 lg:order-2'>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className='relative z-20'
              >
                <div className='relative bg-cyan-950 rounded-[3rem] border-[8px] border-cyan-900/50 shadow-2xl w-[300px] h-[600px] overflow-hidden ring-1 ring-white/10'>
                  {/* Notch */}
                  <div className='absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-cyan-950 rounded-b-2xl z-30'></div>

                  {/* Status Bar */}
                  <div className='absolute top-2 right-5 z-30 flex gap-1.5'>
                    <div className='w-4 h-2.5 bg-white rounded-[1px]'></div>
                    <div className='w-0.5 h-1.5 bg-white rounded-[1px]'></div>
                  </div>

                  {/* Screen Content */}
                  <div className='h-full w-full bg-[#082f49] flex flex-col relative'>
                    {/* Car Image Header */}
                    <div className='h-[55%] relative'>
                      <img src={assets.main_car} className='w-full h-full object-cover' alt="App Screen" />
                      <div className='absolute inset-0 bg-gradient-to-b from-[#082f49]/40 via-transparent to-[#082f49]'></div>
                      <div className='absolute top-12 left-6 right-6 flex justify-between items-center text-white'>
                        <div className='p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10'><Smartphone size={18} /></div>
                        <div className='px-3 py-1 bg-white text-[var(--color-primary)] rounded-full text-[10px] font-bold uppercase shadow-sm'>Connected</div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className='flex-1 p-6 space-y-6 -mt-10 relative z-10'>
                      <div>
                        <h3 className='text-2xl font-bold text-white mb-1'>BMW M4 Comp</h3>
                        <p className='text-cyan-200/60 text-sm'>License: 4X-882-99</p>
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <div className='bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-sm'>
                          <div className='mb-2 text-cyan-200'><Wifi size={20} /></div>
                          <p className='text-white font-bold text-lg'>Locked</p>
                          <p className='text-cyan-200/60 text-xs'>Last sync: 1m</p>
                        </div>
                        <div className='bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-sm'>
                          <div className='mb-2 text-cyan-200'><Shield size={20} /></div>
                          <p className='text-white font-bold text-lg'>320 mi</p>
                          <p className='text-cyan-200/60 text-xs'>Range</p>
                        </div>
                      </div>

                      <button className='w-full py-4 bg-white text-[var(--color-primary)] font-bold rounded-xl active:scale-95 transition-transform shadow-lg'>Unlock Vehicle</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
