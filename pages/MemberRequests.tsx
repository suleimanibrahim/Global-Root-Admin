import React from 'react';
import { useCommunities } from '../hooks/useCommunities';
import { useAuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const MemberRequests: React.FC = () => {
    const { user } = useAuthContext();
    // Assumption: adminId is used as communityId based on the provided API example where they were identical.
    // In a real app, we would fetch the admin's community ID first.
    const communityId = user?.id || '';

    const { usePendingMemberRequests, useApproveMember, useRejectMember } = useCommunities();
    const { data: requests, isLoading, isError } = usePendingMemberRequests(communityId, user?.id || '');
    const approveMutation = useApproveMember();
    const rejectMutation = useRejectMember();

    const handleApprove = (memberId: string) => {
        if (!user?.id) return;
        approveMutation.mutate({ communityId, memberId, adminId: user.id });
    };

    const handleReject = (memberId: string) => {
        if (!user?.id) return;
        rejectMutation.mutate({ communityId, memberId, adminId: user.id });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading requests...</div>;
    }

    if (isError) {
        return <div className="text-red-500 text-center h-64">Error loading requests. Please ensure you are an admin of a community.</div>;
    }

    const memberRequests = requests || [];

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">

            {/* Heading */}
            <div>
                <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Pending Member Join Requests</h1>
            </div>

            {/* List Table */}
            <div className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-surface-dark shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            <th className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm font-medium w-2/5">User ID</th>
                            <th className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm font-medium w-2/5">Status</th>
                            <th className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {memberRequests.map((req) => (
                            <tr key={req.userId} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="text-gray-800 dark:text-gray-200 text-sm font-normal">{req.userId}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm font-normal">{req.status}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => handleReject(req.userId)}
                                            disabled={rejectMutation.isPending || approveMutation.isPending}
                                            className="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                                        >
                                            {rejectMutation.isPending ? '...' : 'Reject'}
                                        </button>
                                        <button
                                            onClick={() => handleApprove(req.userId)}
                                            disabled={rejectMutation.isPending || approveMutation.isPending}
                                            className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-50"
                                        >
                                            {approveMutation.isPending ? '...' : 'Approve'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {memberRequests.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                    No member requests pending.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MemberRequests;