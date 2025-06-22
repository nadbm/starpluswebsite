'use client';

import {useLocale, useTranslations} from "next-intl";
import { useState } from "react";

export default function Physio() {
    const t = useTranslations('physio');
    const locale = useLocale();
    const [activeTab, setActiveTab] = useState<'physio' | 'psychology'>('physio');

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('title')}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            {t('description')}
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-12">
                        <div className="relative bg-white rounded-xl p-1 shadow-lg border border-gray-200">
                            <div className="flex relative">
                                {/* Active tab background */}
                                <div 
                                    className={`absolute top-1 bottom-1 bg-brand rounded-lg transition-all duration-300 ease-out ${
                                        activeTab === 'physio' ? 'left-1 w-1/2' : 'left-1/2 w-1/2'
                                    }`}
                                />
                                
                                <button
                                    onClick={() => setActiveTab('physio')}
                                    className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 z-10 ${
                                        activeTab === 'physio'
                                            ? 'text-white'
                                            : 'text-gray-600 hover:text-brand'
                                    }`}
                                >
                                    {t('switchToPhysio')}
                                </button>
                                <button
                                    onClick={() => setActiveTab('psychology')}
                                    className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 z-10 ${
                                        activeTab === 'psychology'
                                            ? 'text-white'
                                            : 'text-gray-600 hover:text-brand'
                                    }`}
                                >
                                    {t('switchToPsychology')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Professional Card */}
                    <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        {/* Background Logo */}
                        <div className="absolute bottom-4 right-4 opacity-30 pointer-events-none">
                            <img 
                                src="/oblogo.png" 
                                alt="Logo" 
                                className="w-24 h-24 object-contain"
                            />
                        </div>
                        
                        <div className="relative p-8 lg:p-12 z-10">
                            {/* Professional Header with Avatar */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
                                        <img
                                            src={activeTab === 'physio' ? "/team/sunqi.png" : "/team/ai.png"}
                                            alt={`${t(`${activeTab}.name`)} - ${t(`${activeTab}.title`)}`}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>
                                    {/* Status indicator */}
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Professional Info */}
                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                        {t(`${activeTab}.name`)}
                                    </h2>
                                    <h3 className="text-lg text-gray-600 font-medium mb-3">
                                        {t(`${activeTab}.title`)}
                                    </h3>
                                    <span className="inline-block bg-brand text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                                        {t(`${activeTab}.t1`)}
                                    </span>
                                    

                                </div>
                            </div>

                            {/* Content Area - Unified Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Main Description - Takes 2/3 width */}
                                <div className="lg:col-span-2 space-y-4">
                                    {activeTab === 'physio' ? (
                                        <>
                                            <p className="text-gray-700 leading-relaxed">{t('physio.t4')}</p>
                                            <p className="text-gray-700 leading-relaxed">{t('physio.t5')}</p>
                                            <p className="text-gray-700 leading-relaxed">{t('physio.t6')}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-gray-700 leading-relaxed">{t('psychology.t4')}</p>
                                            <p className="text-gray-700 leading-relaxed">{t('psychology.t5')}</p>
                                            <p className="text-gray-700 leading-relaxed">{t('psychology.t6')}</p>
                                        </>
                                    )}
                                </div>
                                
                                {/* Credentials/Badges - Takes 1/3 width */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                        {t('credentialsTitle')}
                                    </h4>
                                    
                                    {activeTab === 'physio' ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <svg className="w-5 h-5 text-brand flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                                </svg>
                                                <span className="text-gray-700 font-medium">{t('physio.t2')}</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <svg className="w-5 h-5 text-brand flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                                </svg>
                                                <span className="text-gray-700 font-medium">{t('physio.t3')}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <svg className="w-5 h-5 text-brand flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                                </svg>
                                                <span className="text-gray-700 font-medium">{t('psychology.t2')}</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                <svg className="w-5 h-5 text-brand flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                                </svg>
                                                <span className="text-gray-700 font-medium">{t('psychology.t3')}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}