import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import "../globals.css";
import Navbar from "@/components/Navbar";
import { locales, Locale } from '@/i18n/settings';
import {Metadata} from "next";
import StructuredData from "@/components/StructuredData";

async function getMessages(locale: string) {
    try {
        return (await import(`@/messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }
}

export const metadata: Metadata = {
    title: 'Starplus Health Center | Comprehensive Healthcare Services in Montreal',
    description: 'Starplus Health Center offers professional healthcare services including physiotherapy, massage therapy, naturopathy, GP services, mental health support, and more. Located in Montreal, QC. Book your appointment today.',
    keywords: [
        'starplus',
        'starplus health center',
        'starplus clinic',
        'starplus medical',
        'starplus healthcare',
        'starplus health',
        'starplus health center Montreal',
        'healthcare services Montreal',
        'physiotherapy Montreal',
        'massage therapy Montreal', 
        'naturopathy Montreal',
        'general practitioner Montreal',
        'mental health services Montreal',
        'nursing services Montreal',
        'blood draw analysis Montreal',
        'pharmacy consultation Montreal',
        'nutritionist services Montreal',
        'botox services Montreal',
        'vaccine services Montreal',
        'Montreal health center',
        'healthcare clinic Montreal',
        'medical services Quebec',
        'Saint Laurent Boulevard clinic',
        'Montreal QC healthcare',
        'Starplus Health Center',
        'Starplus clinic',
        'Starplus medical',
        'Starplus healthcare',
        'sports rehabilitation Montreal',
        'orthopedic injury treatment',
        'therapeutic massage',
        'holistic healthcare',
        'preventive care Montreal',
        'family medicine Montreal',
        'online consultation Montreal',
        'medical appointment booking',
        'physiotherapist Montreal',
        'massage therapist Montreal',
        'naturopathic doctor Montreal',
        'healthcare professionals',
        'pain management Montreal',
        'injury rehabilitation',
        'stress relief therapy',
        'wellness services',
        'chronic pain treatment',
        'post surgical rehabilitation',
        'multilingual healthcare Montreal',
        'Chinese speaking doctor Montreal',
        'French healthcare services',
        
        '蒙特利尔华人诊所',
        '蒙特利尔华人医生',
        '蒙特利尔华人医院',
        '蒙特利尔星加健康中心',
        '蒙特利尔星加诊所',
        '蒙特利尔星加医疗',
        '星加健康中心',
        '星加医疗',
        '星加诊所',
        '华人诊所蒙特利尔',
        '华人医生蒙特利尔'
    ].join(', '),
    authors: [{ name: 'Starplus Health Center' }],
    creator: 'Starplus Health Center',
    publisher: 'Starplus Health Center',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_CA',
        url: 'https://starpluscentre.com',
        title: 'Starplus Health Center | Comprehensive Healthcare Services in Montreal',
        description: 'Professional healthcare services including physiotherapy, massage therapy, naturopathy, GP services, and more. Located in Montreal, QC. Book your appointment today.',
        siteName: 'Starplus Health Center',
        images: [
            {
                url: '/logo/logo.png',
                alt: 'Starplus Health Center Logo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Starplus Health Center | Comprehensive Healthcare Services in Montreal',
        description: 'Professional healthcare services including physiotherapy, massage therapy, naturopathy, GP services, and more. Located in Montreal, QC.',
        images: ['/logo/logo.png'],
        creator: '@StarplusHealth',
        site: '@StarplusHealth',
    },
    alternates: {
        canonical: 'https://starpluscentre.com',
        languages: {
            'en-CA': 'https://starpluscentre.com/en',
            'fr-CA': 'https://starpluscentre.com/fr',
            'zh-CN': 'https://starpluscentre.com/zh',
        },
    },
    category: 'Healthcare',
    classification: 'Medical Services',
    applicationName: 'Starplus Health Center',
    generator: 'Starplus',
    referrer: 'origin-when-cross-origin',
    themeColor: '#2563eb',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    icons: {
        icon: '/logo/logo.png',
        apple: '/logo/logo.png',
    },
}

export function generateStaticParams() {
    return locales.map((locale: Locale) => ({ locale }));
}

export default async function LocaleLayout({
                                               children,
                                               params: { locale }
                                           }: {
    children: React.ReactNode;
    params: { locale: Locale };
}) {

    if (!locales.includes(locale as Locale)) notFound();

    unstable_setRequestLocale(locale);
    const messages = await getMessages(locale);

    return (
        <html lang={locale} className="scroll-smooth">
        <head>
            <StructuredData locale={locale} />
            <meta name="geo.region" content="CA-QC" />
            <meta name="geo.placename" content="Montreal" />
            <meta name="geo.position" content="45.5147;-73.6137" />
            <meta name="ICBM" content="45.5147, -73.6137" />
            <meta name="business:contact_data:street_address" content="500, 998 Boul. Saint-Laurent" />
            <meta name="business:contact_data:locality" content="Montreal" />
            <meta name="business:contact_data:region" content="QC" />
            <meta name="business:contact_data:postal_code" content="H2Z 9Y9" />
            <meta name="business:contact_data:country_name" content="Canada" />
            <meta name="business:contact_data:phone_number" content="(514) 447-2175" />
            <meta name="business:contact_data:email" content="info@starpluscentre.com" />
            <meta name="business:hours" content="We-Fr 10:00-18:00, Sa-Su 10:00-13:00" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="//www.google-analytics.com" />
            <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        </head>
        <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}