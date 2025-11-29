import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

interface LoginResponse {
    status: string;
    statusCode: string;
    message: string;
    token: string;
    role: string;
    id: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

export const useAuth = () => {
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const response = await api.post<LoginResponse>('/api/v1/auth/login', credentials);
            return response.data;
        },
        onSuccess: (data) => {
            login(data.token, { id: data.id, role: data.role, email: '' }); // Email is not returned in response, might need to store from input or fetch profile
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: data.message,
                timer: 1500,
                showConfirmButton: false,
            }).then(() => {
                // Navigate to dashboard after alert closes
                navigate('/');
            });
        },
        onError: (error: any) => {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response?.data?.message || 'An error occurred during login',
            });
        },
    });

    return {
        login: loginMutation.mutate,
        isLoading: loginMutation.isPending,
    };
};
