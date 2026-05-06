import { storage } from '../services/storageService';

const now = new Date().toISOString();

const initial = {
  users: [
    { id: 'admin_1', name: 'Avery Stone', email: 'admin@pawcare.com', password: 'admin123', role: 'admin', phone: '+1 555 0100', createdAt: now },
    { id: 'user_1', name: 'Mia Carter', email: 'mia@pawcare.com', password: 'user123', role: 'user', phone: '+1 555 0144', createdAt: now },
    { id: 'user_2', name: 'Noah Brooks', email: 'noah@pawcare.com', password: 'user123', role: 'user', phone: '+1 555 0187', createdAt: now },
  ],
  pets: [
    { id: 'pet_1', userId: 'user_1', name: 'Luna', species: 'Dog', breed: 'Golden Retriever', age: 4, weight: 58, gender: 'Female', image: '', createdAt: now },
    { id: 'pet_2', userId: 'user_1', name: 'Mochi', species: 'Cat', breed: 'Ragdoll', age: 2, weight: 11, gender: 'Male', image: '', createdAt: now },
    { id: 'pet_3', userId: 'user_2', name: 'Rocky', species: 'Dog', breed: 'Beagle', age: 5, weight: 30, gender: 'Male', image: '', createdAt: now },
  ],
  services: [
    { id: 'srv_1', name: 'Signature Grooming', category: 'Grooming', description: 'Bath, brush, nail trim, ear cleaning, and coat refresh.', price: 65, duration: '90 min', status: 'Active' },
    { id: 'srv_2', name: 'Wellness Vet Visit', category: 'Vet', description: 'Routine checkup, vitals, vaccine review, and care plan.', price: 120, duration: '45 min', status: 'Active' },
    { id: 'srv_3', name: 'Positive Training', category: 'Training', description: 'Behavior coaching, leash work, and home practice notes.', price: 85, duration: '60 min', status: 'Active' },
    { id: 'srv_4', name: 'Cozy Boarding', category: 'Boarding', description: 'Overnight stay with meals, walks, and daily photo updates.', price: 48, duration: '1 night', status: 'Active' },
  ],
  bookings: [
    { id: 'book_1', userId: 'user_1', petId: 'pet_1', serviceId: 'srv_1', bookingDate: now, preferredDate: '2026-05-10', status: 'Confirmed', amount: 65, notes: 'Use sensitive shampoo.' },
    { id: 'book_2', userId: 'user_1', petId: 'pet_2', serviceId: 'srv_2', bookingDate: now, preferredDate: '2026-05-15', status: 'Pending', amount: 120, notes: 'Annual wellness check.' },
    { id: 'book_3', userId: 'user_2', petId: 'pet_3', serviceId: 'srv_3', bookingDate: now, preferredDate: '2026-05-18', status: 'Completed', amount: 85, notes: 'Focus on recall.' },
  ],
  payments: [
    { id: 'pay_1', bookingId: 'book_1', userId: 'user_1', amount: 65, paymentMethod: 'Card', paymentStatus: 'Paid', paidAt: now },
    { id: 'pay_2', bookingId: 'book_3', userId: 'user_2', amount: 85, paymentMethod: 'Wallet', paymentStatus: 'Paid', paidAt: now },
  ],
  tasks: [
    { id: 'task_1', assignedByAdminId: 'admin_1', assignedToUserId: 'user_1', title: 'Upload Luna vaccination record', description: 'Add the latest vaccine document before the vet visit.', priority: 'High', status: 'Pending', dueDate: '2026-05-09', createdAt: now },
    { id: 'task_2', assignedByAdminId: 'admin_1', assignedToUserId: 'user_2', title: 'Confirm Rocky training goals', description: 'Share three behavior goals for the trainer.', priority: 'Medium', status: 'In Progress', dueDate: '2026-05-12', createdAt: now },
  ],
  chatMessages: [
    { id: 'msg_1', userId: 'user_1', sender: 'paw', message: 'Hi Mia, I am Paw. Ask me about care, bookings, feeding, or reminders.', createdAt: now },
  ],
};

export function seedDatabase() {
  const seeded = storage.get('seeded', false);
  if (!seeded) {
    Object.entries(initial).forEach(([key, value]) => storage.set(key, value));
    storage.set('seeded', true);
    return initial;
  }
  return {
    users: storage.get('users', initial.users),
    pets: storage.get('pets', initial.pets),
    services: storage.get('services', initial.services),
    bookings: storage.get('bookings', initial.bookings),
    payments: storage.get('payments', initial.payments),
    tasks: storage.get('tasks', initial.tasks),
    chatMessages: storage.get('chatMessages', initial.chatMessages),
  };
}
