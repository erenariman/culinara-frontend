'use client';

import React from 'react';
import Link from 'next/link';
import { Star, StarHalf } from 'lucide-react';
import { useLanguage } from '../providers/language-provider';
import { ChefHat, Clock, Flame, Heart, Users } from 'lucide-react';

interface RecipeHeroProps {
    title?: string;
    description?: string;
    imageUrl?: string;
    rating?: number;
    reviewCount?: number;
    authorName?: string;
    authorImage?: string;
    prepTime?: string;
    cookTime?: string;
    calories?: string;
    servings?: number;
}

export function RecipeHero({
    title = "",
    description = "",
    imageUrl = "",
    rating = 0,
    reviewCount = 0,
    authorName = "Culinara Chef",
    authorImage = "",
    prepTime = "45 Dk",
    cookTime = "15 Dk",
    calories = "320 kcal",
    servings = 1
}: RecipeHeroProps) {
    const { t } = useLanguage();

    return (
        <>
            {/* Breadcrumbs */}
            <nav className="flex mb-6 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/" className="hover:text-primary transition-colors">{t('hero.breadcrumbs.home')}</Link>
                <span className="mx-2">/</span>
                <Link href="/recipes" className="hover:text-primary transition-colors">{t('nav.recipes')}</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 dark:text-white font-medium">{title}</span>
            </nav>

            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Left: Hero Image */}
                <div className="w-full relative group">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md">
                        <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
                            style={{ backgroundImage: `url("${imageUrl}")` }}
                        >
                        </div>
                    </div>
                    <button className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 p-2 rounded-full shadow hover:text-primary transition-colors text-gray-600 dark:text-gray-200">
                        <Heart />
                    </button>
                </div>

                {/* Right: Recipe Overview */}
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-900/30 px-2.5 py-0.5 text-xs font-medium text-primary">
                            {t('hero.tags.popular')}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                            {t('hero.tags.vegetarian')}
                        </span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                        {title}
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                        {description}
                    </p>

                    {/* Rating & Reviews */}
                    {reviewCount > 0 && (
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                            <div className="flex items-center text-primary">
                                <span className="text-2xl font-bold mr-2 text-gray-900 dark:text-white">{rating}</span>
                                {[...Array(5)].map((_, i) => {
                                    const starValue = i + 1;
                                    const isFull = rating >= starValue;
                                    const isHalf = !isFull && rating >= starValue - 0.5;
                                    const isEmpty = !isFull && !isHalf;

                                    if (isHalf) {
                                        return <StarHalf key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />;
                                    } else if (isFull) {
                                        return <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />;
                                    } else {
                                        return <Star key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600" />;
                                    }
                                })}
                            </div>
                            <span className="text-gray-400">|</span>
                            <a href="#reviews" className="text-sm font-medium text-gray-500 hover:text-primary underline decoration-dotted">{reviewCount} {t('hero.reviews')}</a>
                        </div>
                    )}

                    {/* Author */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 rounded-full overflow-hidden bg-gray-200">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url("${authorImage}")` }}
                            ></div>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{authorName}</p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-[#2a1d17] border border-gray-100 dark:border-gray-800 shadow-sm">
                            <Users className="text-primary mb-1" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Porsiyon</span>
                            <span className="font-bold text-gray-900 dark:text-white mt-1">{servings}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-[#2a1d17] border border-gray-100 dark:border-gray-800 shadow-sm">
                            <Clock className="text-primary mb-1" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide">{t('hero.stats.prep')}</span>
                            <span className="font-bold text-gray-900 dark:text-white mt-1">{prepTime}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-[#2a1d17] border border-gray-100 dark:border-gray-800 shadow-sm">
                            <ChefHat className="text-primary mb-1" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide">{t('hero.stats.cook')}</span>
                            <span className="font-bold text-gray-900 dark:text-white mt-1">{cookTime}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-[#2a1d17] border border-gray-100 dark:border-gray-800 shadow-sm">
                            <Flame className="text-primary mb-1" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide">{t('hero.stats.calories')}</span>
                            <span className="font-bold text-gray-900 dark:text-white mt-1">{calories}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
