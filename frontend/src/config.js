// Centralized API base URL for the frontend
// Preferred: set VITE_API_BASE_URL in your deploy environment, e.g. https://ai-captionar.onrender.com
// For local dev with Vite proxy, leave it unset so we use same-origin ('') and the proxy handles /api/*
let base = import.meta.env.VITE_API_BASE_URL;
if (!base && typeof window !== 'undefined') {
	// Smart fallback: if running on vercel static site, point to Render backend
	if (window.location.hostname.endsWith('vercel.app')) {
		base = 'https://ai-captionar.onrender.com';
	} else {
		// Use same-origin in dev so the Vite proxy (vite.config.js) forwards /api/* to 3000
		base = '';
	}
}
export const API_BASE_URL = base;

