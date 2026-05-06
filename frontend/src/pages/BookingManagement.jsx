import { useApp } from '../context/AppContext';
import { badgeClass, formatDate, money } from '../utils/helpers';

const bookingStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

export default function BookingManagement({ role }) {
  const { currentUser, users, pets, services, bookings, saveItem } = useApp();
  const rows = role === 'admin' ? bookings : bookings.filter((booking) => booking.userId === currentUser.id);

  return (
    <section className="page-grid">
      <div className="section-head"><div><p className="eyebrow">{role === 'admin' ? 'All appointments' : 'Your appointments'}</p><h2>Booking management</h2></div></div>
      {rows.length === 0 ? <div className="empty-panel">No bookings found.</div> : <div className="panel table-panel">
        <table className="data-table">
          <thead><tr><th>User</th><th>Pet</th><th>Service</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>{rows.map((booking) => {
            const user = users.find((item) => item.id === booking.userId);
            const pet = pets.find((item) => item.id === booking.petId);
            const service = services.find((item) => item.id === booking.serviceId);
            return (
              <tr key={booking.id}>
                <td>{user?.name || 'Unknown'}</td><td>{pet?.name || 'Unknown'}</td><td>{service?.name || 'Unknown'}</td><td>{formatDate(booking.preferredDate)}</td><td>{money(booking.amount)}</td>
                <td>{role === 'admin' ? <select className="table-select" value={booking.status} onChange={(e) => saveItem('bookings', { ...booking, status: e.target.value }, 'Booking status updated.')}>{bookingStatuses.map((status) => <option key={status}>{status}</option>)}</select> : <span className={badgeClass(booking.status)}>{booking.status}</span>}</td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>}
    </section>
  );
}
