'use client';

import { Shell } from '@/components/layout/shell';
import { useParams } from 'next/navigation';
import { useRecipe } from '@/hooks/useRecipes';
import { useAdComment } from '@/hooks/useSocial';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Send, User } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { RecipeHero } from '@/components/stitch/RecipeHero';
import { Ingredients } from '@/components/stitch/Ingredients';
import { Instructions } from '@/components/stitch/Instructions';
import { RecipeSidebar } from '@/components/stitch/RecipeSidebar';
import { Nutrition } from '@/components/stitch/Nutrition';
import { useLanguage } from '@/components/providers/language-provider';

export default function RecipeDetailPage() {
    const { t } = useLanguage();
    const { id } = useParams() as { id: string };
    const { data: recipe, isLoading } = useRecipe(id);

    // Hooks must be called unconditionally at the top level
    const initialServings = recipe?.servings || 1;
    const [servings, setServings] = React.useState(initialServings);

    // If recipe loads or changes, reset servings to the recipe's original serving size
    React.useEffect(() => {
        if (recipe?.servings) {
            setServings(recipe.servings);
        }
    }, [recipe?.servings]);

    if (isLoading) {
        return (
            <Shell>
                <div className="flex justify-center items-center h-[50vh]">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            </Shell>
        )
    }

    if (!recipe) {
        return (
            <Shell>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('recipe.not_found')}</h2>
                    <Link href="/recipes">
                        <Button variant="ghost" className="mt-4">{t('recipe.back_to_recipes')}</Button>
                    </Link>
                </div>
            </Shell>
        )
    }

    // Only scaled for Nutrition, Ingredients remain native per user request
    const multiplier = servings / initialServings;

    // Prepare prop data safely without dynamic scaling
    const heroImage = recipe?.image_url || `https://source.unsplash.com/random/1200x800/?food,${(recipe?.title || 'food').split(' ')[0]}`;
    const ingredientItems = Array.isArray(recipe?.items)
        ? recipe.items.map((item: any) => {
            // Hide specific units like 'piece' or 'adet' for a cleaner UI (e.g., "3 eggs" instead of "3 piece eggs")
            const hiddenUnits = ['piece', 'pieces', 'adet', 'whole'];
            const unit = item.unit && !hiddenUnits.includes(item.unit.toLowerCase()) ? item.unit : '';
            return `${item.amount || ''} ${unit} ${item.ingredient_name || ''}`.replace(/\s+/g, ' ').trim();
        })
        : [];

    // Attempt to split instructions into steps safely
    let instructionSteps: { title: string, description: string }[] = [];
    const rawIns = recipe?.instructions;

    if (Array.isArray(rawIns)) {
        // Backend returned an array of strings or objects
        instructionSteps = rawIns.map((item: any, index: number) => {
            const desc = typeof item === 'string' ? item : (item?.description || item?.text || JSON.stringify(item));
            return {
                title: typeof item === 'object' && item?.title ? item.title : `${t('recipe.step_prefix') || 'Adım'} ${index + 1}`,
                description: desc
            };
        });
    } else if (typeof rawIns === 'string') {
        const strIns = rawIns as string;
        instructionSteps = strIns.split('\n').filter((line: string) => line.trim().length > 0).map((line: string, index: number) => ({
            title: `${t('recipe.step_prefix')} ${index + 1}`,
            description: line
        }));
    }

    // If split didn't result in multiple steps, treat as one
    if (instructionSteps.length === 0 && rawIns && typeof rawIns === 'string') {
        instructionSteps.push({ title: t('recipe.preparation'), description: rawIns });
    }


    return (
        <Shell>
            <RecipeHero
                title={recipe?.title || 'İsimsiz Tarif'}
                description={recipe?.description || 'Açıklama bulunmuyor.'}
                imageUrl={heroImage}
                rating={recipe?.average_rating || 4.5} // Mock or real
                reviewCount={recipe?.review_count || 0} // Mock or real
                authorName={recipe?.author_name || "Anonim"} // Mock or real
                prepTime={`${recipe?.prep_time_minutes || 0} Dk`} // Mock
                cookTime={`${recipe?.cook_time_minutes || 0} Dk`} // Mock
                calories={`${recipe?.total_calories || 0} kcal`}
                servings={initialServings}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Main Recipe Content */}
                <div className="lg:col-span-2">
                    <div className="space-y-8 bg-white dark:bg-[#2a1d17] rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                        <Ingredients
                            items={ingredientItems}
                        />
                        <div className="h-px bg-gray-100 dark:bg-gray-700 w-full transition-colors duration-300"></div>
                        <Instructions steps={instructionSteps} />
                    </div>
                    {/* Comments Section would go here, reusing the logic but styling it to match Stitch */}
                    <div className="mt-8">
                        <CommentsSection recipeId={id} />
                    </div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="flex flex-col gap-8">
                    <Nutrition
                        calories={`${((recipe?.total_calories || 0) * multiplier).toFixed(0)}`}
                        protein={`${((recipe?.total_protein || 0) * multiplier).toFixed(1).replace(/\.0$/, '')}g`}
                        carbs={`${((recipe?.total_carbs || 0) * multiplier).toFixed(1).replace(/\.0$/, '')}g`}
                        fat={`${((recipe?.total_fat || 0) * multiplier).toFixed(1).replace(/\.0$/, '')}g`}
                        servings={servings}
                        baseServings={initialServings}
                        setServings={setServings}
                    />
                    <RecipeSidebar />
                </div>
            </div>
        </Shell>
    );
}

function CommentsSection({ recipeId }: { recipeId: string }) {
    const { t } = useLanguage();
    const postComment = useAdComment(recipeId);
    const [text, setText] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        await postComment.mutateAsync(text);
        setText('');
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('comments.title')}</h3>

            <form onSubmit={handleSubmit} className="relative">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={t('comments.placeholder')}
                    className="w-full h-24 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-4 pr-12 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
                <Button
                    size="sm"
                    className="absolute bottom-3 right-3 h-8 w-8 p-0 rounded-lg"
                    type="button"
                    onClick={(e) => handleSubmit(e as any)}
                    disabled={!text.trim() || postComment.isPending}
                >
                    {postComment.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
            </form>

            <div className="space-y-4">
                {/* Mock Comments for now since backend assumes fetch separately or embedded */}
                <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <User className="h-4 w-4" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">Alice</span>
                            <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">This recipe was amazing! My family loved it.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
