import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: `/${locale}#services`, label: t('quickLinks.services') },
    { href: `/${locale}#about`, label: t('quickLinks.about') },
    { href: `/${locale}/booking`, label: t('quickLinks.booking') },
    { href: `/${locale}#contact`, label: t('quickLinks.contact') },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      text: t('contact.address'),
    },
    {
      icon: Phone,
      text: t('contact.phone'),
    },
    {
      icon: Mail,
      text: t('contact.email'),
    },
    {
      icon: Clock,
      text: t('contact.hours'),
    },
  ];

  return (
      <footer className="bg-gradient-to-br from-brand to-blue-700">
        <div className="container mx-auto px-4 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-6">
              <Link href={`/${locale}`} className="block">
                <div className="relative w-64 h-24">
                  <Image
                      src="/logo/logo.png"
                      alt={t('logoAlt')}
                      className="w-full h-full"
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                  />
                </div>
              </Link>
              <p className="text-gray-200 text-sm leading-relaxed">
                {t('description')}
              </p>
            </div>

            <div className="lg:ml-8">
              <h3 className="text-white font-semibold mb-6">{t('quickLinksTitle')}</h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                          href={link.href}
                          className="text-gray-200 hover:text-white transition-colors duration-300 flex items-center group"
                      >
                        <span className="w-2 h-2 bg-sky-200 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {link.label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-white font-semibold mb-6">{t('contactTitle')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 flex-shrink-0">
                        <info.icon className="w-5 h-5 text-sky-200" />
                      </div>
                      <span className="text-gray-200 text-sm flex-1">
                    {info.text}
                  </span>
                    </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
              <p className="text-gray-200 text-sm">
                {t('copyright', { year: currentYear })}
              </p>
            </div>
          </div>
        </div>
      </footer>
  );
}