import React from 'react'
import { motion } from 'motion/react'
import { Search, CalendarCheck, Key, ArrowRight, MousePointer2, ShieldCheck, Zap } from 'lucide-react'

const HowItWorks = () => {

    const steps = [
        {
            title: "Discover & Filter",
            desc: "Browse our elite collection with advanced filters for performance, brand, and occasion.",
            icon: <Search size={20} />
        },
        {
            title: "Seamless Booking",
            desc: "Secure your vehicle instantly with our encrypted one-tap reservation system.",
            icon: <CalendarCheck size={20} />
        },
        {
            title: "Digital Key",
            desc: "Unlock your vehicle via our secure mobile app and start your journey immediately.",
            icon: <Key size={20} />
        }
    ]

    return (
        <section className='py-24 px-6 bg-white border-t border-slate-100'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-20'>
                    <div className='max-w-xl space-y-4'>
                        <span className='inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-100 rounded-md text-[10px] font-bold uppercase tracking-widest text-[#0891b2]'>
                            <MousePointer2 size={12} /> Simple 3-Step Process
                        </span>
                        <h2 className='text-4xl md:text-5xl font-bold text-slate-900 tracking-tight'>
                            From booking to <br /> driving in <span className='text-[#0891b2]'>minutes.</span>
                        </h2>
                    </div>
                    <div className='lg:w-1/3 p-6 border-l-4 border-slate-200 bg-slate-50/50 rounded-r-lg'>
                        <p className='text-slate-500 font-medium text-sm leading-relaxed'>
                            We've digitized every point of friction to deliver an institutional-grade rental experience that feels like the future.
                        </p>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className='group p-10 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-all'
                        >
                            <div className='flex items-center justify-between mb-10'>
                                <div className='w-12 h-12 rounded-lg bg-cyan-50 text-[#0891b2] flex items-center justify-center border border-cyan-100 group-hover:scale-110 transition-transform'>
                                    {step.icon}
                                </div>
                                <span className='text-3xl font-black text-slate-100'>0{index + 1}</span>
                            </div>

                            <h3 className='text-xl font-bold text-slate-900 mb-3'>{step.title}</h3>
                            <p className='text-slate-500 text-sm leading-relaxed mb-8'>{step.desc}</p>

                            <div className='flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-[#0891b2] transition-colors tracking-widest uppercase'>
                                Explore the process <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
