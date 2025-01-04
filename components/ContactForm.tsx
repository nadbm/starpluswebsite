'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';
import {ENDPOINTS} from "@/constants/api";

export default function ContactForm() {
    const t = useTranslations('contact');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(ENDPOINTS.CONTACTS.CREATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(t('errors.submission'));
            }

            setSuccess(true);
            setFormData({
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (err) {
            setError(t('errors.submission'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="bg-gray-50 py-16" id="contact">
            <div className="container px-4 mx-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900
              xx:text-2xl sm:text-3xl lg:text-4xl">
                            {t('title')}
                        </h2>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto
              xx:text-sm sm:text-base lg:text-lg">
                            {t('description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        <div className="space-y-8">
                            <div className="bg-brand p-8 rounded-xl shadow-md text-white">
                                <h3 className="text-2xl font-semibold mb-6">
                                    {t('info.title')}
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="mt-1">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{t('info.emailTitle')}</h4>
                                            <p className="mt-1">info@starpluscentre.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="mt-1">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{t('info.phoneTitle')}</h4>
                                            <p className="mt-1">(514)-447-2175</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-md">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {t('info.hoursTitle')}
                                </h3>
                                <div className="space-y-2">
                                    <p className="flex justify-between text-gray-600">
                                        <span>{t('info.timeline1')}</span>
                                        <span>9:00 AM - 8:00 PM</span>
                                    </p>
                                    <p className="flex justify-between text-gray-600">
                                        <span>{t('info.timeline2')}</span>
                                        <span>9:00 AM - 9:00 PM</span>
                                    </p>
                                    <p className="flex justify-between text-gray-600">
                                        <span>{t('info.timeline3')}</span>
                                        <span>9:00 AM - 9:00 PM</span>
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="bg-white rounded-xl shadow-lg p-8">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                                    {t('success')}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            {t('form.email')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full p-4 text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                placeholder={t('form.emailPlaceholder')}
                                                required
                                            />
                                            <Mail className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            {t('form.phone')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full p-4 text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                placeholder={t('form.phonePlaceholder')}
                                                required
                                            />
                                            <Phone className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        {t('form.subject')}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full p-4 text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                            placeholder={t('form.subjectPlaceholder')}
                                            required
                                        />
                                        <MessageSquare className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        {t('form.message')}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full p-4 text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors resize-none"
                                        placeholder={t('form.messagePlaceholder')}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full p-4 text-white rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                                        isSubmitting
                                            ? 'bg-gray-400'
                                            : 'bg-brand hover:bg-brand/90 shadow-lg hover:shadow-xl'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                                            <span>{t('form.submitting')}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>{t('form.submit')}</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}