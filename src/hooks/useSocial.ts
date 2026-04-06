'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { CommentResponse as Comment } from '@/types';

export function useAdComment(recipeId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (text: string) => {
            const { data } = await api.post('/api/v1/social/comments', {
                recipe_id: recipeId,
                text: text
            });
            return data;
        },
        onSuccess: () => {
            // Invalidate recipe query or a specific comments query if I had one.
            // For now, I'll assume comments are embedded in recipe or fetched separately.
            // If embedded, invalidating recipe is enough.
            queryClient.invalidateQueries({ queryKey: ['recipes', recipeId] });
        }
    });
}
