import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function AcupunctureHero() {
    const t = useTranslations('acupuncture.hero');
    const locale = useLocale();

    return (
        <section className="relative bg-white py-12 sm:py-16 md:py-20 lg:py-40 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-slate-50"></div>
            <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-brand/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[250px] sm:w-[350px] lg:w-[500px] h-[250px] sm:h-[350px] lg:h-[500px] bg-gray-100/50 rounded-full blur-3xl"></div>
            
            <div className="relative container mx-auto px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    <div className="text-center lg:text-left order-2 lg:order-1">
                        <div className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 bg-brand/10 text-brand rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 lg:mb-8 border border-brand/20">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {t('badge')}
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 leading-tight tracking-tight">
                            {t('title')}
                        </h1>
                        
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {t('description')}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8 lg:mb-10">
                            <Link
                                href={`/${locale}/acupuncture-form`}
                                className="bg-brand text-white px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl text-base font-bold hover:bg-brand/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                {t('cta')}
                            </Link>
                            <div className="flex items-center justify-center lg:justify-start bg-gray-50 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border border-gray-200">
                                <div className="flex items-center">
                                    <span className="text-xl sm:text-2xl font-bold text-brand mr-2">$100</span>
                                    <span className="text-gray-600 font-medium text-sm">CAD</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8">
                            <div className="flex items-center text-gray-600">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs sm:text-sm">{t('feature1')}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-brand mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs sm:text-sm">{t('feature2')}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative order-1 lg:order-2">
                        <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-brand/20 to-transparent rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl"></div>
                        <div className="relative z-10">
                            <Image
                                src="/home/ap1.jpg"
                                alt="Professional acupuncture treatment"
                                width={700}
                                height={600}
                                priority
                                className="rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white w-full h-auto"
                            />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
