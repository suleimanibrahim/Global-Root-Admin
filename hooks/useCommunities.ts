import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import Swal from 'sweetalert2';

// Types
export interface CommunityRequest {
    id: string;
    name: string;
    description: string;
    location: string;
    state: string;
    lga: string;
    email: string;
    requestedBy: string;
    status: string;
    createdAt: string;
}

export interface Community {
    id: string;
    name: string;
    description: string;
    location: string;
    state: string;
    lga: string;
    communityType: string;
    status: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    _count: {
        members: number;
    };
}

export interface MemberRequest {
    userId: string;
    status: string;
}

interface PendingCommunityResponse {
    status: number;
    message: string;
    data: {
        items: CommunityRequest[];
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
}

interface AllCommunitiesResponse {
    status: number;
    message: string;
    data: {
        items: Community[];
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    };
}

interface PendingMemberResponse {
    status: number;
    message: string;
    data: MemberRequest[];
}

// Hooks
export const useCommunities = () => {
    const queryClient = useQueryClient();

    // Get All Communities
    const useAllCommunities = (page = 1, pageSize = 10, name?: string) => {
        return useQuery({
            queryKey: ['allCommunities', page, pageSize, name],
            queryFn: async () => {
                const params = new URLSearchParams();
                params.append('page', page.toString());
                params.append('pageSize', pageSize.toString());
                if (name) params.append('name', name);
                const response = await api.get<AllCommunitiesResponse>(`/api/v1/cms/communities?${params.toString()}`);
                console.log("All Communities", response.data);
                return response.data.data;
            },
        });
    };

    // 1. Pending Community Requests
    const usePendingCommunityRequests = (page = 1, limit = 10) => {
        return useQuery({
            queryKey: ['pendingCommunityRequests', page, limit],
            queryFn: async () => {
                const response = await api.get<PendingCommunityResponse>(`/api/v1/cms/communities/requests/pending?page=${page}&limit=${limit}`);
                return response.data.data;
            },
        });
    };

    // 2. Approve Community Request
    const useApproveCommunity = () => {
        return useMutation({
            mutationFn: async ({ id, approvedBy }: { id: string; approvedBy: string }) => {
                const response = await api.post(`/api/v1/cms/communities/requests/${id}/approve`, { approvedBy });
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['pendingCommunityRequests'] });
                queryClient.invalidateQueries({ queryKey: ['allCommunities'] });
                Swal.fire('Success', 'Community request approved successfully', 'success');
            },
            onError: (error: any) => {
                Swal.fire('Error', error.response?.data?.message || 'Failed to approve request', 'error');
            },
        });
    };

    // 3. Reject Community Request
    const useRejectCommunity = () => {
        return useMutation({
            mutationFn: async ({ id, rejectedBy, reason }: { id: string; rejectedBy: string; reason: string }) => {
                const response = await api.post(`/api/v1/cms/communities/requests/${id}/reject`, { rejectedBy, reason });
                return response.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['pendingCommunityRequests'] });
                Swal.fire('Success', 'Community request rejected successfully', 'success');
            },
            onError: (error: any) => {
                Swal.fire('Error', error.response?.data?.message || 'Failed to reject request', 'error');
            },
        });
    };

    // 5. User's pending request to join a community (List pending members)
    // Note: The URL structure implies fetching pending members FOR a community.
    // The user provided: GET .../communities/{communityId}/members/pending?adminId=...
    const usePendingMemberRequests = (communityId: string, adminId: string) => {
        return useQuery({
            queryKey: ['pendingMemberRequests', communityId],
            queryFn: async () => {
                const response = await api.get<PendingMemberResponse>(`api/v1/cms/communities/${communityId}/members/pending?adminId=${adminId}`);
                return response.data.data;
            },
            enabled: !!communityId && !!adminId,
        });
    };

    // 6. Approve Member Request
    // User specified GET with body. Trying GET with query param first as body in GET is non-standard.
    // If API strictly expects body, we might need to use 'data' config in axios.get or switch to POST if user made a typo.
    // Given "request body" explicitly mentioned, I'll use axios.request with method GET and data.
    const useApproveMember = () => {
        return useMutation({
            mutationFn: async ({ communityId, memberId, adminId }: { communityId: string; memberId: string; adminId: string }) => {
                const response = await api.request({
                    method: 'GET',
                    url: `/communities/${communityId}/members/${memberId}/approve`,
                    data: { adminId }
                });
                return response.data;
            },
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({ queryKey: ['pendingMemberRequests', variables.communityId] });
                Swal.fire('Success', 'Member request approved successfully', 'success');
            },
            onError: (error: any) => {
                Swal.fire('Error', error.response?.data?.message || 'Failed to approve member', 'error');
            },
        });
    };

    // 7. Reject Member Request
    const useRejectMember = () => {
        return useMutation({
            mutationFn: async ({ communityId, memberId, adminId }: { communityId: string; memberId: string; adminId: string }) => {
                const response = await api.request({
                    method: 'GET',
                    url: `/communities/${communityId}/members/${memberId}/reject`,
                    data: { adminId }
                });
                return response.data;
            },
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({ queryKey: ['pendingMemberRequests', variables.communityId] });
                Swal.fire('Success', 'Member request rejected successfully', 'success');
            },
            onError: (error: any) => {
                Swal.fire('Error', error.response?.data?.message || 'Failed to reject member', 'error');
            },
        });
    };

    // 8. Remove Member
    const useRemoveMember = () => {
        return useMutation({
            mutationFn: async ({ communityId, memberId }: { communityId: string; memberId: string }) => {
                const response = await api.delete(`/communities/${communityId}/members/${memberId}`);
                return response.data;
            },
            onSuccess: () => {
                // Invalidate appropriate queries - maybe member list if we had one
                Swal.fire('Success', 'Member removed successfully', 'success');
            },
            onError: (error: any) => {
                Swal.fire('Error', error.response?.data?.message || 'Failed to remove member', 'error');
            },
        });
    };

    return {
        useAllCommunities,
        usePendingCommunityRequests,
        useApproveCommunity,
        useRejectCommunity,
        usePendingMemberRequests,
        useApproveMember,
        useRejectMember,
        useRemoveMember,
    };
};
