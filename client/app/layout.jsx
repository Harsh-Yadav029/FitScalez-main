import './globals.css';

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: 'Fitscalez — Web Development & Digital Growth Agency',
    description: 'Premier Full-Stack MERN Web Development, Technical SEO, Social Media Marketing, and High-ROI Performance Advertising Agency based in Delhi, India.',
    icons: {
        icon: '/assets/fitscalez/favicon.png',
    },
    openGraph: {
        title: 'Fitscalez — Full-Stack Web Development & Growth Agency',
        description: 'Engineered for the new mainstream. MERN Stack web platforms, SEO Dominance, and High-Converting Design Systems.',
        images: ['/assets/fitscalez/og-image.jpg']
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
