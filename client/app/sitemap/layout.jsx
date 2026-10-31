export const metadata = {
    title: 'Sitemap & Directory',
    description: 'HTML directory listing all primary pages, services, featured portfolio case studies, and engineering knowledge base articles across Fitscalez.',
    alternates: {
        canonical: '/sitemap',
    },
};

export default function SitemapLayout({ children }) {
    return <>{children}</>;
}
