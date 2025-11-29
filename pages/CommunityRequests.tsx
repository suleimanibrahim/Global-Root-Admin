import React, { useState } from 'react';
import { MOCK_COMMUNITY_REQUESTS } from '../constants';

const CommunityRequests: React.FC = () => {
  const [requests, setRequests] = useState(MOCK_COMMUNITY_REQUESTS);

  const handleAction = (id: string) => {
    // Simulate approval/rejection by removing item
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
       {/* Header */}
       <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
        <h1 className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight">Pending Community Requests</h1>
      </div>

      {/* Search */}
      <div className="w-full">
         <div className="flex w-full items-stretch rounded-lg h-12 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary overflow-hidden">
            <div className="flex items-center justify-center pl-4 text-gray-400 dark:text-gray-500">
              <span className="material-symbols-outlined text-xl">search</span>
            </div>
            <input 
              type="text"
              placeholder="Search by community name or requester"
              className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 h-full text-base"
            />
          </div>
      </div>

      {/* Grid of Requests (List View Style from Screenshot 5, but let's stick to the Table view from Screenshot 2 for this page specifically as per structure) */}
      {/* Correction: The user wants "Pending Community Requests" page. Screenshot 2 is a table. Screenshot 5 shows a "card/list" view for "Community Creation Requests". I will implement the Table view from Screenshot 2 as it's more data-dense and explicitly named "Pending Community Requests". */}

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Community Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Requester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submission Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{req.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{req.requesterEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{req.submissionDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                       <button 
                        onClick={() => handleAction(req.id)}
                        className="px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors shadow-sm"
                       >
                         Approve
                       </button>
                       <button 
                        onClick={() => handleAction(req.id)}
                        className="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-sm"
                       >
                         Reject
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                        No pending requests.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

       {/* Pagination */}
       {requests.length > 0 && (
        <div className="flex items-center justify-center pt-6">
            <nav className="flex items-center gap-1">
                <button className="flex size-9 items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                </button>
                <button className="text-sm font-bold flex size-9 items-center justify-center text-white bg-primary rounded-lg">1</button>
                <button className="text-sm font-medium flex size-9 items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">2</button>
                <span className="text-sm font-medium flex size-9 items-center justify-center text-gray-500 dark:text-gray-400">...</span>
                <button className="flex size-9 items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                </button>
            </nav>
        </div>
       )}

    </div>
  );
};

export default CommunityRequests;