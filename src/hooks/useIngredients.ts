import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Ingredient } from '@/types';

const fetchIngredients = async (): Promise<Ingredient[]> => {
    const { data } = await api.get('/api/v1/ingredients/');
    return data;
};

export function useIngredients() {
    return useQuery({
        queryKey: ['ingredients'],
        queryFn: fetchIngredients,
    });
}
