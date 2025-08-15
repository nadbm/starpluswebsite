import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function UrineScreeningPricing() {
    const t = useTranslations('urineScreening.pricing');
    const locale = useLocale();

    return (
        <section className="py-16 bg-gradient-to-r from-sky-50 to-blue-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 xx:text-2xl sm:text-3xl lg:text-4xl">
                        {t('title')}
                    </h2>
                    
                    <div className="bg-white rounded-3xl p-10 shadow-2xl border-t-4 border-brand">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-medium mb-4">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" clipRule="evenodd" />
                                </svg>
{t('badge')}
                            </div>
                            <div className="text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
                                {t('price')}
                            </div>
                            <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
                                {t('description')}
                            </p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                            <h4 className="text-xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                                <svg className="w-6 h-6 mr-2 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t('includesTitle')}
                            </h4>
                            <div className="grid sm:grid-cols-1 gap-4">
                                {[0, 1, 2, 3, 4].map((index) => (
                                    <div key={index} className="flex items-start bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                                        <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 font-medium">{t(`includes.${index}`)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <Link
                                href={`/${locale}/urine-screening-form`}
                                className="bg-brand text-white px-12 py-4 rounded-xl text-lg font-semibold hover:bg-brand/90 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {t('button')}
                            </Link>
                            <p className="text-sm text-gray-500 mt-4">{t('footer')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
