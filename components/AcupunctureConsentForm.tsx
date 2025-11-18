'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Shield, CheckCircle, FileText, ArrowRight } from 'lucide-react';

interface AcupunctureConsentFormProps {
    onConsent: () => void;
}

const AcupunctureConsentForm: React.FC<AcupunctureConsentFormProps> = ({ onConsent }) => {
    const t = useTranslations('acupunctureForm.consent');
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isChecked) {
            onConsent();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex justify-center items-center mb-4">
                            <div className="bg-brand p-3 rounded-full">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('title')}
                        </h1>
                        <div className="w-24 h-1 bg-brand mx-auto rounded-full"></div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-brand to-brand/90 px-6 py-4">
                            <div className="flex items-center text-white">
                                <FileText className="w-6 h-6 mr-3" />
                                <h2 className="text-xl font-semibold">{t('title')}</h2>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 space-y-6">
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <div key={num} className="border-l-2 border-gray-300 pl-4">
                                        <p className="text-gray-700 leading-relaxed">
                                            {t(`precautions.${num}`)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="font-semibold text-gray-900 mb-3">
                                    {t('declaration.title')}
                                </h3>
                                <p className="text-gray-800 leading-relaxed">
                                    {t('declaration.content')}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6 border-t border-gray-200 pt-6">
                                <div className="border-l-4 border-brand pl-6">
                                    <div className="flex items-start space-x-4">
                                        <input
                                            id="consent-checkbox"
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => setIsChecked(e.target.checked)}
                                            className="w-5 h-5 text-brand bg-white border-gray-300 rounded focus:ring-brand focus:ring-2 mt-1"
                                            required
                                        />
                                        <label htmlFor="consent-checkbox" className="text-gray-800 font-medium leading-relaxed">
                                            {t('checkbox')}
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!isChecked}
                                    className={`w-full flex items-center justify-center px-8 py-4 font-medium rounded-lg transition-all duration-200 ${
                                        isChecked
                                            ? 'bg-gradient-to-r from-brand to-brand/90 text-white hover:from-brand/90 hover:to-brand shadow-lg hover:shadow-xl'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    {t('button')}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcupunctureConsentForm;
