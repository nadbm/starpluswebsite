import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function UrineScreeningHero() {
    const t = useTranslations('urineScreening.hero');
    const locale = useLocale();

    return (
        <section className="relative bg-gradient-to-r from-sky-50 to-blue-50 py-20 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-white/40"></div>
            <div className="absolute top-10 right-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl"></div>
            
            <div className="relative container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-medium mb-6">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {t('badge')}
                        </div>
                        
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            {t('title')}
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            {t('description')}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href={`/${locale}/booking?service=urinalysis`}
                                className="bg-brand text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-brand/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                {t('cta')}
                            </Link>
                            <div className="flex items-center justify-center lg:justify-start text-gray-600">
                                <div className="flex items-center">
                                    <span className="text-2xl font-bold text-brand mr-2">$300</span>
                                    <span>CAD</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6">
                            <div className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 text-brand mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm">{t('diseases')}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 text-brand mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm">{t('results')}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative">
                        <div className="relative z-10">
                            <Image
                                src="/un1.png"
                                alt="Professional urine screening consultation"
                                width={600}
                                height={500}
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-brand/20 to-transparent rounded-2xl"></div>
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand rounded-2xl flex items-center justify-center shadow-lg">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
