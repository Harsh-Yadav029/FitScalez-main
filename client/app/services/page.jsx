'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import SvgSymbols from '@/components/SvgSymbols';
import TransitionScribble from '@/components/TransitionScribble';
import { CARDS_DATA, PRICING_PACKAGES } from '@/lib/data';

export default function ServicesPage() {
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
                    <div className="subpage-badge">⚡ full-stack capabilities</div>
                    <h1 className="subpage-title">
                        services engineered
                        <br />
                        for exponential scale<span style={{ color: 'var(--color-pink)' }}>.</span>
                    </h1>
                    <p className="subpage-subtitle">
                        From custom MERN web platforms to high-ROI performance marketing and organic search domination, we deliver measurable digital transformation.
                    </p>
                </section>

                {/* Service Cards Grid */}
                <section className="services-grid-section">
                    <div className="services-grid">
                        {CARDS_DATA.map((card) => (
                            <div
                                key={card.title}
                                className="services-card-item"
                            >
                                <div style={{
                                    display: 'inline-block',
                                    fontSize: '0.8rem',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    color: `var(--color-${card.color})`,
                                    marginBottom: '12px'
                                }}>
                                    {card.title}
                                </div>
                                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '20px', textTransform: 'capitalize' }}>
                                    {card.title}
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                                    {card.services.map((item) => (
                                        <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 600 }}>
                                            <span style={{ color: `var(--color-${card.color})`, fontSize: '1.2rem' }}>✔</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="/contact"
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        background: '#000',
                                        color: '#fff',
                                        fontWeight: 800,
                                        fontSize: '0.9rem',
                                        textDecoration: 'none'
                                    }}
                                >
                                    Get Started ↗
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Transparent Pricing Packages */}
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <div className="subpage-badge">💰 transparent pricing</div>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-1px' }}>
                            clear, transparent packages<span style={{ color: 'var(--color-pink)' }}>.</span>
                        </h2>
                        <p style={{ color: '#555', fontSize: '1.1rem', maxWidth: '600px', margin: '10px auto 0' }}>
                            No hidden agency markups. Fixed milestones, dedicated support, and production-tested quality.
                        </p>
                    </div>

                    <div className="pricing-grid">
                        {PRICING_PACKAGES.map((pkg) => (
                            <div
                                key={pkg.title}
                                style={{
                                    background: pkg.highlight ? 'var(--color-lightgreen)' : '#fff',
                                    border: '3px solid #000',
                                    borderRadius: '24px',
                                    padding: '40px 32px',
                                    boxShadow: pkg.highlight ? '10px 10px 0px #000' : '6px 6px 0px #000',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative'
                                }}
                            >
                                {pkg.highlight && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-14px',
                                        right: '24px',
                                        background: '#000',
                                        color: '#fff',
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        padding: '4px 12px',
                                        borderRadius: '50px'
                                    }}>
                                        Most Popular
                                    </div>
                                )}
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '8px' }}>{pkg.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '24px', minHeight: '44px' }}>{pkg.description}</p>
                                
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '28px' }}>
                                    <span style={{ fontSize: '2.4rem', fontWeight: 900 }}>{pkg.price}</span>
                                    <span style={{ fontSize: '0.95rem', color: '#666', fontWeight: 600 }}>{pkg.period}</span>
                                </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                                    {pkg.features.map((feat) => (
                                        <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 600 }}>
                                            <span>⚡</span>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="/contact"
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
                                        padding: '14px',
                                        borderRadius: '50px',
                                        background: '#000',
                                        color: '#fff',
                                        fontWeight: 800,
                                        fontSize: '0.95rem',
                                        textDecoration: 'none',
                                        boxShadow: '3px 3px 0px var(--color-pink)'
                                    }}
                                >
                                    Select Package ↗
                                </a>
                            </div>
                        ))}
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

