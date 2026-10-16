import React from 'react'
import CarCard from './CarCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'

const FeaturedSection = () => {

    const navigate = useNavigate()
    const { cars, siteConfig } = useAppContext()

    const featuredCars = siteConfig?.featuredCarIds?.length > 0
        ? cars.filter(car => siteConfig.featuredCarIds.includes(car._id))
        : cars.slice(0, 6)

    return (
        <section className='bg-white py-24 px-6 border-b border-slate-100 relative'>
            <div className='max-w-7xl mx-auto'>

                <div className='flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16'>
                    <div className='space-y-4'>
                        <div className='inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-100 rounded-md text-[10px] font-bold uppercase tracking-widest text-[#0891b2]'>
                            <Sparkles size={12} />
                            Curated Collection
                        </div>
                        <h2 className='text-3xl md:text-4xl font-bold text-slate-900'>
                            Top Rated Vehicles
                        </h2>
                        <p className='text-slate-500 text-sm max-w-xl leading-relaxed font-medium'>
                            Our most requested models, celebrated for their performance, reliability, and executive prestige.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/cars')}
                        className='group flex items-center gap-3 text-xs font-bold text-slate-400 hover:text-[#0891b2] transition-colors border-b border-slate-200 hover:border-[#0891b2] pb-1 uppercase tracking-widest'
                    >
                        View Full Fleet
                        <ArrowRight size={14} className='group-hover:translate-x-1 transition-transform' />
                    </button>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {
                        featuredCars.map((car) => (
                            <CarCard key={car._id} car={car} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default FeaturedSection
