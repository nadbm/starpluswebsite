import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { User } from "lucide-react";

export default function Expertise() {
    const t = useTranslations('expertise');
    const locale = useLocale();

    const professionals = [
        {
            image: "/team/sunqi.png",
            name: t('professionals.qi.name'),
            title: t('professionals.qi.title'),
            description: t('professionals.qi.description'),
            expertise: [
                t('professionals.qi.expertise.0'),
                t('professionals.qi.expertise.1'),
                t('professionals.qi.expertise.2')
            ],
            bio: t('professionals.qi.bio')
        },
        {
            image: "/team/ch1.png",
            name: t('professionals.chen.name'),
            title: t('professionals.chen.title'),
            description: t('professionals.chen.description'),
            expertise: [
                t('professionals.chen.expertise.0'),
                t('professionals.chen.expertise.1'),
                t('professionals.chen.expertise.2')
            ],
            bio: t('professionals.chen.bio')
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900
                            xx:text-2xl sm:text-3xl lg:text-4xl">
                            {t('sectionTitle')}
                        </h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto
                            xx:text-sm sm:text-base lg:text-lg">
                            {t('sectionDescription')}
                        </p>
                    </div>

                    <div className="space-y-20">
                        {professionals.map((professional, index) => (
                            <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 items-center`}>
                                <div className="lg:w-2/5">
                                    <div className="relative w-full aspect-square rounded-full overflow-hidden bg-gray-100 border-8 border-white shadow-xl">
                                        <img
                                            src={professional.image}
                                            alt={professional.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="lg:w-3/5 space-y-6">
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-900">{professional.name}</h3>
                                        <p className="text-xl text-brand font-medium mt-1">{professional.title}</p>
                                    </div>

                                    <p className="text-gray-700 text-lg">{professional.description}</p>

                                    <div className="flex flex-wrap gap-3 py-2">
                                        {professional.expertise.map((skill, idx) => (
                                            <span key={idx} className="bg-brand/10 text-brand px-4 py-2 rounded-full text-sm font-medium">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-gray-700">{professional.bio}</p>

                                    <Link href={`/${locale}/booking`}
                                          className="inline-block bg-brand hover:bg-brand/90 text-white px-6 py-3 rounded-lg transition-colors duration-300 mt-4 font-medium">
                                        {t('bookNow')}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        </section>
    );
}