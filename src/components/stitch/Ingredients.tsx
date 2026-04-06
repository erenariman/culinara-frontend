import React from 'react';

interface IngredientsProps {
    items?: string[];
}

export function Ingredients({
    items = []
}: IngredientsProps) {
    return (
        <div className="space-y-8 bg-white dark:bg-[#2a1d17] rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            {/* Ingredients Header */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Malzemeler</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {items.map((item, idx) => (
                        <IngredientItem key={idx} label={item} />
                    ))}
                </div>
            </div>

            <div className="h-px bg-gray-100 dark:bg-gray-700 w-full"></div>
        </div>
    );
}

function IngredientItem({ label }: { label: string }) {
    return (
        <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors group">
            <input className="mt-1 size-5 rounded border-gray-300 text-primary focus:ring-primary" type="checkbox" />
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white select-none">{label}</span>
        </label>
    );
}
