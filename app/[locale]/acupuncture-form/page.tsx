'use client';

import React, { useState } from 'react';
import { useTranslations } from "next-intl";
import AcupunctureConsentForm from "@/components/AcupunctureConsentForm";
import AcupunctureMedicalForm from "@/components/AcupunctureMedicalForm";
import Footer from "@/components/Footer";

export default function AcupunctureFormPage() {
    const t = useTranslations('acupunctureForm');
    const [showConsentForm, setShowConsentForm] = useState(true);

    const handleConsentGiven = () => {
        setShowConsentForm(false);
    };

    if (showConsentForm) {
        return <AcupunctureConsentForm onConsent={handleConsentGiven} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50">
            <div className="bg-gradient-to-r from-brand to-brand/90 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            {t('title')}
                        </h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <AcupunctureMedicalForm />
                </div>
            </div>

            <Footer/>
        </div>
    );
}
