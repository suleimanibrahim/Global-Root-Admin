import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

// Types
export interface DashboardStats {
    totalCommunities: number;
    totalActiveCommunities: number;
    totalInactiveCommunities: number;
    totalApprovedMembers: number;
    totalUnapprovedMembers: number;
    totalPendingRequests: number;
}

interface DashboardResponse {
    status: number;
    message: string;
    data: DashboardStats;
}

// Hooks
export const useDashboard = () => {
    // Get Dashboard Statistics
    const useDashboardStats = () => {
        return useQuery({
            queryKey: ['dashboardStats'],
            queryFn: async () => {
                const response = await api.get<DashboardResponse>('/api/v1/cms/admin/dashboard');
                console.log("Dashboard Stats", response.data);
                return response.data.data;
            },
        });
    };

    return {
        useDashboardStats,
    };
};
