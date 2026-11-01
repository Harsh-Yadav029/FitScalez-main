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
        salary: '₹4,00,000 – ₹7,50,000 / year',
        experience: '1–3 Years',
        skills: ['React.js', 'Next.js 15', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Razorpay'],
        desc: 'Architect high-performance web platforms, dynamic full-stack client dashboards, and secure administrative engines with lead developer Divyansh.'
    },
    {
        id: 'frontend-dev',
        title: 'Frontend React / Next.js Developer',
        department: 'Engineering',
        type: 'Full-Time',
        location: 'Delhi (Civil Lines) / Remote Friendly',
        salary: '₹3,50,000 – ₹6,00,000 / year',
        experience: '1–2 Years',
        skills: ['Next.js 15', 'React 19', 'Tailwind CSS', 'GSAP Motion', 'Responsive UI', 'TypeScript'],
        desc: 'Create award-winning interactive UI experiences with silky smooth scroll physics, responsive mobile micro-interactions, and pristine Core Web Vitals.'
    },
    {
        id: 'seo-specialist',
        title: 'Technical SEO & Organic Growth Specialist',
        department: 'Growth Marketing',
        type: 'Full-Time',
        location: 'Delhi / Hybrid',
        salary: '₹3,00,000 – ₹5,50,000 / year',
        experience: '1–3 Years',
        skills: ['Technical Crawl & Audit', 'Google Search Console', 'JSON-LD Schemas', 'Backlink Outreach', 'Core Web Vitals'],
        desc: 'Execute deep technical SEO audits, implement structured schema architecture, and scale keyword rankings to deliver 300%+ organic traffic growth for national clients.'
    },
    {
        id: 'ui-ux-designer',
        title: 'UI/UX & Motion Designer',
        department: 'Creative Design',
        type: 'Full-Time',
        location: 'Delhi (Civil Lines) / Hybrid',
        salary: '₹3,50,000 – ₹6,50,000 / year',
        experience: '1–3 Years',
        skills: ['Figma Design Systems', 'Interactive Prototyping', 'Motion Graphics', 'Brand Identity', 'Typography'],
        desc: 'Design playful, high-converting digital interfaces, scalable design systems, and animated vector assets that captivate audiences.'
    },
    {
        id: 'performance-marketer',
        title: 'Performance Marketing & Paid Ads Manager',
        department: 'Growth Marketing',
        type: 'Full-Time',
        location: 'Delhi / Remote Friendly',
        salary: '₹4,00,000 – ₹8,00,000 / year',
        experience: '2–4 Years',
        skills: ['Google Ads (Search & PMax)', 'Meta Ads Manager', 'Conversion Tracking', 'A/B Split Testing', 'ROAS Optimization'],
        desc: 'Manage high-budget client campaigns across Meta, Google Search, and LinkedIn to generate scalable leads, minimize CAC, and maximize measurable ROAS.'
    },
    {
        id: 'social-video-producer',
        title: 'Social Media & Short-Form Video Producer',
        department: 'Creative Content',
        type: 'Full-Time',
        location: 'Delhi (Civil Lines) / On-site Studio',
        salary: '₹2,80,000 – ₹5,00,000 / year',
        experience: '1–2 Years',
        skills: ['Premiere Pro / CapCut', 'Viral Reels Scripting', 'Trend Research', 'Studio Lighting & Audio', 'Social Storytelling'],
        desc: 'Direct, shoot, and edit high-engagement short-form video reels, brand spotlights, and viral client content tailored for Instagram, TikTok, and YouTube Shorts.'
    }
];

const DEPARTMENTS = ['All', 'Engineering', 'Growth Marketing', 'Creative Design', 'Creative Content'];

