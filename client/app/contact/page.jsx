'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import SvgSymbols from '@/components/SvgSymbols';
import TransitionScribble from '@/components/TransitionScribble';
import { submitLead } from '@/lib/api';
import { AGENCY_INFO } from '@/lib/data';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: 'Web Development',
        budget: '₹25,000 – ₹50,000',
        message: ''
    });

    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, submitted: false, error: null });

        try {
            await submitLead({
                ...formData,
                deviceId: typeof window !== 'undefined' ? (window.navigator?.userAgent || 'WEB') : 'WEB'
            });

            setStatus({ submitting: false, submitted: true, error: null });
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                service: 'Web Development',
                budget: '₹25,000 – ₹50,000',
                message: ''
            });
        } catch (err) {
            setStatus({
                submitting: false,
                submitted: false,
                error: err.message || 'Failed to submit inquiry. Please try again or WhatsApp us directly.'
            });
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
                    <div className="subpage-badge">📞 get in touch</div>
                    <h1 className="subpage-title">
                        let&apos;s talk about your
                        <br />
                        next big project<span style={{ color: 'var(--color-pink)' }}>.</span>
                    </h1>
                    <p className="subpage-subtitle">
                        Free consultations, custom quotations, and zero bureaucratic delays. Reach out directly or send us an inquiry below.
                    </p>
                </section>

                <section className="subpage-grid-section">
                    <div className="subpage-responsive-grid" style={{ alignItems: 'start' }}>
                        {/* Contact Form Card */}
                        <div style={{
                            background: '#fff',
                            border: '3px solid #000',
                            borderRadius: '24px',
                            padding: '40px',
                            boxShadow: '10px 10px 0px #000'
                        }}>
                            {status.submitted ? (
                                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                                    <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎉</div>
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '12px' }}>Inquiry Received!</h3>
                                    <p style={{ color: '#555', lineHeight: 1.6, marginBottom: '24px' }}>
                                        Thank you for reaching out to Fitscalez. Lead Web Developer Divyansh or our strategy team will contact you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
                                        className="filter-pill active"
                                    >
                                        Send Another Inquiry
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '20px' }}>Project Inquiry Form</h3>

                                    {status.error && (
                                        <div style={{
                                            padding: '12px 16px',
                                            borderRadius: '10px',
                                            background: '#ffebee',
                                            color: '#c62828',
                                            fontSize: '0.9rem',
                                            marginBottom: '20px',
                                            fontWeight: 600
                                        }}>
                                            ⚠️ {status.error}
                                        </div>
                                    )}

                                    <div style={{ marginBottom: '18px' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>Your Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. Rahul Sharma"
                                            style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #000', fontSize: '0.95rem', fontFamily: 'inherit' }}
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@company.com"
                                                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #000', fontSize: '0.95rem', fontFamily: 'inherit' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>Phone *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+91 95994 33616"
                                                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #000', fontSize: '0.95rem', fontFamily: 'inherit' }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>Service Needed</label>
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #000', fontSize: '0.9rem', fontFamily: 'inherit', background: '#fff' }}
                                            >
                                                <option value="Web Development">Full-Stack Web Development</option>
                                                <option value="Technical SEO">Technical &amp; Local SEO</option>
                                                <option value="Social Media">Social Media Marketing</option>
                                                <option value="Paid Ads">Performance Paid Ads</option>
                                                <option value="Video Production">Commercial Video Production</option>
                                                <option value="UI/UX Design">UI/UX &amp; Design Systems</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>Budget Range</label>
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #000', fontSize: '0.9rem', fontFamily: 'inherit', background: '#fff' }}
                                            >
                                                <option value="₹25,000 – ₹50,000">₹25,000 – ₹50,000</option>
                                                <option value="₹50,000 – ₹1,00,000">₹50,000 – ₹1,00,000</option>
                                                <option value="₹1,00,000+">₹1,00,000+</option>
                                                <option value="Flexible">Flexible / Retainer</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>Project Details *</label>
                                        <textarea
                                            name="message"
                                            rows="4"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us about your project, timeline, and goals..."
                                            style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #000', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical' }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status.submitting}
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            borderRadius: '50px',
                                            background: '#000',
                                            color: '#fff',
                                            fontSize: '1rem',
                                            fontWeight: 800,
                                            border: 'none',
                                            cursor: status.submitting ? 'not-allowed' : 'pointer',
                                            boxShadow: '4px 4px 0px var(--color-pink)',
                                            transition: 'transform 0.2s'
                                        }}
                                    >
                                        {status.submitting ? 'Submitting Inquiry...' : 'Send Message 🚀'}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Direct Contact & Delhi Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            <div style={{
                                background: 'var(--color-pink)',
                                border: '3px solid #000',
                                borderRadius: '24px',
                                padding: '36px',
                                boxShadow: '8px 8px 0px #000'
                            }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '12px' }}>Direct WhatsApp Chat</h3>
                                <p style={{ fontSize: '0.95rem', color: '#222', lineHeight: 1.5, marginBottom: '20px' }}>
                                    Need an instant response? Chat directly with Lead Web Developer Divyansh.
                                </p>
                                <a
                                    href={AGENCY_INFO.whatsappLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '12px 24px',
                                        borderRadius: '50px',
                                        background: '#000',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        fontWeight: 800,
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    💬 Open WhatsApp ({AGENCY_INFO.phone})
                                </a>
                            </div>

                            <div style={{
                                background: '#fff',
                                border: '3px solid #000',
                                borderRadius: '24px',
                                padding: '36px',
                                boxShadow: '8px 8px 0px #000'
                            }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '12px' }}>Delhi Headquarters</h3>
                                <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: 1.6, marginBottom: '16px' }}>
                                    {AGENCY_INFO.address.street}, {AGENCY_INFO.address.area}<br />
                                    {AGENCY_INFO.address.city} - {AGENCY_INFO.address.pincode}, {AGENCY_INFO.address.country}
                                </p>
                                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '16px' }}>
                                    <strong>Hours:</strong> Mon–Fri 09:00–18:00 IST • 24/7 Emergency Support
                                </p>
                                <a
                                    href="https://maps.google.com/?q=24+Shri+Ram+Road+Civil+Lines+Delhi+110054"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '0.9rem',
                                        fontWeight: 800,
                                        color: '#000',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    View on Google Maps ↗
                                </a>
                            </div>
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

