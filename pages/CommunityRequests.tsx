import React, { useState } from 'react';
import { useCommunities, CommunityRequest } from '../hooks/useCommunities';
import { useAuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const CommunityRequests: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<CommunityRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { usePendingCommunityRequests, useApproveCommunity, useRejectCommunity } = useCommunities();
  const { data: requestsData, isLoading, isError } = usePendingCommunityRequests(page);
  const approveMutation = useApproveCommunity();
  const rejectMutation = useRejectCommunity();
  const { user } = useAuthContext();

  const handleViewDetails = (request: CommunityRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleApprove = (id: string) => {
    if (!user?.id) return;

    Swal.fire({
      title: 'Approve Community?',
      text: "Are you sure you want to approve this community?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate({ id, approvedBy: user.id });
      }
    });
  };

  const handleReject = (id: string) => {
    if (!user?.id) return;

    Swal.fire({
      title: 'Reject Community',
      input: 'text',
      inputLabel: 'Reason for rejection',
      inputPlaceholder: 'Enter reason...',
      showCancelButton: true,
      confirmButtonText: 'Reject',
      showLoaderOnConfirm: true,
      preConfirm: (reason) => {
        if (!reason) {
          Swal.showValidationMessage('Reason is required');
        }
        return reason;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate({ id, rejectedBy: user.id, reason: result.value });
      }
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading requests...</div>;
  }

  if (isError) {
    return <div className="text-red-500 text-center h-64">Error loading requests.</div>;
  }

  const requests = requestsData?.items || [];
  const totalPages = requestsData?.totalPages || 1;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
        <h1 className="text-gray-900 dark:text-white text-3xl font-bold tracking-tight">Pending Community Requests</h1>
      </div>

      {/* Grid of Requests */}
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Community Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Requester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Submission Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{req.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col">
                      <span>{req.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{req.location}, {req.state}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(req)}
                        className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleApprove(req.id)}
                        disabled={approveMutation.isPending || rejectMutation.isPending}
                        className="px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50"
                      >
                        {approveMutation.isPending ? '...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        disabled={approveMutation.isPending || rejectMutation.isPending}
                        className="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
                      >
                        {rejectMutation.isPending ? '...' : 'Reject'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No pending requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center pt-6">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex size-9 items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <span className="text-sm font-medium flex items-center justify-center px-3 text-gray-700 dark:text-gray-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex size-9 items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </nav>
        </div>
      )}

      {/* View Details Modal */}
      {isModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white dark:bg-surface-dark rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Request Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Community Name</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">{selectedRequest.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                    <p className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        {selectedRequest.status}
                      </span>
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">{selectedRequest.description}</p>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">Location Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">{selectedRequest.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">State</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">{selectedRequest.state}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">LGA</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">{selectedRequest.lga}</p>
                  </div>
                </div>
              </div>

              {/* Requester Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">Requester Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">{selectedRequest.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Requested By (User ID)</label>
                    <p className="text-xs text-gray-900 dark:text-white mt-1 font-mono break-all">{selectedRequest.requestedBy}</p>
                  </div>
                </div>
              </div>

              {/* System Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">System Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Request ID</label>
                    <p className="text-xs text-gray-900 dark:text-white mt-1 font-mono break-all">{selectedRequest.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Community ID</label>
                    <p className="text-xs text-gray-900 dark:text-white mt-1 font-mono">{selectedRequest.communityId || 'Not assigned yet'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">{new Date(selectedRequest.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Updated At</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">{new Date(selectedRequest.updatedAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved By</label>
                    <p className="text-xs text-gray-900 dark:text-white mt-1 font-mono">{selectedRequest.approvedBy || 'Not approved yet'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Rejection Reason</label>
                    <p className="text-base text-gray-900 dark:text-white mt-1">{selectedRequest.rejectionReason || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-surface-dark border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  closeModal();
                  handleApprove(selectedRequest.id);
                }}
                disabled={approveMutation.isPending || rejectMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  closeModal();
                  handleReject(selectedRequest.id);
                }}
                disabled={approveMutation.isPending || rejectMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CommunityRequests;