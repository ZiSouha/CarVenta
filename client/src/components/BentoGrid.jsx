import React from 'react'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'
import { Truck, CalendarDays, ShieldCheck, Headphones, ArrowRight, Star, Key, RefreshCw, Wallet, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BentoGrid = () => {
    const navigate = useNavigate()

    return (
        <section className='py-32 px-6 md:px-12 lg:px-24 bg-slate-50 relative'>
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] pointer-events-none" />

            <div className='max-w-7xl mx-auto relative z-10'>
                <div className='mb-20 flex flex-col md:flex-row items-end justify-between gap-8'>
                    <div className='max-w-2xl'>
                        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 shadow-sm'>
                            <span className='w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]'></span>
                            Why Choose CarVenta
                        </div>
                        <h2 className='text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]'>
                            Everything you need <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-cyan-500">to own the road.</span>
                        </h2>
                        <p className='text-slate-500 text-lg leading-relaxed font-medium'>
                            We've re-engineered the rental experience to be frictionless, transparent, and exclusively focused on your journey.
                        </p>
                    </div>

                    <button onClick={() => navigate('/services')} className='hidden md:flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-[var(--color-primary)] transition-colors group'>
                        View all services
                        <ArrowRight size={18} className='group-hover:translate-x-1 transition-transform' />
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 auto-rows-[minmax(180px,auto)]'>

                    {/* 1. Doorstep Delivery (Large Card) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className='md:col-span-2 md:row-span-2 rounded-[2rem] p-10 bg-white border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group cursor-pointer hover:border-[var(--color-primary)]/30 transition-all'
                        onClick={() => navigate('/services')}
                    >
                        <div className='relative z-20 h-full flex flex-col justify-between'>
                            <div>
                                <div className='w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300'>
                                    <Truck size={24} />
                                </div>
                                <h3 className='text-2xl font-bold text-slate-900 mb-3'>Concierge Delivery</h3>
                                <p className='text-slate-500 max-w-xs text-sm font-medium leading-relaxed'>
                                    We deliver your chosen vehicle directly to your home, office, or airport terminal.
                                </p>
                            </div>

                            <div className='inline-flex items-center gap-2 text-slate-900 font-bold text-sm mt-8 border-b border-transparent group-hover:border-slate-900 w-max transition-all'>
                                Learn more
                            </div>
                        </div>

                        <div className='absolute bottom-0 right-0 w-[60%] h-[60%] bg-gradient-to-tl from-[var(--color-primary)]/10 to-transparent rounded-tl-[100px] z-0'></div>
                        <img
                            src={assets.main_car}
                            className='absolute -bottom-4 -right-16 w-[320px] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-4 z-10'
                            alt="Car Delivery"
                        />
                    </motion.div>

                    {/* 2. Instant Booking */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className='bg-white border border-slate-100 rounded-[2rem] p-8 flex flex-col justify-between shadow-lg shadow-slate-200/40 hover:shadow-xl transition-all group'
                    >
                        <div className='flex justify-between items-start'>
                            <div className='p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition-transform'>
                                <Key size={24} />
                            </div>
                            <span className='px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold uppercase text-slate-500'>New</span>
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-slate-900 mb-1'>Instant Access</h3>
                            <p className='text-slate-500 text-xs font-medium'>Keyless entry via mobile app.</p>
                        </div>
                    </motion.div>

                    {/* 3. Flexible Returns */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='bg-slate-900 text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-lg shadow-slate-900/20 group cursor-pointer overflow-hidden relative'
                        onClick={() => navigate('/cars')}
                    >
                        <div className='absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors'></div>
                        <div className='relative z-10'>
                            <div className='p-3 bg-white/10 w-max rounded-xl mb-6 backdrop-blur-sm'>
                                <RefreshCw size={24} />
                            </div>
                            <h3 className='text-lg font-bold mb-1'>Flexible Returns</h3>
                            <p className='text-slate-400 text-xs font-medium'>Extend your trip with one tap.</p>
                        </div>
                    </motion.div>

                    {/* 4. Full Coverage */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='md:col-span-2 bg-gradient-to-br from-[var(--color-primary)] to-cyan-600 rounded-[2rem] p-8 md:p-10 text-white flex items-center justify-between shadow-lg shadow-cyan-500/20 relative overflow-hidden group'
                    >
                        {/* Abstract shapes */}
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                        <div className='relative z-10 max-w-xs'>
                            <div className='flex items-center gap-3 mb-4'>
                                <ShieldCheck size={28} className='text-white' />
                                <span className='px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold border border-white/20'>100% Secure</span>
                            </div>
                            <h3 className='text-2xl font-bold mb-2'>Comprehensive Protection</h3>
                            <p className='text-cyan-100 text-sm font-medium leading-relaxed mb-6'>
                                Every rental includes premium insurance coverage and 24/7 roadside assistance.
                            </p>
                            <button onClick={() => navigate('/terms')} className='px-6 py-2 bg-white text-[var(--color-primary)] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors'>
                                View Policy
                            </button>
                        </div>

                        <div className='hidden md:block w-32 h-32 bg-white/10 rounded-full border-4 border-white/20 flex items-center justify-center backdrop-blur-sm'>
                            <CheckCircle2 size={48} className='text-white' />
                        </div>
                    </motion.div>

                    {/* 5. Best Price Guarantee */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='bg-white border border-slate-100 rounded-[2rem] p-8 flex flex-col justify-between shadow-lg shadow-slate-200/40 hover:border-green-200 transition-all'
                    >
                        <div className='flex justify-between items-start'>
                            <div className='p-3 bg-green-50 text-green-600 rounded-xl'>
                                <Wallet size={24} />
                            </div>
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-slate-900 mb-1'>Best Price</h3>
                            <p className='text-slate-500 text-xs font-medium'>We match any competitor.</p>
                        </div>
                    </motion.div>

                    {/* 6. Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className='bg-white border border-slate-100 rounded-[2rem] p-8 flex flex-col justify-between shadow-lg shadow-slate-200/40 hover:border-purple-200 transition-all cursor-pointer'
                        onClick={() => navigate('/contact')}
                    >
                        <div className='flex justify-between items-start'>
                            <div className='p-3 bg-purple-50 text-purple-600 rounded-xl'>
                                <Headphones size={24} />
                            </div>
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-slate-900 mb-1'>24/7 Support</h3>
                            <p className='text-slate-500 text-xs font-medium'>Expert help anytime.</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default BentoGrid
