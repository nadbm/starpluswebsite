export const defaultLocale = 'en';
export const locales = ['en', 'fr', 'zh'] as const;
export type Locale = typeof locales[number];

export const localeLabels: Record<Locale, string> = {
    en: 'English',
    fr: 'Français',
    zh: '中文'
} as const;

export const LANGUAGE_COOKIE = 'NEXT_LOCALE';