import { useTranslations } from 'next-intl';
import { MapPin, Car, Clock, Train } from 'lucide-react';

export default function Location() {
    const t = useTranslations('location');

    const advantages = [
        {
            icon: Car,
            title: t('advantages.parking.title'),
            description: t('advantages.parking.description')
        },
        {
            icon: MapPin,
            title: t('advantages.location.title'),
            description: t('advantages.location.description')
        },
        {
            icon: Train,
            title: t('advantages.transit.title'),
            description: t('advantages.transit.description')
        },
        {
            icon: Clock,
            title: t('advantages.hours.title'),
            description: t('advantages.hours.description')
        }
    ];

    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900
                            xx:text-2xl sm:text-3xl lg:text-4xl" id="location">
                            {t('title')}
                        </h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto
                            xx:text-sm sm:text-base lg:text-lg">
                            {t('description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="bg-brand p-6 rounded-xl shadow-md">
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    {t('address.title')}
                                </h3>
                                <p className="text-white text-lg">
                                    {t('address.line1')}
                                    <br />
                                    {t('address.line2')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {advantages.map((advantage, index) => (
                                    <div key={index}
                                         className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
                                        <advantage.icon className="w-8 h-8 text-brand mb-4" />
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                            {advantage.title}
                                        </h4>
                                        <p className="text-gray-600">
                                            {advantage.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative h-[500px] rounded-xl overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.2191488464087!2d-73.59344572345285!3d45.52824937107438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91bd6b8aa2eeb%3A0x4e5e424040b8da8d!2s998%20Bd%20Saint-Laurent%2C%20Montr%C3%A9al%2C%20QC%20H2Z%201J3!5e0!3m2!1sen!2sca!4v1703905549108!5m2!1sen!2sca"
                                className="absolute inset-0 w-full h-full"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}