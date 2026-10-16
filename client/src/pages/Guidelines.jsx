import React from 'react'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Guidelines = () => {
    const navigate = useNavigate()
    return (
        <div className="pt-24 bg-white min-h-screen pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] mb-8 hover:underline">
                    <ArrowLeft size={16} /> Back
                </button>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Guidelines</h1>
                <p className="text-gray-500 text-lg mb-12">Building a trusted community requires cooperation from everyone. Here is what we expect from our members.</p>

                <div className="space-y-12">
                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">For Drivers</h2>
                        <ul className="space-y-4">
                            {[
                                "Treat the vehicle with respect and care.",
                                "No smoking or pets inside the vehicle.",
                                "Return the car with the same fuel level as pickup.",
                                "Report any damage or issues immediately.",
                                "Obey all local traffic laws and parking regulations."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-gray-700">
                                    <CheckCircle size={20} className="text-green-500 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">For Owners</h2>
                        <ul className="space-y-4">
                            {[
                                "Ensure vehicle is clean, sanitized, and safe to drive.",
                                "Provide accurate availability and location details.",
                                "Respond to booking requests promptly.",
                                "Maintain valid insurance and registration documents."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-gray-700">
                                    <CheckCircle size={20} className="text-[var(--color-primary)] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Guidelines
