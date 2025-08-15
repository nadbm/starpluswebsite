'use client';

import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const t = useTranslations('nav');
    const locale = useLocale();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <nav className="bg-brand border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">

                <Link href={`/${locale}`} className="flex items-center">
                    <div className="relative h-20 w-64">
                        <Image
                            src="/logo/logo.png"
                            alt="Starplus Logo"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </div>
                </Link>


                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    type="button"
                    className="hidden max-[1140px]:inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>


                <div
                    className={`${
                        isMenuOpen ? 'block' : 'hidden'
                    } w-full max-[1140px]:w-full max-[1140px]:mt-4 max-[1140px]:border max-[1140px]:rounded-lg max-[1140px]:bg-gray-50 max-[1140px]:p-4 min-[1141px]:block min-[1141px]:w-auto min-[1141px]:mt-0 min-[1141px]:border-0 min-[1141px]:bg-transparent min-[1141px]:p-0`}
                    id="mobile-menu"
                >
                    <ul className="flex flex-col max-[1140px]:mt-0 min-[1141px]:mt-0 min-[1141px]:flex-row min-[1141px]:items-center min-[1141px]:space-x-6 font-medium">
                        <li>
                            <Link
                                href={`/${locale}`}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 max-[1140px]:hover:bg-gray-100 min-[1141px]:hover:bg-transparent min-[1141px]:hover:text-blue-700 min-[1141px]:p-0"
                            >
                                {t('home')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${locale}#about`}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 max-[1140px]:hover:bg-gray-100 min-[1141px]:hover:bg-transparent min-[1141px]:hover:text-blue-700 min-[1141px]:p-0"
                            >
                                {t('about')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${locale}/expertise`}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 max-[1140px]:hover:bg-gray-100 min-[1141px]:hover:bg-transparent min-[1141px]:hover:text-blue-700 min-[1141px]:p-0"
                            >
                                {t('expertise')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${locale}/urine-screening`}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 max-[1140px]:hover:bg-gray-100 min-[1141px]:hover:bg-transparent min-[1141px]:hover:text-blue-700 min-[1141px]:p-0"
                            >
                                {t('urineScreening')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${locale}#services`}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 max-[1140px]:hover:bg-gray-100 min-[1141px]:hover:bg-transparent min-[1141px]:hover:text-blue-700 min-[1141px]:p-0"
                            >
                                {t('services')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${locale}#contact`}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 max-[1140px]:hover:bg-gray-100 min-[1141px]:hover:bg-transparent min-[1141px]:hover:text-blue-700 min-[1141px]:p-0"
                            >
                                {t('contact')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${locale}/booking`}
                                className="block py-2 px-4 text-white bg-blue-700 rounded hover:bg-blue-800 transition-colors duration-200"
                            >
                                {t('book')}
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <LanguageSwitcher/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}