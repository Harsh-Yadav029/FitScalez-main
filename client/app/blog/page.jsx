'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import SvgSymbols from '@/components/SvgSymbols';
import TransitionScribble from '@/components/TransitionScribble';
import articles from '@/lib/articles.json';

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', ...Array.from(new Set(articles.map((a) => a.category)))];

    const filteredArticles = articles.filter((art) => {
        const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
        const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                    <div className="subpage-badge">📝 insights &amp; guides</div>
                    <h1 className="subpage-title">
                        web development &amp;
                        <br />
                        growth insights<span style={{ color: 'var(--color-pink)' }}>.</span>
                    </h1>
                    <p className="subpage-subtitle">
                        Expert analyses, price breakdowns, technical blueprints, and actionable marketing playbooks from the Fitscalez engineering team.
                    </p>

                    {/* Search & Categories */}
                    <div style={{ margin: '30px 0 20px', maxWidth: '600px' }}>
                        <input
                            type="text"
                            placeholder="🔍 Search articles, pricing guides, technical blueprints..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 20px',
                                fontSize: '1rem',
                                border: '2px solid #000',
                                borderRadius: '50px',
                                boxShadow: '4px 4px 0px #000',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div className="filter-pills">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat === 'all' ? `All Articles (${articles.length})` : cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Articles Grid */}
                <section className="projects-grid-section" style={{ maxWidth: '1280px', margin: '0 auto 100px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                        gap: '24px'
                    }}>
                        {filteredArticles.map((article) => (
                            <article key={article.slug} style={{
                                background: '#fff',
                                border: '2px solid #000',
                                borderRadius: '20px',
                                padding: '32px',
                                boxShadow: '6px 6px 0px #000',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.25s ease'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        background: 'var(--color-lightgreen)',
                                        padding: '4px 10px',
                                        borderRadius: '50px',
                                        border: '1px solid #000'
                                    }}>
                                        {article.category}
                                    </span>
                                    <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>
                                        ⏱️ {article.readTime}
                                    </span>
                                </div>

                                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '12px' }}>
                                    <a href={`/blog/${article.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {article.title}
                                    </a>
                                </h2>

                                <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.55, marginBottom: '20px', flex: 1 }}>
                                    {article.summary}
                                </p>

                                <div style={{
                                    borderTop: '1px solid #eee',
                                    paddingTop: '16px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '0.82rem', fontWeight: 800 }}>{article.author}</div>
                                        <div style={{ fontSize: '0.72rem', color: '#777' }}>{article.authorRole}</div>
                                    </div>

                                    <a
                                        href={`/blog/${article.slug}`}
                                        style={{
                                            fontSize: '0.88rem',
                                            fontWeight: 800,
                                            color: '#000',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        Read Guide ↗
                                    </a>
                                </div>
                            </article>
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

