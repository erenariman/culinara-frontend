import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { 
    PaginatedResponse, 
    Recipe, 
    FetchRecipesParams 
} from '@/types';

const fetchRecipes = async (params?: FetchRecipesParams): Promise<PaginatedResponse<Recipe>> => {
    try {
        const { data } = await api.get('/api/v1/recipes', { params });

        // Standardize returning the full paginated response object structure
        if (data && typeof data === 'object' && 'data' in data && 'total' in data) {
            return data as PaginatedResponse<Recipe>;
        }

        // Fallback backward-compatible structure
        return {
            data: Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []),
            total: Array.isArray(data?.data) ? data.data.length : (Array.isArray(data) ? data.length : 0),
            page: 1,
            size: 10
        };
    } catch (e) {
        console.error("FAILED TO FETCH RECIPES:", e);
        return { data: [], total: 0, page: 1, size: 10 };
    }
};

export function useRecipes(params?: FetchRecipesParams) {
    return useQuery({
        queryKey: ['recipes', params],
        queryFn: () => fetchRecipes(params),
    });
}

export function useRecipe(id: string) {
    return useQuery({
        queryKey: ['recipe', id],
        queryFn: async () => {
            const { data } = await api.get(`/api/v1/recipes/${id}`);
            return data;
        },
        enabled: !!id,
    });
}
