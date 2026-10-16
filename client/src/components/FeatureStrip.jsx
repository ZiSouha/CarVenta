import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { assets } from '../assets/assets'

const FeatureStrip = () => {
    return (
        <section className='bg-white overflow-hidden'>

            {/* 1. CONCIERGE DELIVERY */}
            <div className='flex flex-col md:flex-row items-stretch min-h-[70vh]'>
                <div className='w-full md:w-1/2 min-h-[40vh] relative overflow-hidden bg-slate-50'>
                    <motion.div
                        whileInView={{ scale: 1.05 }}
                        transition={{ duration: 8 }}
                        className='w-full h-full'
                    >
                        <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                            className='w-full h-full object-cover grayscale-[0.2]'
                            alt="Concierge Delivery" />
                    </motion.div>
                </div>

                <div className='w-full md:w-1/2 p-12 md:p-20 lg:p-24 flex flex-col justify-center bg-white border-b md:border-b-0 md:border-l border-slate-100'>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className='text-[10px] font-black text-[#0891b2] uppercase tracking-[0.3em] mb-6'>Logistic Protocol 01</p>
                        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8'>
                            Institutional Delivery <br /> to your Coordinates.
                        </h2>
                        <p className='text-slate-500 font-medium leading-relaxed max-w-lg mb-10'>
                            Bypass the logistical friction of traditional rentals. Our agents deliver sanitized, high-specification vehicles directly to your residence or terminal.
                        </p>

                        <div className='space-y-4 mb-10'>
                            <div className='flex items-center gap-4'>
                                <div className='w-6 h-6 rounded flex items-center justify-center bg-cyan-50 text-[#0891b2]'>
                                    <CheckCircle2 size={14} />
                                </div>
                                <span className='text-xs font-bold text-slate-600 uppercase tracking-widest'>White-glove handover service</span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='w-6 h-6 rounded flex items-center justify-center bg-cyan-50 text-[#0891b2]'>
                                    <CheckCircle2 size={14} />
                                </div>
                                <span className='text-xs font-bold text-slate-600 uppercase tracking-widest'>Institutional walkthrough</span>
                            </div>
                        </div>

                        <div className='h-px w-24 bg-slate-100 mb-8'></div>
                        <a href="#book" className='inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-[#0891b2] uppercase tracking-[0.2em] transition-colors'>
                            Initialize Registry <ArrowRight size={14} />
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* 2. INSTANT ACCESS (Inverted Layout) */}
            <div className='flex flex-col md:flex-row-reverse items-stretch min-h-[70vh]'>
                <div className='w-full md:w-1/2 min-h-[40vh] relative overflow-hidden bg-slate-50'>
                    <motion.div
                        whileInView={{ scale: 1.05 }}
                        transition={{ duration: 8 }}
                        className='w-full h-full'
                    >
                        <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"
                            className='w-full h-full object-cover grayscale-[0.2]'
                            alt="Digital Key" />
                    </motion.div>
                </div>

                <div className='w-full md:w-1/2 p-12 md:p-20 lg:p-24 flex flex-col justify-center bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100'>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className='text-[10px] font-black text-[#0891b2] uppercase tracking-[0.3em] mb-6'>Tech Protocol 02</p>
                        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8'>
                            Universal Digital <br /> Access Interface.
                        </h2>
                        <p className='text-slate-500 font-medium leading-relaxed max-w-lg mb-10'>
                            Eliminate the counter entirely. Authenticate your identity and access your vehicle via the CarVenta Hub. Your device is the master key.
                        </p>

                        <div className='space-y-4 mb-10'>
                            <div className='flex items-center gap-4'>
                                <div className='w-6 h-6 rounded flex items-center justify-center bg-cyan-50 text-[#0891b2]'>
                                    <CheckCircle2 size={14} />
                                </div>
                                <span className='text-xs font-bold text-slate-600 uppercase tracking-widest'>Encryption-grade security</span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='w-6 h-6 rounded flex items-center justify-center bg-cyan-50 text-[#0891b2]'>
                                    <CheckCircle2 size={14} />
                                </div>
                                <span className='text-xs font-bold text-slate-600 uppercase tracking-widest'>Real-time telemetry sync</span>
                            </div>
                        </div>

                        <div className='h-px w-24 bg-slate-200 mb-8'></div>
                        <a href="#app" className='inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-[#0891b2] uppercase tracking-[0.2em] transition-colors'>
                            Review Protocol <ArrowRight size={14} />
                        </a>
                    </motion.div>
                </div>
            </div>

        </section>
    )
}

export default FeatureStrip
