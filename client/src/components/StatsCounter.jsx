import React from 'react'
import { motion } from 'motion/react'

const StatsCounter = () => {
    return (
        <div className='bg-primary text-white py-12'>
            <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20'>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className='flex flex-col items-center p-4'
                >
                    <div className='text-4xl md:text-5xl font-black mb-2'>50+</div>
                    <div className='text-blue-200 font-medium uppercase tracking-widest text-sm'>Cities Worldwide</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className='flex flex-col items-center p-4'
                >
                    <div className='text-4xl md:text-5xl font-black mb-2'>10k+</div>
                    <div className='text-blue-200 font-medium uppercase tracking-widest text-sm'>Happy Riders</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='flex flex-col items-center p-4'
                >
                    <div className='text-4xl md:text-5xl font-black mb-2'>500+</div>
                    <div className='text-blue-200 font-medium uppercase tracking-widest text-sm'>Premium Cars</div>
                </motion.div>

            </div>
        </div>
    )
}

export default StatsCounter
