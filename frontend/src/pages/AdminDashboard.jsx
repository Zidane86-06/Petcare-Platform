import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import { money } from '../utils/helpers';

export default function AdminDashboard({ navigate }) {
  const { users, pets, bookings, payments, tasks } = useApp();
  const revenue = payments.filter((item) => item.paymentStatus === 'Paid').reduce((sum, item) => sum + Number(item.amount), 0);
  const pending = bookings.filter((item) => item.status === 'Pending').length;

  return (
    <div className="page-grid">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Operations overview</p>
          <h2>Today&apos;s care marketplace pulse</h2>
          <p>Monitor users, bookings, payments, service tasks, and revenue from one calm dashboard.</p>
        </div>
        <button className="btn light" onClick={() => navigate('/admin/reports')}>View reports</button>
      </section>
      <div className="stats-grid">
        <StatCard icon="users" label="Total users" value={users.filter((u) => u.role === 'user').length} />
        <StatCard icon="paw" label="Total pets" value={pets.length} />
        <StatCard icon="calendar" label="Bookings" value={bookings.length} />
        <StatCard icon="card" label="Revenue" value={money(revenue)} />
        <StatCard icon="clock" label="Pending bookings" value={pending} />
      </div>
      <section className="two-col">
        <div className="panel">
          <div className="panel-head"><h3>Recent bookings</h3><button onClick={() => navigate('/admin/bookings')}>Manage</button></div>
          <table className="data-table"><tbody>{bookings.slice(0, 5).map((booking) => <tr key={booking.id}><td>{booking.id}</td><td>{booking.status}</td><td>{money(booking.amount)}</td></tr>)}</tbody></table>
        </div>
        <div className="panel">
          <div className="panel-head"><h3>User task status</h3><button onClick={() => navigate('/admin/tasks')}>Assign task</button></div>
          <div className="task-list">{tasks.map((task) => <article className="task-card compact" key={task.id}><strong>{task.title}</strong><span>{task.status} - {task.priority}</span></article>)}</div>
        </div>
      </section>
    </div>
  );
}
