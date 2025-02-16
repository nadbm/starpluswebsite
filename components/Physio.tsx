import {useLocale, useTranslations} from "next-intl";

export default function Physio() {
    const t = useTranslations('physio');
    const locale = useLocale();

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Content Box with Brand Color Background */}
                    <div className="bg-brand rounded-3xl overflow-hidden shadow-xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Image Section - Responsive Design */}
                            <div className="relative lg:h-full p-8 lg:p-0">
                                {/* Mobile Version (Circular) */}
                                <div className="block lg:hidden">
                                    <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
                                        <div className="absolute inset-0 bg-white/20 rounded-full -m-4 blur-2xl"></div>
                                        <img
                                            src="/team/chen-hao.png"
                                            alt="Chen Hao - Professional Massage Therapist"
                                            className="rounded-full w-full h-full object-cover object-top border-4 border-white/10"
                                        />
                                    </div>
                                </div>

                                {/* Desktop Version (Full Rectangle) */}
                                <div className="hidden lg:block lg:absolute lg:inset-0">
                                    <img
                                        src="/team/chen-hao.png"
                                        alt="Chen Hao - Professional Massage Therapist"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="p-8 lg:p-12 lg:pl-8">
                                <h2 className="text-4xl font-bold text-white xx:text-2xl sm:text-3xl lg:text-4xl mb-6 text-center lg:text-left">
                                    Chen Hao
                                </h2>

                                {/* Experience Badge */}
                                <div className="flex justify-center lg:justify-start">
                                    <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full mb-8">
                                        <span className="text-lg font-semibold">{t("t1")}</span>
                                    </div>
                                </div>

                                {/* Main Text */}
                                <div className="space-y-4 text-white/90">
                                    <p className="leading-relaxed">
                                        {t("t4")}
                                    </p>

                                    <p className="leading-relaxed">
                                        {t("t5")}
                                    </p>

                                    <p className="leading-relaxed">
                                        {t("t6")}
                                    </p>
                                </div>

                                {/* Credentials */}
                                <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                                    <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span className="text-white">{t("t2")}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span className="text-white">{t("t3")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}