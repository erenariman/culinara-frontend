import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface NutritionProps {
    calories?: string;
    protein?: string;
    fat?: string;
    carbs?: string;
    servings?: number;
    baseServings?: number;
    setServings?: React.Dispatch<React.SetStateAction<number>>;
}

export function Nutrition({
    calories = "260",
    protein = "12g",
    fat = "10g",
    carbs = "30g",
    servings = 4,
    baseServings = 4,
    setServings
}: NutritionProps) {
    const options = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div className="bg-white dark:bg-[#2a1d17] rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Besin Değerleri</h3>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Porsiyon:</span>
                    <div className="relative">
                        <select
                            className="appearance-none text-sm font-semibold border border-gray-200 dark:border-gray-700/80 rounded-xl bg-white dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary pl-4 pr-10 py-2 cursor-pointer shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
                            value={servings}
                            onChange={(e) => setServings && setServings(Number(e.target.value))}
                        >
                            {options.map(opt => (
                                <option key={opt} value={opt}>
                                    {opt} Kişi {opt === baseServings ? '(Orijinal)' : ''}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <NutritionCard label="Kalori" value={calories} color="orange" />
                <NutritionCard label="Protein" value={protein} color="gray" />
                <NutritionCard label="Yağ" value={fat} color="gray" />
                <NutritionCard label="Karb." value={carbs} color="gray" />
            </div>
        </div>
    );
}

function NutritionCard({ label, value, color }: { label: string, value: string, color: 'orange' | 'gray' }) {
    const isOrange = color === 'orange';
    return (
        <div className={`${isOrange ? 'bg-orange-50 dark:bg-orange-900/10' : 'bg-gray-50 dark:bg-gray-800'} p-3 rounded-xl text-center overflow-hidden`}>
            <p className="text-[11px] sm:text-xs text-gray-500 mb-1 truncate w-full">{label}</p>
            <p className={`text-sm sm:text-base font-bold tracking-tighter leading-tight w-full ${isOrange ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>{value}</p>
        </div>
    )
}
