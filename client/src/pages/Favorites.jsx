import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import CarCard from '../components/CarCard'
import { Heart, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

const Favorites = () => {
    const { user, cars, token } = useAppContext()
    const [favoriteCars, setFavoriteCars] = useState([])

    useEffect(() => {
        if (user?.favorites && cars.length > 0) {
            const filtered = cars.filter(car => user.favorites.includes(car._id))
            setFavoriteCars(filtered)
        } else {
            setFavoriteCars([])
        }
    }, [user, cars])

    if (!token) {
        return (
            <div className='min-h-[70vh] flex flex-col items-center justify-center p-6 text-center'>
                <div className='w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6'>
                    <Heart size={40} />
                </div>
                <h2 className='text-2xl font-bold text-slate-900 mb-2'>Please Login</h2>
                <p className='text-slate-500 mb-8 max-w-sm'>Login to your account to view and manage your favorite vehicles.</p>
                <button
                    onClick={() => window.scrollTo(0, 0)}
                    className='bg-[var(--color-primary)] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all'>
                    Go to Home
                </button>
            </div>
        )
    }

    return (
        <div className='pt-32 pb-20 min-h-screen bg-[var(--color-bg-light)]'>
            <div className='max-w-7xl mx-auto px-6 md:px-10'>
                {/* Header */}
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
                    <div>
                        <div className='flex items-center gap-2 mb-3'>
                            <span className='w-2 h-6 bg-red-500 rounded-full'></span>
                            <span className='text-[10px] font-bold text-red-500 uppercase tracking-[0.2em]'>Personal Collection</span>
                        </div>
                        <h1 className='text-4xl font-black text-slate-900 tracking-tight'>
                            My <span className='text-red-500'>Favorites</span>
                        </h1>
                        <p className='text-slate-500 mt-2 font-medium'>
                            {favoriteCars.length} vehicles saved in your wishlist
                        </p>
                    </div>
                </div>

                {favoriteCars.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {favoriteCars.map((car) => (
                            <CarCard key={car._id} car={car} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='bg-white rounded-[2.5rem] p-12 text-center border border-slate-200 shadow-sm'
                    >
                        <div className='w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                            <Heart size={40} />
                        </div>
                        <h2 className='text-2xl font-bold text-slate-900 mb-2'>No Favorites Yet</h2>
                        <p className='text-slate-500 mb-8 max-w-md mx-auto'>
                            Explore our premium fleet and click the heart icon to save your favorite vehicles for later.
                        </p>
                        <button
                            onClick={() => window.location.href = '/cars'}
                            className='inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-[var(--color-primary)] transition-all group'
                        >
                            Explore Fleet
                            <ArrowRight size={18} className='group-hover:translate-x-1 transition-transform' />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Favorites
