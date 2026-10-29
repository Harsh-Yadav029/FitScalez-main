'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import SvgSymbols from '@/components/SvgSymbols';
import TransitionScribble from '@/components/TransitionScribble';

const ALL_PROJECTS = [
    {
        id: 'walk-the-plan',
        title: 'Walk The Plan — 1:1 Blueprint Projection',
        category: 'web',
        categoryLabel: 'Web App • Architectural Tech',
        image: '/assets/fitscalez/project-walktheplan.jpg',
        url: 'https://walktheplan.in',
        isLive: true,
        desc: "High-performance web platform built for India's groundbreaking 1:1 life-size architectural projection facility. Features online studio slot booking, interactive walkthrough showcase, and seamless Razorpay payment integration.",
        metrics: '⚡ Razorpay Integrated • 🌐 1:1 Scale Tech',
        tags: ['React.js', 'Razorpay', 'Vite', 'TailwindCSS', 'Booking System']
    },
    {
        id: 'house-of-symmetry',
        title: 'House of Symmetry — Architecture & Luxury Design',
        category: 'web',
        categoryLabel: 'Luxury Architecture • Portfolio',
        image: '/assets/fitscalez/project-houseofsymmetry.jpg',
        url: 'https://www.houseofsymmetry.in',
        isLive: true,
        desc: 'Ultra-luxurious, minimalist digital portfolio designed and engineered for an elite architectural and interior design firm. Delivers immersive spatial storytelling, ultra-fast imagery loading, and high-conversion client consultation inquiries.',
        metrics: '🏛️ Luxury Spatial Design • 📈 High-End Client Funnels',
        tags: ['Architectural Web', 'UI/UX Design', 'SEO Optimized', 'Mobile Responsive']
    },
    {
        id: 'fashionwave',
        title: 'FashionWave — MERN E-Commerce Platform',
        category: 'web',
        categoryLabel: 'Full-Stack MERN Platform',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
        url: '#',
        isLive: false,
        desc: 'Complete full-stack MERN e-commerce application handling 5,000+ catalog items, real-time cart synchronization, inventory controls, and automated Razorpay invoice receipts.',
        metrics: '📈 +180% Revenue Growth • ⚡ 0.8s Load Speed',
        tags: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Razorpay']
    },
    {
        id: 'greenleaf',
        title: 'GreenLeaf Organics — Viral Brand Growth',
        category: 'marketing',
        categoryLabel: 'Social Media & Growth',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
        url: '#',
        isLive: false,
        desc: 'Multi-platform organic social growth strategy producing short-form video content and creator partnerships that scaled follower count and brand awareness.',
        metrics: '🚀 2K → 50K Followers in 4 Months • +300% Reach',
        tags: ['Instagram Reels', 'Shorts Production', 'Community Growth']
    },
    {
        id: 'buildright',
        title: 'BuildRight Infra — Local SEO Domination',
        category: 'seo',
        categoryLabel: 'Technical & Local SEO',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
        url: '#',
        isLive: false,
        desc: 'Comprehensive technical crawl, keyword architecture, Google Business Profile optimization, and local backlink acquisition across Delhi NCR.',
        metrics: '📍 #1 on Google Maps for 25+ High-Intent Keywords • +400% Traffic',
        tags: ['Local SEO', 'Search Console', 'Schema Markup', 'Core Web Vitals']
    },
    {
        id: 'medcare',
        title: 'MedCare — Corporate Brand Film',
        category: 'video',
        categoryLabel: 'Video Production & Storytelling',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        url: '#',
        isLive: false,
        desc: "High-quality corporate brand documentary showcasing healthcare facilities, doctors' expertise, and patient success stories with 40% improvement in brand trust.",
        metrics: '🎬 2M+ Views • +40% Brand Perception Score',
        tags: ['Commercial Video', 'Motion Graphics', 'Storytelling', '4K Cinema']
    },
    {
        id: 'eduprime',
        title: 'EduPrime — Learning Management System',
        category: 'web',
        categoryLabel: 'MERN Education Platform',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
        url: '#',
        isLive: false,
        desc: 'Full-featured LMS platform featuring on-demand video streaming, automated student quizzes, course enrollment checkout, and instructor analytics dashboard.',
        metrics: '🎓 5,000+ Active Students • ₹15L First-Quarter Revenue',
        tags: ['React.js', 'Node.js', 'MongoDB', 'Video Streaming', 'LMS']
    },
    {
        id: 'autoguru',
        title: 'AutoGuru India — Complete Brand Overhaul',
        category: 'branding',
        categoryLabel: 'Brand Identity & Design System',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
        url: '#',
        isLive: false,
        desc: 'Complete identity transformation: geometric vector logo mark, bespoke color typography guidelines, responsive UI design system, and branded merchandise.',
        metrics: '🎨 +200% Brand Recognition • Premium Market Perception',
        tags: ['Logo Design', 'Brand Guidelines', 'UI/UX System', 'Figma']
    },
    {
        id: 'finwise',
        title: 'FinWise Advisors — High-ROI Lead Gen',
        category: 'marketing',
        categoryLabel: 'Paid Ads & Funnel Architecture',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        url: '#',
        isLive: false,
        desc: 'Targeted Google Search & Meta PPC ad funnels tailored for wealthy investors and corporate financial advisory clients at an unprecedented ₹120 cost-per-lead.',
        metrics: '🎯 500+ Qualified Leads/Month • 12x Campaign ROI',
        tags: ['Google Search Ads', 'Meta Retargeting', 'High-Converting Landing Pages']
    },
    {
        id: 'healthfirst',
        title: 'HealthFirst — Doctor Consultation App',
        category: 'web',
        categoryLabel: 'Cross-Platform Medical Platform',
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80',
        url: '#',
        isLive: false,
        desc: 'Cross-platform patient care system supporting instant appointment scheduling, doctor video consultations, and instant digital prescription generation.',
        metrics: '📱 10,000+ App Downloads • ⭐ 4.8 App Rating',
        tags: ['React Native', 'Node.js', 'WebRTC Video', 'Healthcare Compliance']
    },
    {
        id: 'quickshop',
        title: 'QuickShop Delhi — E-Commerce SEO',
        category: 'seo',
        categoryLabel: 'E-Commerce Search Engine Optimization',
        image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
        url: '#',
        isLive: false,
        desc: 'Comprehensive multi-tier e-commerce SEO strategy including structured schema breadcrumbs, product review rich snippets, and internal linking hierarchy.',
        metrics: '🚀 +350% Organic Search Traffic • +220% Direct Revenue',
        tags: ['E-Commerce SEO', 'Schema.org', 'Technical Audit', 'Content Strategy']
    }
];

