'use client';

import {useLocale, useTranslations} from "next-intl";
import Link from "next/link";

export default function VideoBanner() {
    const locale = useLocale();
    const t = useTranslations('hero');
    return (
        <>
            <div className="w-full relative">
                <div className="w-full h-160 relative overflow-hidden">
                    <video
                        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
                        autoPlay loop muted playsInline>
                        <source src="/video/HC.mp4" type="video/mp4"/>
                        Your browser does not support video tag
                    </video>
                </div>

                <div
                    className="absolute top-0 left-0 w-full h-full z-30 bg-gradient-to-b from-blue-500/30 via-blue-800/40 to-blue-900/50 dark:from-blue-800/40 dark:via-blue-900/50 dark:to-blue-950/60">
                </div>

                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-7xl mx-auto px-4">
                    <div className="text-white text-center flex flex-col">
                        <h1 className="font-bold tracking-wide
                xx:text-2xl xx:mb-3
                xs:text-3xl xs:mb-4
                sm:text-4xl sm:mb-5
                md:text-5xl md:mb-6
                lg:text-6xl lg:mb-8
                xl:text-7xl xl:mb-10">
                            {t('title')}
                        </h1>

                        <p className="leading-relaxed max-w-4xl mx-auto
                xx:text-sm xx:mb-4
                xs:text-base xs:mb-5
                sm:text-lg sm:mb-6
                md:text-xl md:mb-8
                lg:text-2xl lg:mb-10
                xl:text-3xl xl:mb-12">
                            {t('description')}
                        </p>
                    </div>

                    <div className="flex items-center justify-center space-x-4">
                        <Link href={`/${locale}/booking`} className="rounded-md text-white transition-all duration-300
                            xx:text-sm xx:px-4 xx:py-2
                            xs:text-base xs:px-5 xs:py-2.5
                            sm:text-lg sm:px-6 sm:py-3
                            md:text-xl md:px-7 md:py-3.5
                            lg:text-2xl lg:px-8 lg:py-4
                            bg-brand hover:bg-brand/90 shadow-lg hover:shadow-xl">
                            {t('cta.book')}
                        </Link>

                        <Link href={`/${locale}#about`} className="rounded-md text-white transition-all duration-300
                            xx:text-sm xx:px-4 xx:py-2
                            xs:text-base xs:px-5 xs:py-2.5
                            sm:text-lg sm:px-6 sm:py-3
                            md:text-xl md:px-7 md:py-3.5
                            lg:text-2xl lg:px-8 lg:py-4
                            bg-blue-800 hover:bg-blue-700 shadow-lg hover:shadow-xl">
                            {t('cta.learn')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}