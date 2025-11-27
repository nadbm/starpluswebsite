'use client';

import React from 'react';
import {useTranslations} from "next-intl";
import {useState, useEffect} from "react";
import {MapPin, Car, Clock, Phone, Calendar, Users, Clock3, Heart, Scissors, AlertCircle, Pill, Plus, Minus} from 'lucide-react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useLocale} from 'next-intl';
import {ENDPOINTS} from "@/constants/api";
import {Upload} from 'lucide-react';

interface Service {
    id: number;
    name: string;
    status: number;
}

interface ServicesResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Service[];
}

interface AvailableDay {
    date: string;
    is_available: boolean;
    reason: string | null;
    waiting_list: boolean;
}

interface TimeSlot {
    start: string;
    end: string;
}

interface CalendarDay {
    date: number;
    dateString: string;
    dayOfWeek: number;
    isAvailable: boolean;
    reason: string | null;
    isEmpty?: boolean;
    waitingList?: boolean;
}

interface BookingForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
    referralSource: string;
}

interface MedicalCondition {
    condition: string;
    hasCondition: boolean;
    details: string;
}

interface Surgery {
    surgery: string;
    year: string;
    hospital_surgeon: string;
}

interface Allergy {
    allergen: string;
    reaction: string;
}

interface Medication {
    medication: string;
    dosage: string;
    frequency: string;
}

interface FamilyHistory {
    father: string;
    mother: string;
    siblings: string;
}

interface UrinalysisMedicalForm {
    date_of_birth: string;
    gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | '';
    address: string;
    emergency_contact_name: string;
    emergency_contact_number: string;
    medical_history: {
        diabetes: MedicalCondition;
        hypertension: MedicalCondition;
        heart_disease: MedicalCondition;
        asthma_copd: MedicalCondition;
        cancer: MedicalCondition;
        kidney_disease: MedicalCondition;
        liver_disease: MedicalCondition;
        mental_health: MedicalCondition;
        other: MedicalCondition;
    };
    surgical_history: Surgery[];
    allergies: Allergy[];
    current_medications: Medication[];
    family_medical_history: FamilyHistory;
}

interface InsuranceWaiverModalProps {
    t: any;
    onClose: () => void;
    onAgree: () => void;
}

interface MedicalRecordConsentModalProps {
    t: any;
    locale: string;
    onClose: () => void;
    onAgree: () => void;
}

