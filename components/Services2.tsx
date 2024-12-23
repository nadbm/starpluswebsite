import Link from "next/link";
import {useTranslations} from "next-intl";

export default function Services2() {
    const t = useTranslations('services2');

    interface ServiceCardProps {
        title: string;
        description: string;
        image: string;
        tags: string[];
        status: string;
        href: string;
        isLast?: boolean;
    }

    const services = [
        {
            title: t('physio.title'),
            description: t('physio.description'),
            image: "/home/h1.jpg",
            tags: [t('physio.tag1'), t('physio.tag2'), t('physio.tag3')],
            status: t('available'),
            href: "/services/physiotherapy"
        },
        {
            title: t('gp.title'),
            description: t('gp.description'),
            image: "/home/h2.jpg",
            tags: [t('gp.tag1'), t('gp.tag2'), t('gp.tag3')],
            status: t('available'),
            href: "/services/gp"
        },
        {
            title: t('online.title'),
            description: t('online.description'),
            image: "/home/h3.jpg",
            tags: [t('online.tag1'), t('online.tag2')],
            status: t('available'),
            href: "/services/online"
        },
        {
            title: t('nursing.title'),
            description: t('nursing.description'),
            image: "/home/h4.jpg",
            tags: [t('nursing.tag1'), t('nursing.tag2'), t('nursing.tag3')],
            status: t('available'),
            href: "/services/nursing"
        },
        {
            title: t('massage.title'),
            description: t('massage.description'),
            image: "/home/h5.jpg",
            tags: [t('massage.tag1'), t('massage.tag2')],
            status: t('available'),
            href: "/services/massage"
        },
        {
            title: t('naturopathy.title'),
            description: t('naturopathy.description'),
            image: "/home/h6.jpg",
            tags: [t('naturopathy.tag1'), t('naturopathy.tag2')],
            status: t('available'),
            href: "/services/naturopathy"
        },
        {
            title: t('blood.title'),
            description: t('blood.description'),
            image: "/home/h7.jpg",
            tags: [t('blood.tag1'), t('blood.tag2')],
            status: t('comingSoon'),
            href: "/services/blood"
        }
    ];


    const firstRow = services.slice(0, 3);
    const secondRow = services.slice(3);


    const ServiceCard = ({title, description, image, tags, status, href, isLast}: ServiceCardProps) => (
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

            {/*    {status && (*/}
            {/*        <div className="px-6 pb-4">*/}
            {/*<span className="inline-block bg-brand rounded-full px-4 py-1 text-white font-semibold">*/}
            {/*  {status}*/}
            {/*</span>*/}
            {/*        </div>*/}
            {/*    )}*/}

            <Link
                href={href}
                className="block bg-brand hover:bg-brand/90 p-4 text-center transition-colors duration-300 mt-auto"
            >
                <span className="text-white font-semibold">{isLast ? t('comingSoon') : t('book')}</span>
            </Link>
        </div>
    );


    return (
        <>
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
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


                    <div className="grid xx:grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-6">
                        {firstRow.map((service, index) => (
                            <ServiceCard key={index} {...service} isLast={false} />
                        ))}
                    </div>


                    <div className="grid xx:grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto
                      xx:max-w-md sm:max-w-2xl md:max-w-5xl lg:max-w-7xl">
                        {secondRow.map((service, index) => (
                            <ServiceCard key={index}
                                         {...service}
                                         isLast={index === secondRow.length - 1}/>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}