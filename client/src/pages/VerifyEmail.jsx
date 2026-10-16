import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { CheckCircle2, XCircle, Loader2, ArrowRight, ShieldCheck, Activity } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const VerifyEmail = () => {
    const { token } = useParams()
    const [status, setStatus] = useState('loading') // loading, success, error
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const { axios } = useAppContext()

    const verify = async () => {
        try {
            const { data } = await axios.get(`/api/user/verify-email/${token}`)
            if (data.success) {
                setStatus('success')
                setMessage(data.message)
                toast.success("Validation protocol verified", {
                    style: { background: '#0f172a', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
                })
            } else {
                setStatus('error')
                setMessage(data.message)
                toast.error(data.message)
            }
        } catch (error) {
            setStatus('error')
            setMessage(error.message)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            verify()
        }
    }, [token])

    return (
        <div className="bg-white min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[440px] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden relative"
            >
                {/* Decorative Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0891b2]" />

                <div className='p-10 md:p-12 text-center space-y-8'>
                    {status === 'loading' && (
                        <div className='py-12 space-y-6'>
                            <Loader2 size={60} className='mx-auto text-[#0891b2] animate-spin' />
                            <div className="space-y-2">
                                <h2 className='text-2xl font-black text-slate-900 tracking-tight'>Executing Validation.</h2>
                                <p className='text-slate-500 text-sm font-medium'>Confirming network credentials with the master directory.</p>
                            </div>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className='py-6 space-y-8'>
                            <div className='w-20 h-20 bg-slate-50 text-[#0891b2] rounded-xl border border-slate-100 flex items-center justify-center mx-auto shadow-sm'>
                                <ShieldCheck size={40} />
                            </div>
                            <div className='space-y-2'>
                                <h2 className='text-2xl font-black text-slate-900 tracking-tight'>Identity Verified</h2>
                                <p className='text-slate-500 text-sm font-medium max-w-xs mx-auto'>
                                    {message || "Authentication protocol complete. Full network privileges have been granted to this operator identity."}
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/')}
                                className='w-full bg-[#0891b2] text-white font-black text-[11px] py-4 rounded-lg uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] hover:bg-[#0e7490]'
                            >
                                Enter Hub Registry
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className='py-6 space-y-8'>
                            <div className='w-20 h-20 bg-red-50 text-red-500 rounded-xl border border-red-100 flex items-center justify-center mx-auto shadow-sm'>
                                <XCircle size={40} />
                            </div>
                            <div className='space-y-2'>
                                <h2 className='text-2xl font-black text-slate-900 tracking-tight'>Validation Failure</h2>
                                <p className='text-slate-500 text-sm font-medium max-w-xs mx-auto'>
                                    {message || "The provided validation uplink is invalid or has expired within the registry."}
                                </p>
                            </div>
                            <button
                                onClick={() => navigate('/')}
                                className='w-full bg-slate-900 text-white font-black text-[11px] py-4 rounded-lg uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl active:scale-[0.98]'
                            >
                                Back to Hub Status
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

export default VerifyEmail
