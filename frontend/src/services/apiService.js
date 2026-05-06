const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  all: (resource) => request(`/${resource}`),
  create: (resource, payload) => request(`/${resource}`, { method: 'POST', body: JSON.stringify(payload) }),
  update: (resource, id, payload) => request(`/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  delete: (resource, id) => request(`/${resource}/${id}`, { method: 'DELETE' }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  pay: (payload) => request('/payments/mock-pay', { method: 'POST', body: JSON.stringify(payload) }),
  chat: (payload) => request('/chat', { method: 'POST', body: JSON.stringify(payload) }),
};
