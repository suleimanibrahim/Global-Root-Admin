import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuthContext();

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/' },
    { name: 'Communities', icon: 'groups', path: '/communities' },
    { name: 'Pending Requests', icon: 'inbox', path: '/community-requests' },
    { name: 'Settings', icon: 'settings', path: '/settings' },
  ];

  return (
    <aside className="flex w-64 flex-col bg-white dark:bg-background-dark border-r border-gray-200 dark:border-border-dark flex-shrink-0 z-20">
      <div className="flex flex-col h-full p-4">

        {/* User Profile / Brand Area */}
        <div className="flex items-center gap-3 px-2 mb-6">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gray-200"
            style={{ backgroundImage: `url("https://ui-avatars.com/api/?name=${user?.role || 'Admin'}&background=random")` }}
          />
          <div className="flex flex-col">
            <h1 className="text-gray-900 dark:text-white text-sm font-medium leading-normal">{user?.role || 'Admin'}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-normal leading-normal">{user?.email || 'admin@globalroot.com'}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${isActive
                  ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`material-symbols-outlined text-xl ${isActive ? 'material-symbols-filled' : ''}`}
                  >
                    {item.icon}
                  </span>
                  <p className="text-sm font-medium">{item.name}</p>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <p className="text-sm font-medium">Log out</p>
          </button>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;