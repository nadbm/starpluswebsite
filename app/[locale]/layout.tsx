import { unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import "../globals.css";
import Navbar from "@/components/Navbar";
import { locales, Locale } from '@/i18n/settings';

async function getMessages(locale: string) {
    try {
        return (await import(`@/messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }
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
    // Validate locale
    if (!locales.includes(locale as Locale)) notFound();

    unstable_setRequestLocale(locale);
    const messages = await getMessages(locale);

    return (
        <html lang={locale} className="scroll-smooth">
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