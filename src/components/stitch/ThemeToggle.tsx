'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="p-2 rounded-full text-gray-400">
                <div className="size-5" />
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="size-9 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-300 flex items-center justify-center"
            aria-label="Toggle theme"
        >
            {resolvedTheme === 'dark' ? (
                <Moon className="size-5 transition-all" />
            ) : (
                <Sun className="size-5 transition-all" />
            )}
        </button>
    );
}