const MedicalRecordConsentModal = ({t, locale, onClose, onAgree}: MedicalRecordConsentModalProps) => {
    const consentContent = {
        en: {
            title: "Medical Information Consent Form for Record Keeping",
            sections: [
                {
                    title: "Introduction",
                    content: "I, the undersigned, hereby give my consent to Starplus Health Center (hereafter referred to as \"Healthcare Provider and paramedical provider\") to collect, store, and maintain my medical records for the purpose of providing medical care, treatment, and services. I understand that my medical records will include personal health information, treatment history, and other related documentation."
                },
                {
                    title: "1. Purpose of Record Keeping",
                    content: "The Healthcare Provider will use my medical records for the purpose of diagnosis, treatment, and ongoing care, including follow-up consultations, prescribed medications, and any necessary treatments."
                },
                {
                    title: "2. Access to Information",
                    content: "I understand that my medical records may be shared within the Healthcare Provider's network of healthcare professionals involved in my care, as well as with external entities, such as insurance companies or specialists, when necessary for my treatment or as required by law."
                },
                {
                    title: "3. Confidentiality and Security",
                    content: "The Healthcare Provider is committed to ensuring the privacy and security of my medical records, in compliance with applicable privacy laws and any other relevant data protection regulations."
                },
                {
                    title: "4. Retention of Records",
                    content: "My medical records will be retained by the Healthcare Provider for the duration of time required by law or the provider's internal policies. I understand that I have the right to request access to and copies of my records at any time, within reasonable limits."
                },
                {
                    title: "5. Revocation of Consent",
                    content: "I understand that I may revoke my consent for the retention and use of my medical records at any time, subject to any legal requirements regarding record retention. If I revoke consent, the Healthcare Provider may be unable to provide further treatment or services unless an alternative arrangement is made."
                },
                {
                    title: "6. Transfer of Records",
                    content: "I authorize the Healthcare Provider to transfer my medical records to another healthcare provider or institution, should I choose to seek care elsewhere, or as necessary for continued medical care."
                },
                {
                    title: "7. Questions and Clarifications",
                    content: "If I have any questions or concerns regarding the collection, use, or retention of my medical records, I understand that I can contact the Healthcare Provider's office to request clarification."
                }
            ],
            notice: "I hereby give my informed consent for the collection, storage, and use of my medical records as outlined in this document. I acknowledge that I have read, understood, and had the opportunity to ask questions about this consent form.",
            close: "Close",
            agree: "I Agree"
        },
        fr: {
            title: "Formulaire de consentement pour la conservation des dossiers médicaux",
            sections: [
                {
                    title: "Introduction",
                    content: "Je, soussigné(e), donne par la présente mon consentement au Centre de Santé Starplus (ci-après dénommé « Fournisseur de soins de santé et fournisseur paramédical ») pour collecter, stocker et maintenir mes dossiers médicaux dans le but de fournir des soins médicaux, des traitements et des services. Je comprends que mes dossiers médicaux incluront des informations personnelles de santé, l'historique des traitements et d'autres documents connexes."
                },
                {
                    title: "1. Objectif de la conservation des dossiers",
                    content: "Le Fournisseur de soins de santé utilisera mes dossiers médicaux aux fins de diagnostic, de traitement et de soins continus, y compris les consultations de suivi, les médicaments prescrits et tous les traitements nécessaires."
                },
                {
                    title: "2. Accès à l'information",
                    content: "Je comprends que mes dossiers médicaux peuvent être partagés au sein du réseau de professionnels de la santé du Fournisseur impliqués dans mes soins, ainsi qu'avec des entités externes, telles que les compagnies d'assurance ou les spécialistes, lorsque cela est nécessaire pour mon traitement ou comme l'exige la loi."
                },
                {
                    title: "3. Confidentialité et sécurité",
                    content: "Le Fournisseur de soins de santé s'engage à assurer la confidentialité et la sécurité de mes dossiers médicaux, conformément aux lois applicables sur la protection de la vie privée et à toute autre réglementation pertinente en matière de protection des données."
                },
                {
                    title: "4. Conservation des dossiers",
                    content: "Mes dossiers médicaux seront conservés par le Fournisseur de soins de santé pendant la durée requise par la loi ou les politiques internes du fournisseur. Je comprends que j'ai le droit de demander l'accès à mes dossiers et d'en obtenir des copies à tout moment, dans des limites raisonnables."
                },
                {
                    title: "5. Révocation du consentement",
                    content: "Je comprends que je peux révoquer mon consentement pour la conservation et l'utilisation de mes dossiers médicaux à tout moment, sous réserve de toute exigence légale concernant la conservation des dossiers. Si je révoque mon consentement, le Fournisseur de soins de santé pourrait ne pas être en mesure de fournir d'autres traitements ou services à moins qu'un arrangement alternatif ne soit conclu."
                },
                {
                    title: "6. Transfert des dossiers",
                    content: "J'autorise le Fournisseur de soins de santé à transférer mes dossiers médicaux à un autre fournisseur de soins de santé ou institution, si je choisis de recevoir des soins ailleurs, ou si nécessaire pour la continuité des soins médicaux."
                },
                {
                    title: "7. Questions et clarifications",
                    content: "Si j'ai des questions ou des préoccupations concernant la collecte, l'utilisation ou la conservation de mes dossiers médicaux, je comprends que je peux contacter le bureau du Fournisseur de soins de santé pour demander des clarifications."
                }
            ],
            notice: "Je donne par la présente mon consentement éclairé pour la collecte, le stockage et l'utilisation de mes dossiers médicaux comme décrit dans ce document. Je reconnais avoir lu, compris et eu l'occasion de poser des questions sur ce formulaire de consentement.",
            close: "Fermer",
            agree: "J'accepte"
        },
        zh: {
            title: "医疗信息记录保存同意书",
            sections: [
                {
                    title: "引言",
                    content: "本人（签署人）特此同意 Starplus 健康中心（以下简称「医疗保健提供者和辅助医疗提供者」）收集、存储和维护本人的医疗记录，以提供医疗护理、治疗和服务。本人理解医疗记录将包括个人健康信息、治疗历史和其他相关文件。"
                },
                {
                    title: "1. 记录保存目的",
                    content: "医疗保健提供者将使用本人的医疗记录用于诊断、治疗和持续护理，包括后续咨询、处方药物和任何必要的治疗。"
                },
                {
                    title: "2. 信息访问",
                    content: "本人理解，本人的医疗记录可能会在医疗保健提供者参与本人护理的医疗专业人员网络内共享，以及在必要时与外部实体（如保险公司或专科医生）共享，用于本人的治疗或法律要求。"
                },
                {
                    title: "3. 保密性和安全性",
                    content: "医疗保健提供者承诺确保本人医疗记录的隐私和安全，遵守适用的隐私法律和任何其他相关的数据保护法规。"
                },
                {
                    title: "4. 记录保留",
                    content: "本人的医疗记录将由医疗保健提供者按照法律要求或提供者内部政策规定的时间保留。本人理解有权在合理范围内随时要求访问和获取本人记录的副本。"
                },
                {
                    title: "5. 撤销同意",
                    content: "本人理解可以随时撤销对医疗记录保留和使用的同意，但须遵守有关记录保留的任何法律要求。如果本人撤销同意，医疗保健提供者可能无法提供进一步的治疗或服务，除非做出替代安排。"
                },
                {
                    title: "6. 记录转移",
                    content: "本人授权医疗保健提供者将本人的医疗记录转移到另一个医疗保健提供者或机构，如果本人选择在其他地方寻求护理，或根据持续医疗护理的需要。"
                },
                {
                    title: "7. 问题和澄清",
                    content: "如果本人对医疗记录的收集、使用或保留有任何疑问或顾虑，本人理解可以联系医疗保健提供者的办公室要求澄清。"
                }
            ],
            notice: "本人特此给予知情同意，同意按照本文件所述收集、存储和使用本人的医疗记录。本人确认已阅读、理解并有机会就本同意书提出问题。",
            close: "关闭",
            agree: "我同意"
        }
    };

    const content = consentContent[locale as keyof typeof consentContent] || consentContent.en;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full my-8">
                <div className="p-6 md:p-8 bg-brand rounded-t-xl">
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                        {content.title}
                    </h3>
                </div>
                <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-6 text-gray-700">
                        {content.sections.map((section, index) => (
                            <div key={index}>
                                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                    {section.title}
                                </h4>
                                <p className="whitespace-pre-line text-sm md:text-base leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                            <p className="text-amber-900 font-medium text-sm md:text-base">
                                {content.notice}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6 md:p-8 bg-gray-50 rounded-b-xl flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors duration-200 font-medium text-sm md:text-base"
                    >
                        {content.close}
                    </button>
                    <button
                        onClick={onAgree}
                        className="flex-1 px-6 py-3 bg-brand hover:bg-brand/90 text-white rounded-xl transition-colors duration-200 font-medium text-sm md:text-base"
                    >
                        {content.agree}
                    </button>
                </div>
            </div>
        </div>
    );
};

const InsuranceWaiverModal = ({t, onClose, onAgree}: InsuranceWaiverModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full my-8">
                <div className="p-6 md:p-8 bg-brand rounded-t-xl">
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                        {t('form.insuranceWaiver.modalTitle')}
                    </h3>
                </div>
                <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-6 text-gray-700">
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                {t('form.insuranceWaiver.content.section1Title')}
                            </h4>
                            <p className="whitespace-pre-line text-sm md:text-base leading-relaxed">
                                {t('form.insuranceWaiver.content.section1Content')}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                {t('form.insuranceWaiver.content.section2Title')}
                            </h4>
                            <p className="whitespace-pre-line text-sm md:text-base leading-relaxed">
                                {t('form.insuranceWaiver.content.section2Content')}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                {t('form.insuranceWaiver.content.section3Title')}
                            </h4>
                            <p className="whitespace-pre-line text-sm md:text-base leading-relaxed">
                                {t('form.insuranceWaiver.content.section3Content')}
                            </p>
                        </div>
                        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
                            <p className="text-amber-900 font-medium text-sm md:text-base">
                                {t('form.insuranceWaiver.content.notice')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6 md:p-8 bg-gray-50 rounded-b-xl flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors duration-200 font-medium text-sm md:text-base"
                    >
                        {t('form.insuranceWaiver.close')}
                    </button>
                    <button
                        onClick={onAgree}
                        className="flex-1 px-6 py-3 bg-brand hover:bg-brand/90 text-white rounded-xl transition-colors duration-200 font-medium text-sm md:text-base"
                    >
                        {t('form.insuranceWaiver.agree')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const SuccessMessage = ({t}: { t: any }) => {
    const router = useRouter();
    const locale = useLocale();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            router.push(`/${locale}`);
        }
    }, [countdown, router, locale]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full">
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        {t('success.title')}
                    </h3>
                    <p className="text-gray-600 mb-2">{t('success.message')}</p>
                    <p className="text-gray-600 mb-4">{t('success.confirmation')}</p>
                    <p className="text-brand">
                        {countdown} {t('success.backToHomepage')}
                    </p>
                </div>
            </div>
        </div>
    );
};

const ChineseNameWarning = ({t, onGoBack, onContinue}: { t: any, onGoBack: () => void, onContinue: () => void }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-md w-full">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        {t('form.chineseNameWarning.title')}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm md:text-base">
                        {t('form.chineseNameWarning.message')}
                    </p>
                    <p className="text-gray-700 font-medium text-sm md:text-base">
                        {t('form.chineseNameWarning.question')}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onGoBack}
                        className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200 font-medium text-sm md:text-base"
                    >
                        {t('form.chineseNameWarning.goBack')}
                    </button>
                    <button
                        onClick={onContinue}
                        className="flex-1 px-6 py-3 bg-brand hover:bg-brand/90 text-white rounded-xl transition-colors duration-200 font-medium text-sm md:text-base"
                    >
                        {t('form.chineseNameWarning.continue')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function BookingFlow() {
    const t = useTranslations('booking');
    const e = useTranslations('services2');
    const l = useTranslations('location');
    const locale = useLocale();

    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [availableDays, setAvailableDays] = useState<AvailableDay[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
    const [currentMonth, setCurrentMonth] = useState<string>('');
    const [bookingForm, setBookingForm] = useState<BookingForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: '',
        referralSource: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [selectedVaccineType, setSelectedVaccineType] = useState<string | null>(null);
    const [showVaccineOptions, setShowVaccineOptions] = useState<boolean>(false);
    const [showPrescriptionUpload, setShowPrescriptionUpload] = useState<boolean>(false);
    const [showFollowUpInfo, setShowFollowUpInfo] = useState<boolean>(false);
    const [showUrinalysisRedirect, setShowUrinalysisRedirect] = useState<boolean>(false);
    const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
    const [showChineseWarning, setShowChineseWarning] = useState<boolean>(false);
    const [agreedToWaiver, setAgreedToWaiver] = useState<boolean>(false);
    const [showWaiverModal, setShowWaiverModal] = useState<boolean>(false);
    
    // Urinalysis medical form states
    const [showUrinalysisMedicalForm, setShowUrinalysisMedicalForm] = useState<boolean>(false);
    const [agreedToMedicalConsent, setAgreedToMedicalConsent] = useState<boolean>(false);
    const [showMedicalConsentModal, setShowMedicalConsentModal] = useState<boolean>(false);
    const [urinalysisMedicalData, setUrinalysisMedicalData] = useState<UrinalysisMedicalForm>({
        date_of_birth: '',
        gender: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_number: '',
        medical_history: {
            diabetes: {condition: 'diabetes', hasCondition: false, details: ''},
            hypertension: {condition: 'hypertension', hasCondition: false, details: ''},
            heart_disease: {condition: 'heart_disease', hasCondition: false, details: ''},
            asthma_copd: {condition: 'asthma_copd', hasCondition: false, details: ''},
            cancer: {condition: 'cancer', hasCondition: false, details: ''},
            kidney_disease: {condition: 'kidney_disease', hasCondition: false, details: ''},
            liver_disease: {condition: 'liver_disease', hasCondition: false, details: ''},
            mental_health: {condition: 'mental_health', hasCondition: false, details: ''},
            other: {condition: 'other', hasCondition: false, details: ''},
        },
        surgical_history: [],
        allergies: [],
        current_medications: [],
        family_medical_history: {
            father: '',
            mother: '',
            siblings: ''
        }
    });

    const infoCards = [
        {
            icon: Car,
            title: l('advantages.parking.title'),
            description: l('advantages.parking.description')
        },
        {
            icon: MapPin,
            title: l('advantages.location.title'),
            description: l('address.line1') + '' + l('address.line2')
        },
        {
            icon: Clock,
            title: l('advantages.hours.title'),
            description: l('advantages.hours.description')
        },
        {
            icon: Phone,
            title: l('advantages.contact.title'),
            description: "(514)-447-4786\ninfo@starpluscentre.com"
        }
    ];

    const SERVICE_KEYS: Record<string, string> = {
        'Physiotherapy': 'physio',
        'General Practitioner': 'gp',
        'Online Consultation': 'online',
        'Online Consultation Follow-up': 'onlineFollowUp',
        'Nursing Services': 'nursing',
        'Massage Therapy': 'massage',
        'Naturopathy': 'naturopathy',
        'Blood Analysis': 'blood',
        'Social Worker': 'social',
        'Pharmacy Consultation': 'pharmacy',
        'Allergy Analysis': 'allergy',
        'Nutritionist Services': 'nutritionist',
        'Traditional Chinese Medicine Consultation': 'tcm',
        'Traditional  Chinese Medicine Consultation': 'tcm',
        'Botox Services': 'botox',
        'Recovery Sleep Session': 'recovery',
        'Lung Breathing Test': 'lungScreening',
        'Mental Health': 'mental',
        'Vaccine': 'vaccine',
        'Urinalysis Analysis-Strip Test': 'urinalysis',
        'Fertility Tests': 'fertility'
    };

    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(ENDPOINTS.APPOINTMENTS.ALL_SERVICES);
                const data: ServicesResponse = await response.json();
                const availableServices = data.results.filter(service => service.status === 1);
                setServices(availableServices);
                
                // 如果 URL 参数包含 service=urinalysis，自动选择尿液筛查服务
                const serviceParam = searchParams.get('service');
                if (serviceParam === 'urinalysis') {
                    const urinalysisService = availableServices.find(
                        service => service.name === 'Urinalysis Analysis-Strip Test'
                    );
                    if (urinalysisService) {
                        setSelectedService(urinalysisService);
                        setShowUrinalysisMedicalForm(true);
                        setShowVaccineOptions(false);
                        setShowPrescriptionUpload(false);
                        setShowFollowUpInfo(false);
                        setShowUrinalysisRedirect(false);
                        setSelectedVaccineType(null);
                        setPrescriptionFile(null);
                    }
                }
            } catch (error) {
                console.error('Error fetching services:', error);
                setError(t('errors.loadingError'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, [searchParams]);

    useEffect(() => {
        if (selectedService) {
            const fetchAvailableDays = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(
                        `${ENDPOINTS.APPOINTMENTS.AVAILABLE_DAYS}?service_id=${selectedService.id}`
                    );
                    const data: AvailableDay[] = await response.json();
                    setAvailableDays(data);
                    if (data.length > 0) {
                        const firstDate = new Date(data[0].date + 'T00:00:00');
                        setCurrentMonth(firstDate.toLocaleString('default', {
                            month: 'long',
                            year: 'numeric'
                        }));
                    }
                    buildCalendarGrid(data);
                } catch (error) {
                    console.error('Error fetching available days:', error);
                    setError(t('errors.loadingError'));
                } finally {
                    setIsLoading(false);
                }
            };

            fetchAvailableDays();
            setSelectedDate(null);
            setTimeSlots([]);
            setSelectedTime(null);
        }
    }, [selectedService]);

    const buildCalendarGrid = (days: AvailableDay[]) => {
        if (days.length === 0) {
            setCalendarDays([]);
            return;
        }

        const calendarGrid: CalendarDay[] = [];
        const firstDate = new Date(days[0].date + 'T00:00:00');
        const firstDayOfWeek = firstDate.getDay();

        for (let i = 0; i < firstDayOfWeek; i++) {
            calendarGrid.push({
                date: 0,
                dateString: '',
                dayOfWeek: i,
                isAvailable: false,
                reason: null,
                isEmpty: true
            });
        }

        days.forEach(day => {
            const date = new Date(day.date + 'T00:00:00');
            calendarGrid.push({
                date: date.getDate(),
                dateString: day.date,
                dayOfWeek: date.getDay(),
                isAvailable: day.is_available,
                reason: day.reason,
                isEmpty: false,
                waitingList: day.waiting_list || false
            });
        });

        setCalendarDays(calendarGrid);
    };

    const handleDateSelect = async (date: string) => {
        setSelectedDate(date);
        setSelectedTime(null);
        if (!selectedService) return;

        try {
            const response = await fetch(
                `${ENDPOINTS.APPOINTMENTS.TIME_SLOTS}?service_id=${selectedService.id}&date=${date}`
            );
            const data = await response.json();

            if (!response.ok && data.waiting_list) {
                setTimeSlots([]);
                return;
            }

            setTimeSlots(data);
        } catch (error) {
            console.error('Error fetching time slots:', error);
            setError(t('errors.loadingError'));
        }
    };

    const formatTime = (timeString: string) => {
        const time = new Date(`2000-01-01T${timeString}`);
        return time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
        });
    };

    const hasChinese = (text: string) => {
        return /[\u4e00-\u9fa5]/.test(text);
    };

    const submitBooking = async () => {
        if (!selectedService || !selectedDate || !selectedTime) {
            return;
        }

        setIsSubmitting(true);
        setError(null);

        let notesContent = bookingForm.notes;

        if (showVaccineOptions && selectedVaccineType) {
            notesContent = `Selected Vaccine: ${selectedVaccineType} (includes $25 nursing fee)\n\n${notesContent}`;
        }

        if (showPrescriptionUpload && prescriptionFile) {
            notesContent = `Prescription File Uploaded: ${notesContent}\n\n${prescriptionFile.name}`;
        }

        if (showUrinalysisMedicalForm) {
            const medicalNote = '[URINALYSIS SCREENING APPOINTMENT]\nPatient has consented to medical information recording and storage.\nComplete medical history form has been submitted with this appointment.';
            notesContent = `${medicalNote}\n\n${notesContent}`;
        }

        try {
            const requestData: any = {
                service: selectedService.id,
                date: selectedDate,
                start_time: selectedTime.start,
                end_time: selectedTime.end,
                client_first_name: bookingForm.firstName,
                client_last_name: bookingForm.lastName,
                client_email: bookingForm.email,
                client_phone: bookingForm.phone,
                notes: notesContent,
                referral_source: bookingForm.referralSource
            };

            if (showUrinalysisMedicalForm) {
                requestData.medical_data = {
                    date_of_birth: urinalysisMedicalData.date_of_birth,
                    gender: urinalysisMedicalData.gender,
                    address: urinalysisMedicalData.address,
                    emergency_contact_name: urinalysisMedicalData.emergency_contact_name,
                    emergency_contact_number: urinalysisMedicalData.emergency_contact_number,
                    medical_history: urinalysisMedicalData.medical_history,
                    surgical_history: urinalysisMedicalData.surgical_history,
                    allergies: urinalysisMedicalData.allergies,
                    current_medications: urinalysisMedicalData.current_medications,
                    family_medical_history: urinalysisMedicalData.family_medical_history,
                    medical_consent_agreed: agreedToMedicalConsent
                };
            }

            const response = await fetch(ENDPOINTS.APPOINTMENTS.BOOK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(t('errors.bookingError'));
            }

            setSuccess(true);
            setBookingForm({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                notes: '',
                referralSource: ''
            });

        } catch (error) {
            console.error('Error making booking:', error);
            setError(t('errors.bookingError'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedService || !selectedDate || !selectedTime) {
            setError(t('errors.formIncomplete'));
            return;
        }

        if (showVaccineOptions && !selectedVaccineType) {
            setError("Please select a vaccine type");
            return;
        }

        if (!agreedToWaiver) {
            setError(t('form.insuranceWaiver.required'));
            return;
        }

        if (showUrinalysisMedicalForm && !agreedToMedicalConsent) {
            setError(locale === 'zh' ? '请同意医疗信息记录与保存同意书' : locale === 'fr' ? 'Veuillez accepter le consentement pour l\'enregistrement des informations médicales' : 'Please agree to the Medical Information Record Consent');
            return;
        }

        if (hasChinese(bookingForm.firstName) || hasChinese(bookingForm.lastName)) {
            setShowChineseWarning(true);
            return;
        }

        await submitBooking();
    };

    const handleContinueWithChinese = async () => {
        setShowChineseWarning(false);
        await submitBooking();
    };

    const getDayClasses = (day: CalendarDay): string => {
        const baseClasses = "relative w-full p-4 aspect-square flex items-center justify-center text-lg font-medium rounded-lg transition-all duration-200 ";

        if (day.isEmpty) {
            return baseClasses + "invisible";
        }

        if (!day.isAvailable && day.waitingList) {
            return baseClasses + "bg-brand/10 text-brand cursor-pointer border-2 border-brand";
        }

        if (!day.isAvailable) {
            return baseClasses + "bg-gray-100 text-gray-400 cursor-not-allowed";
        }

        if (selectedDate === day.dateString) {
            return baseClasses + "bg-brand text-white shadow-lg hover:bg-brand/90";
        }

        return baseClasses + "hover:bg-brand/10 cursor-pointer bg-white border border-gray-200";
    };

    const getTimeSlotClasses = (slot: TimeSlot): string => {
        const baseClasses = "p-3 text-center rounded-xl border-2 transition-all duration-200 ";

        if (selectedTime === slot) {
            return baseClasses + "border-brand bg-brand/5 shadow-lg";
        }

        return baseClasses + "border-gray-200 hover:border-brand/50 hover:shadow-md";
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
            </div>
        );
    }

    return (
        <div className="min-h-[800px]">
            {showWaiverModal && (
                <InsuranceWaiverModal
                    t={t}
                    onClose={() => setShowWaiverModal(false)}
                    onAgree={() => {
                        setAgreedToWaiver(true);
                        setShowWaiverModal(false);
                        if (error === t('form.insuranceWaiver.required')) {
                            setError(null);
                        }
                    }}
                />
            )}
            {showMedicalConsentModal && (
                <MedicalRecordConsentModal
                    t={t}
                    locale={locale}
                    onClose={() => setShowMedicalConsentModal(false)}
                    onAgree={() => {
                        setAgreedToMedicalConsent(true);
                        setShowMedicalConsentModal(false);
                    }}
                />
            )}
            {showChineseWarning && (
                <ChineseNameWarning 
                    t={t} 
                    onGoBack={() => setShowChineseWarning(false)}
                    onContinue={handleContinueWithChinese}
                />
            )}
            {success ? <SuccessMessage t={t}/> : (
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                        {infoCards.map((card, index) => (
                            <div key={index}
                                 className="bg-white p-4 md:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
                                <card.icon className="w-6 h-6 md:w-8 md:h-8 text-brand mb-3 md:mb-4"/>
                                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                                    {card.title}
                                </h4>
                                <p className="text-sm md:text-base text-gray-600 whitespace-pre-line">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mb-8 md:mb-12">
                        <div className="flex items-center justify-center max-w-3xl mx-auto">
                            <div className={`flex items-center ${selectedService ? 'text-brand' : 'text-gray-400'}`}>
                                <Calendar className="w-5 h-5 md:w-6 md:h-6 mr-2"/>
                                <span className="font-medium text-sm md:text-base">1. {t('selectService')}</span>
                            </div>
                            <div className="w-8 md:w-12 h-px bg-gray-300 mx-2 md:mx-4"></div>
                            <div className={`flex items-center ${selectedDate ? 'text-brand' : 'text-gray-400'}`}>
                                <Users className="w-5 h-5 md:w-6 md:h-6 mr-2"/>
                                <span className="font-medium text-sm md:text-base">2. {t('selectDate')}</span>
                            </div>
                            <div className="w-8 md:w-12 h-px bg-gray-300 mx-2 md:mx-4"></div>
                            <div className={`flex items-center ${selectedTime ? 'text-brand' : 'text-gray-400'}`}>
                                <Clock3 className="w-5 h-5 md:w-6 md:h-6 mr-2"/>
                                <span className="font-medium text-sm md:text-base">3. {t('selectTime')}</span>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div
                            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm md:text-base">
                            {error}
                        </div>
                    )}

                    <div className="bg-white rounded-xl shadow-lg mb-8">
                        <div className="p-4 md:p-6 bg-brand rounded-t-xl">
                            <h2 className="text-xl md:text-2xl font-semibold text-white">
                                {t('selectService')}
                            </h2>
                        </div>
                        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {services.map((service) => (
                                <button
                                    key={service.id}
                                    onClick={() => {
                                        setSelectedService(service);
                                        setShowVaccineOptions(service.name === 'Vaccine');
                                        setShowPrescriptionUpload(service.name === 'Blood Analysis');
                                        setShowFollowUpInfo(service.name === 'Online Consultation Follow-up');
                                        setShowUrinalysisMedicalForm(service.name === 'Urinalysis Analysis-Strip Test');
                                        setShowUrinalysisRedirect(false);
                                        setSelectedVaccineType(null);
                                        setPrescriptionFile(null);
                                    }}

                                    className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                                        selectedService?.id === service.id
                                            ? 'border-brand bg-brand/5 shadow-lg'
                                            : 'border-gray-200 hover:border-brand/50 hover:shadow-md'
                                    }`}
                                >
                                    <h3 className="font-medium text-base md:text-lg text-gray-800">
                                        {(() => {
                                            if (service.name === 'Urinalysis Analysis-Strip Test') {
                                                return e('urinalysis.title');
                                            }
                                            const serviceKey = SERVICE_KEYS[service.name];
                                            if (!serviceKey) {
                                                console.warn(`Service name "${service.name}" not found in SERVICE_KEYS`);
                                                return service.name;
                                            }
                                            try {
                                                return e(`${serviceKey}.title`);
                                            } catch (error) {
                                                console.warn(`Translation not found for ${serviceKey}.title`);
                                                return service.name; 
                                            }
                                        })()}
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-600 mt-2">
                                        {(() => {
                                            const serviceKey = SERVICE_KEYS[service.name];
                                            if (!serviceKey) {
                                                console.warn(`Service name "${service.name}" not found in SERVICE_KEYS`);
                                                return service.name; 
                                            }
                                            try {
                                                return e(`${serviceKey}.description`);
                                            } catch (error) {
                                                console.warn(`Translation not found for ${serviceKey}.description`);
                                                return service.name;
                                            }
                                        })()}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedService && (
                        <div className="bg-white rounded-xl shadow-lg mb-8">
                            <div className="p-4 md:p-6 bg-brand rounded-t-xl">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl md:text-2xl font-semibold text-white">
                                        {t('selectDate')}
                                    </h2>
                                    <div className="text-base md:text-lg text-white/90">
                                        {currentMonth}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-7 mb-4">
                                    {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
                                        <div key={day}
                                             className="text-center font-medium text-gray-500">
                                            {t(`weekDays.${day}`)}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-2">
                                    {calendarDays.map((day, index) => (
                                        <div
                                            key={day.isEmpty ? `empty-${index}` : day.dateString}
                                            className={getDayClasses(day)}
                                            onClick={() => {
                                                if (day.isAvailable && !day.isEmpty) {
                                                    handleDateSelect(day.dateString);
                                                } else if (day.waitingList && !day.isEmpty) {
                                                    setSelectedDate(day.dateString);
                                                    setTimeSlots([]);
                                                    setSelectedTime(null);
                                                }
                                            }}
                                        >
                                            {!day.isEmpty && (
                                                <>
                                                    <span>{day.date}</span>
                                                    {day.waitingList && (
                                                        <span className="absolute top-1 right-1 text-xs">⏰</span>
                                                    )}
                                                    {day.isAvailable && selectedDate === day.dateString && (
                                                        <span
                                                            className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full">
                                                </span>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}



                    {selectedService && showVaccineOptions && (
                        <div className="bg-white rounded-xl shadow-lg mb-8">
                            <div className="p-4 md:p-6 bg-brand rounded-t-xl">
                                <h3 className="text-xl md:text-2xl font-semibold text-white">
                                    Select Vaccine Type
                                </h3>
                            </div>
                            <div className="p-4 md:p-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setSelectedVaccineType('Shingrix')}
                                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                                selectedVaccineType === 'Shingrix'
                                                    ? 'border-brand bg-brand/5 shadow-lg'
                                                    : 'border-gray-200 hover:border-brand/50 hover:shadow-md'
                                            }`}
                                        >
                                            <h4 className="font-medium text-lg">Shingrix (Shingles)</h4>
                                            <p className="text-gray-600 mt-2">$206.8</p>
                                        </button>

                                        <button
                                            onClick={() => setSelectedVaccineType('Prevnar 20')}
                                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                                selectedVaccineType === 'Prevnar 20'
                                                    ? 'border-brand bg-brand/5 shadow-lg'
                                                    : 'border-gray-200 hover:border-brand/50 hover:shadow-md'
                                            }`}
                                        >
                                            <h4 className="font-medium text-lg">Prevnar 20 (Pneumonia)</h4>
                                            <p className="text-gray-600 mt-2">$149.5</p>
                                        </button>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <p className="text-blue-800">
                                            <span className="font-semibold">Note:</span> All vaccines include a $25
                                            nursing fee.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedService && showFollowUpInfo && (
                        <div className="bg-white rounded-xl shadow-lg mb-8">
                            <div className="p-4 md:p-6 bg-brand rounded-t-xl">
                                <h3 className="text-xl md:text-2xl font-semibold text-white">
                                    {t('followUpInfo.title')}
                                </h3>
                            </div>
                            <div className="p-4 md:p-6">
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <p className="text-blue-800">
                                            {t('followUpInfo.pricing')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedService && showPrescriptionUpload && (
                        <div className="bg-white rounded-xl shadow-lg mb-8">
                            <div className="p-4 md:p-6 bg-brand rounded-t-xl">
                                <h3 className="text-xl md:text-2xl font-semibold text-white">
                                    Upload Prescription (Optional)
                                </h3>
                            </div>
                            <div className="p-4 md:p-6">
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                                        <p className="text-blue-800">
                                            <span className="font-semibold">Note:</span> If you have a prescription for
                                            your blood work, you can upload it here. This is optional but may help
                                            expedite your service.
                                        </p>
                                    </div>

                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <input
                                            type="file"
                                            id="prescription"
                                            className="hidden"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setPrescriptionFile(e.target.files[0]);
                                                }
                                            }}
                                        />
                                        <label htmlFor="prescription" className="cursor-pointer">
                                            <div className="flex flex-col items-center justify-center">
                                                <Upload className="w-12 h-12 text-gray-400 mb-3"/>
                                                <p className="text-lg font-medium text-gray-700">
                                                    {prescriptionFile ? prescriptionFile.name : 'Click to upload prescription (optional)'}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {prescriptionFile ? `${(prescriptionFile.size / 1024 / 1024).toFixed(2)} MB` : 'PDF, JPG, PNG (Max 10MB)'}
                                                </p>
                                            </div>
                                        </label>
                                        {prescriptionFile && (
                                            <button
                                                onClick={() => setPrescriptionFile(null)}
                                                className="mt-4 text-red-600 hover:text-red-800"
                                            >
                                                Remove file
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedDate && calendarDays.find(d => d.dateString === selectedDate)?.waitingList && (
                        <div className="bg-white rounded-xl shadow-lg mb-8">
                            <div className="p-4 md:p-6 bg-brand rounded-t-xl">
                                <h3 className="text-xl md:text-2xl font-semibold text-white">
                                    {t('waitingList.title')}
                                </h3>
                            </div>
                            <div className="p-4 md:p-6">
                                <div className="space-y-4">
                                    <div className="bg-brand/10 p-4 rounded-lg border-2 border-brand">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <svg className="h-6 w-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h4 className="text-lg font-semibold text-brand mb-2">
                                                    {t('waitingList.heading')}
                                                </h4>
                                                <p className="text-brand/90 mb-2">
                                                    {t('waitingList.message')}
                                                </p>
                                                <p className="text-brand/90">
                                                    {t('waitingList.contact')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            onClick={() => {
                                                setSelectedDate(null);
                                                setSelectedTime(null);
                                            }}
                                            className="bg-brand hover:bg-brand/90 text-white px-6 py-3 rounded-xl transition-colors duration-200 font-medium"
                                        >
                                            {t('waitingList.selectAnother')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedDate && timeSlots.length > 0 && !calendarDays.find(d => d.dateString === selectedDate)?.waitingList && (
                        <div className="bg-white rounded-xl shadow-lg mb-8">
                            <div className="p-4 md:p-6 bg-brand rounded-t-xl">
                                <h3 className="text-xl md:text-2xl font-semibold text-white">
                                    {t('selectTime')}
                                </h3>
                            </div>
                            <div className="p-4 md:p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                                    {timeSlots.map((slot, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedTime(slot)}
                                            className={getTimeSlotClasses(slot)}
                                        >
                                    <span className="text-sm md:text-base">
                                        {`${formatTime(slot.start)} - ${formatTime(slot.end)}`}
                                    </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedTime && (
                        <div className="bg-white rounded-xl shadow-lg">
                            <div className="p-4 md:p-6 bg-brand rounded-t-xl">
                                <h3 className="text-xl md:text-2xl font-semibold text-white">
                                    {t('form.title')}
                                </h3>
                            </div>
                            <div className="p-4 md:p-6">
                                <form onSubmit={handleSubmit}
                                      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('form.firstName')}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder={t('form.firstNamePlaceholder')}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm md:text-base"
                                            value={bookingForm.firstName}
                                            onChange={(e) => setBookingForm({...bookingForm, firstName: e.target.value})}
                                        />
                                        <p className="mt-1.5 text-xs text-gray-500">
                                            {t('form.firstNameHint')}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('form.lastName')}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder={t('form.lastNamePlaceholder')}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm md:text-base"
                                            value={bookingForm.lastName}
                                            onChange={(e) => setBookingForm({...bookingForm, lastName: e.target.value})}
                                        />
                                        <p className="mt-1.5 text-xs text-gray-500">
                                            {t('form.lastNameHint')}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('form.email')}
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder={t('form.emailPlaceholder')}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm md:text-base"
                                            value={bookingForm.email}
                                            onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('form.phone')}
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder={t('form.phonePlaceholder')}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm md:text-base"
                                            value={bookingForm.phone}
                                            onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('form.notes')}
                                        </label>
                                        <textarea
                                            rows={4}
                                            placeholder={t('form.notesPlaceholder')}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm md:text-base"
                                            value={bookingForm.notes}
                                            onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('form.referralSource')}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder={t('form.referralSourcePlaceholder')}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm md:text-base"
                                            value={bookingForm.referralSource}
                                            onChange={(e) => setBookingForm({...bookingForm, referralSource: e.target.value})}
                                        />
                                    </div>

                                    {showVaccineOptions && !selectedVaccineType && (
                                        <div className="md:col-span-2 text-red-600 text-sm">
                                            * Please select a vaccine type
                                        </div>
                                    )}

                                    {/* Urinalysis Medical Form Section */}
                                    {showUrinalysisMedicalForm && (
                                        <>
                                            {/* Medical Information Card */}
                                            <div className="md:col-span-2 mt-6">
                                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                                                        <h3 className="text-xl font-semibold text-white flex items-center">
                                                            <Heart className="w-6 h-6 mr-2"/>
                                                            {locale === 'zh' ? '医疗信息' : locale === 'fr' ? 'Informations médicales' : 'Medical Information'}
                                                        </h3>
                                                    </div>
                                                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {/* Date of Birth */}
                                                        <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {locale === 'zh' ? '出生日期' : locale === 'fr' ? 'Date de naissance' : 'Date of Birth'} *
                                                </label>
                                                <input
                                                    type="date"
                                                    required
                                                    value={urinalysisMedicalData.date_of_birth}
                                                    onChange={(e) => setUrinalysisMedicalData({...urinalysisMedicalData, date_of_birth: e.target.value})}
                                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                />
                                            </div>

                                            {/* Gender */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {locale === 'zh' ? '性别' : locale === 'fr' ? 'Genre' : 'Gender'} *
                                                </label>
                                                <select
                                                    required
                                                    value={urinalysisMedicalData.gender}
                                                    onChange={(e) => setUrinalysisMedicalData({...urinalysisMedicalData, gender: e.target.value as any})}
                                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                >
                                                    <option value="">{locale === 'zh' ? '请选择' : locale === 'fr' ? 'Sélectionner' : 'Select'}</option>
                                                    <option value="male">{locale === 'zh' ? '男' : locale === 'fr' ? 'Homme' : 'Male'}</option>
                                                    <option value="female">{locale === 'zh' ? '女' : locale === 'fr' ? 'Femme' : 'Female'}</option>
                                                    <option value="other">{locale === 'zh' ? '其他' : locale === 'fr' ? 'Autre' : 'Other'}</option>
                                                    <option value="prefer_not_to_say">{locale === 'zh' ? '不愿透露' : locale === 'fr' ? 'Préfère ne pas dire' : 'Prefer not to say'}</option>
                                                </select>
                                            </div>

                                            {/* Address */}
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {locale === 'zh' ? '地址' : locale === 'fr' ? 'Adresse' : 'Address'} *
                                                </label>
                                                <textarea
                                                    required
                                                    rows={2}
                                                    value={urinalysisMedicalData.address}
                                                    onChange={(e) => setUrinalysisMedicalData({...urinalysisMedicalData, address: e.target.value})}
                                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                />
                                            </div>

                                            {/* Emergency Contact Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {locale === 'zh' ? '紧急联系人姓名' : locale === 'fr' ? 'Nom du contact d\'urgence' : 'Emergency Contact Name'} *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={urinalysisMedicalData.emergency_contact_name}
                                                    onChange={(e) => setUrinalysisMedicalData({...urinalysisMedicalData, emergency_contact_name: e.target.value})}
                                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                />
                                            </div>

                                            {/* Emergency Contact Phone */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {locale === 'zh' ? '紧急联系人电话' : locale === 'fr' ? 'Téléphone du contact d\'urgence' : 'Emergency Contact Phone'} *
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={urinalysisMedicalData.emergency_contact_number}
                                                    onChange={(e) => setUrinalysisMedicalData({...urinalysisMedicalData, emergency_contact_number: e.target.value})}
                                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                />
                                            </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Medical History Card */}
                                            <div className="md:col-span-2 mt-6">
                                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                                    <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                                                        <h3 className="text-xl font-semibold text-white flex items-center">
                                                            <Heart className="w-6 h-6 mr-2"/>
                                                            {locale === 'zh' ? '既往病史' : locale === 'fr' ? 'Antécédents médicaux' : 'Medical History'}
                                                        </h3>
                                                    </div>
                                                    <div className="p-6">
                                                        {/* Medical Conditions */}
                                                        <div className="space-y-4">
                                                {Object.entries(urinalysisMedicalData.medical_history).map(([key, condition]) => (
                                                    <div key={key} className="border border-gray-200 rounded-lg p-4">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <h4 className="text-base font-medium text-gray-900">
                                                                {locale === 'zh' ? 
                                                                    ({diabetes: '糖尿病', hypertension: '高血压', heart_disease: '心脏病', asthma_copd: '哮喘 / 慢阻肺', cancer: '癌症', kidney_disease: '肾病', liver_disease: '肝病', mental_health: '精神疾病', other: '其他'}[key]) :
                                                                    locale === 'fr' ?
                                                                    ({diabetes: 'Diabète', hypertension: 'Hypertension', heart_disease: 'Maladie cardiaque', asthma_copd: 'Asthme / MPOC', cancer: 'Cancer', kidney_disease: 'Maladie rénale', liver_disease: 'Maladie du foie', mental_health: 'Santé mentale', other: 'Autre'}[key]) :
                                                                    ({diabetes: 'Diabetes', hypertension: 'Hypertension', heart_disease: 'Heart Disease', asthma_copd: 'Asthma / COPD', cancer: 'Cancer', kidney_disease: 'Kidney Disease', liver_disease: 'Liver Disease', mental_health: 'Mental Health', other: 'Other'}[key])
                                                                }
                                                            </h4>
                                                            <div className="flex space-x-4">
                                                                <label className="flex items-center cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name={`medical_${key}`}
                                                                        checked={condition.hasCondition === false}
                                                                        onChange={() => {
                                                                            const newHistory = {...urinalysisMedicalData.medical_history};
                                                                            newHistory[key as keyof typeof newHistory] = {...condition, hasCondition: false};
                                                                            setUrinalysisMedicalData({...urinalysisMedicalData, medical_history: newHistory});
                                                                        }}
                                                                        className="mr-2 text-brand focus:ring-brand"
                                                                    />
                                                                    <span className="text-sm">{locale === 'zh' ? '否' : locale === 'fr' ? 'Non' : 'No'}</span>
                                                                </label>
                                                                <label className="flex items-center cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name={`medical_${key}`}
                                                                        checked={condition.hasCondition === true}
                                                                        onChange={() => {
                                                                            const newHistory = {...urinalysisMedicalData.medical_history};
                                                                            newHistory[key as keyof typeof newHistory] = {...condition, hasCondition: true};
                                                                            setUrinalysisMedicalData({...urinalysisMedicalData, medical_history: newHistory});
                                                                        }}
                                                                        className="mr-2 text-brand focus:ring-brand"
                                                                    />
                                                                    <span className="text-sm">{locale === 'zh' ? '是' : locale === 'fr' ? 'Oui' : 'Yes'}</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {condition.hasCondition && (
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    {locale === 'zh' ? '详情' : locale === 'fr' ? 'Détails' : 'Details'}
                                                                </label>
                                                                <textarea
                                                                    rows={2}
                                                                    value={condition.details}
                                                                    onChange={(e) => {
                                                                        const newHistory = {...urinalysisMedicalData.medical_history};
                                                                        newHistory[key as keyof typeof newHistory] = {...condition, details: e.target.value};
                                                                        setUrinalysisMedicalData({...urinalysisMedicalData, medical_history: newHistory});
                                                                    }}
                                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Surgical History Card */}
                                            <div className="md:col-span-2 mt-6">
                                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                                    <div className="bg-gradient-to-r from-brand to-blue-600 px-6 py-4 flex items-center justify-between">
                                                        <h3 className="text-xl font-semibold text-white flex items-center">
                                                            <Scissors className="w-6 h-6 mr-2"/>
                                                            {locale === 'zh' ? '手术史' : locale === 'fr' ? 'Antécédents chirurgicaux' : 'Surgical History'}
                                                        </h3>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setUrinalysisMedicalData({
                                                                    ...urinalysisMedicalData,
                                                                    surgical_history: [...urinalysisMedicalData.surgical_history, {surgery: '', year: '', hospital_surgeon: ''}]
                                                                });
                                                            }}
                                                            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors text-sm"
                                                        >
                                                            <Plus className="w-4 h-4"/>
                                                            <span>{locale === 'zh' ? '添加手术' : locale === 'fr' ? 'Ajouter' : 'Add Surgery'}</span>
                                                        </button>
                                                    </div>
                                                    <div className="p-6">
                                                {urinalysisMedicalData.surgical_history.length === 0 ? (
                                                    <p className="text-gray-500 text-center py-4 text-sm">
                                                        {locale === 'zh' ? '尚未添加手术。点击"添加手术"添加一个。' : locale === 'fr' ? 'Aucune chirurgie ajoutée. Cliquez sur "Ajouter" pour en ajouter une.' : 'No surgeries added. Click "Add Surgery" to add one.'}
                                                    </p>
                                                ) : (
                                                    <div className="space-y-4">
                                                        {urinalysisMedicalData.surgical_history.map((surgery, index) => (
                                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                                <div className="flex justify-between items-start mb-3">
                                                                    <h4 className="text-base font-medium text-gray-900">
                                                                        {locale === 'zh' ? `手术 #${index + 1}` : locale === 'fr' ? `Chirurgie #${index + 1}` : `Surgery #${index + 1}`}
                                                                    </h4>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setUrinalysisMedicalData({
                                                                                ...urinalysisMedicalData,
                                                                                surgical_history: urinalysisMedicalData.surgical_history.filter((_, i) => i !== index)
                                                                            });
                                                                        }}
                                                                        className="text-red-500 hover:text-red-700 flex items-center space-x-1 text-sm"
                                                                    >
                                                                        <Minus className="w-4 h-4"/>
                                                                        <span>{locale === 'zh' ? '删除' : locale === 'fr' ? 'Supprimer' : 'Remove'}</span>
                                                                    </button>
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            {locale === 'zh' ? '手术名称' : locale === 'fr' ? 'Chirurgie' : 'Surgery'}
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            value={surgery.surgery}
                                                                            onChange={(e) => {
                                                                                const newSurgeries = [...urinalysisMedicalData.surgical_history];
                                                                                newSurgeries[index].surgery = e.target.value;
                                                                                setUrinalysisMedicalData({...urinalysisMedicalData, surgical_history: newSurgeries});
                                                                            }}
                                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            {locale === 'zh' ? '年份' : locale === 'fr' ? 'Année' : 'Year'}
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            value={surgery.year}
                                                                            onChange={(e) => {
                                                                                const newSurgeries = [...urinalysisMedicalData.surgical_history];
                                                                                newSurgeries[index].year = e.target.value;
                                                                                setUrinalysisMedicalData({...urinalysisMedicalData, surgical_history: newSurgeries});
                                                                            }}
                                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            {locale === 'zh' ? '医院/医生' : locale === 'fr' ? 'Hôpital/Chirurgien' : 'Hospital/Surgeon'}
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            value={surgery.hospital_surgeon}
                                                                            onChange={(e) => {
                                                                                const newSurgeries = [...urinalysisMedicalData.surgical_history];
                                                                                newSurgeries[index].hospital_surgeon = e.target.value;
                                                                                setUrinalysisMedicalData({...urinalysisMedicalData, surgical_history: newSurgeries});
                                                                            }}
                                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Allergies Card */}
                                            <div className="md:col-span-2 mt-6">
                                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                                    <div className="bg-gradient-to-r from-brand to-blue-600 px-6 py-4 flex items-center justify-between">
                                                        <h3 className="text-xl font-semibold text-white flex items-center">
                                                            <AlertCircle className="w-6 h-6 mr-2"/>
                                                            {locale === 'zh' ? '过敏史' : locale === 'fr' ? 'Allergies' : 'Allergies'}
                                                        </h3>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setUrinalysisMedicalData({
                                                                    ...urinalysisMedicalData,
                                                                    allergies: [...urinalysisMedicalData.allergies, {allergen: '', reaction: ''}]
                                                                });
                                                            }}
                                                            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors text-sm"
                                                        >
                                                            <Plus className="w-4 h-4"/>
                                                            <span>{locale === 'zh' ? '添加过敏' : locale === 'fr' ? 'Ajouter' : 'Add Allergy'}</span>
                                                        </button>
                                                    </div>
                                                    <div className="p-6">
                                                {urinalysisMedicalData.allergies.length === 0 ? (
                                                    <p className="text-gray-500 text-center py-4 text-sm">
                                                        {locale === 'zh' ? '尚未添加过敏。点击"添加过敏"添加一个。' : locale === 'fr' ? 'Aucune allergie ajoutée. Cliquez sur "Ajouter" pour en ajouter une.' : 'No allergies added. Click "Add Allergy" to add one.'}
                                                    </p>
                                                ) : (
                                                    <div className="space-y-4">
                                                        {urinalysisMedicalData.allergies.map((allergy, index) => (
                                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                                <div className="flex justify-between items-start mb-3">
                                                                    <h4 className="text-base font-medium text-gray-900">
                                                                        {locale === 'zh' ? `过敏 #${index + 1}` : locale === 'fr' ? `Allergie #${index + 1}` : `Allergy #${index + 1}`}
                                                                    </h4>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setUrinalysisMedicalData({
                                                                                ...urinalysisMedicalData,
                                                                                allergies: urinalysisMedicalData.allergies.filter((_, i) => i !== index)
                                                                            });
                                                                        }}
                                                                        className="text-red-500 hover:text-red-700 flex items-center space-x-1 text-sm"
                                                                    >
                                                                        <Minus className="w-4 h-4"/>
                                                                        <span>{locale === 'zh' ? '删除' : locale === 'fr' ? 'Supprimer' : 'Remove'}</span>
                                                                    </button>
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            {locale === 'zh' ? '过敏原' : locale === 'fr' ? 'Allergène' : 'Allergen'}
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            value={allergy.allergen}
                                                                            onChange={(e) => {
                                                                                const newAllergies = [...urinalysisMedicalData.allergies];
                                                                                newAllergies[index].allergen = e.target.value;
                                                                                setUrinalysisMedicalData({...urinalysisMedicalData, allergies: newAllergies});
                                                                            }}
                                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            {locale === 'zh' ? '反应' : locale === 'fr' ? 'Réaction' : 'Reaction'}
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            value={allergy.reaction}
                                                                            onChange={(e) => {
                                                                                const newAllergies = [...urinalysisMedicalData.allergies];
                                                                                newAllergies[index].reaction = e.target.value;
                                                                                setUrinalysisMedicalData({...urinalysisMedicalData, allergies: newAllergies});
                                                                            }}
                                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Current Medications Card */}
                                            <div className="md:col-span-2 mt-6">
                                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                                    <div className="bg-gradient-to-r from-brand to-blue-600 px-6 py-4 flex items-center justify-between">
                                                        <h3 className="text-xl font-semibold text-white flex items-center">
                                                            <Pill className="w-6 h-6 mr-2"/>
                                                            {locale === 'zh' ? '当前用药' : locale === 'fr' ? 'Médicaments actuels' : 'Current Medications'}
                                                        </h3>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setUrinalysisMedicalData({
                                                                    ...urinalysisMedicalData,
                                                                    current_medications: [...urinalysisMedicalData.current_medications, {medication: '', dosage: '', frequency: ''}]
                                                                });
                                                            }}
                                                            className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors text-sm"
                                                        >
                                                            <Plus className="w-4 h-4"/>
                                                            <span>{locale === 'zh' ? '添加药物' : locale === 'fr' ? 'Ajouter' : 'Add Medication'}</span>
                                                        </button>
                                                    </div>
                                                    <div className="p-6">
                                                {urinalysisMedicalData.current_medications.length === 0 ? (
                                                    <p className="text-gray-500 text-center py-4 text-sm">
                                                        {locale === 'zh' ? '尚未添加药物。点击"添加药物"添加一个。' : locale === 'fr' ? 'Aucun médicament ajouté. Cliquez sur "Ajouter" pour en ajouter un.' : 'No medications added. Click "Add Medication" to add one.'}
                                                    </p>
                                                ) : (
                                                    <div className="space-y-4">
                                                        {urinalysisMedicalData.current_medications.map((medication, index) => (
                                                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                                                <div className="flex justify-between items-start mb-3">
                                                                    <h4 className="text-base font-medium text-gray-900">
                                                                        {locale === 'zh' ? `药物 #${index + 1}` : locale === 'fr' ? `Médicament #${index + 1}` : `Medication #${index + 1}`}
                                                                    </h4>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setUrinalysisMedicalData({
                                                                                ...urinalysisMedicalData,
                                                                                current_medications: urinalysisMedicalData.current_medications.filter((_, i) => i !== index)
                                                                            });
                                                                        }}
                                                                        className="text-red-500 hover:text-red-700 flex items-center space-x-1 text-sm"
                                                                    >
                                                                        <Minus className="w-4 h-4"/>
                                                                        <span>{locale === 'zh' ? '删除' : locale === 'fr' ? 'Supprimer' : 'Remove'}</span>
                                                                    </button>
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            {locale === 'zh' ? '药物名称' : locale === 'fr' ? 'Médicament' : 'Medication'}
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            value={medication.medication}
                                                                            onChange={(e) => {
                                                                                const newMedications = [...urinalysisMedicalData.current_medications];
                                                                                newMedications[index].medication = e.target.value;
                                                                                setUrinalysisMedicalData({...urinalysisMedicalData, current_medications: newMedications});
                                                                            }}
                                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            {locale === 'zh' ? '剂量' : locale === 'fr' ? 'Dosage' : 'Dosage'}
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            value={medication.dosage}
                                                                            onChange={(e) => {
                                                                                const newMedications = [...urinalysisMedicalData.current_medications];
                                                                                newMedications[index].dosage = e.target.value;
                                                                                setUrinalysisMedicalData({...urinalysisMedicalData, current_medications: newMedications});
                                                                            }}
                                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                            {locale === 'zh' ? '频率' : locale === 'fr' ? 'Fréquence' : 'Frequency'}
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            value={medication.frequency}
                                                                            onChange={(e) => {
                                                                                const newMedications = [...urinalysisMedicalData.current_medications];
                                                                                newMedications[index].frequency = e.target.value;
                                                                                setUrinalysisMedicalData({...urinalysisMedicalData, current_medications: newMedications});
                                                                            }}
                                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Family Medical History Card */}
                                            <div className="md:col-span-2 mt-6">
                                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                                    <div className="bg-gradient-to-r from-brand to-blue-600 px-6 py-4">
                                                        <h3 className="text-xl font-semibold text-white flex items-center">
                                                            <Users className="w-6 h-6 mr-2"/>
                                                            {locale === 'zh' ? '家族病史' : locale === 'fr' ? 'Antécédents familiaux' : 'Family Medical History'}
                                                        </h3>
                                                    </div>
                                                    <div className="p-6 space-y-4">
                                                        {['father', 'mother', 'siblings'].map((relation) => (
                                                            <div key={relation}>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    {locale === 'zh' ? 
                                                                        ({father: '父亲', mother: '母亲', siblings: '兄弟姐妹'}[relation]) :
                                                                        locale === 'fr' ?
                                                                        ({father: 'Père', mother: 'Mère', siblings: 'Frères et sœurs'}[relation]) :
                                                                        ({father: 'Father', mother: 'Mother', siblings: 'Siblings'}[relation])
                                                                    } - {locale === 'zh' ? '病史' : locale === 'fr' ? 'Antécédents' : 'Medical History'}
                                                                </label>
                                                                <textarea
                                                                    rows={2}
                                                                    value={urinalysisMedicalData.family_medical_history[relation as keyof FamilyHistory]}
                                                                    onChange={(e) => {
                                                                        setUrinalysisMedicalData({
                                                                            ...urinalysisMedicalData,
                                                                            family_medical_history: {
                                                                                ...urinalysisMedicalData.family_medical_history,
                                                                                [relation]: e.target.value
                                                                            }
                                                                        });
                                                                    }}
                                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm"
                                                                    placeholder={locale === 'zh' ? '输入病史...' : locale === 'fr' ? 'Entrez les antécédents...' : 'Enter medical history...'}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Consent Checkboxes Section */}
                                    <div className="md:col-span-2 space-y-3">
                                        {showUrinalysisMedicalForm && (
                                            <div className={`p-4 rounded-xl border-2 transition-colors ${
                                                error && (error.includes('医疗信息') || error.includes('Medical Information') || error.includes('informations médicales'))
                                                    ? 'bg-red-50 border-red-300'
                                                    : 'bg-gray-50 border-gray-200'
                                            }`}>
                                                <label className="flex items-start sm:items-center justify-center cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={agreedToMedicalConsent}
                                                        onChange={(e) => {
                                                            setAgreedToMedicalConsent(e.target.checked);
                                                            if (e.target.checked) {
                                                                setError(null);
                                                            }
                                                        }}
                                                        className="mt-0.5 sm:mt-0 w-4 h-4 text-brand border-gray-300 rounded focus:ring-2 focus:ring-brand/20 cursor-pointer flex-shrink-0"
                                                    />
                                                    <span className="ml-3 text-sm md:text-base text-gray-700 text-left">
                                                        {locale === 'zh' ? '我已阅读并同意 ' : locale === 'fr' ? 'J\'ai lu et j\'accepte le ' : 'I have read and agree to the '}
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowMedicalConsentModal(true)}
                                                            className="text-brand hover:text-brand/80 underline font-medium transition-colors"
                                                        >
                                                            {locale === 'zh' ? '医疗信息记录与保存同意书' : locale === 'fr' ? 'Consentement pour l\'enregistrement des informations médicales' : 'Medical Information Record Consent'}
                                                        </button>
                                                    </span>
                                                </label>
                                                {error && (error.includes('医疗信息') || error.includes('Medical Information') || error.includes('informations médicales')) && (
                                                    <div className="mt-3 text-red-600 text-sm text-center">
                                                        {error}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className={`p-4 rounded-xl border-2 transition-colors ${
                                            error && error === t('form.insuranceWaiver.required')
                                                ? 'bg-red-50 border-red-300'
                                                : 'bg-gray-50 border-gray-200'
                                        }`}>
                                            <label className="flex items-start sm:items-center justify-center cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={agreedToWaiver}
                                                    onChange={(e) => {
                                                        setAgreedToWaiver(e.target.checked);
                                                        if (e.target.checked && error === t('form.insuranceWaiver.required')) {
                                                            setError(null);
                                                        }
                                                    }}
                                                    className="mt-0.5 sm:mt-0 w-4 h-4 text-brand border-gray-300 rounded focus:ring-2 focus:ring-brand/20 cursor-pointer flex-shrink-0"
                                                />
                                                <span className="ml-3 text-sm md:text-base text-gray-700 text-left">
                                                    {t('form.insuranceWaiver.checkbox')}{' '}
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowWaiverModal(true)}
                                                        className="text-brand hover:text-brand/80 underline font-medium transition-colors"
                                                    >
                                                        {t('form.insuranceWaiver.link')}
                                                    </button>
                                                </span>
                                            </label>
                                            {error && error === t('form.insuranceWaiver.required') && (
                                                <div className="mt-3 text-red-600 text-sm text-center">
                                                    {error}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full p-4 text-white rounded-xl transition-all duration-200 text-sm md:text-base ${
                                                isSubmitting
                                                    ? 'bg-gray-400'
                                                    : 'bg-brand hover:bg-brand/90 shadow-lg hover:shadow-xl'
                                            }`}
                                        >
                                            {isSubmitting ? (
                                                <div className="flex items-center justify-center">
                                                    <div
                                                        className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                                    {t('form.submitting')}
                                                </div>
                                            ) : (
                                                t('form.submit')
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}