export default function ProjectsPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProjects = selectedCategory === 'all'
        ? ALL_PROJECTS
        : ALL_PROJECTS.filter((p) => p.category === selectedCategory);

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
                    <div className="subpage-badge">💼 portfolio &amp; case studies</div>
                    <h1 className="subpage-title">
                        our work speaks
                        <br />
                        louder than words<span style={{ color: 'var(--color-pink)' }}>.</span>
                    </h1>
                    <p className="subpage-subtitle">
                        Real projects, measurable business impact. Explore how Fitscalez engineers custom web platforms and growth systems for ambitious brands.
                    </p>

                    {/* Filter Pills */}
                    <div className="filter-pills">
                        <button
                            className={`filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('all')}
                        >
                            All Work ({ALL_PROJECTS.length})
                        </button>
                        <button
                            className={`filter-pill ${selectedCategory === 'web' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('web')}
                        >
                            💻 Web Dev ({ALL_PROJECTS.filter(p => p.category === 'web').length})
                        </button>
                        <button
                            className={`filter-pill ${selectedCategory === 'marketing' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('marketing')}
                        >
                            📈 Marketing ({ALL_PROJECTS.filter(p => p.category === 'marketing').length})
                        </button>
                        <button
                            className={`filter-pill ${selectedCategory === 'seo' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('seo')}
                        >
                            🔍 SEO ({ALL_PROJECTS.filter(p => p.category === 'seo').length})
                        </button>
                        <button
                            className={`filter-pill ${selectedCategory === 'video' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('video')}
                        >
                            🎬 Video ({ALL_PROJECTS.filter(p => p.category === 'video').length})
                        </button>
                        <button
                            className={`filter-pill ${selectedCategory === 'branding' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('branding')}
                        >
                            🎨 Branding ({ALL_PROJECTS.filter(p => p.category === 'branding').length})
                        </button>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="projects-grid-section">
                    <div className="projects-grid">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="project-card-item">
                                <div className="project-card-thumb-wrap">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="project-card-thumb"
                                        loading="lazy"
                                    />
                                    {project.isLive && (
                                        <div className="project-live-indicator">
                                            <span className="project-live-dot"></span>
                                            Live Production Site
                                        </div>
                                    )}
                                </div>

                                <div className="project-card-content">
                                    <span className="project-card-category">{project.categoryLabel}</span>
                                    <h3 className="project-card-heading">{project.title}</h3>
                                    <p className="project-card-desc">{project.desc}</p>

                                    <div className="project-metrics-row">
                                        <span>{project.metrics}</span>
                                    </div>

                                    <div className="project-tags-cloud">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="project-single-tag">{tag}</span>
                                        ))}
                                    </div>

                                    {project.url && project.url !== '#' ? (
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link-btn"
                                        >
                                            Visit Live Project ↗
                                        </a>
                                    ) : (
                                        <a
                                            href="/contact"
                                            className="project-link-btn"
                                            style={{ background: '#333' }}
                                        >
                                            Request Project Case Study ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA Banner */}
                    <div className="project-cta-banner">
                        <h2 className="project-cta-title">ready to scale your brand?</h2>
                        <p className="project-cta-desc">
                            From custom full-stack MERN platforms to high-ROI growth marketing, let&apos;s build something extraordinary together.
                        </p>
                        <a href="/contact" className="project-cta-btn">
                            Book a Free Consultation ↗
                        </a>
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
