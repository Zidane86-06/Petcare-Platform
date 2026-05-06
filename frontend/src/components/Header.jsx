import { useApp } from '../context/AppContext';

export default function Header({ title, onMenu }) {
  const { currentUser, bookings, tasks } = useApp();
  const userBookings = currentUser.role === 'admin' ? bookings : bookings.filter((item) => item.userId === currentUser.id);
  const activeTasks = tasks.filter((task) => currentUser.role === 'admin' || task.assignedToUserId === currentUser.id).filter((task) => task.status !== 'Completed');

  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onMenu} aria-label="Open menu"><span /></button>
      <div>
        <p className="eyebrow">Pet care command center</p>
        <h1>{title}</h1>
      </div>
      <div className="topbar-actions">
        <div className="mini-stat"><strong>{userBookings.length}</strong><span>Bookings</span></div>
        <div className="mini-stat"><strong>{activeTasks.length}</strong><span>Open tasks</span></div>
        <div className="header-avatar">{currentUser.name.slice(0, 1)}</div>
      </div>
    </header>
  );
}
