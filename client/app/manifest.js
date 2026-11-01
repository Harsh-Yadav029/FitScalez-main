export default function manifest() {
    return {
        name: 'Fitscalez — Web Development & Digital Growth Agency',
        short_name: 'Fitscalez',
        description: 'Premier Full-Stack MERN Web Development, Technical SEO, and Performance Marketing Agency based in Delhi, India.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0d0e15',
        theme_color: '#0d0e15',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/assets/fitscalez/favicon.png',
                sizes: '128x128',
                type: 'image/png',
            },
        ],
    };
}

