'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useLanguage } from '../providers/language-provider';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Moon, Search, Sun, User, Utensils } from 'lucide-react';
import { useUser } from '@/hooks/useUser';

export function Navbar() {
    const { t } = useLanguage();
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md px-6 lg:px-10 py-4 transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-2 text-primary group">
                        <Utensils className="group-hover:rotate-12 transition-transform" />
                        <h1 className="logo-font text-2xl tracking-tight text-gray-900 dark:text-white">Culinara</h1>
                    </Link>
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link href="/recipes" className={cn(
                            "text-sm font-semibold transition-colors pb-0.5",
                            pathname.startsWith('/recipes') ? "text-gray-900 dark:text-white border-b-2 border-primary" : "text-gray-500 dark:text-gray-400 hover:text-primary"
                        )}>
                            {t('nav.recipes')}
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-3 md:gap-6">
                    {/* Arama butonu geçici olarak kaldırıldı */}



                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="flex items-center justify-center rounded-full size-10 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {mounted ? (
                                theme === 'dark' ? (
                                    <Sun />
                                ) : (
                                    <Moon />
                                )
                            ) : (
                                <Moon className="opacity-0" />
                            )}
                        </button>

                        {mounted && <UserMenu />}
                    </div>
                </div>
            </div>
        </header>
    );
}

function UserMenu() {
    const { user, isAuthenticated, logout, isLoading, isLoaded } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    if (!isLoaded || (isAuthenticated && isLoading)) {
        return (
            <div className="size-10 rounded-full bg-gray-100/50 dark:bg-gray-800/50 animate-pulse" />
        );
    }

    if (!isAuthenticated) {
        return (
            <Link href="/signin" className="flex items-center justify-center rounded-full size-10 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:scale-105 transition-transform shadow-lg shadow-gray-900/20 dark:shadow-white/20">
                <User />
            </Link>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
                <div className="hidden md:block text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{user?.username}</p>
                </div>
                <div className="size-9 rounded-full bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 group-hover:scale-105 transition-transform">
                    {user?.username ? user.username.charAt(0).toUpperCase() : <User size={18} />}
                </div>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#1a120d] border border-gray-100 dark:border-gray-800 shadow-2xl z-20 overflow-hidden py-2 animate-in fade-in zoom-in duration-200">
                        <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800/50 mb-1">
                            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t('nav.popular') || 'Profil'}</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.email}</p>
                        </div>
                        
                        <Link 
                            href="/profile" 
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="size-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                                <User size={16} />
                            </div>
                            <span className="font-medium">Profilim</span>
                        </Link>
                        
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                logout();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        >
                            <div className="size-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            <span className="font-bold">Çıkış Yap</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
