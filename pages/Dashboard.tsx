import React from 'react';
import { CURRENT_USER } from '../constants';

const StatCard: React.FC<{ label: string; value: string | number; icon: string; color: string }> = ({ label, value, icon, color }) => (
  <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-border-dark flex flex-col justify-between h-full">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
      <span className={`material-symbols-outlined ${color} text-3xl`}>{icon}</span>
    </div>
    <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {CURRENT_USER.name.split(' ')[0]}!</h2>
        <p className="text-gray-600 dark:text-gray-400">Here's a summary of your community operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Communities" value="142" icon="home_work" color="text-green-500" />
        <StatCard label="Total Members" value="2,583" icon="groups" color="text-blue-500" />
        <StatCard label="Community Requests" value="5" icon="pending_actions" color="text-yellow-500" />
        <StatCard label="Member Requests" value="12" icon="group_add" color="text-red-500" />
      </div>

      {/* Activity Section */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                 <span className="material-symbols-outlined text-base">history</span>
                 View Activity Log
            </button>
        </div>
        
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark p-8 min-h-[300px] flex items-center justify-center text-gray-500 dark:text-gray-400">
          <p>Activity feed will be displayed here.</p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;