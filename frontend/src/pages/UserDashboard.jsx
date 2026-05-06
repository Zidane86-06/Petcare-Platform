import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import { badgeClass, formatDate, money } from '../utils/helpers';

export default function UserDashboard({ navigate }) {
  const { currentUser, pets, bookings, services, payments, tasks } = useApp();
  const mine = {
    pets: pets.filter((item) => item.userId === currentUser.id),
    bookings: bookings.filter((item) => item.userId === currentUser.id),
    payments: payments.filter((item) => item.userId === currentUser.id),
    tasks: tasks.filter((item) => item.assignedToUserId === currentUser.id),
  };
  const spend = mine.payments.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className="page-grid">
      <section className="hero-panel user">
        <div>
          <p className="eyebrow">Hello, {currentUser.name}</p>
          <h2>Care plans, bookings, payments, and Paw in one dashboard.</h2>
          <p>Your pets&apos; next steps are organized and ready.</p>
        </div>
        <button className="btn light" onClick={() => navigate('/services')}>Book a service</button>
      </section>
      <div className="stats-grid">
        <StatCard icon="paw" label="Pets" value={mine.pets.length} />
        <StatCard icon="calendar" label="Bookings" value={mine.bookings.length} />
        <StatCard icon="check" label="Open tasks" value={mine.tasks.filter((task) => task.status !== 'Completed').length} />
        <StatCard icon="card" label="Paid" value={money(spend)} />
      </div>
      <section className="two-col">
        <div className="panel">
          <div className="panel-head"><h3>Upcoming bookings</h3><button onClick={() => navigate('/bookings')}>View all</button></div>
          {mine.bookings.length === 0 ? <p className="empty">No bookings yet.</p> : mine.bookings.slice(0, 4).map((booking) => {
            const service = services.find((item) => item.id === booking.serviceId);
            return <article className="booking-card" key={booking.id}><div><strong>{service?.name}</strong><span>{formatDate(booking.preferredDate)} - {money(booking.amount)}</span></div><span className={badgeClass(booking.status)}>{booking.status}</span></article>;
          })}
        </div>
        <div className="panel chat-teaser">
          <h3>Ask Paw</h3>
          <p>Need care tips, booking help, or prep notes before a service?</p>
          <button className="btn primary" onClick={() => navigate('/chat')}>Open chat</button>
        </div>
      </section>
    </div>
  );
}
