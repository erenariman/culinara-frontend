'use client';

import Link from 'next/link';
import React from 'react';
import { useLanguage } from '../providers/language-provider';
import { Bookmark, Clock, Printer, Share2, Star, StarHalf } from 'lucide-react';

export function RecipeSidebar({ rating = 0, reviewCount = 0 }: { rating?: number, reviewCount?: number }) {
    const { t } = useLanguage();

    return (
        <div className="space-y-8">
            {/* Share & Print Actions */}
            <div className="bg-white dark:bg-[#2a1d17] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col gap-3">
                    <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-orange-600 transition-colors shadow-md shadow-primary/20">
                        <Bookmark />
                        {t('sidebar.save')}
                    </button>
                    <div className="flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <Printer />
                            {t('sidebar.print')}
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <Share2 />
                            {t('sidebar.share')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Rating Summary Widget */}
            <div className="bg-white dark:bg-[#2a1d17] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{t('sidebar.rating_summary')}</h3>
                <div className="flex flex-col gap-4">
                    <div className="flex items-end gap-3">
                        <p className="text-primary text-5xl font-black leading-none">{rating > 0 ? rating.toFixed(1) : '-'}</p>
                        <div className="flex flex-col mb-1">
                            <div className="flex gap-0.5 text-primary">
                                {/* Simplified star rendition for now */}
                                {[...Array(Math.floor(rating || 0))].map((_, i) => (
                                    <Star key={i} className="text-[18px] fill-current" />
                                ))}
                                {(rating % 1 !== 0) && <StarHalf className="text-[18px] fill-current" />}
                            </div>
                            <p className="text-gray-500 text-xs font-medium">{reviewCount} {t('sidebar.reviews_count')}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <RatingBar stars={5} percentage={78} />
                        <RatingBar stars={4} percentage={15} />
                        <RatingBar stars={3} percentage={4} />
                    </div>
                </div>
                <button className="w-full mt-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    {t('sidebar.write_review')}
                </button>
            </div>

            {/* Related Recipes */}
            <div>
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{t('sidebar.related_recipes')}</h3>
                <div className="flex flex-col gap-4">
                    <RelatedRecipeCard
                        title="BBQ Tavuklu Pizza"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuDJOqYVw84z0a9117CeIEkyCmrYm1u28kcasKZUEyezWtHzi-86JEN3PZaher0VcIOerjkmjM0Nf2TBk5saQmJe7KI-5CsQIqjv2OYqmafQfsh04JZzpZT0YZAj_L0qDb1e0-nhhSY7M_rdnGTP91NMKFPfkegE5_RTpGbkXAig5SxmJXuHMGF-UXdRZ4HpgyPkmBY7LMnyRsPU0qoYR2FGLKx9Oghe07fl_g9mQhHVdiXcoNK1y3l4TSwkGC2afP2j4QSpdsBC5XA"
                        time="35 dk"
                        difficulty="easy"
                    />
                    <RelatedRecipeCard
                        title="Klasik Margarita"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuBgv2QeGpZhdSCYm3ASQQgvSj4Ulyaf-CO0bI9Aj0hRR-nG-mCG3mySSWSOWDtdnWLjJuVW_h_BXqFw14aqhW1oDSj6iLczr_cdGlX02Z8Hl30AgaMp8G4MeKNQv3vuYjVkf7-PoLWgouU3NH9Fu4BNWcTp8iW9EuflidTc6CksR2fueWDfl0_qysbIpVBvxAxneDhOihl0JI5ss6nRw7ycRMZ-BKHTksudXUdJ0pueIhcnbV6lVjuPXW9NnHqV9ilVqL7ekB3ObvA"
                        time="40 dk"
                        difficulty="medium"
                    />
                    <RelatedRecipeCard
                        title="Mantarlı Karışık Pizza"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCTBuuYlNAS4lLIddSR2QRsDwpCP6ZTXVfp5LouglPu6aL8MvpbmFTMPoiaBCJDAed3xW_sKz5apoC6ylFiq3U3Agvsgj8hvxccVJBeTleUzb5GIMRe7gpG_Cwz91HF07dilWSQNsm_oHM7oA90PtOdYE_Pjna-uiozDAvg2BSJQa7tbITmNT0rqaH3TzRP-hR68WjFMhwiAQ--OAmdJ_5NuWeVJxvvlbqimjnPGgNvst2AV4nKL2Dc-Q_-fMzQB7Zesl2vxqGZWu0"
                        time="50 dk"
                        difficulty="hard"
                    />
                </div>
            </div>
        </div>
    );
}

function RatingBar({ stars, percentage }: { stars: number, percentage: number }) {
    return (
        <div className="flex items-center gap-2 text-xs">
            <span className="w-3 font-medium text-gray-900 dark:text-white">{stars}</span>
            <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                <div className="rounded-full bg-primary" style={{ width: `${percentage}%` }}></div>
            </div>
            <span className="w-6 text-right text-gray-500">{percentage}%</span>
        </div>
    )
}

function RelatedRecipeCard({ title, image, time, difficulty }: { title: string, image: string, time: string, difficulty: string }) {
    const { t } = useLanguage();
    return (
        <Link href="#" className="group flex gap-3 items-center bg-white dark:bg-[#2a1d17] p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors">
            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url("${image}")` }}
                ></div>
            </div>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">{title}</h4>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="text-[14px] text-primary" />
                    {time}
                    <span className="mx-1">•</span>
                    <span>{t(`recipe.difficulty.${difficulty.toLowerCase()}`)}</span>
                </div>
            </div>
        </Link>
    )
}
