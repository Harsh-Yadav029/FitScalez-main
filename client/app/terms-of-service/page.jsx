'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import SvgSymbols from '@/components/SvgSymbols';
import TransitionScribble from '@/components/TransitionScribble';
import { AGENCY_INFO } from '@/lib/data';

export default function TermsOfServicePage() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />

            <header className="main-header" style={{ position: 'relative' }}>
                <Navbar />
            </header>

            <main className="subpage-container">
                <section className="subpage-hero">
                    <div className="subpage-badge">📄 terms &amp; agreements</div>
                    <h1 className="subpage-title">
                        terms of service<span style={{ color: 'var(--color-pink)' }}>.</span>
                    </h1>
                    <p className="subpage-subtitle">
                        Last updated: October 2024. These terms govern the provision of web development, engineering, and digital growth services by Fitscalez.
                    </p>
                </section>

                <section className="legal-content-section">
                    <div className="legal-box">
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>1. Agreement to Terms</h2>
                        <p>
                            By engaging Fitscalez (&ldquo;Agency&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) for web development, technical SEO, UI/UX design, or advertising campaigns, or by using this website, you agree to comply with and be bound by these Terms of Service. If you are entering into this agreement on behalf of a business entity, you confirm that you possess the authority to bind that entity.
                        </p>
                    </div>

                    <div className="legal-box">
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>2. Scope of Services &amp; Deliverables</h2>
                        <p style={{ marginBottom: '14px' }}>
                            Fitscalez provides custom digital engineering and marketing services according to agreed-upon project specifications, proposals, or Statements of Work (SOW):
                        </p>
                        <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li><strong>Full-Stack Web Development:</strong> Next.js, React, Node.js, Express, and MongoDB platform development.</li>
                            <li><strong>Technical SEO &amp; Auditing:</strong> Core Web Vitals optimization, schema architecture, and search visibility improvements.</li>
                            <li><strong>UI/UX &amp; Motion Design:</strong> Custom Figma design systems, interactive prototypes, and branding assets.</li>
                            <li><strong>Growth Marketing:</strong> Paid campaign configuration, short-form video creation, and analytics tracking.</li>
                        </ul>
                    </div>

                    <div className="legal-box">
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>3. Project Milestones &amp; Payment Terms</h2>
                        <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>Quotations provided in proposals are valid for 30 days from the date of issuance.</li>
                            <li>Standard project agreements typically follow a milestone-based payment structure (e.g. initial mobilization advance, milestone sign-off, and final deployment).</li>
                            <li>Invoices must be settled via bank transfer or supported Razorpay gateways within the period stipulated on the invoice.</li>
                            <li>Delays in client content submissions or review approvals may result in schedule adjustments for target milestone delivery dates.</li>
                        </ul>
                    </div>

                    <div className="legal-box">
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>4. Intellectual Property &amp; Ownership</h2>
                        <p style={{ marginBottom: '14px' }}>
                            Upon receipt of full and final payment for a custom development project, full ownership of client-specific custom source code, written copy, and design assets transfers to the client.
                        </p>
                        <p>
                            Fitscalez retains the perpetual right to showcase non-confidential deliverables and published case studies in its agency portfolio, marketing reels, and award submissions unless a formal Non-Disclosure Agreement (NDA) specifies otherwise.
                        </p>
                    </div>

                    <div className="legal-box">
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>5. Warranties &amp; Technical Support</h2>
                        <p style={{ marginBottom: '14px' }}>
                            Standard bespoke web platforms include 30 days of post-launch warranty support covering bug fixes and technical adjustments within the agreed scope of work. Ongoing server maintenance, hosting infrastructure fees, or third-party API subscription costs remain the responsibility of the client.
                        </p>
                    </div>

                    <div className="legal-box">
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>6. Governing Law &amp; Jurisdiction</h2>
                        <p style={{ marginBottom: '14px' }}>
                            These Terms and any contractual disputes shall be governed by and construed in accordance with the laws of India. Any legal action arising hereunder shall be subject to the exclusive jurisdiction of the competent courts located in Delhi, India.
                        </p>
                        <p style={{ fontWeight: 600 }}>
                            For legal inquiries: <a href={`mailto:${AGENCY_INFO.email}`} style={{ color: 'inherit' }}>{AGENCY_INFO.email}</a>
                        </p>
                    </div>
                </section>
            </main>

            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}

