import React, { useState, useEffect } from 'react';
import { useCommunities } from '../hooks/useCommunities';

const Communities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const { useAllCommunities } = useCommunities();
  const { data: communitiesData, isLoading, isError } = useAllCommunities(page, 10, debouncedSearch);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to page 1 when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto flex justify-center items-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading communities...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-7xl mx-auto flex justify-center items-center h-64">
        <div className="text-red-500">Error loading communities. Please try again.</div>
      </div>
    );
  }

  const communityList = communitiesData?.items || [];
  const totalPages = communitiesData?.totalPages || 1;
  const totalItems = communitiesData?.totalItems || 0;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Manage Communities</h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">{totalItems} total communities</span>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="flex w-full items-stretch rounded-lg h-12 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 focus-within:ring-2 focus-within:ring-primary/50 overflow-hidden">
            <div className="flex items-center justify-center pl-4 text-gray-400 dark:text-gray-500">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              type="text"
              placeholder="Search by community name..."
              className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-500 px-4 h-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10">
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Community Name</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Members</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              {communityList.map((community) => (
                <tr key={community.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{community.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{community.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {community.communityType.replace('SYSTEM_', '').replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{community._count.members.toLocaleString()} members</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${community.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                      }`}>
                      {community.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-gray-400 hover:text-primary transition-colors" title="View"><span className="material-symbols-outlined text-xl">visibility</span></button>
                      <button className="text-gray-400 hover:text-primary transition-colors" title="Edit"><span className="material-symbols-outlined text-xl">edit</span></button>
                    </div>
                  </td>
                </tr>
              ))}
              {communityList.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    {searchTerm ? `No communities found matching "${searchTerm}"` : 'No communities found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-white/10">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Page {page} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Communities;