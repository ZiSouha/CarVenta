import React from 'react'
import { motion } from 'motion/react'
import { ArrowRight, MapPin, Briefcase, Users, Heart } from 'lucide-react'

const Careers = () => {

    const openings = [
        { title: "Senior Frontend Engineer", dept: "Engineering", location: "Remote / SF", type: "Full-time" },
        { title: "Product Designer", dept: "Design", location: "New York, NY", type: "Full-time" },
        { title: "Fleet Operations Manager", dept: "Operations", location: "Los Angeles, CA", type: "On-site" },
        { title: "Customer Success Specialist", dept: "Support", location: "London, UK", type: "Full-time" },
    ]

    return (
        <div className="pt-24 bg-[var(--color-bg-light)] min-h-screen pb-20">
            {/* Hero */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <span className="inline-block px-3 py-1 bg-white border border-[var(--color-border)] rounded-full text-[var(--color-primary)] text-xs font-semibold shadow-sm">
                        We're Hiring
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-main)] tracking-tight">
                        Build the future of <br /><span className="text-[var(--color-primary)]">mobility.</span>
                    </h1>
                    <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                        Join a team of passionate individuals dedicated to simplifying how the world moves.
                        We value curiosity, ownership, and kindness.
                    </p>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Work from anywhere", desc: "We are a remote-first company with hubs in major cities.", icon: <MapPin className="text-[var(--color-primary)]" /> },
                        { title: "Competitive Pay", desc: "Top-tier salary, equity, and comprehensive benefits.", icon: <Briefcase className="text-[var(--color-primary)]" /> },
                        { title: "Growth & Learning", desc: "Annual stipends for conferences, courses, and books.", icon: <Users className="text-[var(--color-primary)]" /> },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-[var(--radius-card)] border border-[var(--color-border)] shadow-sm">
                            <div className="mb-4 w-10 h-10 bg-[var(--color-bg-light)] rounded-full flex items-center justify-center">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-2">{item.title}</h3>
                            <p className="text-[var(--color-text-muted)] text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Openings */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-10">Open Positions</h2>
                    <div className="space-y-4">
                        {openings.map((job, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -2 }}
                                className="group flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-[var(--color-border)] rounded-[var(--radius-card)] hover:border-[var(--color-primary)] transition-all cursor-pointer shadow-sm"
                            >
                                <div className="mb-4 md:mb-0 text-center md:text-left">
                                    <h3 className="text-lg font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition-colors">{job.title}</h3>
                                    <div className="flex items-center gap-3 justify-center md:justify-start mt-2 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
                                        <span>{job.dept}</span>
                                        <span className="w-1 h-1 rounded-full bg-[var(--color-border)]"></span>
                                        <span>{job.location}</span>
                                        <span className="w-1 h-1 rounded-full bg-[var(--color-border)]"></span>
                                        <span>{job.type}</span>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[var(--color-bg-light)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                                    <ArrowRight size={18} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Careers
