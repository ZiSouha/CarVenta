import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { motion, useScroll, useTransform } from 'motion/react'
import { MapPin, Calendar, Search, Star, ShieldCheck, Zap, ArrowRight, Play } from 'lucide-react'

const Hero = () => {
    const [pickupLocation, setPickupLocation] = useState('')
    const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate, siteConfig } = useAppContext()
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 100])
    const y2 = useTransform(scrollY, [0, 500], [0, -100])

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`)
    }

    return (
        <section className="relative min-h-[90vh] flex items-center pt-32 bg-white overflow-hidden border-b border-slate-100">

            {/* Structured Industrial Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0891b2]/[0.02] -skew-x-12 translate-x-1/4" />
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Content Column */}
                    <div className="w-full lg:w-[48%] flex flex-col items-center lg:items-start text-center lg:text-left">

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                                <span className="flex h-2 w-2 rounded-full bg-[#0891b2] animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.2em]">
                                    Engineered by <span className="text-[#0891b2]">Ziane Souhayl</span>
                                </span>
                            </div>

                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                                Drive the <br />
                                <span className="text-[#0891b2]">Exceptional.</span>
                            </h1>

                            <p className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed max-w-lg">
                                {siteConfig?.heroSubtitle || "Institutional-grade vehicle rental for the modern professional. Access a curated fleet with absolute precision."}
                            </p>

                            {/* Refined Search Block */}
                            <div className="w-full max-w-2xl bg-white p-2 rounded-xl border border-slate-200 shadow-xl shadow-slate-200/40 mt-12">
                                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                                    <div className="flex-1 px-5 py-3 bg-slate-50 rounded-lg group focus-within:ring-2 ring-cyan-500/10 transition-all border border-transparent focus-within:border-cyan-500/30">
                                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 group-focus-within:text-[#0891b2]">Location</label>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-slate-400" />
                                            <select
                                                required
                                                value={pickupLocation}
                                                onChange={(e) => setPickupLocation(e.target.value)}
                                                className="w-full bg-transparent outline-none text-sm font-bold text-slate-900 appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Station</option>
                                                {cityList.map((city) => <option key={city} value={city}>{city}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex-1 px-5 py-3 bg-slate-50 rounded-lg group focus-within:ring-2 ring-cyan-500/10 transition-all border border-transparent focus-within:border-cyan-500/30">
                                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 group-focus-within:text-[#0891b2]">Date</label>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-slate-400" />
                                            <input
                                                required
                                                type="date"
                                                value={pickupDate}
                                                onChange={(e) => setPickupDate(e.target.value)}
                                                className="w-full bg-transparent outline-none text-sm font-bold text-slate-900 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-10 py-4 bg-[#0891b2] hover:bg-[#0e7490] text-white rounded-lg font-bold text-sm transition-all shadow-lg shadow-[#0891b2]/20 active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <Search size={18} />
                                        <span>Discover</span>
                                    </button>
                                </form>
                            </div>

                            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-slate-100">
                                <div className="space-y-1">
                                    <p className="text-2xl font-black text-slate-900">1,200+</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Fleet</p>
                                </div>
                                <div className="w-px h-10 bg-slate-100" />
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1">
                                        <p className="text-2xl font-black text-slate-900">4.9</p>
                                        <Star size={16} fill="#0891b2" className="text-[#0891b2]" />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Rating</p>
                                </div>
                                <div className="w-px h-10 bg-slate-100" />
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <img key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Image Composition */}
                    <div className="w-full lg:w-[52%] relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative"
                        >
                            <img
                                src={assets.main_car}
                                alt="Main Vehicle"
                                className="w-full h-auto object-contain drop-shadow-[0_32px_64px_rgba(0,0,0,0.15)]"
                            />

                            {/* Clean Stats Overlay */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="absolute -bottom-6 right-10 bg-white p-6 rounded-xl border border-slate-200 shadow-2xl hidden md:block max-w-[240px]"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center text-[#0891b2]">
                                        <Zap size={20} />
                                    </div>
                                    <div className="h-1 w-20 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#0891b2] w-3/4" />
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Performance Index</p>
                                <p className="text-sm font-bold text-slate-900">Elite performance tuning as standard across the 2026 collection.</p>
                            </motion.div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero
