import React from 'react'
import { ArrowLeft, ShieldCheck, Lock, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Safety = () => {
    const navigate = useNavigate()
    return (
        <div className="pt-24 bg-white min-h-screen pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] mb-8 hover:underline">
                    <ArrowLeft size={16} /> Back
                </button>

                <div className="text-center mb-16">
                    <ShieldCheck size={64} className="text-[var(--color-primary)] mx-auto mb-6" />
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Trust & Safety</h1>
                    <p className="text-gray-500 text-lg">Your safety is our top priority. Here is how we protect you on every trip.</p>
                </div>

                <div className="space-y-8">
                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[var(--color-primary)] shrink-0">
                            <Lock size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Identities</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Every member of our community undergoes a multi-step identity verification process, including facial recognition and driver's license validation.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[var(--color-primary)] shrink-0">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Roadside Assistance</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Flat tire? Dead battery? Empty tank? Our support team is just a tap away, 24 hours a day, 7 days a week.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[var(--color-primary)] shrink-0">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Sanitized Vehicles</h3>
                            <p className="text-gray-600 leading-relaxed">
                                In response to health standards, all vehicles are thoroughly cleaned and sanitized before every handover, focusing on high-touch surfaces.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Safety
