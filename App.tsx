import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Communities from './pages/Communities';
import CommunityRequests from './pages/CommunityRequests';
import MemberRequests from './pages/MemberRequests';

// Header component handling Title based on Route and Mobile Toggle
const Header: React.FC<{ title: string; onMenuClick: () => void }> = ({ title, onMenuClick }) => {
  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-border-dark w-full lg:hidden shrink-0 z-10">
      <button onClick={onMenuClick} className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded-md">
        <span className="material-symbols-outlined">menu</span>
      </button>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
      <div className="w-10"></div> {/* Spacer for alignment */}
    </header>
  );
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Determine Title based on path
  const getTitle = (path: string) => {
    switch (path) {
      case '/': return 'Dashboard';
      case '/communities': return 'Manage Communities';
      case '/community-requests': return 'Pending Requests';
      case '/member-requests': return 'Member Requests';
      case '/settings': return 'Settings';
      default: return 'Admin Panel';
    }
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar - Hidden on mobile unless toggled */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </div>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <Header 
          title={getTitle(location.pathname)} 
          onMenuClick={() => setMobileMenuOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session (mock)
  useEffect(() => {
    const session = localStorage.getItem('auth_session');
    if (session) setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('auth_session', 'true');
    setIsAuthenticated(true);
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />} 
        />
        
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/communities" element={<Communities />} />
                  <Route path="/community-requests" element={<CommunityRequests />} />
                  <Route path="/member-requests" element={<MemberRequests />} />
                  <Route path="/settings" element={<div className="text-center text-gray-500 mt-20">Settings page placeholder</div>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;