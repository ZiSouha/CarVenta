import React from 'react'
import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const PageHeader = ({ title, subtitle, breadcrumbs = [] }) => {
    return (
        <div className="bg-slate-50 border-b border-slate-200 pt-32 pb-12 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0891b2]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {/* Breadcrumbs */}
                    {breadcrumbs.length > 0 && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                            <Link to="/" className="hover:text-[#0891b2] transition-colors">Home</Link>
                            {breadcrumbs.map((crumb, index) => (
                                <React.Fragment key={index}>
                                    <ChevronRight size={14} className="text-slate-300" />
                                    {crumb.path ? (
                                        <Link to={crumb.path} className="hover:text-[#0891b2] transition-colors">
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="text-slate-900 font-medium">{crumb.label}</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    )}

                    {/* Title & Subtitle */}
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default PageHeader
