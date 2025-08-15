import { useTranslations } from "next-intl";

export default function UrineScreeningDiseases() {
    const t = useTranslations('urineScreening.diseases');

    return (
        <section className="py-16 bg-gradient-to-r from-sky-50 to-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 xx:text-2xl sm:text-3xl lg:text-4xl">
                        {t('title')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto xx:text-lg sm:text-xl">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-brand hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-brand rounded-full mr-4 flex-shrink-0"></div>
                                    <span className="text-gray-800 font-medium text-base">
                                        {t(`conditions.${index}`)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <div className="bg-brand/10 rounded-xl p-8 inline-block">
                            <p className="text-brand font-semibold text-xl">
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
