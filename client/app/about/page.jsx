'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import SvgSymbols from '@/components/SvgSymbols';
import TransitionScribble from '@/components/TransitionScribble';
import { AGENCY_INFO } from '@/lib/data';

const LEADERSHIP_TEAM = [
    {
        name: 'Mr. Hariom Saini',
        role: 'Founder & CEO',
        bio: 'Visionary entrepreneur directing agency strategy, corporate partnerships, and brand growth. Founded Fitscalez to deliver top-tier engineering for businesses across India.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        badge: 'Founder'
    },
    {
        name: 'Divyansh',
        role: 'Lead Web Developer',
        bio: 'Architecting high-scale full-stack MERN platforms, Next.js applications, automated Razorpay workflows, and performance-tuned web experiences.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        badge: 'Engineering Lead'
    },
    {
        name: 'Ms. Anshul Sharma',
        role: 'Partner & Strategy Director',
        bio: 'Leading marketing strategy, brand positioning, and performance client campaigns that maximize organic traffic, conversion rates, and ROI.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        badge: 'Strategy'
    }
];

const MILESTONES = [
    { number: '150+', label: 'Projects Delivered' },
    { number: '80+', label: 'Ambitious Brands Scaled' },
    { number: '99%', label: 'On-Time Milestones' },
    { number: '300%+', label: 'Average Client Traffic Jump' }
];

export default function AboutPage() {
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
                    <div className="subpage-badge">👥 about fitscalez</div>
                    <h1 className="subpage-title">
                        we engineer digital growth
                        <br />
                        for the new mainstream<span style={{ color: 'var(--color-pink)' }}>.</span>
                    </h1>
                    <p className="subpage-subtitle">
                        Founded in 2021 in Civil Lines, Delhi, Fitscalez bridges the gap between elite full-stack web engineering and high-ROI digital marketing.
                    </p>

                    {/* Metrics Banner */}
                    <div className="about-stats-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '24px',
                        margin: '50px 0'
                    }}>
                        {MILESTONES.map((m) => (
                            <div key={m.label} style={{
                                padding: '30px 24px',
                                background: '#fff',
                                border: '2px solid #000',
                                borderRadius: '18px',
                                boxShadow: '5px 5px 0px #000'
                            }}>
                                <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--color-darkblue)', lineHeight: 1 }}>{m.number}</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#555', marginTop: '10px' }}>{m.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Agency Story Section */}
                <section style={{ maxWidth: '1280px', margin: '0 auto 80px', padding: '0 40px' }}>
                    <div style={{
                        background: '#fff',
                        border: '3px solid #000',
                        borderRadius: '24px',
                        padding: '50px 40px',
                        boxShadow: '8px 8px 0px #000'
                    }}>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '20px' }}>
                            the philosophy: code + marketing in lockstep
                        </h2>
                        <p style={{ fontSize: '1.15rem', color: '#444', lineHeight: 1.7, marginBottom: '24px' }}>
                            Most agencies are broken into two silos: developers who don&apos;t understand marketing, and marketers who can&apos;t write a line of code. Fitscalez was created by Mr. Hariom Saini to fuse both disciplines under one roof.
                        </p>
                        <p style={{ fontSize: '1.15rem', color: '#444', lineHeight: 1.7, marginBottom: '30px' }}>
                            Whether we are developing custom web applications for revolutionary facilities like <strong>Walk The Plan</strong> (1:1 architectural blueprint projection studio) or crafting bespoke digital architecture portfolios like <strong>House of Symmetry</strong>, our systems are engineered for uncompromising speed, rock-solid security, and maximum search engine authority.
                        </p>

                        <div style={{
                            padding: '24px',
                            background: 'var(--color-lightgreen)',
                            border: '2px solid #000',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '20px'
                        }}>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Visit Our Delhi Headquarters</h4>
                                <p style={{ fontSize: '0.95rem', color: '#222', marginTop: '4px' }}>
                                    {AGENCY_INFO.address.street}, {AGENCY_INFO.address.area}, {AGENCY_INFO.address.city} - {AGENCY_INFO.address.pincode}
                                </p>
                            </div>
                            <a
                                href="https://maps.google.com/?q=24+Shri+Ram+Road+Civil+Lines+Delhi+110054"
                                target="_blank"
                                rel="noreferrer"
                                className="project-cta-btn"
                                style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                            >
                                Open on Google Maps ↗
                            </a>
                        </div>
                    </div>
                </section>

                {/* Leadership Section */}
                <section className="subpage-grid-section">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '40px', textAlign: 'center' }}>
                        meet the leadership team
                    </h2>

                    <div className="subpage-responsive-grid">
                        {LEADERSHIP_TEAM.map((member) => (
                            <div key={member.name} style={{
                                background: '#fff',
                                border: '2px solid #000',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '6px 6px 0px #000'
                            }}>
                                <div style={{ height: '240px', overflow: 'hidden', borderBottom: '2px solid #000' }}>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ padding: '24px' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        padding: '4px 10px',
                                        borderRadius: '50px',
                                        background: 'var(--color-orange)',
                                        color: '#000',
                                        display: 'inline-block',
                                        marginBottom: '12px'
                                    }}>
                                        {member.badge}
                                    </span>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '4px' }}>{member.name}</h3>
                                    <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-darkblue)', marginBottom: '12px' }}>{member.role}</p>
                                    <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.55 }}>{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bottom CTA Banner */}
                <div className="project-cta-banner">
                    <h2 className="project-cta-title">ready to scale your business?</h2>
                    <p className="project-cta-desc">
                        Work directly with our senior leadership and developers on your next digital platform.
                    </p>
                    <a href="/contact" className="project-cta-btn">
                        Schedule a Strategy Session ↗
                    </a>
                </div>
            </main>

            <footer className="main-footer">
                <Footer />
            </footer>

            <TransitionScribble />
        </>
    );
}

