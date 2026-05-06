import { useState } from 'react';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import { badgeClass, money } from '../utils/helpers';

const emptyService = { name: '', category: 'Grooming', description: '', price: '', duration: '60 min', status: 'Active' };

export default function ServicesManagement({ role }) {
  const { services, saveItem, deleteItem } = useApp();
  const [modal, setModal] = useState(null);

  const remove = (id) => {
    if (window.confirm('Delete this service?')) deleteItem('services', id, 'Service deleted.');
  };

  return (
    <section className="page-grid">
      <div className="section-head"><div><p className="eyebrow">Marketplace catalog</p><h2>Pet care services</h2></div>{role === 'admin' && <button className="btn primary" onClick={() => setModal(emptyService)}>Add service</button>}</div>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <div className="service-icon">{service.category.slice(0, 1)}</div>
            <div className="service-body">
              <div className="service-title"><h3>{service.name}</h3><span className={badgeClass(service.status)}>{service.status}</span></div>
              <p>{service.description}</p>
              <div className="meta-row"><span>{service.category}</span><span>{service.duration}</span><strong>{money(service.price)}</strong></div>
              {role === 'admin' ? <div className="actions"><button onClick={() => setModal(service)}>Edit</button><button className="danger-text" onClick={() => remove(service.id)}>Delete</button></div> : <BookingButton service={service} />}
            </div>
          </article>
        ))}
      </div>
      {modal && <ServiceModal service={modal} onClose={() => setModal(null)} onSave={(service) => { saveItem('services', service, 'Service saved.'); setModal(null); }} />}
    </section>
  );
}

function BookingButton({ service }) {
  const { currentUser, pets, saveItem, toast } = useApp();
  const [open, setOpen] = useState(false);
  const mine = pets.filter((pet) => pet.userId === currentUser.id);
  return (
    <>
      <button className="btn primary" onClick={() => mine.length ? setOpen(true) : toast('Add a pet before booking a service.', 'warning')}>Book service</button>
      {open && <BookingModal service={service} pets={mine} onClose={() => setOpen(false)} onBook={(booking) => { saveItem('bookings', booking, 'Booking created.'); setOpen(false); }} />}
    </>
  );
}

function BookingModal({ service, pets, onClose, onBook }) {
  const { currentUser } = useApp();
  const [form, setForm] = useState({ petId: pets[0]?.id || '', preferredDate: '', notes: '' });
  return (
    <Modal title={`Book ${service.name}`} onClose={onClose}>
      <form className="form modal-form" onSubmit={(e) => { e.preventDefault(); onBook({ ...form, userId: currentUser.id, serviceId: service.id, bookingDate: new Date().toISOString(), status: 'Pending', amount: service.price }); }}>
        <label>Pet<select value={form.petId} onChange={(e) => setForm({ ...form, petId: e.target.value })}>{pets.map((pet) => <option value={pet.id} key={pet.id}>{pet.name}</option>)}</select></label>
        <label>Preferred date<input value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} type="date" required /></label>
        <label>Notes<textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label>
        <button className="btn primary" type="submit">Confirm booking</button>
      </form>
    </Modal>
  );
}

function ServiceModal({ service, onClose, onSave }) {
  const [form, setForm] = useState(service);
  const set = (key, value) => setForm((item) => ({ ...item, [key]: value }));
  return (
    <Modal title={form.id ? 'Edit service' : 'Add service'} onClose={onClose}>
      <form className="form modal-form" onSubmit={(e) => { e.preventDefault(); onSave({ ...form, price: Number(form.price) }); }}>
        <label>Name<input value={form.name} onChange={(e) => set('name', e.target.value)} required /></label>
        <div className="form-row"><label>Category<select value={form.category} onChange={(e) => set('category', e.target.value)}><option>Grooming</option><option>Vet</option><option>Training</option><option>Boarding</option></select></label><label>Status<select value={form.status} onChange={(e) => set('status', e.target.value)}><option>Active</option><option>Inactive</option></select></label></div>
        <label>Description<textarea value={form.description} onChange={(e) => set('description', e.target.value)} required /></label>
        <div className="form-row"><label>Price<input value={form.price} onChange={(e) => set('price', e.target.value)} type="number" min="0" required /></label><label>Duration<input value={form.duration} onChange={(e) => set('duration', e.target.value)} required /></label></div>
        <button className="btn primary" type="submit">Save service</button>
      </form>
    </Modal>
  );
}
