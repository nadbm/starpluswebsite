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
                {/* Logo and Brand Name */}
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

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    type="button"
                    className="md:hidden inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Main Navigation */}
                <div
                    className={`${
                        isMenuOpen ? 'block' : 'hidden'
                    } w-full md:block md:w-auto`}
                    id="mobile-menu"
                >
                    <ul className="flex flex-col mt-4 md:mt-0 md:flex-row md:items-center md:space-x-8 p-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-transparent">
                        <li>
                            <Link
                                href={`/${locale}`}
                                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                            >
                                {t('home')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${locale}#about`}
                                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                            >
                                {t('about')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${locale}#services`}
                                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                            >
                                {t('services')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`/${locale}#contact`}
                                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
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