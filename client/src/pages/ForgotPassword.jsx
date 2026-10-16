import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Activity } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { axios } = useAppContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const { data } = await axios.post('/api/user/forgot-password', { email })
            if (data.success) {
                setIsSubmitted(true)
                toast.success("Identity recovery initialized", {
                    style: { background: '#0f172a', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
                })
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="bg-white min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[440px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden relative"
            >
                {/* Decorative Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0891b2]" />

                <div className='p-10 md:p-12'>
                    {!isSubmitted ? (
                        <div className="space-y-10">
                            <div className='flex justify-between items-start'>
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                        <Activity size={10} className="text-[#0891b2]" /> Recovery Protocol
                                    </div>
                                    <h1 className='text-3xl font-black text-slate-900 tracking-tight'>Reset <span className='text-[#0891b2]'>Access.</span></h1>
                                    <p className='text-slate-500 text-sm font-medium'>Initiate credential recovery procedures for your network identity.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className='space-y-6'>
                                <div className='space-y-2'>
                                    <label className='text-[10px] font-bold text-slate-500 uppercase tracking-widest'>Validation Email</label>
                                    <div className='relative'>
                                        <Mail size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300' />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="id@network.com"
                                            className='w-full bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 py-3.5 text-slate-900 text-sm font-bold outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all placeholder:text-slate-300'
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className='w-full bg-[#0891b2] text-white font-black text-[11px] py-4 rounded-lg shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] active:scale-[0.98] hover:bg-[#0e7490]'
                                >
                                    {isLoading ? "PROCESSING..." : "EXECUTE RECOVERY"}
                                    {!isLoading && <ArrowRight size={18} />}
                                </button>

                                <div className="text-center pt-2">
                                    <button type="button" onClick={() => navigate(-1)} className='text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 flex items-center justify-center gap-2 mx-auto'>
                                        <ArrowLeft size={14} /> Revert to Auth Node
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className='text-center space-y-8'>
                            <div className='w-20 h-20 bg-slate-50 text-[#0891b2] rounded-xl border border-slate-100 flex items-center justify-center mx-auto shadow-sm'>
                                <ShieldCheck size={40} />
                            </div>
                            <div className='space-y-2'>
                                <h2 className='text-2xl font-black text-slate-900 tracking-tight'>Protocol Initiated</h2>
                                <p className='text-slate-500 text-sm font-medium max-w-xs mx-auto'>
                                    A secure recovery link has been dispatched to <span className='text-slate-900 font-bold'>{email}</span>. Validate via that uplink.
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/')}
                                className='w-full bg-slate-900 text-white font-black text-[11px] py-4 rounded-lg uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl active:scale-[0.98]'
                            >
                                Return to Global Hub
                            </button>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className='text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#0891b2] transition-colors'
                            >
                                No uplink received? Re-initialize Protocol
                            </button>
                        </div>
                    )}
                </div>

                {/* Decorative Background Skew */}
                <div className="absolute right-0 bottom-0 w-24 h-24 bg-slate-50 -z-10 skew-x-12 translate-x-10 translate-y-10" />
            </motion.div>
        </div>
    )
}

export default ForgotPassword
