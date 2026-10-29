'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import SvgSymbols from '@/components/SvgSymbols';
import TransitionScribble from '@/components/TransitionScribble';
import articles from '@/lib/articles.json';
import { CASE_STUDIES } from '@/lib/data';

export default function SitemapPage() {
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
                    <div className="subpage-badge">🗺️ directory &amp; structure</div>
                    <h1 className="subpage-title">
                        sitemap<span style={{ color: 'var(--color-pink)' }}>.</span>
                    </h1>
                    <p className="subpage-subtitle">
                        Comprehensive overview of all pages, technical case studies, and knowledge base articles across Fitscalez.
                    </p>
                </section>

                <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px 100px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '50px' }}>
                        {/* Main Pages */}
                        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '24px', padding: '36px 30px' }}>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
                                🧭 Primary Navigation
                            </h2>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li><a href="/" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>→ Home (Agency Overview)</a></li>
                                <li><a href="/about" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>→ About Us &amp; Leadership</a></li>
                                <li><a href="/services" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>→ Services &amp; Pricing Packages</a></li>
                                <li><a href="/projects" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>→ Featured Projects &amp; Work</a></li>
                                <li><a href="/blog" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>→ Blog &amp; Engineering Insights</a></li>
                                <li><a href="/careers" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>→ Careers &amp; Open Roles</a></li>
                                <li><a href="/contact" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>→ Contact &amp; Consultation Booking</a></li>
                            </ul>
                        </div>

                        {/* Legal & Machine Readable */}
                        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '24px', padding: '36px 30px' }}>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
                                ⚖️ Legal &amp; Compliance
                            </h2>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li><a href="/privacy-policy" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>→ Privacy Policy</a></li>
                                <li><a href="/terms-of-service" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>→ Terms of Service</a></li>
                                <li><a href="/sitemap.xml" target="_blank" rel="noreferrer" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>→ Dynamic XML Sitemap (Search Engines) ↗</a></li>
                                <li><a href="/admin/login" style={{ color: '#666', fontWeight: 500, textDecoration: 'none' }}>→ Admin Control Center 🔒</a></li>
                            </ul>
                        </div>

                        {/* Case Studies */}
                        <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '24px', padding: '36px 30px' }}>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
                                🚀 Featured Client Works
                            </h2>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {CASE_STUDIES.map((cs) => (
                                    <li key={cs.id}>
                                        <a href={cs.url} target={cs.url.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>
                                            → {cs.title} ({cs.tag}) ↗
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Blog Articles Full Index */}
                    <div style={{ background: '#fff', border: '3px solid #000', borderRadius: '24px', padding: '40px 36px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px', borderBottom: '2px solid #000', paddingBottom: '12px' }}>
                            📚 Engineering &amp; Growth Articles ({articles.length} Guides)
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                            {articles.map((art) => (
                                <a
                                    key={art.slug}
                                    href={`/blog/${art.slug}`}
                                    style={{
                                        display: 'block',
                                        padding: '14px 18px',
                                        borderRadius: '12px',
                                        border: '1.5px solid #e2e2e2',
                                        textDecoration: 'none',
                                        color: '#000',
                                        background: '#fafafa',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--color-pink)', display: 'block', marginBottom: '4px' }}>
                                        {art.category} • {art.readTime}
                                    </span>
                                    <span style={{ fontSize: '0.96rem', fontWeight: 700, lineHeight: 1.35, display: 'block' }}>
                                        {art.title}
                                    </span>
                                </a>
                            ))}
                        </div>
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
