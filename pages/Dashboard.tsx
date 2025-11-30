import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useDashboard } from '../hooks/useDashboard';

const StatCard: React.FC<{ label: string; value: string | number; icon: string; color: string; isLoading?: boolean }> = ({ label, value, icon, color, isLoading = false }) => (
  <div className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-200 dark:border-border-dark flex flex-col justify-between h-full">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
      <span className={`material-symbols-outlined ${color} text-3xl`}>{icon}</span>
    </div>
    <p className="text-3xl font-bold text-gray-900 dark:text-white">
      {isLoading ? '...' : value}
    </p>
  </div>
);

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const { useDashboardStats } = useDashboard();
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">

      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.role || 'Admin'}!</h2>
        <p className="text-gray-600 dark:text-gray-400">Here's a summary of your community operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          label="Total Communities"
          value={stats?.totalCommunities ?? 0}
          icon="home_work"
          color="text-green-500"
          isLoading={isLoading}
        />
        <StatCard
          label="Active Communities"
          value={stats?.totalActiveCommunities ?? 0}
          icon="check_circle"
          color="text-emerald-500"
          isLoading={isLoading}
        />
        <StatCard
          label="Inactive Communities"
          value={stats?.totalInactiveCommunities ?? 0}
          icon="cancel"
          color="text-gray-500"
          isLoading={isLoading}
        />
        <StatCard
          label="Approved Members"
          value={stats?.totalApprovedMembers ?? 0}
          icon="groups"
          color="text-blue-500"
          isLoading={isLoading}
        />
        <StatCard
          label="Unapproved Members"
          value={stats?.totalUnapprovedMembers ?? 0}
          icon="person_off"
          color="text-orange-500"
          isLoading={isLoading}
        />
        <StatCard
          label="Pending Requests"
          value={stats?.totalPendingRequests ?? 0}
          icon="pending_actions"
          color="text-yellow-500"
          isLoading={isLoading}
        />
      </div>

    </div>
  );
};

export default Dashboard;