import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Users, Fuel, Settings, Timer, ArrowUpRight, Heart } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const CarCard = ({ car }) => {
    const navigate = useNavigate()
    const { user, setUser, axios, token, setShowLogin } = useAppContext()

    const isFavorite = user?.favorites?.includes(car._id)

    const toggleFavorite = async (e) => {
        e.stopPropagation()
        if (!token) {
            setShowLogin(true)
            return toast.error("Please login to add to favorites")
        }

        try {
            const { data } = await axios.post('/api/user/toggle-favorite', { carId: car._id })
            if (data.success) {
                // Update local user state
                const updatedFavorites = data.isFavorite
                    ? [...(user.favorites || []), car._id]
                    : user.favorites.filter(id => id !== car._id)

                setUser({ ...user, favorites: updatedFavorites })
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            onClick={() => { navigate(`/car-details/${car._id}`) }}
            className='group bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col h-full border border-slate-200 hover:border-[#0891b2]/30 hover:shadow-xl hover:shadow-slate-200/50 transition-all'
        >
            {/* Professional Image Container */}
            <div className='relative aspect-[16/10] overflow-hidden bg-slate-50 border-b border-slate-100'>
                <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                />

                {/* Favorite Icon */}
                <button
                    onClick={toggleFavorite}
                    className={`absolute top-4 left-4 p-2.5 rounded-lg transition-all z-10 ${isFavorite
                        ? 'bg-red-50 text-red-500 border border-red-100'
                        : 'bg-white/90 text-slate-400 hover:text-red-500 hover:bg-white backdrop-blur-sm border border-slate-200'
                        }`}
                >
                    <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
                </button>

                {/* Clean Status Indicator */}
                <div className='absolute top-4 right-4'>
                    {car.isAvaliable ? (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-md border border-slate-200 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">Active</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100/95 backdrop-blur-sm rounded-md border border-slate-200 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Reserved</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Structured Card Content */}
            <div className='p-6 flex flex-col flex-1 space-y-5'>
                <div className='flex justify-between items-start'>
                    <div className='space-y-1'>
                        <p className='text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]'>{car.brand}</p>
                        <h3 className='text-lg font-bold text-slate-900 group-hover:text-[#0891b2] transition-colors'>
                            {car.model}
                        </h3>
                    </div>
                    <div className='text-right'>
                        <p className='text-sm font-bold text-slate-900'>${car.pricePerDay}</p>
                        <p className='text-[9px] text-slate-400 font-bold uppercase tracking-widest'>Per Day</p>
                    </div>
                </div>

                {/* Specs Grid - Industrial Minimal */}
                <div className='grid grid-cols-2 gap-4 py-4 border-y border-slate-100'>
                    <div className='flex items-center gap-2'>
                        <Settings size={14} className="text-[#0891b2]" />
                        <span className='text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none'>{car.transmission}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Users size={14} className="text-[#0891b2]" />
                        <span className='text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none'>{car.seating_capacity} Seats</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Fuel size={14} className="text-[#0891b2]" />
                        <span className='text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none'>{car.fuel_type}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Timer size={14} className="text-[#0891b2]" />
                        <span className='text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none'>Unlimited</span>
                    </div>
                </div>

                {/* Action Footer */}
                <div className='flex items-center justify-between'>
                    <span className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>Standard Protocol</span>
                    <button className='p-2 bg-slate-50 text-slate-400 group-hover:bg-[#0891b2] group-hover:text-white rounded-lg transition-all border border-slate-100'>
                        <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default CarCard
