import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface UserProfile {
    id: string;
    email: string;
    username: string;
    profile?: {
        bio?: string;
        avatar_url?: string;
    };
}

export function useUser() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
            setIsLoaded(true);
        }
    }, []);

    const { data: user, isLoading, error, refetch } = useQuery<UserProfile>({
        queryKey: ['user-me'],
        queryFn: async () => {
            const response = await api.get('/api/v1/users/me');
            // api.ts interceptor unwraps the data field
            return response.data;
        },
        enabled: !!token,
        retry: false,
    });

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        router.push('/signin');
        // Optional: clear query cache
    };

    return {
        user,
        isLoading: isLoading || !isLoaded,
        isAuthenticated: !!token,
        isLoaded,
        logout,
        refetchUser: refetch
    };
}
