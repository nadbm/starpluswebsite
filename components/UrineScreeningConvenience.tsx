import { useTranslations } from "next-intl";

export default function UrineScreeningConvenience() {
    const t = useTranslations('urineScreening.convenience');

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

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {[0, 1, 2].map((index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="text-center">
                                    <div className="bg-brand/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {index === 0 && (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                            )}
                                            {index === 1 && (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            )}
                                            {index === 2 && (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            )}
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        {t(`options.${index}.title`)}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t(`options.${index}.description`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
