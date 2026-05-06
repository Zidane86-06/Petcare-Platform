import { useApp } from '../context/AppContext';

export default function ToastContainer() {
  const { toasts } = useApp();
  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <div className={`toast ${toast.type}`} key={toast.id}>
          <span>{toast.type === 'error' ? '!' : toast.type === 'success' ? '✓' : 'i'}</span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
