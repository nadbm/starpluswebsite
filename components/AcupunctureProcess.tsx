import { useTranslations } from "next-intl";

export default function AcupunctureProcess() {
    const t = useTranslations('acupuncture.process');

    const steps = [
        {
            number: "01",
            title: t('step1.title'),
            description: t('step1.description')
        },
        {
            number: "02",
            title: t('step2.title'),
            description: t('step2.description')
        },
        {
            number: "03",
            title: t('step3.title'),
            description: t('step3.description')
        },
        {
            number: "04",
            title: t('step4.title'),
            description: t('step4.description')
        }
    ];

    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 tracking-tight">
                            {t('title')}
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-brand/30">
                                <div className="flex items-start flex-col sm:flex-row">
                                    <div className="flex-shrink-0 mb-4 sm:mb-0">
                                        <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-brand to-brand/80 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                                            {step.number}
                                        </div>
                                    </div>
                                    <div className="sm:ml-6 lg:ml-8">
                                        <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
