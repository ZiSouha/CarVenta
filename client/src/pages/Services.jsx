import React from 'react'
import { motion } from 'motion/react'
import {
    Car,
    ShieldCheck,
    MapPin,
    Headset,
    Zap,
    Crown,
    CheckCircle,
    ArrowRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const Services = () => {
    const navigate = useNavigate()
    const services = [
        {
            title: "Wide Variety",
            desc: "Choose from hundreds of cars, from compact city runners to spacious SUVs for the whole family.",
            icon: <Car size={24} />
        },
        {
            title: "We Deliver",
            desc: "Don't want to go to the rental center? We'll bring the car to your doorstep.",
            icon: <MapPin size={24} />
        },
        {
            title: "Full Insurance",
            desc: "Drive worry-free. Our optional comprehensive insurance covers you for the unexpected.",
            icon: <ShieldCheck size={24} />
        },
        {
            title: "24/7 Support",
            desc: "Real humans are available any time of day to help with your booking or on-road issues.",
            icon: <Headset size={24} />
        },
        {
            title: "Loyalty Rewards",
            desc: "Earn points on every trip and redeem them for free rentaled days and upgrades.",
            icon: <Crown size={24} />
        },
        {
            title: "Flexible Changes",
            desc: "Plans change. Modify or cancel your booking easily up to 24 hours before pickup.",
            icon: <Zap size={24} />
        }
    ]

    const features = [
        "Best Rate Guarantee",
        "No Hidden Fees",
        "Free Cancellation (24h)",
        "Instant Confirmation",
        "Clean & Sanitized Cars",
        "Unlimited Mileage Options"
    ]

    return (
        <div className="bg-[var(--color-bg-light)] min-h-screen text-[var(--color-text-main)]">
            <PageHeader
                title={<span>More than just <span className='text-[var(--color-primary)]'>a rental.</span></span>}
                subtitle="We provide a complete mobility experience designed to make your journey smoother, safer, and more enjoyable."
                breadcrumbs={[{ label: 'Services', path: '/services' }]}
            />

            {/* Services Grid */}
            <section className="py-20 px-6 md:px-12 lg:px-24 bg-white border-y border-[var(--color-border)]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[var(--color-bg-light)] border border-[var(--color-border)] p-8 rounded-[var(--radius-card)] hover:border-[var(--color-primary)] transition-all group"
                            >
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[var(--color-primary)] mb-6 shadow-sm">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[var(--color-text-main)]">{item.title}</h3>
                                <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Showcase */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-text-main)] leading-tight">
                                    Why drivers <br /> choose <span className="text-[var(--color-primary)]">Us.</span>
                                </h2>
                                <p className="text-[var(--color-text-muted)] leading-relaxed text-lg">
                                    We believe in keeping things simple and honest. Here is what you can always expect when you book with us.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-[var(--color-bg-light)] flex items-center justify-center">
                                            <CheckCircle size={14} className="text-[var(--color-success)]" />
                                        </div>
                                        <span className="text-sm font-semibold text-[var(--color-text-main)]">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => navigate('/contact')}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-text-main)] text-white rounded-[var(--radius-button)] font-bold text-sm hover:bg-[var(--color-primary)] transition-all shadow-md"
                            >
                                Get in touch <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="w-full lg:w-1/2 relative">
                            {/* Reduced corner radius and removed grayscale for friendlier look */}
                            <div className="relative rounded-[var(--radius-card)] overflow-hidden bg-slate-100 aspect-square flex items-center justify-center border border-[var(--color-border)] shadow-xl">
                                <img
                                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200"
                                    className="w-full h-full object-cover"
                                    alt="Happy driver"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-5xl mx-auto bg-[var(--color-primary)] rounded-[var(--radius-card)] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-cyan-900/20 text-white">
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to verify the difference?</h2>
                        <p className="text-cyan-100 max-w-xl mx-auto text-lg leading-relaxed">
                            Book your perfect car today and experience the easiest rental process in the industry.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => navigate('/cars')}
                                className="w-full sm:w-auto px-8 py-4 bg-white text-[var(--color-primary)] rounded-[var(--radius-button)] font-bold text-sm hover:bg-cyan-50 transition-all shadow-md"
                            >
                                Browse Cars
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="w-full sm:w-auto px-8 py-4 bg-cyan-700 text-white rounded-[var(--radius-button)] font-bold text-sm hover:bg-cyan-800 transition-all border border-cyan-600"
                            >
                                Help Center
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services
