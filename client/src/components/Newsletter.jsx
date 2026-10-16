import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Mail } from 'lucide-react'

const Newsletter = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        toast.success("Successfully subscribed to the registry!")
        setEmail('')
    }

    return (
        <section className="py-24 px-6 bg-white border-t border-slate-100">
            <div className='max-w-7xl mx-auto'>
                <div className='p-10 md:p-16 rounded-xl border border-slate-200 bg-slate-50 relative overflow-hidden'>
                    <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12'>

                        <div className='max-w-xl text-center lg:text-left space-y-4'>
                            <div className='inline-flex items-center justify-center w-12 h-12 bg-white rounded-lg border border-slate-200 shadow-sm mb-2'>
                                <Mail className='text-[#0891b2] w-6 h-6' />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                                Join the CarVenta Registry
                            </h2>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                Curated fleet updates, technical narrative releases, and exclusive member invitations. Strictly institutional.
                            </p>
                        </div>

                        <div className='w-full max-w-md'>
                            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-3'>
                                <input
                                    className="flex-1 px-6 py-4 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm font-medium outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Executive email address"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-[#0891b2] text-white font-bold rounded-lg hover:bg-[#0e7490] transition-all text-sm shadow-sm active:scale-95"
                                >
                                    Registry
                                </button>
                            </form>
                            <p className='text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4 text-center lg:text-left'>
                                Encrypted processing • No solicitation
                            </p>
                        </div>

                    </div>
                    {/* Decorative Background Element */}
                    <div className='absolute right-0 top-0 w-1/3 h-full bg-[#0891b2] opacity-[0.02] transform skew-x-12 translate-x-1/2'></div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
