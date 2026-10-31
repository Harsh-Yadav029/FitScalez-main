export const metadata = {
    title: 'Featured Client Projects & Web Case Studies',
    description: 'Explore live client works including Walk The Plan (1:1 blueprint projection), House of Symmetry (luxury architecture), FashionWave (MERN platform), and GreenLeaf Organics.',
    alternates: {
        canonical: '/projects',
    },
    openGraph: {
        title: 'Fitscalez Projects & Case Studies Portfolio',
        description: 'Explore our track record of launching high-converting platforms, architectural booking engines, and e-commerce web applications.',
    },
};

export default function ProjectsLayout({ children }) {
    return <>{children}</>;
}
