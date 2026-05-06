import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import { badgeClass, formatDate, money } from '../utils/helpers';

export default function Reports({ view = 'overview' }) {
  const { users, pets, bookings, payments, tasks } = useApp();
  const revenue = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const realUsers = users.filter((user) => user.role === 'user');

  if (view === 'users') {
    return (
      <section className="page-grid">
        <div className="section-head"><div><p className="eyebrow">Customer directory</p><h2>All users</h2></div></div>
        <div className="panel table-panel"><table className="data-table"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Pets</th><th>Joined</th></tr></thead><tbody>{realUsers.map((user) => <tr key={user.id}><td>{user.name}</td><td>{user.email}</td><td>{user.phone}</td><td>{pets.filter((pet) => pet.userId === user.id).length}</td><td>{formatDate(user.createdAt)}</td></tr>)}</tbody></table></div>
      </section>
    );
  }

  return (
    <section className="page-grid">
      <div className="section-head"><div><p className="eyebrow">Business reports</p><h2>Platform analytics</h2></div></div>
      <div className="stats-grid">
        <StatCard icon="users" label="Users" value={realUsers.length} />
        <StatCard icon="paw" label="Pets" value={pets.length} />
        <StatCard icon="calendar" label="Bookings" value={bookings.length} />
        <StatCard icon="card" label="Revenue" value={money(revenue)} />
        <StatCard icon="clock" label="Pending" value={bookings.filter((booking) => booking.status === 'Pending').length} />
      </div>
      <section className="two-col">
        <div className="panel"><h3>Booking status</h3><div className="bar-list">{['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => {
          const count = bookings.filter((booking) => booking.status === status).length;
          const width = bookings.length ? `${Math.max((count / bookings.length) * 100, 8)}%` : '8%';
          return <div className="bar-row" key={status}><span>{status}</span><div><i style={{ width }} /></div><strong>{count}</strong></div>;
        })}</div></div>
        <div className="panel"><h3>User task status</h3><div className="task-list">{tasks.map((task) => <article className="task-card compact" key={task.id}><strong>{task.title}</strong><span className={badgeClass(task.status)}>{task.status}</span></article>)}</div></div>
      </section>
    </section>
  );
}
