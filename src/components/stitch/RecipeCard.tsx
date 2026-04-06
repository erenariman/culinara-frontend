import React, { useState } from 'react';
import Image from 'next/image';
import { Timer, Star } from 'lucide-react';
import { Heart } from 'lucide-react';

export interface RecipeCardProps {
    id: string; // Add ID for routing
    title: string;
    description: string;
    image: string;
    time: string;
    category: string;
    rating?: string | number;
    reviewCount?: number;
    chefName: string;
    calories: string;
}

export function RecipeCard({
    id,
    title,
    description,
    image,
    time,
    category,
    rating,
    reviewCount,
    chefName,
    calories,
}: RecipeCardProps) {
    const [imgSrc, setImgSrc] = useState(image);

    return (
        <article className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-neutral-200 dark:border-neutral-800 flex flex-col h-full">
            <div className="relative aspect-[4/3] overflow-hidden shrink-0">
                <Image
                    alt={title}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    src={imgSrc || 'https://images.unsplash.com/photo-1495521841653-313d97902534?w=800&auto=format&fit=crop&q=60'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => {
                        if (imgSrc !== 'https://images.unsplash.com/photo-1495521841653-313d97902534?w=800&auto=format&fit=crop&q=60') {
                            setImgSrc('https://images.unsplash.com/photo-1495521841653-313d97902534?w=800&auto=format&fit=crop&q=60');
                        }
                    }}
                />
                {/* Favori Butonu */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-neutral-400 hover:text-primary hover:bg-white transition-all z-10" onClick={(e) => { e.preventDefault(); /* mock favorite action */ }}>
                    <Heart className="text-[20px] block" />
                </button>
                {/* Süre Etiketi */}
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-md text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1 shadow-sm">
                    <Timer className="w-[14px] h-[14px] text-primary" />
                    {time}
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{category}</span>
                    {reviewCount !== undefined && reviewCount > 0 && (
                        <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-[16px] h-[16px] fill-current" />
                            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{rating}</span>
                        </div>
                    )}
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {title}
                </h3>
                <p className="text-sm text-neutral-500 line-clamp-2 mb-4 h-10">
                    {description}
                </p>

                <div className="flex items-center gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800 mt-auto">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                        {chefName.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 truncate">{chefName}</span>
                    <span className="text-xs text-neutral-300 shrink-0">•</span>
                    <span className="text-xs text-neutral-400 shrink-0">{calories} kcal</span>
                </div>
            </div>
        </article>
    );
}
