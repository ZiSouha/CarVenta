import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Cookie, X, ShieldCheck } from 'lucide-react'

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted')
        setIsVisible(false)
    }

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined')
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-[400px] z-[9999]"
                >
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
                        {/* Decorative Background Icon */}
                        <div className="absolute -top-4 -right-4 opacity-[0.03] rotate-12">
                            <Cookie size={120} />
                        </div>

                        <div className="flex items-start gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                                <Cookie className="text-[var(--color-primary)]" size={24} />
                            </div>
                            <div className="flex-1 space-y-2">
                                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                    Cookie Consent
                                    <ShieldCheck size={14} className="text-emerald-500" />
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    We use cookies to enhance your experience, analyze site traffic, and personalize content. By clicking "Accept All", you agree to our use of cookies.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-6 relative z-10">
                            <button
                                onClick={handleAccept}
                                className="flex-1 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-lg active:scale-95"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={handleDecline}
                                className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-all border border-slate-100"
                            >
                                Essential Only
                            </button>
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default CookieConsent
