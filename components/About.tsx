import {useLocale, useTranslations} from "next-intl";
import Link from "next/link";

export default function About() {
    const t = useTranslations('about');
    const locale = useLocale();
    return (
        <>
            <section className="bg-sky-50 dark:from-gray-900 dark:to-gray-800" id="about">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">

                        <div className="max-w-xl mx-auto lg:mx-0">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white
                    xx:text-2xl xs:text-3xl sm:text-4xl lg:text-4xl xl:text-5xl">
                                {t('title')}
                            </h2>

                            <span className="mt-4 block w-32 h-1 bg-brand"></span>

                            <p className="mt-6 text-gray-700 dark:text-gray-300
                    xx:text-sm xs:text-base sm:text-lg lg:text-lg
                    leading-relaxed">
                                {t('description1')}
                            </p>

                            <p className="mt-4 text-gray-700 dark:text-gray-300
                    xx:text-sm xs:text-base sm:text-lg lg:text-lg
                    leading-relaxed">
                                {t('description2')}
                            </p>

                            <div className="mt-8">
                                <Link href={`/${locale}#location`}
                                   className="inline-flex items-center bg-brand text-white rounded-md
                        xx:px-4 xx:py-2 xx:text-sm
                        sm:px-6 sm:py-3 sm:text-base
                        lg:px-8 lg:py-4 lg:text-lg
                        transition-all duration-300 hover:bg-brand/90 shadow-lg hover:shadow-xl">
                                    {t('learnMore')}
                                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M9 5l7 7-7 7"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-w-3 aspect-h-2 lg:aspect-h-3">
                                <img
                                    src="/patient.jpeg"
                                    alt={t('imageAlt')}
                                    className="rounded-xl object-cover shadow-2xl
                        xx:rounded-lg sm:rounded-xl lg:rounded-2xl
                        hover:shadow-3xl transition-shadow duration-300"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 -z-10 h-24 w-24 rounded-full bg-brand/20"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}