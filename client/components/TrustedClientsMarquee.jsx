'use client';

import { TRUSTED_CLIENTS } from '@/lib/data';

export default function TrustedClientsMarquee() {
    // Duplicate 3 times for a completely seamless, infinite ticker
    const displayList = [...TRUSTED_CLIENTS, ...TRUSTED_CLIENTS, ...TRUSTED_CLIENTS];

    return (
        <div className="trusted-marquee-section" aria-label="Trusted by businesses across India">
            <div className="trusted-marquee-label">
                Trusted by growing businesses across India
            </div>
            <div className="trusted-marquee-container">
                <div className="trusted-marquee-track" role="list">
                    {displayList.map((client, idx) => (
                        <div key={idx} className="trusted-marquee-item" role="listitem">
                            <span className="trusted-marquee-icon" aria-hidden="true">{client.icon}</span>
                            <span className="trusted-marquee-name">{client.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
