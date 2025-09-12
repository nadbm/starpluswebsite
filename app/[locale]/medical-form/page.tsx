'use client';

import React, { useState } from 'react';
import {useTranslations} from "next-intl";
import MedicalHistoryForm from "@/components/MedicalHistoryForm";
import ConsentForm from "@/components/ConsentForm";
import Footer from "@/components/Footer";

export default function MedicalFormPage() {
    const t = useTranslations('medicalForm');
    const [showConsentForm, setShowConsentForm] = useState(true);

    const handleConsentGiven = () => {
        setShowConsentForm(false);
    };

    const handleBackToConsent = () => {
        setShowConsentForm(true);
    };

    if (showConsentForm) {
        return <ConsentForm onConsent={handleConsentGiven} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-brand to-blue-600 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            {t('title')}
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <MedicalHistoryForm />
                </div>
            </div>

            <Footer/>
        </div>
    );
}