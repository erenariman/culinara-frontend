'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchX, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-6 relative group">
                <SearchX className="w-16 h-16 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <h1 className="text-6xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                404
            </h1>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Sayfa Bulunamadı
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8 leading-relaxed">
                Aradığınız tarife, şefe veya sayfaya şu anda ulaşılamıyor. URL'i yanlış yazmış olabilirsiniz veya sayfa kaldırılmış olabilir.
            </p>
            <Link href="/">
                <Button className="flex items-center gap-2 px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                    <Home className="w-5 h-5" />
                    Ana Sayfaya Dön
                </Button>
            </Link>
        </div>
    );
}
