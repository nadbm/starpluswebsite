'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Shield, CheckCircle, FileText, ArrowRight, ArrowLeft } from 'lucide-react';

interface ConsentFormProps {
    onConsent: () => void;
    onBack?: () => void;
}

const ConsentForm: React.FC<ConsentFormProps> = ({ onConsent, onBack }) => {
    const t = useTranslations('medicalForm.consent');
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isChecked) {
            onConsent();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center items-center mb-4">
                            <div className="bg-blue-600 p-3 rounded-full">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('title')}
                        </h1>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Consent Form */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                            <div className="flex items-center text-white">
                                <FileText className="w-6 h-6 mr-3" />
                                <h2 className="text-xl font-semibold">{t('title')}</h2>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 space-y-8">
                            {/* Introduction */}
                            <div className="border-l-4 border-blue-600 pl-6">
                                <p className="text-gray-800 leading-relaxed text-base">
                                    {t('introduction')}
                                </p>
                            </div>

                            {/* Acknowledgment */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                    {t('acknowledgment')}
                                </h3>

                                {/* Terms List */}
                                <div className="space-y-6">
                                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                        <div key={num} className="border-l-2 border-gray-300 pl-4">
                                            <h4 className="font-semibold text-gray-900 mb-2">
                                                {num}. {t(`terms.${num}.title`)}
                                            </h4>
                                            <p className="text-gray-700 leading-relaxed">
                                                {t(`terms.${num}.content`)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Final Consent */}
                            <div className="border-l-4 border-green-600 pl-6">
                                <h3 className="font-semibold text-gray-900 mb-3">
                                    {t('consentAcknowledgment')}
                                </h3>
                                <p className="text-gray-800 leading-relaxed">
                                    {t('finalStatement')}
                                </p>
                            </div>

                            {/* Consent Checkbox */}
                            <form onSubmit={handleSubmit} className="space-y-8 border-t border-gray-200 pt-8">
                                <div className="border-l-4 border-yellow-500 pl-6">
                                    <div className="flex items-start space-x-4">
                                        <input
                                            id="consent-checkbox"
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => setIsChecked(e.target.checked)}
                                            className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                                            required
                                        />
                                        <label htmlFor="consent-checkbox" className="text-gray-800 font-medium leading-relaxed">
                                            {t('checkbox')}
                                        </label>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {onBack && (
                                        <button
                                            type="button"
                                            onClick={onBack}
                                            className="flex items-center justify-center px-8 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 order-2 sm:order-1"
                                        >
                                            <ArrowLeft className="w-5 h-5 mr-2" />
                                            {t('buttons.back')}
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={!isChecked}
                                        className={`flex items-center justify-center px-8 py-3 font-medium rounded-lg transition-all duration-200 flex-1 order-1 sm:order-2 ${
                                            isChecked
                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        {t('buttons.continue')}
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsentForm; 