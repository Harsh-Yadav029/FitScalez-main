'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import SvgSymbols from '@/components/SvgSymbols';
import TransitionScribble from '@/components/TransitionScribble';
import { AGENCY_INFO } from '@/lib/data';

export default function PrivacyPolicyPage() {
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
                    <div className="subpage-badge">🔒 legal &amp; privacy</div>
                    <h1 className="subpage-title">
                        privacy policy<span style={{ color: 'var(--color-pink)' }}>.</span>
                    </h1>
                    <p className="subpage-subtitle">
                        Last updated: October 2024. Your privacy and data security are fundamental to how we engineer and operate at Fitscalez.
                    </p>
                </section>

                <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 40px 100px', lineHeight: 1.8, fontSize: '1.05rem', color: '#222' }}>
                    <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '24px', padding: '40px 36px', marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>1. Overview &amp; Scope</h2>
                        <p style={{ marginBottom: '16px' }}>
                            Fitscalez (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), operating from Civil Lines, Delhi, India, provides full-stack web development, digital growth marketing, and technical consultancy services. This Privacy Policy details the types of information we collect through our website, how we utilize and safeguard your information, and your rights concerning personal data.
                        </p>
                        <p>
                            By interacting with our website (<a href="/" style={{ color: 'inherit', fontWeight: 600 }}>fitscalez.com</a>) or submitting project inquiries, job applications, or consultation requests, you acknowledge the terms outlined in this document.
                        </p>
                    </div>

                    <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '24px', padding: '40px 36px', marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>2. Information We Collect</h2>
                        <ul style={{ paddingLeft: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li>
                                <strong>Client Inquiries &amp; Contact Data:</strong> Name, business email, contact phone number, company name, service requirements, budget ranges, and project descriptions submitted via our lead forms.
                            </li>
                            <li>
                                <strong>Job Applications:</strong> Candidate full name, resume files, portfolio links, phone number, employment background, and cover notes submitted via our Careers portal.
                            </li>
                            <li>
                                <strong>Technical &amp; Usage Data:</strong> Anonymized IP addresses, approximate geographic location (city/country), browser type, operating system, referrer paths, and page interaction timestamps recorded via our internal visitor analytics.
                            </li>
                        </ul>
                    </div>

                    <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '24px', padding: '40px 36px', marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>3. How We Use Your Information</h2>
                        <p style={{ marginBottom: '14px' }}>We utilize collected data strictly for the following operational purposes:</p>
                        <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li>To evaluate project scopes, provide customized quotations, and deliver web engineering services.</li>
                            <li>To contact you via WhatsApp, email, or telephone regarding your consultation request.</li>
                            <li>To evaluate career applicants for open engineering and design roles.</li>
                            <li>To optimize website performance, Core Web Vitals, and user experience.</li>
                            <li>To prevent unauthorized administrative access and safeguard platform integrity.</li>
                        </ul>
                    </div>

                    <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '24px', padding: '40px 36px', marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>4. Cookies &amp; Tracking Technologies</h2>
                        <p style={{ marginBottom: '14px' }}>
                            Our platform utilizes strictly necessary `HttpOnly`, `SameSite=None` secure session cookies for administrative authentication. We do not use third-party behavioral advertising trackers to profile visitors.
                        </p>
                        <p>
                            You may configure your web browser to reject cookies; however, administrative authentication capabilities may be disabled as a result.
                        </p>
                    </div>

                    <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '24px', padding: '40px 36px', marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>5. Data Storage, Security &amp; Sharing</h2>
                        <p style={{ marginBottom: '14px' }}>
                            All client records and inquiries are encrypted in transit via TLS/HTTPS and stored securely in MongoDB Atlas with strict IP whitelisting and role-based access.
                        </p>
                        <p>
                            <strong>We never sell, rent, or trade your personal information.</strong> Data is shared only with trusted technical infrastructure providers (such as cloud hosting, payment gateways like Razorpay, and communication channels) strictly necessary to fulfill our service commitments.
                        </p>
                    </div>

                    <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '24px', padding: '40px 36px' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>6. Contact Us &amp; Grievance Redressal</h2>
                        <p style={{ marginBottom: '14px' }}>
                            For privacy inquiries, data deletion requests, or questions regarding our data practices, please contact our team:
                        </p>
                        <p style={{ fontWeight: 600 }}>
                            Fitscalez Agency<br />
                            Email: <a href={`mailto:${AGENCY_INFO.email}`} style={{ color: 'inherit' }}>{AGENCY_INFO.email}</a><br />
                            Phone: {AGENCY_INFO.phone}<br />
                            Address: {AGENCY_INFO.address.street}, {AGENCY_INFO.address.area}, {AGENCY_INFO.address.city} - {AGENCY_INFO.address.pincode}, India
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
