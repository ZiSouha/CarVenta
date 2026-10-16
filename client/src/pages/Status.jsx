import React from 'react'
import { ArrowLeft, CheckCircle, XCircle, Activity } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Status = () => {
    const navigate = useNavigate()
    return (
        <div className="pt-24 bg-white min-h-screen pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] mb-8 hover:underline">
                    <ArrowLeft size={16} /> Back
                </button>

                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">System Status</h1>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-green-700">All Systems Operational</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        { name: "Website & API", status: "Operational" },
                        { name: "Mobile App (iOS)", status: "Operational" },
                        { name: "Mobile App (Android)", status: "Operational" },
                        { name: "Digital Key Services", status: "Operational" },
                        { name: "Payment Processing", status: "Operational" },
                        { name: "Support Chat", status: "Operational" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl">
                            <span className="font-bold text-gray-900">{item.name}</span>
                            <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle size={18} />
                                <span className="text-sm font-medium">{item.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Status
