import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import SvgSymbols from '@/components/SvgSymbols';
import TransitionScribble from '@/components/TransitionScribble';
import articles from '@/lib/articles.json';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        return { title: 'Article Not Found | Fitscalez' };
    }

    return {
        title: `${article.metaTitle || article.title} | Fitscalez`,
        description: article.metaDesc || article.summary,
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />

            <header className="main-header" style={{ position: 'relative' }}>
                <Navbar />
            </header>

            <main className="subpage-container">
                <article style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 100px' }}>
                    {/* Breadcrumbs */}
                    <nav style={{ fontSize: '0.85rem', color: '#666', marginBottom: '24px' }}>
                        <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
                        <span style={{ margin: '0 8px' }}>›</span>
                        <a href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</a>
                        <span style={{ margin: '0 8px' }}>›</span>
                        <span style={{ color: '#000', fontWeight: 600 }}>{article.category}</span>
                    </nav>

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            background: 'var(--color-lightgreen)',
                            padding: '4px 12px',
                            borderRadius: '50px',
                            border: '1px solid #000'
                        }}>
                            {article.category}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: 600 }}>
                            ⏱️ {article.readTime}
                        </span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                        fontWeight: 900,
                        lineHeight: 1.15,
                        letterSpacing: '-1px',
                        marginBottom: '24px'
                    }}>
                        {article.title}
                    </h1>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px 0',
                        borderTop: '2px solid #000',
                        borderBottom: '2px solid #000',
                        marginBottom: '40px'
                    }}>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>By {article.author}</div>
                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{article.authorRole} • Fitscalez Engineering</div>
                        </div>
                    </div>

                    {/* Table of contents */}
                    {article.toc && article.toc.length > 0 && (
                        <div style={{
                            background: '#fff',
                            border: '2px solid #000',
                            borderRadius: '16px',
                            padding: '24px 30px',
                            marginBottom: '40px',
                            boxShadow: '4px 4px 0px #000'
                        }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '14px' }}>📑 In this guide:</h3>
                            <ul style={{ paddingLeft: '20px', display: 'grid', gap: '8px', fontSize: '0.92rem' }}>
                                {article.toc.map((item) => (
                                    <li key={item.id}>
                                        <a href={`#${item.id}`} style={{ color: 'var(--color-darkblue)', fontWeight: 600, textDecoration: 'none' }}>
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Article Content */}
                    <div
                        className="article-rich-body"
                        style={{
                            fontSize: '1.12rem',
                            lineHeight: 1.75,
                            color: '#222'
                        }}
                        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                    />

                    {/* Bottom CTA */}
                    <div className="project-cta-banner" style={{ marginTop: '60px' }}>
                        <h2 className="project-cta-title">need help building this?</h2>
                        <p className="project-cta-desc">
                            Speak with Lead Developer Divyansh and the Fitscalez engineering team. Let&apos;s build your platform right.
                        </p>
                        <a href="/contact" className="project-cta-btn">
                            Book Free Architecture Call ↗
                        </a>
                    </div>
                </article>
            </main>

            <footer className="main-footer">
                <Footer />
            </footer>

            <TransitionScribble />
        </>
    );
}

