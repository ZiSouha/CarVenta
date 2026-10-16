import React from 'react'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'

const CategorySection = () => {

    const categories = [
        { name: "Sports", image: assets.hero_car_sport, count: "12+ Cars" },
        { name: "Luxury", image: assets.main_car, count: "25+ Cars" },
        { name: "SUVs", image: assets.hero_car_suv, count: "18+ Cars" }, // Reusing hero SUV
        { name: "Electric", image: assets.cat_electric_car, count: "10+ Cars" },
    ]

    return (
        <div className='py-24 px-6 md:px-12 lg:px-24 bg-white'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-16 space-y-4'>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className='text-3xl md:text-5xl font-bold'
                    >
                        Browse by Category
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 100 }}
                        className='h-1 bg-primary mx-auto'
                    ></motion.div>
                    <p className='text-gray-500'>Find the perfect vehicle for any occasion.</p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {categories.map((cat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className='bg-gray-50 rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-primary/20'
                        >
                            <div className='w-full h-40 flex items-center justify-center mb-6 relative'>
                                <div className='absolute w-32 h-32 bg-gray-200 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors'></div>
                                <img src={cat.image} className='relative z-10 w-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500' alt={cat.name} />
                            </div>
                            <h3 className='text-xl font-bold text-gray-800'>{cat.name}</h3>
                            <p className='text-sm text-gray-500 mt-1'>{cat.count}</p>

                            <div className='mt-4 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
                                ➜
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default CategorySection
