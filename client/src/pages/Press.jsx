import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Press = () => {
    const navigate = useNavigate()

    const articles = [
        {
            source: "TechCrunch",
            date: "Oct 12, 2025",
            title: "CarVenta raises Series B to expand digital-first rental model",
            desc: "The startup is challenging legacy rental giants with a counter-free experience."
        },
        {
            source: "The Verge",
            date: "Sep 28, 2025",
            title: "Hands-on with CarVenta's new Instant Unlock feature",
            desc: "We tested the new ultra-wideband digital key and it feels like magic."
        },
        {
            source: "Forbes",
            date: "Aug 15, 2025",
            title: "Top 50 Mobility Startups to Watch",
            desc: "CarVenta makes the list for its innovative approach to fleet management."
        }
    ]

    return (
        <div className="pt-24 bg-white min-h-screen pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] mb-8 hover:underline">
                    <ArrowLeft size={16} /> Back
                </button>

                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Newsroom</h1>
                    <p className="text-gray-500 text-lg">Latest news, updates, and stories from the CarVenta team.</p>
                </div>

                <div className="grid gap-12">
                    {articles.map((item, i) => (
                        <div key={i} className="group cursor-pointer">
                            <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wide mb-2">{item.source} • {item.date}</p>
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Media Inquiries</h3>
                    <p className="text-gray-500 mb-6">For press kits and interview requests, please contact our team.</p>
                    <a href="mailto:press@carventa.com" className="text-[var(--color-primary)] font-bold hover:underline">press@carventa.com</a>
                </div>
            </div>
        </div>
    )
}

export default Press
