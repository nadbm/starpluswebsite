import { useTranslations } from "next-intl";

export default function UrineScreeningImportance() {
    const t = useTranslations('urineScreening.importance');

    return (
        <section className="py-16 bg-gradient-to-r from-sky-50 to-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 xx:text-2xl sm:text-3xl lg:text-4xl">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto xx:text-lg sm:text-xl">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="text-center">
                            <div className="bg-brand/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {index === 0 && (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    )}
                                    {index === 1 && (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    )}
                                    {index === 2 && (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                    )}
                                    {index === 3 && (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    )}
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {t(`benefits.${index}.title`)}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {t(`benefits.${index}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
