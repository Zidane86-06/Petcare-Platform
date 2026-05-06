/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/apiService';

const AppContext = createContext(null);
const COLLECTIONS = ['users', 'pets', 'services', 'bookings', 'payments', 'tasks'];
const emptyDb = { users: [], pets: [], services: [], bookings: [], payments: [], tasks: [], chatMessages: [] };

export function AppProvider({ children }) {
  const [db, setDb] = useState(emptyDb);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pawcare:currentUser') || 'null');
    } catch {
      return null;
    }
  });
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = (message, type = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    setToasts((items) => [...items, { id, message, type }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 3200);
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const entries = await Promise.all(COLLECTIONS.map(async (key) => [key, await api.all(key)]));
      setDb((previous) => ({ ...previous, ...Object.fromEntries(entries) }));
    } catch (error) {
      toast(`Backend connection failed: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadChat = async (userId) => {
    if (!userId) return;
    try {
      const messages = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/chat?userId=${userId}`).then((res) => res.json());
      setDb((previous) => ({ ...previous, chatMessages: messages }));
    } catch {
      setDb((previous) => ({ ...previous, chatMessages: [] }));
    }
  };

  useEffect(() => {
    refresh();
    // The first load should run once; refresh is intentionally stable by usage, not by identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('pawcare:currentUser', JSON.stringify(currentUser));
    if (currentUser?.id) loadChat(currentUser.id);
  }, [currentUser]);

  const login = async (payload) => {
    try {
      const user = await api.login(payload);
      setCurrentUser(user);
      await refresh();
      toast(`Signed in as ${user.role}.`, 'success');
      return true;
    } catch {
      toast('Invalid credentials or role. Try the demo accounts.', 'error');
      return false;
    }
  };

  const register = async (payload) => {
    try {
      const user = await api.register(payload);
      setCurrentUser(user);
      await refresh();
      toast(`Welcome to PawCare, ${user.name}.`, 'success');
      return true;
    } catch (error) {
      toast(error.message.includes('409') ? 'An account with this email already exists.' : 'Registration failed.', 'error');
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    window.location.hash = '/login';
    toast('Signed out successfully.', 'info');
  };

  const saveItem = async (key, item, message = 'Saved successfully.') => {
    try {
      const saved = item.id ? await api.update(key, item.id, item) : await api.create(key, item);
      setDb((previous) => ({
        ...previous,
        [key]: item.id ? previous[key].map((entry) => (entry.id === saved.id ? saved : entry)) : [...previous[key], saved],
      }));
      toast(message, 'success');
      return saved;
    } catch (error) {
      toast(`Save failed: ${error.message}`, 'error');
      return null;
    }
  };

  const deleteItem = async (key, id, message = 'Deleted successfully.') => {
    try {
      await api.delete(key, id);
      setDb((previous) => ({ ...previous, [key]: previous[key].filter((entry) => entry.id !== id) }));
      toast(message, 'success');
    } catch (error) {
      toast(`Delete failed: ${error.message}`, 'error');
    }
  };

  const updateCollection = async (key, items) => {
    setDb((previous) => ({ ...previous, [key]: items }));
  };

  const makePayment = async (booking, paymentMethod) => {
    try {
      const payment = await api.pay({ bookingId: booking.id, paymentMethod });
      await refresh();
      toast('Payment completed. Receipt is ready.', 'success');
      return payment;
    } catch (error) {
      toast(`Payment failed: ${error.message}`, 'error');
      return null;
    }
  };

  const sendChatMessage = async (text) => {
    if (!currentUser) return;
    try {
      const messages = await api.chat({ userId: currentUser.id, message: text });
      setDb((previous) => ({ ...previous, chatMessages: messages }));
    } catch (error) {
      toast(`Paw could not reply: ${error.message}`, 'error');
    }
  };

  const updateProfile = async (profile) => {
    const user = await saveItem('users', profile, 'Profile saved.');
    if (user) setCurrentUser(user);
  };

  const value = {
    ...db,
    currentUser,
    toasts,
    loading,
    toast,
    login,
    register,
    logout,
    saveItem,
    deleteItem,
    updateCollection,
    makePayment,
    sendChatMessage,
    updateProfile,
    refresh,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
