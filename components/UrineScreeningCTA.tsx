import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function UrineScreeningCTA() {
    const t = useTranslations('urineScreening.cta');
    const locale = useLocale();

    return (
        <section className="py-16 bg-gradient-to-r from-brand to-brand/80">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-white mb-6 xx:text-2xl sm:text-3xl lg:text-4xl">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto xx:text-lg sm:text-xl">
                        {t('description')}
                    </p>
                    
                    <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                        <Link
                            href={`/${locale}/urine-screening-form`}
                            className="bg-white text-brand px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition duration-300 inline-block"
                        >
                            {t('button')}
                        </Link>
                    </div>
                    
                    <p className="text-white/80 mt-6 font-medium">
                        {t('urgent')}
                    </p>
                </div>
            </div>
        </section>
    );
}
