import React from 'react'
import { motion } from 'motion/react'

const AdminHeader = ({ title, subtitle, children, stats }) => {
    return (
        <div className="mb-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className='space-y-1'
                >
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 mb-2">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-[#0891b2]" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin Control</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl">
                            {subtitle}
                        </p>
                    )}
                </motion.div>

                {children && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        {children}
                    </motion.div>
                )}
            </div>

            {/* Optional Stats Row */}
            {stats && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="pt-4 border-t border-slate-200"
                >
                    {stats}
                </motion.div>
            )}
        </div>
    )
}

export default AdminHeader
