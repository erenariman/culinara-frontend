'use client';

import React, { useState, useMemo } from 'react';
import { useRecipes } from '@/hooks/useRecipes';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { RecipeCard } from '@/components/stitch/RecipeCard';
import { FilterSidebar, FilterState } from '@/components/stitch/FilterSidebar';
import { useLanguage } from '@/components/providers/language-provider';
import { Shell } from '@/components/layout/shell';
import { Filter, UtensilsCrossed } from 'lucide-react';

export default function RecipesPage() {
    const { t } = useLanguage();
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('newest'); // default API order mapped to 'newest' usually
    const [search, setSearch] = useState('');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const [filters, setFilters] = useState<FilterState>({
        category: null,
        dietType: null,
        difficulty: null,
        maxTime: null,
        maxCalories: null
    });

    // Transform local filter states to API params
    const queryParams = useMemo(() => {
        const params: Record<string, string | number> = {
            page,
            limit: 9, // Let's show 9 items per page for a nice 3x3 grid
        };

        if (search) params.q = search;

        // Map single filter values to the backend query params
        if (filters.category) params.category = filters.category;
        if (filters.difficulty) params.difficulty = filters.difficulty;
        if (filters.dietType) params.diet_type = filters.dietType;
        if (filters.maxTime) params.max_prep_time = filters.maxTime; // Warning: Frontend meant prep+cook but backend uses max_prep_time.

        // Sort mapping
        if (sortBy === 'newest') {
            params.sort_by = 'created_at';
            params.order = 'desc';
        } else if (sortBy === 'popular') {
            params.sort_by = 'average_rating';
            params.order = 'desc';
        } else if (sortBy === 'time_asc') {
            params.sort_by = 'prep_time_minutes';
            params.order = 'asc';
        }

        return params;
    }, [page, search, filters, sortBy]);

    const { data: paginatedData, isLoading } = useRecipes(queryParams);
    const recipes = paginatedData?.data || [];
    const totalRecords = paginatedData?.total || 0;
    const limit = 9;
    const totalPages = Math.ceil(totalRecords / limit) || 1;

    // Reset to page 1 when filters or search change
    React.useEffect(() => {
        setPage(1);
    }, [search, filters, sortBy]);


    return (
        <Shell>
            <div className="flex-grow layout-container flex flex-col md:flex-row h-full">
                {/* Sidebar Filters */}
                <FilterSidebar
                    filters={filters}
                    onFilterChange={setFilters}
                    isOpen={isMobileFilterOpen}
                    onClose={() => setIsMobileFilterOpen(false)}
                />

                {/* Main Content Area */}
                <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-gray-50 dark:bg-[#1a110c] min-h-screen">
                    {/* Mobile Filter Toggle */}
                    <div className="md:hidden mb-6">
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-[#221610] p-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-medium shadow-sm"
                        >
                            <Filter />
                            Filtreleri Göster
                        </button>
                    </div>

                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {t('nav.recipes') || 'Lezzetleri Keşfet'}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                Mutfağınızda harikalar yaratmanız için {totalRecords} tarif bulundu.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 whitespace-nowrap hidden sm:inline">Sırala:</span>
                                <select
                                    className="form-select bg-white dark:bg-[#221610] border-none ring-1 ring-gray-200 dark:ring-gray-800 rounded-lg text-sm text-gray-900 dark:text-white py-2 pl-3 pr-8 focus:ring-2 focus:ring-primary cursor-pointer w-full sm:w-auto"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="newest">En Yeni</option>
                                    <option value="popular">En Popüler</option>
                                    <option value="time_asc">Süre: Azdan Çoğa</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar - Optional addition since search state was here */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Tariflerde ara..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full sm:max-w-md px-4 py-2 bg-white dark:bg-[#221610] border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
                            {recipes.map((recipe) => (
                                <Link href={`/recipes/${recipe.id}`} key={recipe.id} className="block transition-transform hover:-translate-y-1">
                                    <RecipeCard
                                        id={recipe.id}
                                        title={recipe.title}
                                        description={recipe.description}
                                        image={recipe.image_url || `https://source.unsplash.com/random/800x600/?food,${recipe.title.split(' ')[0]}`}
                                        time={`${(recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0)} dk`}
                                        category={recipe.category || 'Diğer'}
                                        rating={recipe.average_rating ? recipe.average_rating.toFixed(1).replace(/\.0$/, '') : '0'}
                                        reviewCount={recipe.review_count || 0}
                                        chefName={recipe.author_name || 'Anonim'}
                                        calories={recipe.total_calories > 0 ? recipe.total_calories.toString() : '0'}
                                    />
                                </Link>
                            ))}
                            {recipes.length === 0 && (
                                <div className="col-span-full py-20 text-center flex flex-col items-center justify-center bg-white dark:bg-[#221610] rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-10">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                                        <UtensilsCrossed className="text-3xl text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Tarif Bulunamadı</h3>
                                    <p className="text-gray-500 mb-6 max-w-sm">Filtrelerinize veya aramanıza uygun tarif bulunamadı. Filtreleri temizlemeyi deneyin.</p>
                                    <button
                                        onClick={() => {
                                            setFilters({ category: null, dietType: null, difficulty: null, maxTime: null, maxCalories: null });
                                            setSearch('');
                                        }}
                                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-md"
                                    >
                                        Filtreleri Temizle
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {!isLoading && totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 pb-20 pt-8">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 bg-white dark:bg-[#221610] border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm font-medium"
                            >
                                Önceki
                            </button>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Sayfa {page} / {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(Math.min(totalPages, page + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 bg-white dark:bg-[#221610] border border-gray-200 dark:border-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm font-medium"
                            >
                                Sonraki
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Shell>
    );
}
