import { useState } from 'react';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import { petIcon } from '../utils/helpers';

const emptyPet = { name: '', species: 'Dog', breed: '', age: '', weight: '', gender: 'Female', image: '' };

export default function PetsManagement() {
  const { currentUser, pets, saveItem, deleteItem } = useApp();
  const [modal, setModal] = useState(null);
  const mine = pets.filter((pet) => pet.userId === currentUser.id);

  const remove = (id) => {
    if (window.confirm('Delete this pet profile?')) deleteItem('pets', id, 'Pet profile deleted.');
  };

  return (
    <section className="page-grid">
      <div className="section-head"><div><p className="eyebrow">Pet profiles</p><h2>Manage pets</h2></div><button className="btn primary" onClick={() => setModal(emptyPet)}>Add pet</button></div>
      {mine.length === 0 ? <div className="empty-panel">No pet profiles yet.</div> : <div className="card-grid">{mine.map((pet) => (
        <article className="pet-card" key={pet.id}>
          <div className="pet-avatar">{petIcon(pet.species)}</div>
          <h3>{pet.name}</h3>
          <p>{pet.breed} - {pet.species}</p>
          <div className="meta-row"><span>{pet.age} yrs</span><span>{pet.weight} lb</span><span>{pet.gender}</span></div>
          <div className="actions"><button onClick={() => setModal(pet)}>Edit</button><button className="danger-text" onClick={() => remove(pet.id)}>Delete</button></div>
        </article>
      ))}</div>}
      {modal && <PetModal pet={modal} onClose={() => setModal(null)} onSave={(pet) => { saveItem('pets', { ...pet, userId: currentUser.id }, 'Pet profile saved.'); setModal(null); }} />}
    </section>
  );
}

function PetModal({ pet, onClose, onSave }) {
  const [form, setForm] = useState(pet);
  const set = (key, value) => setForm((item) => ({ ...item, [key]: value }));
  return (
    <Modal title={form.id ? 'Edit pet' : 'Add pet'} onClose={onClose}>
      <form className="form modal-form" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
        <label>Name<input value={form.name} onChange={(e) => set('name', e.target.value)} required /></label>
        <div className="form-row"><label>Species<select value={form.species} onChange={(e) => set('species', e.target.value)}><option>Dog</option><option>Cat</option><option>Bird</option><option>Rabbit</option></select></label><label>Gender<select value={form.gender} onChange={(e) => set('gender', e.target.value)}><option>Female</option><option>Male</option></select></label></div>
        <label>Breed<input value={form.breed} onChange={(e) => set('breed', e.target.value)} required /></label>
        <div className="form-row"><label>Age<input value={form.age} onChange={(e) => set('age', e.target.value)} type="number" min="0" required /></label><label>Weight<input value={form.weight} onChange={(e) => set('weight', e.target.value)} type="number" min="0" required /></label></div>
        <label>Image URL<input value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="Optional" /></label>
        <button className="btn primary" type="submit">Save pet</button>
      </form>
    </Modal>
  );
}
