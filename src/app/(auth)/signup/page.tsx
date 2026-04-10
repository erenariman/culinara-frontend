'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useLanguage } from '@/components/providers/language-provider';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { ArrowRight, Circle, Mail, Moon, Sun, User, UtensilsCrossed } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Şifreler eşleşmiyor!");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post('/api/v1/users/register', {
                email: formData.email,
                username: formData.username,
                password: formData.password
            });
            alert("Kayıt başarılı! Giriş yapabilirsiniz.");
            router.push('/signin');
        } catch (error: any) {
            console.error("DEBUG: Register Failed", error);
            if (error.response) {
               console.log("DEBUG: Error Data:", error.response.data);
               console.log("DEBUG: Error Status:", error.response.status);
            }
            alert("Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-800 dark:text-slate-100 h-screen overflow-hidden flex flex-col p-2 md:p-4">
            <header className="w-full max-w-[1200px] mx-auto flex justify-between items-center py-3 px-4 shrink-0">
                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <UtensilsCrossed className="text-xl" />
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Culinara</span>
                </Link>
                <div className="flex items-center gap-3">

                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-[#1a120d] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
                    >
                        {mounted ? (
                            theme === 'dark' ? (
                                <Sun className="text-[20px]" />
                            ) : (
                                <Moon className="text-[20px]" />
                            )
                        ) : (
                            <Moon className="opacity-0" />
                        )}
                    </button>
                </div>
            </header>

            <div className="w-full max-w-[1100px] mx-auto bg-white dark:bg-[#1a120d] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row flex-1 max-h-[calc(100vh-80px)] my-auto border border-slate-100 dark:border-slate-800">
                <div className="relative w-full md:w-1/2 lg:w-5/12 hidden md:block bg-gray-100 group">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" data-alt={t('auth.hero.badge')} style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcRzJ28FAl-3ychLRUDdcBLaSaJmW3065WLw9Vimbx29VqoTKIsptjLTgYiXs0UOLbfHCtkhoM9kM4-_XZsTqu-z9yoUryh_F73sxKPizoGY6WyZqz-2CgnSOWpGY5yhKslGE_Pv9hg76x3YRr_WmhlOGmJZKbGLrespGDzvQKB2-9IYfM9UV6T17AlGqvSZ5FsVtooOhKwo_o2MFF2cvkuyBsNDdLuaqyh4K8CymtH6nlq0Lf8tYQH0wzjTXKyvshpM8dMH3f3rc')" }}>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 text-white z-10">
                        <div className="mb-3 text-white bg-primary/90 backdrop-blur-md inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase">
                            {t('auth.hero.badge')}
                        </div>
                        <h2 className="text-3xl font-bold leading-tight mb-2">{t('auth.hero.title')}</h2>
                        <p className="text-white/80 text-base font-light max-w-sm">{t('auth.hero.subtitle')}</p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center p-6 lg:p-12 relative overflow-y-auto">
                    <div className="md:hidden mb-6 text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 text-primary">
                            <UtensilsCrossed className="text-2xl" />
                        </div>
                        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{t('hero.welcome')}</h1>
                    </div>
                    <div className="w-full max-w-sm mx-auto">
                        <div className="mb-4 hidden md:block text-center md:text-left">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">{t('auth.register.title')}</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{t('auth.register.subtitle')}</p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <label className="flex flex-col gap-1">
                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('auth.fullname.label')}</span>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <User style={{ fontSize: '18px' }} />
                                    </div>
                                    <input
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#2a201a] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
                                        placeholder={t('auth.fullname.placeholder')}
                                        type="text"
                                        id="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col gap-1">
                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('auth.email.label')}</span>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                        <Mail style={{ fontSize: '18px' }} />
                                    </div>
                                    <input
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#2a201a] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
                                        placeholder={t('auth.email.placeholder')}
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </label>
                            <div className="flex gap-3">
                                <label className="flex flex-col gap-1 flex-1">
                                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('auth.password.label')}</span>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                            <Circle style={{ fontSize: '18px' }} />
                                        </div>
                                        <input
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#2a201a] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
                                            placeholder="******"
                                            type="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-1 flex-1">
                                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{t('auth.password_confirm.label')}</span>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                            <Circle style={{ fontSize: '18px' }} />
                                        </div>
                                        <input
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#2a201a] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
                                            placeholder="******"
                                            type="password"
                                            id="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </label>
                            </div>
                            <div className="flex items-start gap-2 mt-0.5">
                                <div className="flex h-5 items-center">
                                    <input id="terms" name="terms" type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-primary focus:ring-primary/20 dark:bg-[#2a201a] dark:border-slate-600 dark:checked:bg-primary transition-all" required />
                                </div>
                                <div className="text-[10px] leading-tight text-slate-600 dark:text-slate-400">
                                    <label htmlFor="terms" className="font-normal">
                                        <Link href="#" className="font-bold text-primary hover:underline">{t('auth.terms.kullanim')}</Link> ve <Link href="#" className="font-bold text-primary hover:underline">{t('auth.terms.gizlilik')}</Link> {t('auth.terms.text')}{t('auth.terms.accept')}
                                    </label>
                                </div>
                            </div>
                            <button
                                className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                                type="submit"
                                disabled={isLoading}
                            >
                                <span>{isLoading ? '...' : t('auth.register.button')}</span>
                                {!isLoading && <ArrowRight style={{ fontSize: '18px' }} />}
                            </button>
                        </form>
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                                <span className="px-3 bg-white dark:bg-[#1a120d] text-slate-400">{t('auth.divider')}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-[#2a201a] transition-all group">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                </svg>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">{t('auth.google_login')}</span>
                            </button>
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
                                {t('auth.footer')}
                            </p>
                            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                                {t('auth.have_account')}
                                <Link href="/signin" className="font-bold text-primary hover:text-orange-600 transition-colors ml-1">
                                    {t('auth.signin_link')}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
