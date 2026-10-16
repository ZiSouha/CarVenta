import React, { useState } from 'react'
import { ArrowLeft, Search, ChevronDown, ChevronUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Help = () => {
    const navigate = useNavigate()
    const [openIndex, setOpenIndex] = useState(null)

    const faqs = [
        { q: "How do I book a car?", a: "Simply browse our fleet, select your dates, and tap 'Book Now'. You'll need a valid driver's license and credit card." },
        { q: "Is fuel included?", a: "You start with a full tank and must return with a full tank. If you don't, we'll refuel it for you at a standard market rate plus a service fee." },
        { q: "Can I extend my trip?", a: "Yes, you can extend your trip directly through the app, provided the vehicle is available for the additional dates." },
        { q: "What should I do if I have an accident?", a: "Ensure everyone is safe, call 911 if necessary, and then contact our 24/7 support line immediately via the app." },
        { q: "How does the digital key work?", a: "Once your booking starts, the 'Unlock' button in your app becomes active. Simply stand near the car and tap to unlock." }
    ]

    return (
        <div className="pt-24 bg-white min-h-screen pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] mb-8 hover:underline">
                    <ArrowLeft size={16} /> Back
                </button>

                <h1 className="text-4xl font-bold text-gray-900 mb-8">Help Center</h1>

                {/* Search */}
                <div className="relative mb-12">
                    <input type="text" placeholder="Search for help..." className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>

                {/* FAQs */}
                <div className="space-y-4">
                    {faqs.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                            >
                                <span className="font-bold text-gray-900">{item.q}</span>
                                {openIndex === index ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                            </button>
                            {openIndex === index && (
                                <div className="p-6 pt-0 bg-white text-gray-500 leading-relaxed border-t border-gray-100">
                                    {item.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-500 mb-4">Can't find what you're looking for?</p>
                    <button className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-colors">Contact Support</button>
                </div>
            </div>
        </div>
    )
}

export default Help
