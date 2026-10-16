import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Apple, Play, Smartphone, Wifi, Lock } from 'lucide-react'
import { assets } from '../assets/assets'

const DigitalCockpit = () => {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

    return (
        <section ref={sectionRef} className='relative min-h-[120vh] overflow-hidden bg-[#0a0a0a]' id="app">

            {/* 1. Immersive Background Layer */}
            <div className='absolute inset-0 z-0'>
                <motion.div style={{ scale, y }} className='w-full h-full'>
                    <img
                        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
                        className='w-full h-full object-cover opacity-40 grayscale-[0.5]'
                        alt="Driver POV"
                    />
                </motion.div>
                <div className='absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40'></div>
            </div>

            {/* 2. Floating UI Cockpit */}
            <div className='relative z-10 flex flex-col items-center justify-center min-h-[100vh] text-center px-6'>

                <motion.div style={{ opacity }} className='max-w-4xl mx-auto'>

                    {/* Floating Phone Element - Institutional Style */}
                    <div className='mb-16 relative inline-block'>
                        <div className='relative bg-slate-900 border border-slate-800 p-2 rounded-[3.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.8)] rotate-[-4deg] transition-transform duration-700 ease-out'>
                            <div className='w-[280px] h-[580px] bg-black rounded-[3rem] overflow-hidden relative border border-slate-800'>
                                {/* App Header */}
                                <div className='h-1/3 bg-[#0891b2]/5 relative p-8 flex flex-col justify-end border-b border-slate-800/50'>
                                    <div className='absolute top-8 left-8 right-8 flex justify-between text-slate-500'>
                                        <Smartphone size={16} />
                                        <div className='flex items-center gap-1'>
                                            <span className='w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-pulse'></span>
                                            <span className='text-[9px] font-bold tracking-widest'>ENCRYPTED</span>
                                        </div>
                                    </div>
                                    <h3 className='text-xl font-bold text-white mb-1'>Fleet Control</h3>
                                    <p className='text-[#0891b2] font-bold text-xs uppercase tracking-widest'>System Active</p>
                                </div>
                                {/* App Body */}
                                <div className='p-8 space-y-10'>
                                    <div className='flex items-center justify-center py-6'>
                                        <div className='w-36 h-36 rounded-full border-2 border-slate-800 flex items-center justify-center relative cursor-pointer active:scale-95 transition-transform'>
                                            <div className='absolute inset-0 border-2 border-[#0891b2] border-t-transparent rounded-full animate-spin duration-[4s]'></div>
                                            <Lock size={32} className='text-white' />
                                        </div>
                                    </div>
                                    <div className='text-center space-y-2'>
                                        <p className='text-white font-bold text-lg tracking-tight'>Authentication</p>
                                        <div className='flex justify-center gap-1'>
                                            {[1, 2, 3, 4].map(i => <div key={i} className='w-2 h-2 rounded-full bg-slate-800'></div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Status Tags */}
                        <div className='absolute -right-20 top-1/2 -translate-y-1/2 space-y-4 hidden lg:block'>
                            <div className='px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-lg text-white text-[10px] font-black tracking-widest uppercase flex items-center gap-2'>
                                <Wifi size={12} className='text-[#0891b2]' /> 5G Telemetry
                            </div>
                        </div>
                    </div>

                    <h2 className='text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-none'>
                        The Digital <span className='text-[#0891b2]'>Cockpit.</span>
                    </h2>

                    <p className='text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed'>
                        Command your fleet with institutional-grade precision. <br />
                        <span className='text-white'>No queues. No physical keys. Total control.</span>
                    </p>

                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                        <button className='w-full sm:w-auto bg-white text-slate-900 px-10 py-4 rounded-lg font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-100 transition-all'>
                            <Apple size={20} className='fill-current' />
                            App Store
                        </button>
                        <button className='w-full sm:w-auto bg-[#0891b2] text-white px-10 py-4 rounded-lg font-bold text-sm flex items-center justify-center gap-3 hover:bg-[#0e7490] transition-all'>
                            <Play size={20} className='fill-current' />
                            Play Store
                        </button>
                    </div>

                </motion.div>
            </div>

        </section>
    )
}

export default DigitalCockpit
