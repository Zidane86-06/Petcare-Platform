import { useState } from 'react';
import Modal from '../components/Modal';
import { useApp } from '../context/AppContext';
import { badgeClass, formatDate } from '../utils/helpers';

const emptyTask = { assignedToUserId: '', title: '', description: '', priority: 'Medium', status: 'Pending', dueDate: '' };
const statuses = ['Pending', 'In Progress', 'Completed'];

export default function TaskManagement({ role }) {
  const { currentUser, users, tasks, saveItem } = useApp();
  const [modal, setModal] = useState(null);
  const list = role === 'admin' ? tasks : tasks.filter((task) => task.assignedToUserId === currentUser.id);
  const customers = users.filter((user) => user.role === 'user');

  return (
    <section className="page-grid">
      <div className="section-head"><div><p className="eyebrow">{role === 'admin' ? 'Assignments' : 'Assigned by admin'}</p><h2>Task management</h2></div>{role === 'admin' && <button className="btn primary" onClick={() => setModal({ ...emptyTask, assignedToUserId: customers[0]?.id || '' })}>Assign task</button>}</div>
      <div className="task-list">{list.length === 0 ? <div className="empty-panel">No tasks yet.</div> : list.map((task) => {
        const assignee = users.find((user) => user.id === task.assignedToUserId);
        return <article className="task-card" key={task.id}><div><div className="task-title"><h3>{task.title}</h3><span className={badgeClass(task.priority)}>{task.priority}</span></div><p>{task.description}</p><div className="meta-row"><span>{assignee?.name}</span><span>Due {formatDate(task.dueDate)}</span></div></div><select className="soft-select" value={task.status} onChange={(e) => saveItem('tasks', { ...task, status: e.target.value }, 'Task status updated.')}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></article>;
      })}</div>
      {modal && <TaskModal task={modal} users={customers} onClose={() => setModal(null)} onSave={(task) => { saveItem('tasks', { ...task, assignedByAdminId: currentUser.id }, 'Task assigned.'); setModal(null); }} />}
    </section>
  );
}

function TaskModal({ task, users, onClose, onSave }) {
  const [form, setForm] = useState(task);
  const set = (key, value) => setForm((item) => ({ ...item, [key]: value }));
  return (
    <Modal title="Assign task" onClose={onClose}>
      <form className="form modal-form" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
        <label>Assign to<select value={form.assignedToUserId} onChange={(e) => set('assignedToUserId', e.target.value)}>{users.map((user) => <option value={user.id} key={user.id}>{user.name}</option>)}</select></label>
        <label>Title<input value={form.title} onChange={(e) => set('title', e.target.value)} required /></label>
        <label>Description<textarea value={form.description} onChange={(e) => set('description', e.target.value)} required /></label>
        <div className="form-row"><label>Priority<select value={form.priority} onChange={(e) => set('priority', e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label><label>Due date<input value={form.dueDate} onChange={(e) => set('dueDate', e.target.value)} type="date" required /></label></div>
        <button className="btn primary" type="submit">Assign</button>
      </form>
    </Modal>
  );
}
