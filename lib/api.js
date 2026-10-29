// ─── lib/api.js — Native fetch client for Fitscalez backend ───────────────────
// Centralized, lightweight HTTP client using the native Fetch API

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * Core fetch wrapper with credentials (for HttpOnly JWT cookies) and JSON handling
 */
export async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json"
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        },
        credentials: "include" // vital for sending & receiving HttpOnly cookies
    };

    if (options.body && typeof options.body === "object" && !(options.body instanceof FormData)) {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json().catch(() => null);

        if (!response.ok) {
            const errorMessage = data?.message || `Request failed with status ${response.status}`;
            const error = new Error(errorMessage);
            error.statusCode = response.status;
            error.errors = data?.errors || [];
            throw error;
        }

        return data;
    } catch (error) {
        console.error(`[API Error] ${endpoint}:`, error.message);
        throw error;
    }
}

// ─── Public Endpoints ────────────────────────────────────────────────────────

// Submit contact / project lead inquiry
export async function submitLead(leadData) {
    return apiFetch("/leads", {
        method: "POST",
        body: leadData
    });
}

// Log live visitor activity & page view
export async function logVisitorActivity(visitorData) {
    return apiFetch("/analytics/track", {
        method: "POST",
        body: visitorData
    });
}

// Submit job application
export async function submitJobApplication(applicationData) {
    return apiFetch("/applications", {
        method: "POST",
        body: applicationData
    });
}

// Get all published blog articles
export async function fetchBlogArticles(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/blogs${query ? `?${query}` : ""}`;
    return apiFetch(endpoint, { method: "GET" });
}

// Get single article by slug
export async function fetchBlogArticleBySlug(slug) {
    return apiFetch(`/blogs/${slug}`, { method: "GET" });
}

// ─── Admin Secured Endpoints ─────────────────────────────────────────────────

// Admin Login
export async function loginAdmin(credentials) {
    return apiFetch("/auth/login", {
        method: "POST",
        body: credentials
    });
}

// Admin Logout
export async function logoutAdmin() {
    return apiFetch("/auth/logout", {
        method: "POST"
    });
}

// Get Current Authenticated Admin
export async function getCurrentAdmin() {
    return apiFetch("/auth/current-user", {
        method: "GET"
    });
}

// Get KPI Dashboard Analytics
export async function fetchAdminStats() {
    return apiFetch("/analytics/stats", {
        method: "GET"
    });
}

// Get All Leads with filters
export async function fetchAdminLeads(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/leads${query ? `?${query}` : ""}`;
    return apiFetch(endpoint, { method: "GET" });
}

// Update Lead Status & Notes
export async function updateLeadStatus(id, payload) {
    return apiFetch(`/leads/${id}/status`, {
        method: "PATCH",
        body: payload
    });
}

// Delete Lead
export async function deleteLead(id) {
    return apiFetch(`/leads/${id}`, {
        method: "DELETE"
    });
}

