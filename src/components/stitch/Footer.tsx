'use client';

import Link from "next/link";
import React from "react";
import { useLanguage } from "../providers/language-provider";
import { Globe, Mail, Send, Share2, Utensils } from 'lucide-react';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-900 text-white py-20 px-6 lg:px-10 border-t border-gray-800">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2 text-primary group">
                            <Utensils className="group-hover:rotate-12 transition-transform" />
                            <h2 className="logo-font text-2xl tracking-tight text-white">Culinara</h2>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Gastronomi dünyasının en seçkin tariflerini, modern sunumlarla bir araya getiriyoruz. Mutfaktaki en yakın yol arkadaşınız.
                        </p>
                        <div className="flex gap-4">
                            <a className="size-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white" href="mailto:contact@culinara.com"><Mail /></a>
                            <a className="size-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white" href="https://twitter.com/culinara" target="_blank" rel="noreferrer"><Share2 /></a>
                            <a className="size-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white" href="https://culinara.com" target="_blank" rel="noreferrer"><Globe /></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Kurumsal</h4>
                        <ul className="flex flex-col gap-4 text-gray-400 text-sm">
                            <li><Link className="hover:text-white transition-colors" href="/about">{t('footer.about')}</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/contact">{t('footer.contact')}</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/marketing">Reklam Verin</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Tarifler</h4>
                        <ul className="flex flex-col gap-4 text-gray-400 text-sm">
                            <li><Link className="hover:text-white transition-colors" href="/recipes/daily">Günün Tarifi</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/recipes/special">Özel Seçkiler</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/recipes/quick">Hızlı ve Pratik</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/recipes/vegan">Vegan Lezzetler</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white">Bülten</h4>
                        <p className="text-gray-400 text-sm mb-4">Yeni tariflerden ilk siz haberdar olun.</p>
                        <div className="flex p-1 bg-gray-800 rounded-xl border border-gray-700 focus-within:border-primary transition-colors">
                            <input className="bg-transparent border-none focus:ring-0 text-sm flex-1 px-3 text-white placeholder:text-gray-500 focus:outline-none" placeholder="E-posta adresi" type="email" />
                            <button className="bg-primary hover:bg-orange-600 text-white p-2 rounded-lg transition-colors flex items-center justify-center"><Send /></button>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">© 2024 Culinara Kitchen Studio. {t('footer.rights')}</p>
                    <div className="flex gap-6 text-gray-500 text-xs font-medium">
                        <Link className="hover:text-white transition-colors" href="/privacy">{t('footer.privacy')}</Link>
                        <Link className="hover:text-white transition-colors" href="/cookies">Çerez Kullanımı</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
