import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Calendar, User, Clock, ChevronLeft, Bookmark, Share2, Sparkles, ArrowRight, Layout, BookOpen, ExternalLink, MessageSquare, TrendingUp } from 'lucide-react'
import PageHeader from '../components/PageHeader'

const Blog = () => {
    const [selectedPost, setSelectedPost] = useState(null)
    const [activeCategory, setActiveCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')

    const categories = ['All', 'Fleet', 'Travel', 'Logistics', 'Lifestyle', 'Events', 'Tech']

    const posts = [
        {
            id: 1,
            title: "Executive Logistics: Orchestrating the Multi-City Fleet",
            excerpt: "How CarVenta handles complex cross-border rental logistics for international business delegations.",
            content: `
                <p>In the world of high-stakes corporate travel, logistics isn't just a department—it's the backbone of execution. CarVenta has pioneered a "Fleet-as-a-Service" model that allows multinational organizations to secure consistent, high-end transportation across multiple European and North American hubs with a single point of orchestration.</p>
                <p>Our recent deployment for the Global Tech Summit involved managing over 45 luxury SUVs and executive sedans across three time zones. The key to our success lies in our proprietary "Stationary Guard" technology—a predictive maintenance system that ensures every vehicle is in peak mechanical condition before a client even lands.</p>
                <h3>The 2026 Fleet Advantage</h3>
                <p>By leveraging real-time telemetry and advanced routing algorithms, we've reduced wait times at private terminals by 40%. Our drivers remain in constant synchronization with our global operations center, providing a level of security and punctuality that traditional rental agencies cannot match.</p>
                <p>As we expand our footprint into the emerging MENA markets, CarVenta continues to set the standard for what executive transportation should be: invisible, reliable, and fundamentally elite.</p>
            `,
            category: "Logistics",
            author: "Marcus Valerius",
            authorRole: "Head of Operations",
            date: "Jan 18, 2026",
            readTime: "8 min",
            image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070",
            featured: true
        },
        {
            id: 2,
            title: "Performance Metrics: The Engineering of the Sapphire Addition",
            excerpt: "A technical deep dive into why we've integrated the Lucid Air Sapphire into our 2026 collection.",
            content: `
                <p>Weight-to-power ratios are the metric by which performance is judged in the 2026 landscape. When we decided to add the Lucid Air Sapphire to our fleet, it wasn't just about the 1,234 horsepower. It was about the structural rigidity and the thermal management systems that allow it to perform at peak capacity consistently.</p>
                <p>The Sapphire represents a shift in our procurement strategy. We are no longer just looking for the fastest cars—we are looking for the most technologically advanced platforms. The vehicle's tri-motor setup provides torque vectoring that makes it feel significantly smaller than its wheelbase suggests, offering our clients a driving experience that is both exhilarating and remarkably safe.</p>
                <h3>Sustainable High-Performance</h3>
                <p>Sustainability is no longer a niche requirement; it is a fundamental expectation of our clientele. The Sapphire proves that moving towards an all-electric fleet does not mean compromising on the raw mechanical engagement that our members value. It is the pinnacle of American electric engineering, and we are proud to offer it for immediate reservation.</p>
            `,
            category: "Tech",
            author: "Elena Rossi",
            authorRole: "Technical Director",
            date: "Jan 15, 2026",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072"
        },
        {
            id: 3,
            title: "The Shift in High-End Asset Management",
            excerpt: "Why institutional investors and high-net-worth individuals are moving from ownership to rental subscriptions.",
            content: `
                <p>Vehicle ownership, particularly in the ultra-high-end segment, is increasingly seen as a logistical burden rather than a status symbol. Maintenance, depreciation, and storage logistics create friction that our members are eager to outsource. This is where the CarVenta "Asset-Light" philosophy comes into play.</p>
                <p>Our data shows a 65% increase in year-over-year subscriptions from users who previously owned two or more exotic vehicles. By moving to a CarVenta membership, they gain access to a diverse fleet of over 200 vehicles without the capital lock-up associated with individual ownership.</p>
                <h3>Economic Purity</h3>
                <p>From an ROI perspective, the subscription model allows for greater capital mobility. Members can fluctuate their vehicle requirements based on their seasonal needs—choosing SUVs for the winter alpine sessions and converting to open-top grand tourers for the summer coastal drives—all while maintaining a predictable monthly expenditure.</p>
            `,
            category: "Lifestyle",
            author: "Sophia Chen",
            authorRole: "Chief Strategy Officer",
            date: "Jan 12, 2026",
            readTime: "10 min",
            image: "https://images.unsplash.com/photo-1572291941045-14025ac253ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 4,
            title: "The Concierge Protocol: 24/7 Service Excellence",
            excerpt: "Inside the training systems that power our world-class support and support infrastructure.",
            content: `
                <p>At CarVenta, a rental is not a transaction—it is a commitment to service. Our concierge team undergoes a rigorous 12-week certification program that covers everything from local navigation expertise to advanced security protocols.</p>
                <p>Every interaction is managed through our proprietary "Service Core" dashboard, ensuring that preferences are tracked and anticipated. If a member prefers a specific cabin temperature and a certain type of bottled water, it's there before they open the door. This level of attention to detail is what separates CarVenta from the background noise of the rental market.</p>
            `,
            category: "Logistics",
            author: "David Knight",
            authorRole: "Head of Concierge",
            date: "Jan 10, 2026",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1471440671318-55bdbb772f93?q=80&w=2080"
        },
        {
            id: 5,
            title: "Alpine Routes: The Winter 2026 Collection",
            excerpt: "Curated driving routes through the Swiss and French Alps for our 4x4 enthusiasts.",
            content: `
                <p>There is a specific silence that comes with driving a Range Rover Autobiography through the Simplon Pass in January. The snow muffles the acoustics, and the road becomes a ribbon of contrast against the white landscape. For our Winter 2026 curated routes, we have partnered with three dedicated luxury chalets to provide charging infrastructure and secure parking for our fleet.</p>
                <p>We recommend the G-Wagon G63 or the Bentley Bentayga EWB for these routes. Both offer the necessary ground clearance and differential locking capabilities to navigate the steeper inclines while maintaining a cabin environment that rivals a private jet.</p>
            `,
            category: "Travel",
            author: "Isabella V.",
            authorRole: "Travel Curator",
            date: "Dec 28, 2025",
            readTime: "7 min",
            image: "https://images.unsplash.com/photo-1572291941045-14025ac253ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 6,
            title: "Security in Motion: The Armored Division",
            excerpt: "An overview of our B6 and B7 protection level vehicles available for diplomatic use.",
            content: `
                <p>Security is the ultimate luxury. Our new division of armored vehicles includes the BMW 7 Series Protection and the Sentinel Range Rover. Certified to B6 and B7 standards, these vehicles are designed to withstand significant ballistic threats while appearing identical to their standard counterparts.</p>
                <p>Clients requiring this level of security can also opt for our trained security drivers, all of whom are former specialized law enforcement or military personnel.</p>
            `,
            category: "Fleet",
            author: "Col. J. Sterling (Ret.)",
            authorRole: "Head of Security",
            date: "Dec 15, 2025",
            readTime: "9 min",
            image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070"
        },
        {
            id: 7,
            title: "The Art of the Grand Tour",
            excerpt: "Reimagining the classic European road trip with modern electric hypercars.",
            content: `
                <p>The Grand Tour is a tradition dating back centuries—a journey through Europe's cultural capitals in the finest machinery available. In 2026, we reimagine this with the Rimac Nevera and the Pininfarina Battista.</p>
                <p>With 500kW fast-charging networks now fully operational across the Ionity network, the electric hypercar is no longer tethered to the city. We have mapped out a 1,200km route from Monaco to Lake Como that optimizes charging stops at 5-star vineyard estates, ensuring that both the car and the driver are constantly refueled.</p>
            `,
            category: "Travel",
            author: "Alessandro M.",
            authorRole: "Lifestyle Editor",
            date: "Nov 30, 2025",
            readTime: "12 min",
            image: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070"
        },
        {
            id: 8,
            title: "Next-Gen Telemetry: The Driver's App",
            excerpt: "Introducing the new features of the CarVenta mobile command center.",
            content: `
                <p>Control is paramount. Our updated mobile application now offers real-time telemetry from your rental vehicle. Check tire pressures, battery health, and precise location data securely from your phone.</p>
                <p>For our supercar fleet, users can now download track telemetry data to analyze their performance on closed circuits, a feature requested by our enthusiast community.</p>
            `,
            category: "Tech",
            author: "Sarah Jenkins",
            authorRole: "Product Lead",
            date: "Nov 12, 2025",
            readTime: "4 min",
            image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070"
        }
    ]

    const filteredPosts = posts.filter(post => {
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    if (selectedPost) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='min-h-screen bg-white pt-24 pb-20'
            >
                <div className='max-w-4xl mx-auto px-6'>
                    {/* Detail Header */}
                    <div className="flex justify-between items-center mb-8">
                        <button
                            onClick={() => setSelectedPost(null)}
                            className='flex items-center gap-2 text-slate-400 hover:text-[#0891b2] font-bold text-xs uppercase tracking-widest transition-colors group'
                        >
                            <ChevronLeft size={16} className='group-hover:-translate-x-1 transition-transform' /> Back to Journal
                        </button>
                        <div className="flex gap-2">
                            <span className='px-3 py-1 bg-cyan-50 border border-cyan-100 text-[#0891b2] text-[10px] font-bold rounded uppercase tracking-widest'>
                                {selectedPost.category}
                            </span>
                        </div>
                    </div>

                    <div className='space-y-6 mb-10'>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className='text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight'
                        >
                            {selectedPost.title}
                        </motion.h1>

                        <div className='flex items-center justify-between py-6 border-y border-slate-100'>
                            <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 border border-white shadow-sm flex items-center justify-center text-[#0891b2] font-black text-lg'>
                                    {selectedPost.author.charAt(0)}
                                </div>
                                <div>
                                    <p className='text-sm font-bold text-slate-900'>{selectedPost.author}</p>
                                    <p className='text-[10px] text-slate-400 font-bold uppercase tracking-wider'>{selectedPost.authorRole}</p>
                                </div>
                            </div>
                            <div className='text-right'>
                                <p className='text-xs font-bold text-slate-900'>{selectedPost.date}</p>
                                <p className='text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 justify-end'>
                                    <Clock size={10} /> {selectedPost.readTime} Read
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Image */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className='rounded-2xl overflow-hidden aspect-[21/9] border border-slate-200 mb-12 shadow-2xl shadow-slate-200/50'
                    >
                        <img src={selectedPost.image} alt={selectedPost.title} className='w-full h-full object-cover' />
                    </motion.div>

                    {/* Content */}
                    <article className='prose prose-slate prose-lg max-w-none 
                        prose-headings:text-slate-900 prose-headings:font-bold prose-headings:tracking-tight
                        prose-p:text-slate-600 prose-p:leading-8 prose-p:font-medium
                        prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-[#0891b2]
                        prose-strong:text-slate-900
                        prose-blockquote:border-l-4 prose-blockquote:border-[#0891b2] prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                        space-y-6'
                        dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                    />

                    {/* Share / Footer */}
                    <div className='mt-20 pt-10 border-t border-slate-100 flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <button className='flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-[#0891b2] text-slate-500 hover:text-white rounded-lg transition-all border border-slate-100 text-xs font-bold uppercase tracking-wide'>
                                <Share2 size={16} /> Share Article
                            </button>
                            <button className='flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-[#0891b2] text-slate-500 hover:text-white rounded-lg transition-all border border-slate-100 text-xs font-bold uppercase tracking-wide'>
                                <Bookmark size={16} /> Save
                            </button>
                        </div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className='text-xs font-bold text-slate-400 hover:text-slate-900 border-b border-transparent hover:border-slate-900 transition-all uppercase tracking-widest'
                        >
                            Back to Top
                        </button>
                    </div>
                </div>
            </motion.div>
        )
    }

    return (
        <div className='min-h-screen bg-white'>
            <PageHeader
                title={<span>Narratives of <span className='text-[#0891b2]'>Motion.</span></span>}
                subtitle="Deep dives into automotive excellence, global travel guides, and exclusive insights from our world."
                breadcrumbs={[{ label: 'Blog', path: '/blog' }]}
            />

            <div className='max-w-7xl mx-auto px-6 py-12'>

                {/* Stats Section with Glass Effect */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-16'>
                    {[
                        { label: 'Weekly Articles', value: '14+' },
                        { label: 'Global Readers', value: '2.4k' },
                        { label: 'Premium Authors', value: '12' },
                        { label: 'Cities Covered', value: '34' }
                    ].map((stat, i) => (
                        <div key={i} className='p-6 bg-slate-50/50 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#0891b2]/30 transition-colors'>
                            <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2'>{stat.label}</span>
                            <span className='text-3xl font-black text-slate-900'>{stat.value}</span>
                        </div>
                    ))}
                </div>

                {/* Filters & Search */}
                <div className='sticky top-20 z-30 bg-white/80 backdrop-blur-md py-4 mb-8 border-y border-slate-100'>
                    <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6'>
                        <div className='flex overflow-x-auto pb-2 lg:pb-0 gap-2 no-scrollbar'>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold transition-all border ${activeCategory === cat
                                        ? 'bg-[#0891b2] text-white border-[#0891b2] shadow-md shadow-cyan-500/20'
                                        : 'bg-white text-slate-500 border-slate-200 hover:border-[#0891b2]/50 hover:text-[#0891b2]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className='relative w-full lg:w-72 group'>
                            <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0891b2] transition-colors' size={18} />
                            <input
                                type="text"
                                placeholder="Search archives..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium focus:ring-2 ring-[#0891b2]/10 focus:border-[#0891b2]/50 transition-all outline-none'
                            />
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <AnimatePresence mode='popLayout'>
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={post.id}
                                    onClick={() => { setSelectedPost(post); window.scrollTo(0, 0); }}
                                    className='group flex flex-col border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-[#0891b2]/30 hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-pointer h-full'
                                >
                                    <div className='aspect-[16/10] overflow-hidden relative'>
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500' />
                                        <img src={post.image} alt={post.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
                                        <div className='absolute top-4 left-4 z-20'>
                                            <div className='px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-black text-slate-900 uppercase tracking-widest border border-white/20 shadow-sm'>
                                                {post.category}
                                            </div>
                                        </div>
                                        <div className='absolute bottom-4 right-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'>
                                            <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0891b2] shadow-lg'>
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='p-8 flex flex-col flex-1 space-y-4'>
                                        <div className='flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                                            <Calendar size={12} /> {post.date}
                                            <span className='w-1 h-1 bg-slate-300 rounded-full'></span>
                                            <Clock size={12} /> {post.readTime}
                                        </div>
                                        <h3 className='text-xl font-bold text-slate-900 leading-tight group-hover:text-[#0891b2] transition-colors'>
                                            {post.title}
                                        </h3>
                                        <p className='text-slate-500 text-sm font-medium leading-relaxed line-clamp-3'>
                                            {post.excerpt}
                                        </p>
                                        <div className='pt-6 mt-auto border-t border-slate-100 flex items-center justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <div className='w-8 h-8 rounded-full bg-slate-100 border border-white shadow-sm flex items-center justify-center text-[10px] font-black text-slate-500'>
                                                    {post.author[0]}
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-none mb-0.5'>{post.author}</span>
                                                    <span className='text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none'>Author</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className='col-span-full py-24 flex flex-col items-center justify-center text-center space-y-4'>
                                <div className='w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300'>
                                    <Search size={32} />
                                </div>
                                <div>
                                    <h3 className='text-lg font-bold text-slate-900'>No narratives found</h3>
                                    <p className='text-sm text-slate-400 font-medium'>Adjust your filters or try a different search term.</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* High-Utility Footer Section */}
                <div className='mt-32 p-12 bg-slate-900 rounded-2xl relative overflow-hidden text-white'>
                    <div className='absolute top-0 right-0 w-96 h-96 bg-[#0891b2] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2'></div>
                    <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12'>
                        <div className='max-w-xl space-y-4 text-center lg:text-left'>
                            <div className='w-12 h-12 bg-[#0891b2] text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#0891b2]/20 mb-4 mx-auto lg:mx-0'>
                                <TrendingUp size={24} />
                            </div>
                            <h2 className='text-3xl font-bold tracking-tight'>Stay ahead of the <span className='text-[#0891b2]'>Evolution.</span></h2>
                            <p className='text-slate-400 font-medium text-sm leading-relaxed'>
                                Join 2,400+ corporate executives and enthusiasts receiving our monthly dossiers on emerging fleet technologies and travel logistics.
                            </p>
                        </div>
                        <div className='w-full lg:w-auto flex flex-col sm:flex-row gap-3'>
                            <input
                                type="email"
                                placeholder="Corporate email address"
                                className='px-6 py-4 bg-white/5 border border-white/10 rounded-xl outline-none text-sm font-medium w-full lg:w-72 focus:ring-2 ring-[#0891b2]/50 text-white placeholder-slate-500 transition-all'
                            />
                            <button className='px-10 py-4 bg-[#0891b2] text-white rounded-xl font-bold text-sm hover:bg-[#0e7490] transition-all shadow-lg active:scale-95 whitespace-nowrap'>
                                Join Registry
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Blog
