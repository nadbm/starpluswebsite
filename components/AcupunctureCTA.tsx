import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function AcupunctureCTA() {
    const t = useTranslations('acupuncture.cta');
    const locale = useLocale();

    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-r from-brand to-brand/90 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                        {t('description')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                        <Link
                            href={`/${locale}/acupuncture-form`}
                            className="bg-white text-brand px-8 sm:px-10 lg:px-12 py-4 sm:py-5 rounded-lg sm:rounded-xl text-base sm:text-lg font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl sm:shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                        >
                            {t('button')}
                        </Link>
                        <a
                            href="tel:514-447-2175"
                            className="bg-transparent border-2 sm:border-3 border-white text-white px-8 sm:px-10 lg:px-12 py-4 sm:py-5 rounded-lg sm:rounded-xl text-base sm:text-lg font-bold hover:bg-white hover:text-brand transition-all duration-300 shadow-lg sm:shadow-xl"
                        >
                            {t('callButton')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
