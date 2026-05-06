import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { badgeClass, formatDate, money } from '../utils/helpers';

export default function Payments({ role }) {
  const { currentUser, users, pets, services, bookings, payments, makePayment } = useApp();
  const [method, setMethod] = useState('Card');
  const userBookings = role === 'admin' ? bookings : bookings.filter((booking) => booking.userId === currentUser.id);
  const userPayments = role === 'admin' ? payments : payments.filter((payment) => payment.userId === currentUser.id);
  const paidIds = new Set(payments.map((payment) => payment.bookingId));
  const unpaid = userBookings.filter((booking) => !paidIds.has(booking.id) && booking.status !== 'Cancelled');

  return (
    <section className="page-grid">
      <div className="section-head"><div><p className="eyebrow">Transactions</p><h2>Payments and receipts</h2></div>{role === 'user' && <select className="soft-select" value={method} onChange={(e) => setMethod(e.target.value)}><option>Card</option><option>UPI</option><option>Wallet</option><option>Cash</option></select>}</div>
      {role === 'user' && unpaid.length > 0 && <div className="panel"><h3>Pending payments</h3><div className="receipt-grid">{unpaid.map((booking) => {
        const service = services.find((item) => item.id === booking.serviceId);
        const pet = pets.find((item) => item.id === booking.petId);
        return <article className="receipt" key={booking.id}><span>Invoice</span><h3>{service?.name}</h3><p>{pet?.name} - {formatDate(booking.preferredDate)}</p><strong>{money(booking.amount)}</strong><button className="btn primary" onClick={() => makePayment(booking, method)}>Pay now</button></article>;
      })}</div></div>}
      <div className="panel">
        <div className="panel-head"><h3>Receipt history</h3></div>
        {userPayments.length === 0 ? <p className="empty">No payments yet.</p> : <div className="receipt-grid">{userPayments.map((payment) => {
          const booking = bookings.find((item) => item.id === payment.bookingId);
          const user = users.find((item) => item.id === payment.userId);
          const service = services.find((item) => item.id === booking?.serviceId);
          return <article className="receipt paid" key={payment.id}><span>Receipt #{payment.id.slice(-6)}</span><h3>{service?.name || 'Service'}</h3><p>{user?.name} - {payment.paymentMethod}</p><strong>{money(payment.amount)}</strong><small>{formatDate(payment.paidAt)}</small><b className={badgeClass(payment.paymentStatus)}>{payment.paymentStatus}</b></article>;
        })}</div>}
      </div>
    </section>
  );
}
