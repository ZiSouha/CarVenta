import React from 'react'
import { motion } from 'motion/react'
import { Car, Star, ShieldCheck, Trophy, Zap, MapPin } from 'lucide-react'

const TrustedBrands = () => {
    // Duplicating the array to ensure seamless infinite scroll
    const brands = [
        { name: "Mercedes-Benz", icon: <Star size={18} /> },
        { name: "BMW", icon: <Car size={18} /> },
        { name: "Audi", icon: <Zap size={18} /> },
        { name: "Tesla", icon: <Zap size={18} /> },
        { name: "Porsche", icon: <Trophy size={18} /> },
        { name: "Land Rover", icon: <MapPin size={18} /> },
        { name: "Ferrari", icon: <Trophy size={18} /> },
        { name: "Lexus", icon: <ShieldCheck size={18} /> }
    ]

    return (
        <section className='bg-white py-12 border-b border-slate-100 overflow-hidden relative'>

            <div className='max-w-7xl mx-auto px-6 mb-10 flex items-center justify-between'>
                <p className='text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]'>Strategic Fleet Partnerships</p>
                <div className='hidden md:block w-32 h-px bg-slate-100'></div>
            </div>

            <div className='relative flex'>
                {/* Refined Edge Fading */}
                <div className='absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none' />
                <div className='absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none' />

                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                    className='flex items-center gap-20 md:gap-32 whitespace-nowrap pl-4'
                >
                    {[...brands, ...brands].map((brand, index) => (
                        <div
                            key={index}
                            className='group flex items-center gap-4 cursor-default'
                        >
                            <span className='w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg text-slate-400 group-hover:text-[#0891b2] group-hover:bg-cyan-50 group-hover:border-cyan-100 transition-all duration-300'>
                                {brand.icon}
                            </span>
                            <span className='text-lg md:text-xl font-bold text-slate-800 tracking-tight opacity-40 group-hover:opacity-100 transition-opacity'>
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default TrustedBrands
