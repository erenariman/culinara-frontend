import React from 'react';
import { cn } from '@/lib/utils';
import {
    UtensilsCrossed,
    Clock,
    Gauge,
    Leaf,
    Flame,
    ChevronDown,
    ChevronUp,
    Filter
} from 'lucide-react';

export interface FilterState {
    category: string | null;
    dietType: string | null;
    difficulty: string | null;
    maxTime: number | null; // Total of prep + cook time in minutes
    maxCalories: number | null;
}

interface FilterSidebarProps {
    className?: string;
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    isOpen?: boolean; // Mobile toggle state
    onClose?: () => void;
}

const CATEGORIES = ['Breakfast', 'Main Course', 'Dessert', 'Appetizer', 'Salad', 'Soup', 'Drink'];
const DIET_TYPES = ['Vegan', 'Vegetarian', 'Omnivore', 'Pescatarian', 'Keto', 'Gluten-Free'];
const DIFFICULTIES = [
    { id: 'Easy', emoji: '👶', label: 'Kolay' },
    { id: 'Medium', emoji: '👨‍🍳', label: 'Orta' },
    { id: 'Hard', emoji: '🔥', label: 'Zor' },
];

const TIME_FILTERS = [
    { id: 15, label: '< 15 dk' },
    { id: 30, label: '< 30 dk' },
    { id: 60, label: '< 60 dk' },
    { id: null, label: 'Tümü' },
];

export function FilterSidebar({ className, filters, onFilterChange, isOpen, onClose }: FilterSidebarProps) {
    const [categoriesOpen, setCategoriesOpen] = React.useState(true);
    const [dietOpen, setDietOpen] = React.useState(true);

    const handleCategoryToggle = (category: string) => {
        onFilterChange({
            ...filters,
            category: filters.category === category ? null : category
        });
    };

    const handleDietToggle = (diet: string) => {
        onFilterChange({
            ...filters,
            dietType: filters.dietType === diet ? null : diet
        });
    };

    const clearFilters = () => {
        onFilterChange({
            category: null,
            dietType: null,
            difficulty: null,
            maxTime: null,
            maxCalories: null
        });
    };

    return (
        <aside
            className={cn(
                "w-full md:w-80 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212] p-6 overflow-y-auto h-[calc(100vh-73px)] sticky top-[73px]",
                !isOpen && "hidden md:block", // Hide on mobile unless open
                className
            )}
        >
            <div className="flex flex-col gap-6 h-full pb-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-gray-900 dark:text-white text-lg font-bold flex items-center gap-2">
                        <Filter className="w-5 h-5 md:hidden" />
                        Filtreler
                    </h1>
                    <button
                        onClick={clearFilters}
                        className="text-primary text-sm font-medium hover:underline"
                    >
                        Temizle
                    </button>
                    {/* Mobile Close Button */}
                    {isOpen && onClose && (
                        <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            Kapat
                        </button>
                    )}
                </div>

                {/* Categories */}
                <div className="flex flex-col gap-3">
                    <div
                        className="flex items-center justify-between group cursor-pointer"
                        onClick={() => setCategoriesOpen(!categoriesOpen)}
                    >
                        <div className="flex items-center gap-2">
                            <UtensilsCrossed className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-900 dark:text-gray-200 font-medium text-sm">Kategoriler</span>
                        </div>
                        {categoriesOpen ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                    </div>

                    {categoriesOpen && (
                        <div className="pl-8 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
                            {CATEGORIES.map((cat) => (
                                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="category_filter"
                                        checked={filters.category === cat}
                                        onChange={() => handleCategoryToggle(cat)}
                                        className="w-4 h-4 rounded-full border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/20 bg-transparent dark:bg-gray-800 cursor-pointer"
                                    />
                                    <span className="text-gray-700 dark:text-gray-300 text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{cat}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-800 w-full" />

                {/* Cooking Time */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-gray-900 dark:text-gray-200 font-medium text-sm">
                        <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        Maksimum Süre
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {TIME_FILTERS.map((time) => (
                            <button
                                key={time.label}
                                onClick={() => onFilterChange({ ...filters, maxTime: time.id })}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                                    filters.maxTime === time.id
                                        ? "bg-primary text-white shadow-sm border-primary"
                                        : "bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary border-transparent hover:border-primary/20"
                                )}
                            >
                                {time.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-800 w-full" />

                {/* Difficulty */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-gray-900 dark:text-gray-200 font-medium text-sm">
                        <Gauge className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        Zorluk
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {DIFFICULTIES.map((diff) => (
                            <button
                                key={diff.id}
                                onClick={() => onFilterChange({ ...filters, difficulty: filters.difficulty === diff.id ? null : diff.id })}
                                className={cn(
                                    "flex flex-col items-center justify-center p-2 rounded-xl transition-all border",
                                    filters.difficulty === diff.id
                                        ? "border-2 border-primary bg-primary/5 dark:bg-primary/10"
                                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] hover:border-primary/50"
                                )}
                            >
                                <span className="text-lg mb-1">{diff.emoji}</span>
                                <span className={cn(
                                    "text-xs font-medium",
                                    filters.difficulty === diff.id ? "text-primary font-bold" : "text-gray-600 dark:text-gray-400 leading-tight"
                                )}>
                                    {diff.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-800 w-full" />

                {/* Diet */}
                <div className="flex flex-col gap-3">
                    <div
                        className="flex items-center justify-between group cursor-pointer"
                        onClick={() => setDietOpen(!dietOpen)}
                    >
                        <div className="flex items-center gap-2">
                            <Leaf className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-900 dark:text-gray-200 font-medium text-sm">Diyet & Alerjen</span>
                        </div>
                        {dietOpen ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                    </div>
                    {dietOpen && (
                        <div className="pl-8 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
                            {DIET_TYPES.map((diet) => (
                                <label key={diet} className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-gray-700 dark:text-gray-300 text-sm group-hover:text-primary transition-colors">{diet}</span>
                                    <input
                                        type="radio"
                                        name="diet_filter"
                                        checked={filters.dietType === diet}
                                        onChange={() => handleDietToggle(diet)}
                                        className="w-4 h-4 rounded-full border-gray-300 dark:border-gray-600 text-primary focus:ring-primary/20 bg-transparent dark:bg-gray-800 cursor-pointer"
                                    />
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-800 w-full" />

                {/* Calories Range */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-gray-900 dark:text-gray-200 font-medium text-sm">
                        <Flame className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        Maksimum Kalori (Porsiyon Başına)
                    </div>
                    <div className="px-2">
                        <input
                            type="range"
                            min="100"
                            max="2000"
                            step="100"
                            value={filters.maxCalories || 2000}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                onFilterChange({ ...filters, maxCalories: val >= 2000 ? null : val });
                            }}
                            className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                            <span>100 kcal</span>
                            <span className="font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                                {filters.maxCalories ? `${filters.maxCalories} kcal` : 'Sınırsız'}
                            </span>
                            <span>2000+</span>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    );
}
