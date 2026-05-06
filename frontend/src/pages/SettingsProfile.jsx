import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function SettingsProfile() {
  const { currentUser, updateProfile } = useApp();
  const [form, setForm] = useState(currentUser);

  const submit = (event) => {
    event.preventDefault();
    updateProfile(form);
  };

  return (
    <section className="settings-layout">
      <div className="panel profile-card">
        <div className="big-avatar">{currentUser.name.slice(0, 1)}</div>
        <h2>{currentUser.name}</h2>
        <p>{currentUser.role}</p>
      </div>
      <div className="panel">
        <h2>Profile settings</h2>
        <form className="form" onSubmit={submit}>
          <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label>Email<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" /></label>
          <label>Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
          <label>Password<input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" /></label>
          <button className="btn primary" type="submit">Save profile</button>
        </form>
      </div>
    </section>
  );
}
