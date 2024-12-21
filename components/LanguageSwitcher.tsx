'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const languageFlags = {
    en: (
        <svg className="w-5 h-5 rounded-full me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 3900 3900">
            <path fill="#b22234" d="M0 0h7410v3900H0z"/>
            <path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" strokeWidth="300"/>
            <path fill="#3c3b6e" d="M0 0h2964v2100H0z"/>
        </svg>
    ),
    fr: (
        <svg className="h-3.5 w-3.5 rounded-full me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#fff" d="M0 0h512v512H0z"/>
            <path fill="#00267f" d="M0 0h170.7v512H0z"/>
            <path fill="#f31830" d="M341.3 0H512v512H341.3z"/>
        </svg>
    ),
    zh: (
        <svg className="h-3.5 w-3.5 rounded-full me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="#de2910" d="M0 0h512v512H0z"/>
            <path fill="#ffde00" d="M123 103l-6 18 16-12h-20l16 12zM108 147l5 17-15-10h19l-15-10zM107 199l5 18-14-11h19l-15-11zM125 248l-5 18 14-11h-19l15-11zM156 278l-14 12 19 1-17 9 10 15z"/>
        </svg>
    ),
};

const languageNames = {
    en: 'English',
    fr: 'Français',
    zh: '中文'
};

export default function LanguageSwitcher() {
    const router = useRouter();
    const params = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const currentLocale = params?.locale as string || 'en';

    const switchLanguage = (newLocale: string) => {
        const newPathname = window.location.pathname.replace(`/${currentLocale}`, `/${newLocale}`);
        router.push(newPathname);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Language Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-gray-100"
            >
                {languageFlags[currentLocale as keyof typeof languageFlags]}
                {languageNames[currentLocale as keyof typeof languageNames]}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow">
                    <ul className="py-2 font-medium">
                        {Object.entries(languageNames).map(([locale, name]) => (
                            <li key={locale}>
                                <button
                                    onClick={() => switchLanguage(locale)}
                                    className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <div className="inline-flex items-center">
                                        {languageFlags[locale as keyof typeof languageFlags]}
                                        {name}
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}