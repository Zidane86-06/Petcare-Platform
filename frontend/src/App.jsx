import { useEffect, useMemo, useState } from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ToastContainer from './components/ToastContainer';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import PetsManagement from './pages/PetsManagement';
import ServicesManagement from './pages/ServicesManagement';
import BookingManagement from './pages/BookingManagement';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import TaskManagement from './pages/TaskManagement';
import AIChatAssistant from './pages/AIChatAssistant';
import SettingsProfile from './pages/SettingsProfile';

const PUBLIC_ROUTES = ['/login', '/register'];

function getRoute() {
  return window.location.hash.replace('#', '') || '/login';
}

function navigate(path) {
  window.location.hash = path;
}

export default function App() {
  const { currentUser } = useApp();
  const [route, setRoute] = useState(getRoute);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setRoute(getRoute());
      setSidebarOpen(false);
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  useEffect(() => {
    const current = getRoute();
    if (!currentUser && !PUBLIC_ROUTES.includes(current)) navigate('/login');
    if (currentUser && PUBLIC_ROUTES.includes(current)) {
      navigate(currentUser.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    }
  }, [currentUser]);

  const isAdmin = currentUser?.role === 'admin';
  const title = useMemo(() => {
    const labels = {
      '/admin/dashboard': 'Admin Dashboard',
      '/admin/users': 'Users',
      '/admin/services': 'Services',
      '/admin/bookings': 'Bookings',
      '/admin/payments': 'Payments',
      '/admin/reports': 'Reports',
      '/admin/tasks': 'Tasks',
      '/admin/settings': 'Settings',
      '/dashboard': 'Dashboard',
      '/pets': 'Pet Profiles',
      '/services': 'Services',
      '/bookings': 'Bookings',
      '/payments': 'Payments',
      '/tasks': 'My Tasks',
      '/chat': 'Paw Assistant',
      '/settings': 'Profile Settings',
    };
    return labels[route] || 'Dashboard';
  }, [route]);

  if (!currentUser) {
    return (
      <>
        {route === '/register' ? <Register navigate={navigate} /> : <Login navigate={navigate} />}
        <ToastContainer />
      </>
    );
  }

  const adminPages = {
    '/admin/dashboard': <AdminDashboard navigate={navigate} />,
    '/admin/users': <Reports view="users" />,
    '/admin/services': <ServicesManagement role="admin" />,
    '/admin/bookings': <BookingManagement role="admin" />,
    '/admin/payments': <Payments role="admin" />,
    '/admin/reports': <Reports view="overview" />,
    '/admin/tasks': <TaskManagement role="admin" />,
    '/admin/settings': <SettingsProfile />,
  };

  const userPages = {
    '/dashboard': <UserDashboard navigate={navigate} />,
    '/pets': <PetsManagement />,
    '/services': <ServicesManagement role="user" navigate={navigate} />,
    '/bookings': <BookingManagement role="user" />,
    '/payments': <Payments role="user" />,
    '/tasks': <TaskManagement role="user" />,
    '/chat': <AIChatAssistant />,
    '/settings': <SettingsProfile />,
  };

  const page = isAdmin ? adminPages[route] || adminPages['/admin/dashboard'] : userPages[route] || userPages['/dashboard'];

  return (
    <div className="app-shell">
      <Sidebar route={route} navigate={navigate} open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="shell-body">
        <Header title={title} onMenu={() => setSidebarOpen(true)} />
        <main className="content">{page}</main>
      </div>
      <ToastContainer />
    </div>
  );
}
