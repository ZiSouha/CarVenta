import React from 'react'
import { motion } from 'motion/react'
import Title from './Title'
import { Car, ShieldCheck, Banknote, CalendarDays, Sparkles, Clock, Globe, Zap } from 'lucide-react'

const WhyChooseUs = () => {

    const features = [
        {
            title: "Premium Fleet",
            desc: "Unrivaled selection of the world's finest vehicles, from executive sedans to exotic supercars.",
            icon: <Car size={24} />
        },
        {
            title: "Elite Concierge",
            desc: "24/7 dedicated support team trained to handle your every request with absolute precision.",
            icon: <Clock size={24} />
        },
        {
            title: "Guaranteed Value",
            desc: "Competitive pricing structures with no hidden fees, providing the best market value for luxury travel.",
            icon: <Banknote size={24} />
        },
        {
            title: "Ultimate Flexibility",
            desc: "Modify or cancel your reservation up to 24 hours prior with our effortless one-tap system.",
            icon: <CalendarDays size={24} />
        }
    ]

    return (
        <section className='py-24 px-6 bg-white relative'>
            <div className='max-w-7xl mx-auto'>
                <div className='mb-20 pb-6 border-b border-slate-200'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
                        <div className='space-y-1'>
                            <h2 className='text-3xl font-bold text-slate-900'>The CarVenta Standard</h2>
                            <p className='text-slate-500 text-sm'>Why discerning drivers choose our institutional-grade rental platform.</p>
                        </div>
                        <div className='flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest'>
                            <Sparkles size={14} className='text-[#0891b2]' />
                            Certified Excellence
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className='p-8 rounded-lg border border-slate-200 hover:border-[#0891b2]/50 hover:bg-slate-50/50 transition-all group'
                        >
                            <div className='w-12 h-12 rounded-lg bg-cyan-50 text-[#0891b2] flex items-center justify-center mb-6 border border-cyan-100 group-hover:scale-110 transition-transform'>
                                {feature.icon}
                            </div>
                            <h3 className='text-lg font-bold text-slate-900 mb-3'>{feature.title}</h3>
                            <p className='text-slate-500 text-sm leading-relaxed font-medium'>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
