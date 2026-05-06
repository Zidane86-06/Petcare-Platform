import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Login({ navigate }) {
  const { login } = useApp();
  const [form, setForm] = useState({ email: 'mia@pawcare.com', password: 'user123', role: 'user' });

  const submit = async (event) => {
    event.preventDefault();
    if (await login(form)) navigate(form.role === 'admin' ? '/admin/dashboard' : '/dashboard');
  };

  const demo = (role) => setForm(role === 'admin'
    ? { email: 'admin@pawcare.com', password: 'admin123', role: 'admin' }
    : { email: 'mia@pawcare.com', password: 'user123', role: 'user' });

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="brand large"><div className="brand-mark">P</div><div><strong>PawCare</strong><span>Care marketplace</span></div></div>
        <h1>Book care, manage pets, and keep every tail-wagging detail in one place.</h1>
        <div className="auth-preview">
          <div><strong>24</strong><span>Monthly bookings</span></div>
          <div><strong>$8.4k</strong><span>Tracked revenue</span></div>
          <div><strong>Paw</strong><span>AI care assistant</span></div>
        </div>
      </section>
      <section className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h2>Login to PawCare</h2>
        <form className="form" onSubmit={submit}>
          <label>Email<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" required /></label>
          <label>Password<input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" required /></label>
          <label>Role<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="user">User</option><option value="admin">Admin</option></select></label>
          <button className="btn primary" type="submit">Login</button>
        </form>
        <div className="demo-row">
          <button className="btn ghost" onClick={() => demo('user')}>User demo</button>
          <button className="btn ghost" onClick={() => demo('admin')}>Admin demo</button>
        </div>
        <p className="switch-auth">New here? <button onClick={() => navigate('/register')}>Create an account</button></p>
      </section>
    </main>
  );
}
