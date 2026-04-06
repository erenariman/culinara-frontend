export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    size: number;
}

export interface RecipeItem {
    ingredient_name: string;
    amount: number;
    unit: string;
    calculated_grams: number;
    calculated_calories: number;
}

export interface Recipe {
    id: string;
    title: string;
    description: string;
    status: 'draft' | 'published' | 'archived';
    category?: string;
    diet_type?: string;
    difficulty?: string;
    prep_time_minutes?: number;
    cook_time_minutes?: number;
    servings?: number;
    instructions: { step_number: number; text: string }[];
    items: RecipeItem[];
    total_calories: number;
    total_protein?: number;
    total_carbs?: number;
    total_fat?: number;
    total_cost: number;
    image_url?: string;
    average_rating?: number;
    review_count?: number;
    author_name?: string;
}

export interface FetchRecipesParams {
    page?: number;
    limit?: number;
    category?: string;
    difficulty?: string;
    diet_type?: string;
    max_prep_time?: number;
    search?: string;
    sort_by?: string;
    order?: 'asc' | 'desc';
}

export interface Ingredient {
    id: string;
    name: string;
    unit_type: string;
    calories_per_100g?: number;
    protein_per_100g?: number;
    carbs_per_100g?: number;
    fat_per_100g?: number;
    avg_price_per_100g?: number;
    avg_weight_per_piece_g?: number;
    density_g_ml?: number;
}

export interface CommentResponse {
    id: string;
    recipe_id: string;
    user_id: string;
    author_name?: string;
    text: string;
    created_at: string;
}
