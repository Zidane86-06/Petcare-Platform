import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Register({ navigate }) {
  const { register } = useApp();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'user' });

  const submit = async (event) => {
    event.preventDefault();
    if (await register(form)) navigate(form.role === 'admin' ? '/admin/dashboard' : '/dashboard');
  };

  return (
    <main className="auth-page">
      <section className="auth-visual compact">
        <div className="brand large"><div className="brand-mark">P</div><div><strong>PawCare</strong><span>Pet care platform</span></div></div>
        <h1>Launch a cleaner way to coordinate pet services.</h1>
      </section>
      <section className="auth-card">
        <p className="eyebrow">Create account</p>
        <h2>Register</h2>
        <form className="form" onSubmit={submit}>
          <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
          <label>Email<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" required /></label>
          <label>Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></label>
          <label>Password<input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" minLength="4" required /></label>
          <label>Role<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="user">User</option><option value="admin">Admin</option></select></label>
          <button className="btn primary" type="submit">Create account</button>
        </form>
        <p className="switch-auth">Already registered? <button onClick={() => navigate('/login')}>Login</button></p>
      </section>
    </main>
  );
}
