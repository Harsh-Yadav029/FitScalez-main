'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/lib/api';

export default function AdminLoginPage() {
    const router = useRouter();
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [status, setStatus] = useState({ loading: false, error: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null });

        try {
            await loginAdmin(credentials);
            router.push('/admin/dashboard');
        } catch (err) {
            setStatus({
                loading: false,
                error: err.message || 'Invalid admin credentials. Please try again.'
            });
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-color)',
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '440px',
                background: '#fff',
                border: '3px solid #000',
                borderRadius: '24px',
                padding: '40px 32px',
                boxShadow: '10px 10px 0px #000'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        background: '#000',
                        color: '#fff',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        marginBottom: '16px'
                    }}>
                        Fitscalez Operations
                    </div>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        fontFamily: 'Epilogue, sans-serif'
                    }}>
                        admin control center<span style={{ color: 'var(--color-pink)' }}>.</span>
                    </h1>
                    <p style={{ fontSize: '0.88rem', color: '#666', marginTop: '6px' }}>
                        Authorized agency personnel only
                    </p>
                </div>

                {status.error && (
                    <div style={{
                        padding: '12px 16px',
                        background: '#ffebee',
                        color: '#c62828',
                        borderRadius: '10px',
                        border: '1px solid #c62828',
                        fontSize: '0.88rem',
                        marginBottom: '20px'
                    }}>
                        {status.error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '18px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>
                            Username / Admin Email
                        </label>
                        <input
                            type="text"
                            required
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            placeholder="admin"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #000',
                                borderRadius: '10px',
                                fontSize: '0.95rem'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>
                            Secure Password
                        </label>
                        <input
                            type="password"
                            required
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            placeholder="••••••••••••"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #000',
                                borderRadius: '10px',
                                fontSize: '0.95rem'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status.loading}
                        className="project-cta-btn"
                        style={{
                            width: '100%',
                            marginTop: '12px',
                            opacity: status.loading ? 0.7 : 1,
                            cursor: status.loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {status.loading ? 'Authenticating...' : 'Sign In to Portal 🔐'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <a href="/" style={{ fontSize: '0.82rem', color: '#666', textDecoration: 'none' }}>
                        ← Return to Fitscalez Homepage
                    </a>
                </div>
            </div>
        </div>
    );
}

