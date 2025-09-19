import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";

export default function Services2() {
    const t = useTranslations('services2');
    const locale = useLocale();

    interface ServiceCardProps {
        title: string;
        description: string;
        image: string;
        tags: string[];
        status: string;
        href: string;
    }

    const services = [
        {
            title: t('urinalysis.title'),
            description: t('urinalysis.description'),
            image: "/home/h16.jpg",
            tags: [t('urinalysis.tag1'), t('urinalysis.tag2')],
            status: t('available'),
            href: `/${locale}/urine-screening`
        },
        {
            title: t('blood.title'),
            description: t('blood.description'),
            image: "/home/h7.jpg",
            tags: [t('blood.tag1'), t('blood.tag2')],
            status: t('available'),
            href: `/${locale}/booking`
        },
        {
            title: t('physio.title'),
            description: t('physio.description'),
            image: "/home/h1.jpg",
            tags: [t('physio.tag1'), t('physio.tag3')],
            status: t('available'),
            href: `/${locale}/booking`
        },
        {
            title: t('gp.title'),
            description: t('gp.description'),
            image: "/home/h2.jpg",
            tags: [t('gp.tag1'), t('gp.tag2')],
            status: t('available'),
            href: `/${locale}/booking`
        },
        {
            title: t('online.title'),
            description: t('online.description'),
            image: "/home/h3.jpg",
            tags: [t('online.tag1'), t('online.tag2')],
            status: t('available'),
            href: `/${locale}/booking`
        },
        {
            title: t('nursing.title'),
            description: t('nursing.description'),
            image: "/home/h4.jpg",
            tags: [t('nursing.tag1'), t('nursing.tag2')],
            status: t('available'),
            href: `/${locale}/booking`
        },
        {
            title: t('massage.title'),
            description: t('massage.description'),
            image: "/home/h5.jpg",
            tags: [t('massage.tag1'), t('massage.tag2')],
            status: t('available'),
            href: `/${locale}/booking`
        },
        {
            title: t('naturopathy.title'),
            description: t('naturopathy.description'),
            image: "/home/h6.jpg",
            tags: [t('naturopathy.tag1'), t('naturopathy.tag2')],
            status: t('available'),
            href: `/${locale}/booking`
        },
        {
            title: t('social.title'),
            description: t('social.description'),
            image: "/home/h8.jpg",
            tags: [t('social.tag1'), t('social.tag2')],
            status: t('available'),
            href: `/${locale}/booking`
        },
        {
            title: t('allergy.title'),
            description: t('allergy.description'),
            image: "/home/h18.jpg",
            tags: [t('allergy.tag1'), t('allergy.tag2')],
            status: t('available'),
            href: `/${locale}/booking`
        },
        {
            title: t('nutritionist.title'),
            description: t('nutritionist.description'),
            image: "/home/h10.png",
            tags: [t('nutritionist.tag1'), t('nutritionist.tag2')],
            status: t('comingSoon'),
            href: `/${locale}/booking`
        },
        {
            title: t('tcm.title'),
            description: t('tcm.description'),
            image: "/home/h17.png",
            tags: [t('tcm.tag1'), t('tcm.tag2')],
            status: t('available'),
            href: `/${locale}/booking`
        },
        {
            title: t('botox.title'),
            description: t('botox.description'),
            image: "/home/h11.png",
            tags: [t('botox.tag1'), t('botox.tag2')],
            status: t('comingSoon'),
            href: `/${locale}/booking`
        },
        {
            title: t('lungScreening.title'),
            description: t('lungScreening.description'),
            image: "/home/h19.jpg",
            tags: [t('lungScreening.tag1'), t('lungScreening.tag2')],
            status: t('available'),
            href: `/${locale}/booking`
        },
        {
            title: t('mental.title'),
            description: t('mental.description'),
            image: "/home/h9.jpg",
            tags: [t('mental.tag1'), t('mental.tag2')],
            status: t('available'),
            href: `/${locale}/booking`
        },
        {
            title: t('vaccine.title'),
            description: t('vaccine.description'),
            image: "/home/h15.jpg",
            tags: [t('vaccine.tag1'), t('vaccine.tag2')],
            status: t('available'),
            href: `/${locale}/booking`
        },
    ];

    const firstRow = services.slice(0, 4);
    const secondRow = services.slice(4);

    const ServiceCard = ({title, description, image, tags, status, href}: ServiceCardProps) => (
        <div
            className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl bg-white dark:bg-gray-800 flex flex-col">
            <img
                className="w-full h-48 object-cover"
                src={image}
                alt={title}
            />

            <div className="px-6 pt-4">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                    {title}
                </h3>

                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-brand/10 text-brand rounded-full px-3 py-1 text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="px-6 py-4 flex-grow">
                <p className="text-gray-600 dark:text-gray-300">
                    {description}
                </p>
            </div>

            <Link
                href={href}
                className={`block ${status === t('comingSoon') ? 'bg-gray-400 hover:bg-gray-600' : 'bg-brand hover:bg-brand/90'} p-4 text-center transition-colors duration-300 mt-auto`}
            >
                <span className="text-white font-semibold">
                    {status === t('comingSoon') ? t('comingSoon') : t('book')}
                </span>
            </Link>
        </div>
    );

    return (
        <>
            <section className="py-16 bg-gray-50 dark:bg-gray-900" id="services">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white
                            xx:text-2xl sm:text-3xl lg:text-4xl">
                            {t('sectionTitle')}
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto
                            xx:text-sm sm:text-base lg:text-lg">
                            {t('sectionSubtitle')}
                        </p>
                    </div>

                    <div className="grid xx:grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        {firstRow.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>

                    <div className="grid xx:grid-cols-1 md:grid-cols-4 gap-6">
                        {secondRow.map((service, index) => (
                            <ServiceCard
                                key={index}
                                {...service}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}