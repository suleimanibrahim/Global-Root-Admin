import React, { useState } from 'react';
import { MOCK_MEMBER_REQUESTS } from '../constants';

const MemberRequests: React.FC = () => {
  const [requests, setRequests] = useState(MOCK_MEMBER_REQUESTS);

  const handleAction = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Heading */}
      <div>
        <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Pending Member Join Requests</h1>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
         <div className="flex gap-4 flex-1">
            <div className="relative w-full max-w-sm">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">search</span>
                <input 
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Search by name or community..."
                    type="text"
                />
            </div>
            <div className="relative hidden sm:block">
                <select className="appearance-none w-48 pl-4 pr-10 py-2.5 bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none cursor-pointer">
                    <option>Sort by Newest</option>
                    <option>Sort by Oldest</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none">expand_more</span>
            </div>
         </div>
      </div>

      {/* List Table */}
      <div className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark shadow-sm">
         <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                    <th className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm font-medium w-2/5">Member</th>
                    <th className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm font-medium w-2/5">Community</th>
                    <th className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm font-medium w-1/5">Date Submitted</th>
                    <th className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm font-medium text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div 
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10 shrink-0"
                                    style={{ backgroundImage: `url("${req.userAvatar}")`}}
                                />
                                <span className="text-gray-800 dark:text-gray-200 text-sm font-normal">{req.userName}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm font-normal">{req.communityName}</td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm font-normal">{req.timeAgo}</td>
                        <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-3">
                                <button 
                                    onClick={() => handleAction(req.id)}
                                    className="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Reject
                                </button>
                                <button 
                                    onClick={() => handleAction(req.id)}
                                    className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover transition-colors shadow-sm"
                                >
                                    Approve
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                {requests.length === 0 && (
                     <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                            No member requests pending.
                        </td>
                    </tr>
                )}
            </tbody>
         </table>
      </div>

      {/* Simple Pagination */}
      {requests.length > 0 && (
        <div className="flex items-center justify-center pt-4">
            <nav className="flex items-center gap-2">
                <button className="flex size-10 items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
                <button className="text-sm font-bold flex size-10 items-center justify-center text-white bg-primary rounded-lg shadow-sm">1</button>
                <button className="text-sm font-normal flex size-10 items-center justify-center text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">2</button>
                <span className="text-sm font-normal flex size-10 items-center justify-center text-gray-500 dark:text-gray-400">...</span>
                <button className="flex size-10 items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                </button>
            </nav>
        </div>
      )}

    </div>
  );
};

export default MemberRequests;