export default function CareersPage() {
    const [selectedDepartment, setSelectedDepartment] = useState('All');
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

    const filteredPositions = selectedDepartment === 'All'
        ? OPEN_POSITIONS
        : OPEN_POSITIONS.filter(p => p.department === selectedDepartment);

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
            const payload = {
                fullName: formData.name,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                experience: formData.experience,
                portfolioUrl: formData.portfolioLink,
                portfolioLink: formData.portfolioLink,
                resumeUrl: formData.resumeLink,
                resumeLink: formData.resumeLink,
                coverNote: formData.coverNote
            };
            await submitJobApplication(payload);
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

                {/* Open Positions Section */}
                <section className="subpage-grid-section">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                        <div>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, letterSpacing: '-1px', marginBottom: '8px' }}>
                                open positions ({filteredPositions.length})
                            </h2>
                            <p style={{ color: '#555', fontSize: '0.95rem' }}>
                                Explore current hiring opportunities across Engineering, Marketing, and Creative teams.
                            </p>
                        </div>

                        {/* Department Filters */}
                        <div className="filter-pills" style={{ marginBottom: 0 }}>
                            {DEPARTMENTS.map((dept) => {
                                const count = dept === 'All' ? OPEN_POSITIONS.length : OPEN_POSITIONS.filter(p => p.department === dept).length;
                                return (
                                    <button
                                        key={dept}
                                        type="button"
                                        onClick={() => setSelectedDepartment(dept)}
                                        className={`filter-pill ${selectedDepartment === dept ? 'active' : ''}`}
                                        style={{ fontSize: '0.85rem', padding: '6px 16px' }}
                                    >
                                        {dept} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="career-jobs-list">
                        {filteredPositions.map((job) => (
                            <div key={job.id} className="career-job-card">
                                <div className="career-job-info">
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
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

                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>{job.title}</h3>
                                    <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.55, marginBottom: '16px' }}>{job.desc}</p>

                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
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

                                <div className="career-job-cta">
                                    <button
                                        type="button"
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
                <section id="application-form" className="subpage-grid-section" style={{ maxWidth: '920px' }}>
                    <div className="career-form-card">
                        <div className="subpage-badge" style={{ background: 'var(--color-pink)', color: '#000' }}>quick application</div>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, marginBottom: '8px' }}>send your application</h2>
                        <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '28px' }}>
                            Submit your details directly to Hariom &amp; Divyansh. We review all applications within 24 hours.
                        </p>

                        {status.success ? (
                            <div style={{
                                padding: '32px 24px',
                                background: 'var(--color-lightgreen)',
                                border: '2px solid #000',
                                borderRadius: '16px',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>Application Received! 🎉</h3>
                                <p style={{ marginTop: '8px', fontSize: '0.95rem', lineHeight: 1.6 }}>
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

                                {/* Role Selector Dropdown */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>Applying For Role *</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => {
                                            setFormData({ ...formData, role: e.target.value });
                                            setSelectedRole(e.target.value);
                                        }}
                                        style={{ width: '100%', padding: '12px 16px', border: '2px solid #000', borderRadius: '10px', fontSize: '0.95rem', background: '#fff', cursor: 'pointer' }}
                                    >
                                        {OPEN_POSITIONS.map(p => (
                                            <option key={p.id} value={p.title}>{p.title} ({p.department})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="subpage-responsive-grid" style={{ gap: '20px' }}>
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

                                <div className="subpage-responsive-grid" style={{ gap: '20px' }}>
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
                                            placeholder="e.g. 1 year / 2 years / Fresher"
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
                                        placeholder="https://github.com/yourusername or portfolio website"
                                        style={{ width: '100%', padding: '12px 16px', border: '2px solid #000', borderRadius: '10px', fontSize: '0.95rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>Resume Link (Google Drive / Notion / PDF) *</label>
                                    <input
                                        type="url"
                                        required
                                        value={formData.resumeLink}
                                        onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                                        placeholder="Public Google Drive or cloud resume URL"
                                        style={{ width: '100%', padding: '12px 16px', border: '2px solid #000', borderRadius: '10px', fontSize: '0.95rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>Why do you want to join Fitscalez?</label>
                                    <textarea
                                        rows={4}
                                        value={formData.coverNote}
                                        onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                                        placeholder="Tell us about the projects you built, what tools you love, and what drives you..."
                                        style={{ width: '100%', padding: '12px 16px', border: '2px solid #000', borderRadius: '10px', fontSize: '0.95rem', resize: 'vertical' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status.loading}
                                    className="project-cta-btn"
                                    style={{ width: '100%', marginTop: '10px', opacity: status.loading ? 0.7 : 1, textAlign: 'center', justifyContent: 'center' }}
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

