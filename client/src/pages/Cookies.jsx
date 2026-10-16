import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Cookies = () => {
    const navigate = useNavigate()
    return (
        <div className="pt-24 bg-white min-h-screen pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] mb-8 hover:underline">
                    <ArrowLeft size={16} /> Back
                </button>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
                <p className="text-gray-500 text-sm mb-12">Last updated: October 24, 2025</p>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <p>
                        This specific Cookie Policy explains what cookies are and how we use them, the types of cookies we use, the information we collect using cookies, and how that information is used.
                    </p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">What are cookies?</h2>
                        <p className="text-gray-500">Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make it more secure, provide better user experience, and understand how the website performs.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">How do we use cookies?</h2>
                        <p className="text-gray-500 mb-2">As most of the online services, our website uses first-party and third-party cookies for several purposes:</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-500">
                            <li><strong className="text-gray-900">Essential:</strong> Some cookies are essential for you to be able to experience the full functionality of our site. They allow us to maintain user sessions and prevent any security threats. They do not collect or store any personal information.</li>
                            <li><strong className="text-gray-900">Statistics:</strong> These cookies store information like the number of visitors to the website, the number of unique visitors, which pages of the website have been visited, the source of the visit, etc. These data help us understand and analyze how well the website performs.</li>
                            <li><strong className="text-gray-900">Functional:</strong> These are the cookies that help certain non-essential functionalities on our website. These functionalities include embedding content like videos or sharing content of the website on social media platforms.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Cookies
