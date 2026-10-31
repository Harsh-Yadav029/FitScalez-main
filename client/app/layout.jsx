import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fitscalez.vercel.app';

export const metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'Fitscalez — Web Development & Digital Growth Agency',
        template: '%s | Fitscalez',
    },
    description: 'Premier Full-Stack MERN Web Development, Technical SEO, Social Media Marketing, and High-ROI Performance Advertising Agency based in Delhi, India.',
    keywords: [
        'Web Development Company Delhi',
        'Full-Stack MERN Stack Development',
        'Next.js 15 Web Development Agency',
        'Technical SEO Services India',
        'Digital Growth Marketing Delhi',
        'Custom Web Applications',
        'Performance Advertising Agency',
        'E-Commerce Development India',
        'Figma UI UX Design System',
        'Fitscalez Agency',
    ],
    authors: [
        { name: 'Fitscalez Agency', url: siteUrl },
        { name: 'Hariom Saini', url: `${siteUrl}/about` },
        { name: 'Divyansh', url: `${siteUrl}/about` },
    ],
    creator: 'Fitscalez',
    publisher: 'Fitscalez',
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon.png', sizes: '128x128', type: 'image/png' },
            { url: '/assets/fitscalez/favicon.png', sizes: '128x128', type: 'image/png' },
        ],
        apple: [
            { url: '/assets/fitscalez/favicon.png', sizes: '128x128', type: 'image/png' },
        ],
        shortcut: '/favicon.ico',
    },
    openGraph: {
        title: 'Fitscalez — Full-Stack Web Development & Digital Growth Agency',
        description: 'Engineered for the new mainstream. MERN Stack web platforms, SEO Dominance, and High-Converting Design Systems.',
        url: siteUrl,
        siteName: 'Fitscalez',
        images: [
            {
                url: '/assets/fitscalez/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Fitscalez — Digital Agency',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fitscalez — Web Development & Digital Growth Agency',
        description: 'Engineered for the new mainstream. MERN Stack web platforms, SEO Dominance, and High-Converting Design Systems.',
        images: ['/assets/fitscalez/og-image.jpg'],
    },
};

const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Organization'],
    name: 'Fitscalez',
    legalName: 'Fitscalez Agency',
    url: siteUrl,
    logo: `${siteUrl}/assets/fitscalez/logo.png`,
    image: `${siteUrl}/assets/fitscalez/og-image.jpg`,
    description: 'Premier Full-Stack MERN Web Development, Technical SEO, Social Media Marketing, and High-ROI Performance Advertising Agency based in Delhi, India.',
    telephone: '+919599433616',
    email: 'fitscalezofficial@gmail.com',
    priceRange: '₹₹',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '24, Shri Ram Road',
        addressLocality: 'Civil Lines',
        addressRegion: 'Delhi',
        postalCode: '110054',
        addressCountry: 'IN',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: '28.6814',
        longitude: '77.2227',
    },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '20:00',
        },
    ],
    sameAs: [
        'https://www.linkedin.com/company/fitscalez',
        'https://www.instagram.com/fitscalez',
    ],
    founder: [
        {
            '@type': 'Person',
            name: 'Mr. Hariom Saini',
            jobTitle: 'Founder & CEO',
        },
        {
            '@type': 'Person',
            name: 'Divyansh',
            jobTitle: 'Lead Web Developer',
        },
    ],
};

const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Fitscalez',
    url: siteUrl,
    potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
