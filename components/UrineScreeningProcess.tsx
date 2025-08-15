import { useTranslations } from "next-intl";

export default function UrineScreeningProcess() {
    const t = useTranslations('urineScreening.process');

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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[0, 1, 2].map((index) => (
                            <div key={index} className="text-center relative">
                                <div className="bg-brand text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                                    {t(`steps.${index}.number`)}
                                </div>
                                
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-8 left-full w-full">
                                        <div className="border-t-2 border-dashed border-gray-300 w-3/4"></div>
                                    </div>
                                )}
                                
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {t(`steps.${index}.title`)}
                                </h3>
                                <p className="text-gray-600">
                                    {t(`steps.${index}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
