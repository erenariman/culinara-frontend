'use client';

import React, { createContext, useContext, ReactNode } from 'react';

type Language = 'tr';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    tr: {
        "nav.recipes": "Tarifler",
        "nav.popular": "Popüler",
        "nav.blog": "Blog",
        "nav.chefs": "Yazarlar",
        "nav.search_placeholder": "Tarif ara...",
        "nav.login": "Giriş Yap",
        "hero.welcome": "Hoş geldiniz!",
        "hero.title": "Bugün ne pişirelim?",
        "hero.subtitle": "Yeni tarifler keşfet veya kendi spesiyaliteni yarat.",
        "hero.cta": "Yeni Tarif Ekle",
        "stats.total_recipes": "Toplam Tarif",
        "stats.active_collections": "Aktif Koleksiyonlar",
        "stats.cooking_time": "Mutfakta Geçen Süre",
        "stats.trend_week": "+2 bu hafta",
        "stats.trend_updated": "2s önce güncellendi",
        "stats.trend_avg": "Ortalama pişirme süresi",
        "recent.title": "Son Eklenenler",
        "recent.view_all": "Tümünü Gör",
        "recipe.details": "Tarifi Görüntüle",
        "recipe.not_found": "Tarif Bulunamadı",
        "recipe.back_to_recipes": "Tariflere Dön",
        "recipe.step_prefix": "Adım",
        "recipe.preparation": "Hazırlanış",
        "recipe.difficulty.easy": "Kolay",
        "recipe.difficulty.medium": "Orta",
        "recipe.difficulty.hard": "Zor",
        "comments.title": "Yorumlar",
        "comments.placeholder": "Bu tarif hakkında düşüncelerini paylaş...",
        "comments.submit": "Gönder",
        "footer.about": "Hakkımızda",
        "footer.privacy": "Gizlilik",
        "footer.contact": "İletişim",
        "footer.rights": "Tüm hakları saklıdır.",
        "theme.dark": "Karanlık",
        "lang.tr": "Türkçe",
        "lang.en": "English",
        "create.title": "Yeni Tarif Oluştur",
        "create.steps.details": "Detaylar",
        "create.steps.ingredients": "Malzemeler",
        "create.steps.instructions": "Hazırlanış",
        "create.steps.review": "Önizleme",
        "create.details.title_label": "Tarif Başlığı",
        "create.details.title_placeholder": "Örn: Anneannemin Elmalı Tartı",
        "create.details.desc_label": "Açıklama",
        "create.details.desc_placeholder": "Bu tarif hakkında kısa bir hikaye...",
        "create.ingredients.title": "Malzemeler",
        "create.ingredients.subtitle": "malzeme eklendi",
        "create.ingredients.empty": "Listeden malzeme seçin",
        "create.instructions.title": "Hazırlanış",
        "create.instructions.subtitle": "Bu lezzetli yemeğin nasıl hazırlanacağını anlatın.",
        "create.instructions.placeholder": "Adım 1: Fırını ısıtın...",
        "create.ready.title": "Pişirmeye Hazır mısın?",
        "create.ready.subtitle": "malzeme ile",
        "create.ready.subtitle_prefix": "adlı tarifi oluşturmak üzeresin.",
        "create.buttons.next": "Sonraki Adım",
        "create.buttons.back": "Geri",
        "create.buttons.create": "Tarifi Oluştur",
        "shopping.title": "Alışveriş Listeleri",
        "shopping.subtitle": "Sütü almayı unutma!",
        "shopping.new_list_placeholder": "Yeni Liste Adı...",
        "shopping.create": "Oluştur",
        "shopping.empty": "Henüz ürün yok.",
        "shopping.add_item": "Ürün Ekle",
        "home.hero.badge": "Haftanın Yıldızı",
        "home.hero.title": "Culinara Usulü:\nKremalı Bal Kabağı Çorbası",
        "home.hero.desc": "Kışın en asil rengi tabağınızda. Zencefil ve taze muskat rendesi ile derinlik kazanan bu tarif, sofralarınızın yeni favorisi olacak.",
        "home.hero.cta_main": "Tarifi Keşfet",
        "home.hero.cta_secondary": "Listeme Ekle",
        "home.categories.title": "Popüler Kategoriler",
        "home.categories.subtitle": "Damak tadınıza en uygun lezzet grubunu seçin.",
        "home.categories.view_all": "Hepsini Gör",
        "home.categories.items.sweets": "Tatlılar",
        "home.categories.items.main": "Ana Yemek",
        "home.categories.items.practical": "Pratik",
        "home.categories.items.soups": "Çorbalar",
        "home.categories.items.bakery": "Hamur İşi",
        "home.categories.items.healthy": "Sağlıklı",
        "home.daily.title": "Günün Culinara Tarifi",
        "home.daily.badge": "Günün Özel Seçimi",
        "home.daily.recipe_name": "Akdeniz Esintili Fırında Levrek",
        "home.daily.desc": "Taze biberiye, tane karabiber ve sızma zeytinyağı ile hazırlanan bu levrek, hem formunu korumak isteyenler hem de gurme bir akşam yemeği arayanlar için ideal.",
        "home.daily.stats.prep": "Hazırlama",
        "home.daily.stats.difficulty": "Zorluk",
        "home.daily.stats.calories": "Kalori",
        "home.daily.cta_watch": "Adım Adım İzle",
        "home.featured.title": "Culinara Özel Seçkiler",
        "home.featured.subtitle": "Şeflerimizin sizler için derlediği en özel lezzet koleksiyonu.",
        "home.featured.more_cta": "Daha Fazla Lezzet Keşfet",
        "recipe.category.italian": "İtalyan",
        "recipe.category.breakfast": "Kahvaltı",
        "recipe.category.bakery": "Pastane",
        "recipe.category.grill": "Izgara",
        "hero.breadcrumbs.home": "Ana Sayfa",
        "hero.tags.popular": "Popüler",
        "hero.tags.vegetarian": "Vejetaryen",
        "hero.reviews": "Değerlendirme",
        "hero.author": "Tarif Sahibi",
        "hero.stats.prep": "Hazırlık",
        "hero.stats.cook": "Pişirme",
        "hero.stats.calories": "Kalori",
        "sidebar.save": "Tarifi Kaydet",
        "sidebar.print": "Yazdır",
        "sidebar.share": "Paylaş",
        "sidebar.rating_summary": "Puan Özeti",
        "sidebar.reviews_count": "yorum",
        "sidebar.write_review": "Yorum Yaz",
        "sidebar.related_recipes": "Benzer Tarifler",
        "auth.login.title": "Giriş Yap",
        "auth.login.subtitle": "Favori Culinara tariflerinize ve mutfak ajandanıza erişmek için giriş yapın.",
        "auth.register.title": "Hesap Oluştur",
        "auth.register.subtitle": "Yemek tutkunları topluluğumuza katılın.",
        "auth.email.label": "E-posta Adresi",
        "auth.email.placeholder": "eposta@culinara.com",
        "auth.password.label": "Şifre",
        "auth.password.placeholder": "••••••••",
        "auth.remember_me": "Beni Hatırla",
        "auth.forgot_password": "Şifremi Unuttum",
        "auth.login.button": "Giriş Yap",
        "auth.register.button": "Kayıt Ol",
        "auth.divider": "veya",
        "auth.google_login": "Google ile Giriş Yap",
        "auth.footer": "Culinara © 2024 • Mutfaktaki en iyi arkadaşınız",
        "auth.hero.title": "Mutfaktaki Yaratıcılığınızı Serbest Bırakın",
        "auth.hero.subtitle": "Culinara dünyasındaki binlerce özgün tarif ve gastronomi ipuçları ile tanışın.",
        "auth.hero.badge": "Culinara Mutfak Sanatı",
        "auth.no_account": "Hesabınız yok mu?",
        "auth.have_account": "Zaten hesabınız var mı?",
        "auth.signup_link": "Hemen Üye Olun",
        "auth.signin_link": "Giriş Yap",
        "auth.fullname.label": "Kullanıcı Adı",
        "auth.fullname.placeholder": "Benzersiz bir kullanıcı adı seçin",
        "auth.password_confirm.label": "Şifre Tekrarı",
        "auth.terms.text": " okudum, kabul ediyorum.",
        "auth.terms.kullanim": "Kullanım Koşulları'nı",
        "auth.terms.gizlilik": "Gizlilik Politikası'nı",
        "auth.terms.accept": "",
        "create.step2.title": "Adım 2: Malzemeler",
        "create.ingredients.amount": "Miktar",
        "create.ingredients.unit": "Birim",
        "create.ingredients.name": "Malzeme Adı",
        "create.ingredients.add_button": "Yeni Malzeme Ekle",
        "create.ingredients.search_placeholder": "Malzeme ara...",
        "create.step3.title": "Adım 3: Hazırlanış",
        "create.instructions.step_title": "Hazırlanış Aşamaları",
        "create.instructions.desc": "Tarifinizin yapılışını adım adım anlatın. Her adım için bir görsel veya kısa bir video ekleyerek takipçilerinize yardımcı olabilirsiniz.",
        "create.instructions.add_step": "Yeni Adım Ekle",
        "create.step4.title": "Adım 4: Önizleme ve Yayınla",
        "create.preview.edit": "Düzenle",
        "create.preview.nutrition": "Besin Değerleri",
        "create.preview.ready_title": "Her Şey Hazır!",
        "create.preview.ready_desc": "Tarifinizi toplulukla paylaşmaya bir tık uzaktasınız.",
        "create.preview.publish": "Tarifi Yayınla",
        "create.preview.publishing": "Yayınlanıyor...",
        "create.preview.save_draft": "Taslak Olarak Kaydet",
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const language: Language = 'tr';

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    const setLanguage = (_: Language) => {
        // Multi-language support disabled.
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
