import React from 'react'
import { Star } from 'lucide-react'

const Testimonial = () => {

    const testimonials = [
        {
            name: "Alexander Mitchell",
            role: "CEO, TechFlow",
            text: "I've used every rental service from Turo to Hertz. CarVenta is in a different league. The vehicle condition was immaculate and the service was flawless.",
            rating: 5
        },
        {
            name: "Sarah Jenkins",
            role: "Product Designer",
            text: "The digital key feature is a lifesaver. Landed at JFK, walked to the car, and was on the highway in 5 minutes. No counters, no paperwork.",
            rating: 5
        },
        {
            name: "James Carter",
            role: "Architect",
            text: "Finally, a service that understands quality. The app is straightforward, and the fleet selection is curated perfection. Highly recommended.",
            rating: 5
        }
    ];

    return (
        <section className='py-24 px-6 bg-white border-t border-slate-100'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8'>
                    <div className='space-y-4'>
                        <div className='inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-100 rounded-md text-[10px] font-bold uppercase tracking-widest text-[#0891b2]'>
                            Service Analysis
                        </div>
                        <h2 className='text-3xl md:text-4xl font-bold text-slate-900'>
                            Institutional Feedback
                        </h2>
                        <p className='text-slate-500 font-medium max-w-xl'>
                            Standardized performance metrics based on verified executive reviews.
                        </p>
                    </div>
                    <div className='hidden md:block'>
                        <button className='text-xs font-bold text-slate-400 hover:text-[#0891b2] uppercase tracking-widest border-b border-slate-100 hover:border-[#0891b2] pb-1 transition-all'>
                            View Complete Registry &rarr;
                        </button>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {testimonials.map((item, index) => (
                        <div key={index} className='bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col'>
                            <div className='flex gap-1 mb-6'>
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} size={14} fill="#0891b2" className='text-[#0891b2]' />
                                ))}
                            </div>
                            <p className='text-slate-600 font-medium leading-relaxed mb-10 flex-1 italic'>
                                "{item.text}"
                            </p>
                            <div className='flex items-center gap-4 pt-6 border-t border-slate-100'>
                                <div className='w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 font-black text-xs'>
                                    {item.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className='font-bold text-slate-900 text-sm'>{item.name}</p>
                                    <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonial
