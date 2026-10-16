
import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { motion } from 'motion/react'

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const { axios } = useAppContext()
    const navigate = useNavigate()
    const [status, setStatus] = useState('verifying') // verifying, success, error
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const verify = async () => {
            if (!sessionId) {
                setStatus('error')
                return
            }

            try {
                const { data } = await axios.post('/api/payment/verify', { sessionId })
                if (data.success) {
                    setStatus('success')
                    setTimeout(() => {
                        navigate('/my-bookings')
                    }, 3000)
                } else {
                    setStatus('error')
                    setErrorMessage(data.message)
                }
            } catch (error) {
                console.error(error)
                setStatus('error')
                setErrorMessage(error.response?.data?.message || error.message || 'Unknown error occurred')
            }
        }
        verify()
    }, [sessionId])

    return (
        <div className='min-h-screen bg-white flex items-center justify-center p-6'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className='max-w-md w-full bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center shadow-x'
            >
                {status === 'verifying' && (
                    <div className='space-y-6'>
                        <div className='flex justify-center'>
                            <Loader2 size={48} className='text-[#0891b2] animate-spin' />
                        </div>
                        <h2 className='text-xl font-bold text-slate-900'>Secure Verification</h2>
                        <p className='text-sm text-slate-500 font-medium'>Validating transaction protocols with global banking nodes...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className='space-y-6'>
                        <div className='flex justify-center'>
                            <div className='w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600'>
                                <CheckCircle2 size={32} />
                            </div>
                        </div>
                        <h2 className='text-2xl font-black text-slate-900'>Payment Authorized</h2>
                        <p className='text-sm text-slate-500 font-medium'>
                            Your booking has been securely confirmed. <br />
                            Total allocation transferred successfully.
                        </p>
                        <div className='pt-4'>
                            <p className='text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse'>Redirecting to Portfolio...</p>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className='space-y-6'>
                        <div className='flex justify-center'>
                            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600'>
                                <AlertCircle size={32} />
                            </div>
                        </div>
                        <h2 className='text-xl font-bold text-slate-900'>Transaction Failed</h2>
                        <p className='text-sm text-red-500 font-medium'>{errorMessage || 'Unable to verify payment token. Please contact support.'}</p>
                        <button
                            onClick={() => navigate('/cars')}
                            className='w-full py-3 bg-[#0891b2] text-white rounded-xl font-bold text-sm hover:bg-[#0e7490] transition-all shadow-lg shadow-cyan-500/20'
                        >
                            Return to Registry
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default PaymentSuccess
