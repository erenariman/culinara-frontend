'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Global Error Caught:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-full mb-6">
                <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Beklenmeyen Bir Hata Oluştu
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
                İşleminizi gerçekleştirirken bir sorunla karşılaştık. Lütfen sayfayı yenilemeyi veya daha sonra tekrar denemeyi unutmayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                    onClick={reset} 
                    className="flex items-center gap-2"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Tekrar Dene
                </Button>
                <Link href="/">
                    <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                        <Home className="w-4 h-4" />
                        Ana Sayfaya Dön
                    </Button>
                </Link>
            </div>
        </div>
    );
}
