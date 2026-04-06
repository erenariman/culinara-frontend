'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Circle, Search, UtensilsCrossed } from 'lucide-react';

export default function OnboardingPage() {
    const router = useRouter();
    const [selectedDiets, setSelectedDiets] = useState<string[]>(['balanced']);
    const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
    const [customAllergy, setCustomAllergy] = useState('');

    const toggleDiet = (value: string) => {
        if (selectedDiets.includes(value)) {
            setSelectedDiets(selectedDiets.filter(d => d !== value));
        } else {
            setSelectedDiets([...selectedDiets, value]);
        }
    };

    const toggleAllergy = (value: string) => {
        if (selectedAllergies.includes(value)) {
            setSelectedAllergies(selectedAllergies.filter(a => a !== value));
        } else {
            setSelectedAllergies([...selectedAllergies, value]);
        }
    };

    const handleSave = () => {
        console.log('Saved Preferences:', { selectedDiets, selectedAllergies, customAllergy });
        // Navigate to dashboard or next step
        router.push('/dashboard');
    };

    return (
        <div className="bg-[#f8f6f5] dark:bg-[#221610] min-h-screen text-[#181311] dark:text-white font-sans">
            {/* Custom font loading (simulating the provided HTML head for this page context) */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700&display=swap');

                
                body {
                    font-family: 'Noto Sans', sans-serif;
                }
                h1, h2, h3, h4, h5, h6 {
                    font-family: 'Work Sans', sans-serif;
                }
            `}</style>

            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                {/* Main Layout Container */}
                <div className="flex h-full grow flex-col">
                    {/* Navbar / Header Area (Simple logo) */}
                    <header className="w-full px-6 py-4 flex justify-center border-b border-[#e6dfdb] dark:border-[#3a2e26]">
                        <div className="flex items-center gap-2">
                            <Circle className="text-[#f46a25] text-3xl" />
                            <span className="text-xl font-bold tracking-tight dark:text-white">Culinara</span>
                        </div>
                    </header>

                    <main className="flex flex-1 justify-center py-10 px-4 sm:px-6">
                        <div className="flex flex-col max-w-[960px] w-full flex-1 gap-8">
                            {/* Progress & Intro Section */}
                            <div className="flex flex-col gap-6">
                                {/* Progress Bar */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-6 justify-between items-center">
                                        <p className="text-[#8a6e60] dark:text-[#b09e94] text-sm font-medium leading-normal">Kişiselleştirme • Adım 1 / 2</p>
                                        <span className="text-xs text-[#f46a25] font-bold">50% Tamamlandı</span>
                                    </div>
                                    <div className="rounded-full bg-[#e6dfdb] dark:bg-[#3a2e26] h-2 w-full overflow-hidden">
                                        <div className="h-full bg-[#f46a25] transition-all duration-500 ease-out" style={{ width: '50%' }}></div>
                                    </div>
                                </div>
                                {/* Page Heading */}
                                <div className="flex flex-col gap-3 text-center md:text-left">
                                    <h1 className="text-[#181311] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">Mutfağınızı kişiselleştirelim</h1>
                                    <p className="text-[#8a6e60] dark:text-[#b09e94] text-lg font-normal leading-normal max-w-2xl">
                                        Size en uygun ve lezzetli tarifleri sunabilmemiz için beslenme tercihlerinizi ve alerjilerinizi seçin.
                                    </p>
                                </div>
                            </div>

                            {/* Dietary Preferences Section */}
                            <section className="flex flex-col gap-4">
                                <div className="flex items-center gap-2 px-1">
                                    <UtensilsCrossed className="text-[#f46a25]" />
                                    <h2 className="text-[#181311] dark:text-white text-xl font-bold leading-tight">Diyet Tercihleriniz</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {/* Card: Vegan */}
                                    <label className="group cursor-pointer relative">
                                        <input
                                            className="peer sr-only"
                                            name="diet"
                                            type="checkbox"
                                            value="vegan"
                                            checked={selectedDiets.includes('vegan')}
                                            onChange={() => toggleDiet('vegan')}
                                        />
                                        <div className="flex flex-col h-full bg-white dark:bg-[#2c241b] border-2 border-transparent peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25]/5 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                                            <div className="w-full aspect-video bg-cover bg-center rounded-lg mb-4 overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGC886TC-FMDK9lih0u6OPkU-gap4apjveNKa9LTlzKQBeI9YjCmBqI3ggChqgcmywLxAnbXIwaM56bw6Jwksyx0JKPSfZsMzNuP-sXc25zuWbZ0FpSNucNbCP4rXwNAuFi1hreT8ih7aC4MVUsy3y0GeGA8wbV_clOw3Pio-L_QTLIKIb8o_Q7OUgJvUsmXVE3xp4R97ix1Wwmhbiv3hXKV-MkKnxof9sCuRNQqddaIvz1VhajAtBExkbdFCXPTpYsjBV0-_TiFI')" }}>
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-[#181311] dark:text-white text-lg font-bold">Vegan</p>
                                                    <p className="text-[#8a6e60] dark:text-[#b09e94] text-sm mt-1">Sadece bitkisel kaynaklı besinler.</p>
                                                </div>
                                                <div className="w-6 h-6 rounded-full border-2 border-[#e6dfdb] dark:border-[#5c4d44] peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25] flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity absolute top-4 right-4 bg-white dark:bg-[#2c241b]">
                                                    <Circle className="text-white text-sm font-bold" />
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    {/* Card: Keto */}
                                    <label className="group cursor-pointer relative">
                                        <input
                                            className="peer sr-only"
                                            name="diet"
                                            type="checkbox"
                                            value="keto"
                                            checked={selectedDiets.includes('keto')}
                                            onChange={() => toggleDiet('keto')}
                                        />
                                        <div className="flex flex-col h-full bg-white dark:bg-[#2c241b] border-2 border-transparent peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25]/5 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                                            <div className="w-full aspect-video bg-cover bg-center rounded-lg mb-4 overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPkIeDbwxDfAm1pT1KDUSMwgqZrn-yj2BR9ZyGIBt-5alyqYSSqctACH4Oj2ZrXAnrkL5oM7n7S00FWayJN8u6ZxxtU_b8FSaH7PvIWyPQ-xbnCiVrASRH6haN3m-i8-5r4yjezLsXoBRYymWkBOk_tM0L6CoqMPZf5nQpi0J_Ds0DsT_a6S-dJbabahihfez077BEu44h58LpYoPhaEv7koU96Dw9qQib0Wh8U7RrTADpxLlp1yZvIg5gLkHErFDo0R-17heYuu8')" }}>
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-[#181311] dark:text-white text-lg font-bold">Keto</p>
                                                    <p className="text-[#8a6e60] dark:text-[#b09e94] text-sm mt-1">Yüksek yağ, düşük karbonhidrat.</p>
                                                </div>
                                                <div className="w-6 h-6 rounded-full border-2 border-[#e6dfdb] dark:border-[#5c4d44] peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25] flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity absolute top-4 right-4 bg-white dark:bg-[#2c241b]">
                                                    <Circle className="text-white text-sm font-bold" />
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    {/* Card: Paleo */}
                                    <label className="group cursor-pointer relative">
                                        <input
                                            className="peer sr-only"
                                            name="diet"
                                            type="checkbox"
                                            value="paleo"
                                            checked={selectedDiets.includes('paleo')}
                                            onChange={() => toggleDiet('paleo')}
                                        />
                                        <div className="flex flex-col h-full bg-white dark:bg-[#2c241b] border-2 border-transparent peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25]/5 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                                            <div className="w-full aspect-video bg-cover bg-center rounded-lg mb-4 overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAPJNvfcYF34UE4-HME3n-R5p37V6Q_w0eRAQswPRMTkvEyLH5n5JW2q3jujt6QQ9GB1g3-_x1FLbLwxhtsXddhNKWhkioJGCMMiY54mgobP1L3S-CG7iMIKk-qLwXTRqUge0SbMB60XhIIB0NpliYCQbTKnN_JifRBY95uwQM8hdOgC0mabrWhYDY5ftZWNKxbNFinQk4sv_-k8CfRcpJmwLaYMF-BowHEpuIgjj-hAtokVqLZUEqxqDWpMf0pjEpBX5LEIn5KZt4')" }}>
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-[#181311] dark:text-white text-lg font-bold">Paleo</p>
                                                    <p className="text-[#8a6e60] dark:text-[#b09e94] text-sm mt-1">İşlenmemiş, doğal gıdalar.</p>
                                                </div>
                                                <div className="w-6 h-6 rounded-full border-2 border-[#e6dfdb] dark:border-[#5c4d44] peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25] flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity absolute top-4 right-4 bg-white dark:bg-[#2c241b]">
                                                    <Circle className="text-white text-sm font-bold" />
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    {/* Card: Akdeniz */}
                                    <label className="group cursor-pointer relative">
                                        <input
                                            className="peer sr-only"
                                            name="diet"
                                            type="checkbox"
                                            value="mediterranean"
                                            checked={selectedDiets.includes('mediterranean')}
                                            onChange={() => toggleDiet('mediterranean')}
                                        />
                                        <div className="flex flex-col h-full bg-white dark:bg-[#2c241b] border-2 border-transparent peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25]/5 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                                            <div className="w-full aspect-video bg-cover bg-center rounded-lg mb-4 overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB795aMyGY7iqOUC-YFHRXVx7tR_EH9bjybYYd56oUcwTnBGJNeGAD2FM-UCyFEI_UvjWf8xunTf6uxNo-h2VqvVK2RNkQ3jGOUUfNiODEjjnvFRNooSVXGcHTN3FPv-IbyA6TZw-llFCZ3oQyjvKRl8ZAFKkD6gIw70YWSL4gejblY4whPaTNnL19zlOgBoPyqZPE6ugPONKMabgbJHZM00LoW0M9Y78JfMHN3EtXz12KDSQY5loFiYV2GWYJ1wKmlHdn0odPGga4')" }}>
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-[#181311] dark:text-white text-lg font-bold">Akdeniz</p>
                                                    <p className="text-[#8a6e60] dark:text-[#b09e94] text-sm mt-1">Sebze, meyve ve zeytinyağı ağırlıklı.</p>
                                                </div>
                                                <div className="w-6 h-6 rounded-full border-2 border-[#e6dfdb] dark:border-[#5c4d44] peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25] flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity absolute top-4 right-4 bg-white dark:bg-[#2c241b]">
                                                    <Circle className="text-white text-sm font-bold" />
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    {/* Card: Dengeli */}
                                    <label className="group cursor-pointer relative">
                                        <input
                                            className="peer sr-only"
                                            name="diet"
                                            type="checkbox"
                                            value="balanced"
                                            checked={selectedDiets.includes('balanced')}
                                            onChange={() => toggleDiet('balanced')}
                                        />
                                        <div className="flex flex-col h-full bg-white dark:bg-[#2c241b] border-2 border-transparent peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25]/5 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                                            <div className="w-full aspect-video bg-cover bg-center rounded-lg mb-4 overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBATUWLmQpwqsTHRYBiJx0rzCaxCGc9w9o6puoXBM25fdDcs9y6mNXYs86hQJ0v83gb-YCYUb7LYfKJ4sthFmjCLyYj5XhFHYe8QL93JwUl79OvI2YyWVYnUyCXDNvgNh4POeP0kMwBXKhZ2wst5eRj2bvkBl4izfBBLiM8oOyoJx2HeF_9QRS8_jxabexeCE9DWH7EoZFjbCIeiam61WSyKKuB17G9lhvMxqZx96yGsM34x8GQtmVuCXdU_XNKTp1muGqSqrVkuxI')" }}>
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-[#181311] dark:text-white text-lg font-bold">Dengeli</p>
                                                    <p className="text-[#8a6e60] dark:text-[#b09e94] text-sm mt-1">Her besin grubundan yeterli miktarda.</p>
                                                </div>
                                                <div className="w-6 h-6 rounded-full border-2 border-[#e6dfdb] dark:border-[#5c4d44] peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25] flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity absolute top-4 right-4 bg-white dark:bg-[#2c241b]">
                                                    <Circle className="text-white text-sm font-bold" />
                                                </div>
                                            </div>
                                        </div>
                                    </label>

                                    {/* Card: Glutensiz */}
                                    <label className="group cursor-pointer relative">
                                        <input
                                            className="peer sr-only"
                                            name="diet"
                                            type="checkbox"
                                            value="glutenfree"
                                            checked={selectedDiets.includes('glutenfree')}
                                            onChange={() => toggleDiet('glutenfree')}
                                        />
                                        <div className="flex flex-col h-full bg-white dark:bg-[#2c241b] border-2 border-transparent peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25]/5 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
                                            <div className="w-full aspect-video bg-cover bg-center rounded-lg mb-4 overflow-hidden" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDaAMaVjORMInQTyt1ZG7raoAybYSJzJGxp-hs0VkbW7wqq6HxYncFF2hv8XHHclxA48QKcATm9qLSqJNM-L72V1uf5oFKr2jO5s8mR3irtuCab2gaDSMm2omEupk39zMW65Y5ZPyMW3p0Zk_5RZSVgIOx37N76yKjbpFuqeo_pg4cKBEcod7fodlze8LMfNMmvJm73LiKC3PlFQTwRrHBewFbs9_vyGtRIj335MtxcO1S2aJPO1EaVy1C112-Zhk3taLDMKvVe4rU')" }}>
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-[#181311] dark:text-white text-lg font-bold">Glutensiz</p>
                                                    <p className="text-[#8a6e60] dark:text-[#b09e94] text-sm mt-1">Buğday ve glüten içermeyen tarifler.</p>
                                                </div>
                                                <div className="w-6 h-6 rounded-full border-2 border-[#e6dfdb] dark:border-[#5c4d44] peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25] flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity absolute top-4 right-4 bg-white dark:bg-[#2c241b]">
                                                    <Circle className="text-white text-sm font-bold" />
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </section>

                            {/* Allergies Section */}
                            <section className="flex flex-col gap-4 mt-4">
                                <div className="flex items-center gap-2 px-1">
                                    <Circle className="text-[#f46a25]" />
                                    <h2 className="text-[#181311] dark:text-white text-xl font-bold leading-tight">Alerjiler ve İstemediğiniz Malzemeler</h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {/* Allergy Items */}
                                    {[
                                        { id: 'peanut', name: 'Fıstık', icon: 'nutrition' },
                                        { id: 'milk', name: 'Süt Ürünleri', icon: 'water_drop' },
                                        { id: 'egg', name: 'Yumurta', icon: 'egg' },
                                        { id: 'fish', name: 'Deniz Ürünleri', icon: 'set_meal' },
                                        { id: 'soy', name: 'Soya', icon: 'grass' },
                                        { id: 'spicy', name: 'Acı Biber', icon: 'whatshot' },
                                    ].map((allergy) => (
                                        <label key={allergy.id} className="cursor-pointer group">
                                            <input
                                                className="peer sr-only"
                                                name="allergy"
                                                type="checkbox"
                                                value={allergy.id}
                                                checked={selectedAllergies.includes(allergy.id)}
                                                onChange={() => toggleAllergy(allergy.id)}
                                            />
                                            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white dark:bg-[#2c241b] border border-[#e6dfdb] dark:border-[#3a2e26] peer-checked:border-[#f46a25] peer-checked:bg-[#f46a25]/5 hover:border-[#f46a25]/50 transition-all gap-2 text-center h-full">
                                                <span className={`material-symbols-outlined text-3xl ${selectedAllergies.includes(allergy.id) ? 'text-[#f46a25]' : 'text-[#8a6e60] dark:text-[#b09e94]'}`}>
                                                    {allergy.icon}
                                                </span>
                                                <span className={`text-sm font-medium ${selectedAllergies.includes(allergy.id) ? 'text-[#f46a25]' : 'text-[#181311] dark:text-white'}`}>
                                                    {allergy.name}
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                {/* Custom Allergy Input */}
                                <div className="mt-2">
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Search className="text-[#8a6e60]" />
                                        </div>
                                        <input
                                            className="bg-white dark:bg-[#2c241b] border border-[#e6dfdb] dark:border-[#3a2e26] text-[#181311] dark:text-white text-sm rounded-lg focus:ring-[#f46a25] focus:border-[#f46a25] block w-full pl-10 p-4"
                                            placeholder="Başka bir alerjiniz mi var? Buraya yazın..."
                                            type="text"
                                            value={customAllergy}
                                            onChange={(e) => setCustomAllergy(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>

                    {/* Sticky Footer Action Bar */}
                    <footer className="sticky bottom-0 w-full bg-white dark:bg-[#221610]/95 backdrop-blur-sm border-t border-[#e6dfdb] dark:border-[#3a2e26] py-4 px-6">
                        <div className="max-w-[960px] mx-auto flex justify-between items-center">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="text-[#8a6e60] dark:text-[#b09e94] hover:text-[#181311] dark:hover:text-white font-medium px-4 py-2 rounded-lg transition-colors"
                                type="button"
                            >
                                Bu Adımı Atla
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-[#f46a25] hover:bg-[#f46a25]/90 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform active:scale-95"
                                type="button"
                            >
                                Kaydet ve Devam Et
                                <ArrowRight className="text-lg" />
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
