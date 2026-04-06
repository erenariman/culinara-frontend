'use client';

import React from 'react';
import Image from 'next/image';
import { Shell } from '@/components/layout/shell';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { ArrowRight, Bookmark, Circle, Heart, Timer } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();

  return (
    <Shell>
      <section className="mt-8">
        <div className="relative min-h-[500px] lg:min-h-[600px] rounded-[2rem] overflow-hidden flex flex-col justify-end p-8 lg:p-16 shadow-2xl group">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDy-mPLcIiW2AD0oKSSwEwGYim9EtbaVwtDJ7XIUj3YXBDItlWdkH4tkxwS6oGxqqIIIj_ps7axZWe9b9ZZQAwrwZ1uZDgMpESQaEmXzwTE_nJeYSmhr9e4yhgVpNtmNHRlJtw52FgwYXJEZURyVHH8L7CLUflTusRuwiK1SbZin2fJqVMIvVTfZuQmY65RpKPr6qQemIV3_JjAfuLrr5SkFX93Td0C0bqqKvyHG1_3qglEexs1tb2u0Zvh3Sq1bhDCCDEL6ku0N70")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6">
              <span className="size-2 bg-accent rounded-full animate-pulse"></span>
              {t('home.hero.badge')}
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 drop-shadow-lg font-display whitespace-pre-line">
              {t('home.hero.title')}
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-medium mb-10 max-w-xl leading-relaxed">
              {t('home.hero.desc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/recipes/1" className="bg-primary hover:bg-orange-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-orange-900/40 flex items-center gap-3">
                {t('home.hero.cta_main')}
                <ArrowRight />
              </Link>
              <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-10 py-4 rounded-full font-bold text-lg transition-all border border-white/30">
                {t('home.hero.cta_secondary')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 font-display">{t('home.categories.title')}</h2>
            <p className="text-gray-500 dark:text-gray-400">{t('home.categories.subtitle')}</p>
          </div>
          <Link href="/categories" className="text-primary font-bold flex items-center gap-1 group">
            {t('home.categories.view_all')}
            <Circle className="text-lg group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <CategoryCard icon="cake" title={t('home.categories.items.sweets')} color="text-primary" bg="bg-orange-50 dark:bg-orange-900/20" />
          <CategoryCard icon="restaurant" title={t('home.categories.items.main')} color="text-green-600" bg="bg-green-50 dark:bg-green-900/20" />
          <CategoryCard icon="bolt" title={t('home.categories.items.practical')} color="text-red-600" bg="bg-red-50 dark:bg-red-900/20" />
          <CategoryCard icon="soup_kitchen" title={t('home.categories.items.soups')} color="text-blue-600" bg="bg-blue-50 dark:bg-blue-900/20" />
          <CategoryCard icon="bakery_dining" title={t('home.categories.items.bakery')} color="text-yellow-600" bg="bg-yellow-50 dark:bg-yellow-900/20" />
          <CategoryCard icon="eco" title={t('home.categories.items.healthy')} color="text-purple-600" bg="bg-purple-50 dark:bg-purple-900/20" />
        </div>
      </section>

      <section className="mt-24">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 font-display">{t('home.daily.title')}</h2>
        <div className="flex flex-col lg:flex-row items-stretch bg-white dark:bg-[#1e1e1e] rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="w-full lg:w-1/2 min-h-[400px] relative overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9DxnE6XnV_bxNqBih21Q8vf2OOJH8gw7rtTkl9GIiA3tnXu7kI1SqZN82SaZMlrvvMGWNX0o2env21xReofz5MKRuEwcNFl33AaT7h_tJnK2wIecqr6E6RQOt5R7JzeALh4QQPBzJ40zYRdXE25yDnvAJzWN_lmS2J_Ywo5oesd1wt48xurHyuq94AqLC9ZKow7UpjEJ0oEShBN7wOuLvrUFJNMAAoKvOWLsMppBFw7Nffs7STtVFEDd82hfz5eR97YFlrzN2pf0")' }}
            ></div>
          </div>
          <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest mb-4">
              <Circle className="text-xl" />
              {t('home.daily.badge')}
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 font-display">{t('home.daily.recipe_name')}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
              {t('home.daily.desc')}
            </p>
            <div className="grid grid-cols-3 gap-6 py-8 border-y border-gray-100 dark:border-gray-800 mb-10">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t('home.daily.stats.prep')}</p>
                <p className="font-bold text-gray-900 dark:text-gray-200">40 Dk</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t('home.daily.stats.difficulty')}</p>
                <p className="font-bold text-gray-900 dark:text-gray-200">Orta</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase mb-1">{t('home.daily.stats.calories')}</p>
                <p className="font-bold text-gray-900 dark:text-gray-200">320 Kcal</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/recipes/2" className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-2xl hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-colors flex items-center justify-center">
                {t('home.daily.cta_watch')}
              </Link>
              <button className="size-14 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Bookmark />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 pb-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 font-display">{t('home.featured.title')}</h2>
            <p className="text-gray-500 dark:text-gray-400">{t('home.featured.subtitle')}</p>
          </div>
          <div className="flex gap-3">
            <button className="size-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Circle />
            </button>
            <button className="size-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Circle />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <RecipeCard
            title="Margarita Pizza"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAx7XZeqgdHO9niQoanBY21ViSNvfmhHdlnoADr30xskCVhC61e7uWOnbaHLBZDtb-puGmAqEPFPMeQ_3aqJ8ULGUWN4P7REKPqvZUhs2E0Z8t73CaKGNGC8fVUVFYCaGS_TLjFHfQpwyBYso3QAf4OqLXQWtgPpBB9XVoHNEiYFFqIuaAwkKcppyyNlWsXOW5QDYHmka0_Jz6hf9vF4eg4gx28CcXG1lKSdhPTYkIH6CUfL-ZqTI7VP4im3lyi_AQS56rn4b97Aic"
            category={t('recipe.category.italian')}
            time="25 DK"
          />
          <RecipeCard
            title="Avokadolu Tost"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDSODOe4hx4Exdh3xLSCMxGEn-PWsvwElnB8jUQc5zEOaBH0h614n1trksBogp4jTzPGo_gmeN13QmaMRLkz5vBzSOhQXViIBAQiXUr7KJXzyWWryqCkOJzuX0D1VFxoSb1Y4DKZj2BPgk53lLXtrSfciTE8focMnrr3Up9KjOO5Vs0jizxdC4qHtSQqd25aRoo7yXYeUUyWzBd3qnY1FCX_BYHZsZ08qscKC-NizB-xmJ_K8LwFqeXiewBMkvv2gwSDR-OT53QBZs"
            category={t('recipe.category.breakfast')}
            time="15 DK"
          />
          <RecipeCard
            title="Çilekli Rüzgar Pastası"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCrVMHOD0mEHnuvVxvnRfN6VlOTIz59yfWzlUGsn4EGvVcXov4ppzEfQJteX0j-P0lbIyntUBhMu4bhwnVMu89PS6K3E7IF-kXi28PyurrrrREdb7N9Vbzi_haE6-SCPbdZZmpeDcgxiklQWoPgFVvA_6eBaiwciSImKXV49jx9yFbzmd_5aFxos8zdKyIeW-6yw-6hre0W7jz0AUmF61Iq1gXuXD3sEaknzYb9roSKDP12nUHYpZ6ECWMvXEDYeQlq0wEJW86KmOg"
            category={t('recipe.category.bakery')}
            time="60 DK"
          />
          <RecipeCard
            title="Gurme Dana Burger"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBnwFzWcFZMAEhcY22haUUZ-YfFxt6G42dH0Js9iBCNSbVbo9caSagUccVf-SyBJPcauicBqtJmChyaF__DSowC88F7q09trEJS8lscrsWFK7kLLBGOF55aDrZw16VTfGqHim9ATbyrC_SjH4l96zJ5eLpPkudee-ucy_RHr0kWPdSwNLGnAtHFAHHTT3Jj8D6zh3Ux5ZjaDx-9YGJ0y2XBBSyovB_7qMN3pbzO3Tff1EGz2LkuJ4IbMdemVd7HarnPDTjaHD1BrpI"
            category={t('recipe.category.grill')}
            time="35 DK"
          />
        </div>
        <div className="mt-16 text-center">
          <Link href="/recipes" className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-12 py-5 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
            {t('home.featured.more_cta')}
            <Circle />
          </Link>
        </div>
      </section>
    </Shell>
  );
}

