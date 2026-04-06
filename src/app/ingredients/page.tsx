'use client';

import { useState } from 'react';
import { Shell } from '@/components/layout/shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIngredients } from '@/hooks/useIngredients';
import { Search, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IngredientsPage() {
    const { data: ingredients, isLoading, isError, error } = useIngredients();
    const [search, setSearch] = useState('');

    const filteredIngredients = ingredients?.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Shell>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Malzeme Kilerim</h1>
                    <p className="text-muted-foreground">Malzeme koleksiyonunuzu ve besin verilerini görüntüleyin.</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6 max-w-md">
                <Input
                    placeholder="Malzemelerde ara..."
                    icon={<Search className="h-4 w-4" />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Ingredients Grid */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center py-20 text-red-500">
                    <p className="text-lg font-bold">Malzemeler yüklenirken hata oluştu</p>
                    {/* @ts-ignore - accessing axios error details */}
                    <p className="text-sm text-muted-foreground">{error?.response?.data?.message || error?.message || "Bilinmeyen bir hata oluştu"}</p>
                    {/* @ts-ignore */}
                    {error?.response?.data?.error && <pre className="text-xs mt-2 bg-slate-900 p-2 rounded text-red-300 overflow-auto max-w-lg">{error.response.data.error}</pre>}
                    <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Tekrar Dene</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredIngredients?.map((ingredient) => (
                        <Card key={ingredient.id} hoverEffect className="bg-slate-800/40 border-slate-700/50">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg text-white">{ingredient.name}</CardTitle>
                                    <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                                        {ingredient.calories_per_100g} kcal
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mt-2">
                                    <div className="flex flex-col items-center p-2 rounded bg-white/5">
                                        <span className="font-bold text-slate-300">{ingredient.protein_per_100g}g</span>
                                        <span>Prot</span>
                                    </div>
                                    <div className="flex flex-col items-center p-2 rounded bg-white/5">
                                        <span className="font-bold text-slate-300">{ingredient.carbs_per_100g}g</span>
                                        <span>Karbon</span>
                                    </div>
                                    <div className="flex flex-col items-center p-2 rounded bg-white/5">
                                        <span className="font-bold text-slate-300">{ingredient.fat_per_100g}g</span>
                                        <span>Yağ</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {filteredIngredients?.length === 0 && (
                        <div className="col-span-full text-center py-10 text-muted-foreground">
                            Malzeme bulunamadı.
                        </div>
                    )}
                </div>
            )}
        </Shell>
    );
}
