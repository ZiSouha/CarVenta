import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Privacy = () => {
    const navigate = useNavigate()
    return (
        <div className="pt-24 bg-white min-h-screen pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] mb-8 hover:underline">
                    <ArrowLeft size={16} /> Back
                </button>

                <h1 className="text-4xl font-bold text-[var(--color-text-main)] mb-4">Privacy Policy</h1>
                <p className="text-[var(--color-text-muted)] text-sm mb-12">Last updated: October 24, 2025</p>

                <div className="space-y-12 text-[var(--color-text-main)] leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
                        <p className="text-[var(--color-text-muted)]">
                            At CarVenta ("we", "our", or "us"), we respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4">2. The data we collect</h2>
                        <p className="text-[var(--color-text-muted)] mb-4">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[var(--color-text-muted)] marker:text-[var(--color-primary)]">
                            <li><strong className="text-[var(--color-text-main)]">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong className="text-[var(--color-text-main)]">Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong className="text-[var(--color-text-main)]">Financial Data:</strong> includes bank account and payment card details.</li>
                            <li><strong className="text-[var(--color-text-main)]">Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4">3. How we use your data</h2>
                        <p className="text-[var(--color-text-muted)]">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                            <br /><br />
                            - Where we need to perform the contract we are about to enter into or have entered into with you.
                            <br />
                            - Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.
                            <br />
                            - Where we need to comply with a legal or regulatory obligation.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Privacy
