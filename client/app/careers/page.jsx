'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import SvgSymbols from '@/components/SvgSymbols';
import TransitionScribble from '@/components/TransitionScribble';
import { submitJobApplication } from '@/lib/api';

const OPEN_POSITIONS = [
    {
        id: 'mern-dev',
        title: 'Full Stack MERN Developer',
        department: 'Engineering',
        type: 'Full-Time',
        location: 'Delhi (Civil Lines) / Hybrid',
        salary: '₹3,50,000 – ₹7,00,000 / year',
        experience: '1–3 Years',
        skills: ['React.js', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Razorpay'],
        desc: 'Build high-performance web applications, interactive client platforms, and custom administrative portals. Direct collaboration with lead developer Divyansh.'
    },
    {
        id: 'seo-exec',
        title: 'Technical SEO Specialist',
        department: 'Growth Marketing',
        type: 'Full-Time',
        location: 'Delhi / Remote Friendly',
        salary: '₹2,50,000 – ₹5,00,000 / year',
        experience: '1–2 Years',
        skills: ['Technical Crawl', 'Google Search Console', 'Schema Markup', 'Backlink Outreach', 'Core Web Vitals'],
        desc: 'Spearhead organic search campaigns for Pan-India clients, execute schema architecture, and optimize page performance for top-tier Google rankings.'
    },
    {
        id: 'ui-ux-designer',
        title: 'UI/UX & Motion Designer',
        department: 'Creative Design',
        type: 'Full-Time',
        location: 'Delhi / Hybrid',
        salary: '₹3,00,000 – ₹6,00,000 / year',
        experience: '1–3 Years',
        skills: ['Figma Design Systems', 'Motion Graphics', 'GSAP/Prototyping', 'Brand Identity', 'Typography'],
        desc: 'Craft modern, award-winning interfaces, interactive prototypes, design systems, and visual branding assets for innovative clients.'
    }
];

export default function CareersPage() {
    const [selectedRole, setSelectedRole] = useState(OPEN_POSITIONS[0].title);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: OPEN_POSITIONS[0].title,
        experience: '',
        portfolioLink: '',
        resumeLink: '',
        coverNote: ''
    });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleRoleSelect = (roleTitle) => {
        setSelectedRole(roleTitle);
        setFormData((prev) => ({ ...prev, role: roleTitle }));
        const formEl = document.getElementById('application-form');
        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            await submitJobApplication(formData);
            setStatus({ loading: false, success: true, error: null });
            setFormData({
                name: '',
                email: '',
                phone: '',
                role: selectedRole,
                experience: '',
                portfolioLink: '',
                resumeLink: '',
                coverNote: ''
            });
        } catch (err) {
            setStatus({ loading: false, success: false, error: err.message || 'Failed to submit application. Please reach us on WhatsApp.' });
        }
    };

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
                    <div className="subpage-badge">🚀 we are hiring!</div>
                    <h1 className="subpage-title">
                        build the future of
                        <br />
                        web &amp; growth with us<span style={{ color: 'var(--color-pink)' }}>.</span>
                    </h1>
                    <p className="subpage-subtitle">
                        Join Delhi&apos;s fastest-growing digital agency. We offer competitive salaries, hands-on mentorship, high-impact client projects, and zero corporate bureaucracy.
                    </p>
                </section>

                {/* Open Positions Grid */}
                <section style={{ maxWidth: '1280px', margin: '0 auto 80px', padding: '0 40px' }}>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '32px' }}>open positions</h2>

                    <div style={{ display: 'grid', gap: '28px' }}>
                        {OPEN_POSITIONS.map((job) => (
                            <div key={job.id} style={{
                                background: '#fff',
                                border: '2px solid #000',
                                borderRadius: '20px',
                                padding: '32px',
                                boxShadow: '6px 6px 0px #000',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '24px'
                            }}>
                                <div style={{ flex: '1 1 500px' }}>
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--color-lightgreen)', padding: '4px 10px', borderRadius: '50px', border: '1px solid #000' }}>
                                            {job.department}
                                        </span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#eee', padding: '4px 10px', borderRadius: '50px' }}>
                                            {job.type}
                                        </span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#eee', padding: '4px 10px', borderRadius: '50px' }}>
                                            📍 {job.location}
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '8px' }}>{job.title}</h3>
                                    <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.55, marginBottom: '16px' }}>{job.desc}</p>

                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                                        {job.skills.map(s => (
                                            <span key={s} style={{ fontSize: '0.75rem', fontWeight: 700, background: '#f5f5f5', padding: '3px 8px', borderRadius: '6px' }}>
                                                {s}
                                            </span>
                                        ))}
                                    </div>

                                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-darkblue)' }}>
                                        💰 {job.salary} • ⏳ {job.experience} exp
                                    </div>
                                </div>

                                <div>
                                    <button
                                        onClick={() => handleRoleSelect(job.title)}
                                        className="project-cta-btn"
                                        style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                                    >
                                        Apply for this Role ↗
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Application Form */}
                <section id="application-form" style={{ maxWidth: '880px', margin: '0 auto 100px', padding: '0 40px' }}>
                    <div style={{
                        background: '#fff',
                        border: '3px solid #000',
                        borderRadius: '24px',
                        padding: '48px 40px',
                        boxShadow: '10px 10px 0px #000'
                    }}>
                        <div className="subpage-badge" style={{ background: 'var(--color-pink)', color: '#000' }}>quick application</div>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '12px' }}>send your application</h2>
                        <p style={{ fontSize: '1rem', color: '#555', marginBottom: '32px' }}>
                            Applying for: <strong>{formData.role}</strong>
                        </p>

                        {status.success ? (
                            <div style={{
                                padding: '24px',
                                background: 'var(--color-lightgreen)',
                                border: '2px solid #000',
                                borderRadius: '16px',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>Application Received! 🎉</h3>
                                <p style={{ marginTop: '8px', fontSize: '0.95rem' }}>
                                    Thank you for applying. Divyansh and our hiring team will review your application and reach out via WhatsApp/email shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                                {status.error && (
                                    <div style={{ padding: '12px 16px', background: '#ffebee', color: '#c62828', borderRadius: '8px', border: '1px solid #c62828', fontSize: '0.9rem' }}>
                                        {status.error}
                                    </div>
                                )}

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your name"
                                            style={{ width: '100%', padding: '12px 16px', border: '2px solid #000', borderRadius: '10px', fontSize: '0.95rem' }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your@email.com"
                                            style={{ width: '100%', padding: '12px 16px', border: '2px solid #000', borderRadius: '10px', fontSize: '0.95rem' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>Phone / WhatsApp *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91 9876543210"
                                            style={{ width: '100%', padding: '12px 16px', border: '2px solid #000', borderRadius: '10px', fontSize: '0.95rem' }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>Years of Experience</label>
                                        <input
                                            type="text"
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                            placeholder="e.g. 2 years MERN / fresher"
                                            style={{ width: '100%', padding: '12px 16px', border: '2px solid #000', borderRadius: '10px', fontSize: '0.95rem' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>Portfolio / GitHub URL</label>
                                    <input
                                        type="url"
                                        value={formData.portfolioLink}
                                        onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                                        placeholder="https://github.com/yourusername or portfolio link"
                                        style={{ width: '100%', padding: '12px 16px', border: '2px solid #000', borderRadius: '10px', fontSize: '0.95rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>Resume / Google Drive Link *</label>
                                    <input
                                        type="url"
                                        required
                                        value={formData.resumeLink}
                                        onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                                        placeholder="Google Drive link or PDF download link (ensure link is public)"
                                        style={{ width: '100%', padding: '12px 16px', border: '2px solid #000', borderRadius: '10px', fontSize: '0.95rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>Why do you want to join Fitscalez?</label>
                                    <textarea
                                        rows={4}
                                        value={formData.coverNote}
                                        onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                                        placeholder="Tell us about the projects you built and what drives you..."
                                        style={{ width: '100%', padding: '12px 16px', border: '2px solid #000', borderRadius: '10px', fontSize: '0.95rem', resize: 'vertical' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status.loading}
                                    className="project-cta-btn"
                                    style={{ width: '100%', marginTop: '10px', opacity: status.loading ? 0.7 : 1 }}
                                >
                                    {status.loading ? 'Submitting Application...' : 'Submit Application 🚀'}
                                </button>
                            </form>
                        )}
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

