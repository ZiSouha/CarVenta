import React from 'react'
import { ArrowLeft, CheckCircle, Smartphone, Key, CreditCard, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import FeatureStrip from '../components/FeatureStrip'

const HowItWorksPage = () => {
    const navigate = useNavigate()

    const steps = [
        {
            icon: <Smartphone size={32} />,
            title: "1. Book in seconds",
            desc: "Download the App or use our website. Verify your identity in under 2 minutes using our secure banking-grade ID system."
        },
        {
            icon: <CreditCard size={32} />,
            title: "2. Choose your terms",
            desc: "Select your dates and protection plan. No upsells at the counter, because there is no counter."
        },
        {
            icon: <Key size={32} />,
            title: "3. Unlock & Go",
            desc: "Use the digital key on your phone to unlock the car. The keys are in the glovebox. Just drive."
        },
        {
            icon: <CheckCircle size={32} />,
            title: "4. Return ease",
            desc: "Park the car in the designated zone, lock it with the app, and walk away. Receipt follows instantly."
        }
    ]

    return (
        <div className="bg-white min-h-screen">
            <div className="pt-32 pb-20 bg-gray-50 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
                        Rental, <span className="text-[var(--color-primary)]">reinvented.</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
                        Old way: Lines, paperwork, "we don't have that car". <br />
                        New way: Phone, unlock, drive.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                    {/* Connecting Line */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

                    {steps.map((step, i) => (
                        <div key={i} className="bg-white pt-4">
                            <div className="w-16 h-16 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center text-[var(--color-primary)] mb-6 shadow-sm mx-auto lg:mx-0">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center lg:text-left">{step.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-center lg:text-left">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reusing the visual strips for depth */}
            <FeatureStrip />
        </div>
    )
}

export default HowItWorksPage
