import { useApp } from '../context/AppContext';

const adminNav = [
  ['/admin/dashboard', 'Dashboard', 'grid'],
  ['/admin/users', 'Users', 'users'],
  ['/admin/services', 'Services', 'briefcase'],
  ['/admin/bookings', 'Bookings', 'calendar'],
  ['/admin/payments', 'Payments', 'card'],
  ['/admin/reports', 'Reports', 'chart'],
  ['/admin/tasks', 'Tasks', 'check'],
  ['/admin/settings', 'Settings', 'gear'],
];

const userNav = [
  ['/dashboard', 'Dashboard', 'grid'],
  ['/pets', 'My Pets', 'paw'],
  ['/services', 'Services', 'briefcase'],
  ['/bookings', 'Bookings', 'calendar'],
  ['/payments', 'Payments', 'card'],
  ['/tasks', 'Tasks', 'check'],
  ['/chat', 'Paw AI', 'spark'],
  ['/settings', 'Settings', 'gear'],
];

export default function Sidebar({ route, navigate, open, setOpen }) {
  const { currentUser, logout } = useApp();
  const nav = currentUser.role === 'admin' ? adminNav : userNav;

  return (
    <>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">P</div>
          <div>
            <strong>PawCare</strong>
            <span>{currentUser.role === 'admin' ? 'Admin Console' : 'Pet Marketplace'}</span>
          </div>
        </div>
        <nav className="nav-list">
          {nav.map(([path, label, icon]) => (
            <button key={path} className={`nav-item ${route === path ? 'active' : ''}`} onClick={() => navigate(path)}>
              <span className={`line-icon ${icon}`} />
              {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-profile">
          <div className="avatar">{currentUser.name.slice(0, 1)}</div>
          <div>
            <strong>{currentUser.name}</strong>
            <span>{currentUser.email}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={logout}>Sign out</button>
      </aside>
      {open && <button className="sidebar-scrim" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </>
  );
}
