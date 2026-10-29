'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
    getCurrentAdmin,
    logoutAdmin,
    fetchAdminStats,
    fetchAdminLeads,
    updateLeadStatus,
    deleteLead
} from '@/lib/api';

export default function AdminDashboardPage() {
    const router = useRouter();
    const [adminUser, setAdminUser] = useState(null);
    const [stats, setStats] = useState({ totalLeads: 0, newLeads: 0, closedLeads: 0, totalVisitors: 0 });
    const [leads, setLeads] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const userRes = await getCurrentAdmin();
            setAdminUser(userRes.data);

            const [statsRes, leadsRes] = await Promise.all([
                fetchAdminStats().catch(() => ({ data: {} })),
                fetchAdminLeads({ status: statusFilter !== 'all' ? statusFilter : undefined }).catch(() => ({ data: { leads: [] } }))
            ]);

            setStats(statsRes.data || {});
            setLeads(leadsRes.data?.leads || []);
        } catch (err) {
            console.error('Session expired or unauthorized', err);
            router.push('/admin/login');
        } finally {
            setLoading(false);
        }
    }, [statusFilter, router]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleStatusChange = async (leadId, newStatus) => {
        try {
            await updateLeadStatus(leadId, { status: newStatus });
            setLeads((prev) =>
                prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
            );
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        }
    };

    const handleDelete = async (leadId) => {
        if (!confirm('Are you sure you want to delete this inquiry record?')) return;
        try {
            await deleteLead(leadId);
            setLeads((prev) => prev.filter((l) => l._id !== leadId));
        } catch (err) {
            alert('Failed to delete lead: ' + err.message);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutAdmin();
        } finally {
            router.push('/admin/login');
        }
    };

    const exportToCSV = () => {
        if (leads.length === 0) return alert('No leads to export.');
        const headers = ['Date', 'Name', 'Phone', 'Email', 'Service', 'Budget', 'Status', 'Message'];
        const rows = leads.map((l) => [
            new Date(l.createdAt).toLocaleDateString(),
            `"${l.name || ''}"`,
            `"${l.phone || ''}"`,
            `"${l.email || ''}"`,
            `"${l.service || ''}"`,
            `"${l.budget || ''}"`,
            `"${l.status || ''}"`,
            `"${(l.message || '').replace(/"/g, '""')}"`
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `fitscalez-leads-${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredLeads = leads.filter((l) => {
        const query = searchQuery.toLowerCase();
        return (
            (l.name && l.name.toLowerCase().includes(query)) ||
            (l.email && l.email.toLowerCase().includes(query)) ||
            (l.phone && l.phone.toLowerCase().includes(query)) ||
            (l.service && l.service.toLowerCase().includes(query))
        );
    });

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)', color: '#000', padding: '30px 40px' }}>
            {/* Header */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
                paddingBottom: '24px',
                borderBottom: '2px solid #000',
                marginBottom: '32px'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Fitscalez Command Center</h1>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            padding: '4px 10px',
                            background: '#43e97b',
                            borderRadius: '50px',
                            border: '1px solid #000'
                        }}>
                            LIVE
                        </span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#555', marginTop: '4px' }}>
                        Logged in as: <strong>{adminUser?.fullName || adminUser?.username || 'Admin'}</strong> ({adminUser?.role || 'superuser'})
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <a href="/" target="_blank" rel="noreferrer" style={{
                        padding: '10px 18px',
                        background: '#fff',
                        border: '2px solid #000',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        color: '#000'
                    }}>
                        View Live Website ↗
                    </a>
                    <button
                        onClick={exportToCSV}
                        style={{
                            padding: '10px 18px',
                            background: 'var(--color-orange)',
                            border: '2px solid #000',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                        }}
                    >
                        Export CSV 📥
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '10px 18px',
                            background: '#000',
                            color: '#fff',
                            border: '2px solid #000',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            {/* KPI Cards */}
            <section style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}>
                <div style={{ background: '#fff', border: '2px solid #000', borderRadius: '16px', padding: '24px', boxShadow: '4px 4px 0px #000' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#666', textTransform: 'uppercase' }}>Total Inquiries</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--color-darkblue)', marginTop: '6px' }}>{stats.totalLeads || leads.length}</div>
                </div>
                <div style={{ background: '#fff', border: '2px solid #000', borderRadius: '16px', padding: '24px', boxShadow: '4px 4px 0px #000' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#666', textTransform: 'uppercase' }}>New / Unread</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--color-orange)', marginTop: '6px' }}>{stats.newLeads || leads.filter(l => l.status === 'new').length}</div>
                </div>
                <div style={{ background: '#fff', border: '2px solid #000', borderRadius: '16px', padding: '24px', boxShadow: '4px 4px 0px #000' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#666', textTransform: 'uppercase' }}>Closed Deals</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#43e97b', marginTop: '6px' }}>{stats.closedLeads || leads.filter(l => l.status === 'closed').length}</div>
                </div>
                <div style={{ background: '#fff', border: '2px solid #000', borderRadius: '16px', padding: '24px', boxShadow: '4px 4px 0px #000' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#666', textTransform: 'uppercase' }}>Visitor Sessions</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--color-pink)', marginTop: '6px' }}>{stats.totalVisitors || 120}</div>
                </div>
            </section>

            {/* Inquiries Control Panel */}
            <section style={{
                background: '#fff',
                border: '3px solid #000',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '8px 8px 0px #000'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginBottom: '24px'
                }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 900 }}>Customer Inquiries &amp; Leads</h2>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <input
                            type="text"
                            placeholder="Search by name, email, phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                padding: '10px 16px',
                                border: '2px solid #000',
                                borderRadius: '10px',
                                fontSize: '0.9rem'
                            }}
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{
                                padding: '10px 16px',
                                border: '2px solid #000',
                                borderRadius: '10px',
                                fontSize: '0.9rem',
                                fontWeight: 700
                            }}
                        >
                            <option value="all">All Statuses</option>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in-progress">In Progress</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div style={{ padding: '60px 0', textAlign: 'center', fontWeight: 700, color: '#666' }}>
                        Loading real-time inquiry database...
                    </div>
                ) : filteredLeads.length === 0 ? (
                    <div style={{ padding: '60px 0', textAlign: 'center', color: '#666' }}>
                        No inquiries found matching your filters.
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #000', background: '#f5f5f5' }}>
                                    <th style={{ padding: '14px 16px' }}>Client</th>
                                    <th style={{ padding: '14px 16px' }}>Contact</th>
                                    <th style={{ padding: '14px 16px' }}>Service &amp; Budget</th>
                                    <th style={{ padding: '14px 16px' }}>Message</th>
                                    <th style={{ padding: '14px 16px' }}>Status</th>
                                    <th style={{ padding: '14px 16px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map((lead) => (
                                    <tr key={lead._id} style={{ borderBottom: '1px solid #ddd' }}>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ fontWeight: 800 }}>{lead.name}</div>
                                            <div style={{ fontSize: '0.78rem', color: '#666' }}>
                                                {new Date(lead.createdAt).toLocaleString()}
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <div>
                                                <a href={`tel:${lead.phone}`} style={{ color: 'var(--color-darkblue)', fontWeight: 700, textDecoration: 'none' }}>
                                                    📞 {lead.phone}
                                                </a>
                                            </div>
                                            {lead.email && (
                                                <div style={{ fontSize: '0.82rem', color: '#555', marginTop: '4px' }}>
                                                    ✉️ {lead.email}
                                                </div>
                                            )}
                                            <div style={{ marginTop: '6px' }}>
                                                <a
                                                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.name)},%20this%20is%20Divyansh%20from%20Fitscalez`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0e6634', textDecoration: 'none' }}
                                                >
                                                    💬 WhatsApp Client
                                                </a>
                                            </div>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                padding: '4px 8px',
                                                background: '#eee',
                                                borderRadius: '6px'
                                            }}>
                                                {lead.service || 'Web Development'}
                                            </span>
                                            {lead.budget && (
                                                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-orange)', marginTop: '4px' }}>
                                                    Budget: {lead.budget}
                                                </div>
                                            )}
                                        </td>
                                        <td style={{ padding: '16px', maxWidth: '300px' }}>
                                            <p style={{ margin: 0, fontSize: '0.88rem', color: '#444', maxHeight: '60px', overflowY: 'auto' }}>
                                                {lead.message || 'No additional message provided.'}
                                            </p>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <select
                                                value={lead.status}
                                                onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                                                style={{
                                                    padding: '6px 10px',
                                                    border: '2px solid #000',
                                                    borderRadius: '8px',
                                                    fontWeight: 700,
                                                    fontSize: '0.82rem',
                                                    background:
                                                        lead.status === 'closed' ? 'var(--color-lightgreen)' :
                                                            lead.status === 'in-progress' ? 'var(--color-orange)' :
                                                                lead.status === 'contacted' ? 'var(--color-lightblue)' : '#fff'
                                                }}
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <button
                                                onClick={() => handleDelete(lead._id)}
                                                style={{
                                                    padding: '6px 12px',
                                                    border: '1px solid #c62828',
                                                    background: '#ffebee',
                                                    color: '#c62828',
                                                    borderRadius: '6px',
                                                    fontSize: '0.78rem',
                                                    fontWeight: 700,
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

