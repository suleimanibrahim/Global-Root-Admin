import React, { useState } from 'react';
import { MOCK_COMMUNITIES } from '../constants';
import { CommunityStatus } from '../types';

const Communities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [communities, setCommunities] = useState(MOCK_COMMUNITIES);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this community?')) {
      setCommunities(prev => prev.filter(c => c.id !== id));
    }
  };

  const filteredCommunities = communities.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Manage Communities</h1>
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

        {/* Dropdowns */}
        <div className="flex items-center gap-3">
            <button className="flex h-12 items-center justify-between gap-2 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors min-w-[140px]">
                <span className="text-sm font-medium">Sort: Date</span>
                <span className="material-symbols-outlined text-gray-500">expand_more</span>
            </button>
             <button className="flex h-12 items-center justify-between gap-2 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors min-w-[140px]">
                <span className="text-sm font-medium">Status: All</span>
                <span className="material-symbols-outlined text-gray-500">expand_more</span>
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10">
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Community Name</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Creation Date</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Members</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              {filteredCommunities.map((community) => (
                <tr key={community.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{community.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{community.creationDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{community.membersCount.toLocaleString()} members</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                      community.status === CommunityStatus.Active 
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
                      <button onClick={() => handleDelete(community.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete"><span className="material-symbols-outlined text-xl">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination (Visual Only) */}
      <div className="flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-4">
         <p className="text-sm text-gray-700 dark:text-gray-400 hidden sm:block">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCommunities.length}</span> of <span className="font-medium">20</span> results
         </p>
         <div className="flex gap-2 ml-auto">
            <button className="px-4 py-2 border border-gray-300 dark:border-white/20 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-2 border border-gray-300 dark:border-white/20 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5">Next</button>
         </div>
      </div>

    </div>
  );
};

export default Communities;