function CategoryCard({ icon, title, color, bg }: { icon: string, title: string, color: string, bg: string }) {
  return (
    <a href="#" className="group flex flex-col items-center p-8 bg-[#fafafa] dark:bg-[#1e1e1e] rounded-[2rem] hover:bg-white dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-700 shadow-sm hover:shadow-xl">
      <div className={`size-20 rounded-full ${bg} flex items-center justify-center ${color} mb-4 group-hover:scale-110 transition-transform`}>
        <Circle />
      </div>
      <span className="font-bold text-gray-800 dark:text-gray-200">{title}</span>
    </a>
  )
}

function RecipeCard({ title, image, category, time }: { title: string, image: string, category: string, time: string }) {
  return (
    <article className="group cursor-pointer">
      <div className="relative rounded-[2rem] overflow-hidden aspect-[3/4] mb-4">
        <Image alt={title} className="object-cover transition-transform duration-500 group-hover:scale-110" src={image} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        <div className="absolute top-4 right-4">
          <button className="size-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:text-red-500 transition-colors">
            <Heart />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
          <div className="flex justify-between items-center text-white mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest">{category}</span>
            <div className="flex items-center gap-1 text-[10px] font-bold">
              <Timer className="text-xs" /> {time}
            </div>
          </div>
          <h4 className="text-white font-bold truncate">{title}</h4>
        </div>
      </div>
    </article>
  )
}
