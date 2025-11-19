'use client';

import React, {useState} from 'react';
import {useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';
import {useLocale} from 'next-intl';
import {
    User, Calendar, Phone, Mail, MapPin, Heart,
    Scissors, AlertCircle, Pill, Users, Plus,
    Minus, CheckCircle, Loader2, Clock
} from 'lucide-react';
import {ENDPOINTS} from '@/constants/api';

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

interface TimeSlot {
    start: string;
    end: string;
    display: string;
}

interface AvailableDay {
    date: string;
    is_available: boolean;
    reason: string | null;
}

interface FormData {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | '';
    phone_number: string;
    email_address: string;
    address: string;
    emergency_contact_name: string;
    emergency_contact_number: string;
    appointment_date: string;
    appointment_time: string;
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

const UrineScreeningMedicalForm = () => {
    const t = useTranslations('medicalForm');
    const router = useRouter();
    const locale = useLocale();


    const parseDate = (dateString: string): Date => {

        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const getLocalizedText = (key: string, index?: number, relation?: string): string => {
        const texts: Record<string, Record<string, string>> = {
            en: {
                surgeryTitle: `Surgery #${index}`,
                allergyTitle: `Allergy #${index}`,
                medicationTitle: `Medication #${index}`,
                familyPlaceholder: `Enter medical conditions for ${relation}...`
            },
            fr: {
                surgeryTitle: `Chirurgie #${index}`,
                allergyTitle: `Allergie #${index}`,
                medicationTitle: `Médicament #${index}`,
                familyPlaceholder: `Entrez les conditions médicales pour ${relation === 'father' ? 'le père' : relation === 'mother' ? 'la mère' : 'les frères et sœurs'}...`
            },
            zh: {
                surgeryTitle: `手术 #${index}`,
                allergyTitle: `过敏 #${index}`,
                medicationTitle: `药物 #${index}`,
                familyPlaceholder: `输入${relation === 'father' ? '父亲' : relation === 'mother' ? '母亲' : '兄弟姐妹'}的病史...`
            }
        };
        return texts[locale]?.[key] || texts['en'][key] || '';
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [availableDays, setAvailableDays] = useState<AvailableDay[]>([]);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
    const [loadingAvailableDays, setLoadingAvailableDays] = useState(false);
    const [apiErrors, setApiErrors] = useState<{availableDays?: string, timeSlots?: string}>({});

    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        phone_number: '',
        email_address: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_number: '',
        appointment_date: '',
        appointment_time: '',
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

    React.useEffect(() => {
        fetchAvailableDays();
    
        const interval = setInterval(fetchAvailableDays, 5 * 60 * 1000);
        
        return () => clearInterval(interval);
    }, []);

    const fetchAvailableDays = async () => {
        setLoadingAvailableDays(true);
        setApiErrors(prev => ({ ...prev, availableDays: undefined }));
        try {
            const response = await fetch(ENDPOINTS.URINE_SCREENING.AVAILABLE_DAYS);
            if (response.ok) {
                const data = await response.json();
                setAvailableDays(data || []);
            } else {
                console.error('Failed to fetch available days:', response.status, response.statusText);
                setApiErrors(prev => ({ ...prev, availableDays: `Failed to fetch available days: ${response.status}` }));
            }
        } catch (error) {
            console.error('Error fetching available days:', error);
            setApiErrors(prev => ({ ...prev, availableDays: 'Network error while fetching available days' }));
        } finally {
            setLoadingAvailableDays(false);
        }
    };

    const fetchTimeSlots = async (date: string) => {
        setLoadingTimeSlots(true);
        setApiErrors(prev => ({ ...prev, timeSlots: undefined }));
        try {
            const response = await fetch(`${ENDPOINTS.URINE_SCREENING.TIME_SLOTS}?date=${date}`);
            if (response.ok) {
                const data = await response.json();

                setTimeSlots(data || []);
            } else {
                console.error('Failed to fetch time slots:', response.status, response.statusText);
                setApiErrors(prev => ({ ...prev, timeSlots: `Failed to fetch time slots: ${response.status}` }));
                setTimeSlots([]);
            }
        } catch (error) {
            console.error('Error fetching time slots:', error);
            setApiErrors(prev => ({ ...prev, timeSlots: 'Network error while fetching time slots' }));
            setTimeSlots([]);
        } finally {
            setLoadingTimeSlots(false);
        }
    };

    const handleDateChange = (date: string) => {
        setFormData(prev => ({...prev, appointment_date: date, appointment_time: ''}));
        if (date) {
            fetchTimeSlots(date);
        } else {
            setTimeSlots([]);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.first_name) newErrors.first_name = t('validation.required');
        if (!formData.last_name) newErrors.last_name = t('validation.required');
        if (!formData.date_of_birth) newErrors.date_of_birth = t('validation.required');
        if (!formData.gender) newErrors.gender = t('validation.required');
        if (!formData.phone_number) newErrors.phone_number = t('validation.required');
        if (!formData.email_address) newErrors.email_address = t('validation.required');
        if (!formData.address) newErrors.address = t('validation.required');
        if (!formData.emergency_contact_name) newErrors.emergency_contact_name = t('validation.required');
        if (!formData.emergency_contact_number) newErrors.emergency_contact_number = t('validation.required');
        if (!formData.appointment_date) newErrors.appointment_date = t('validation.required');
        if (!formData.appointment_time) newErrors.appointment_time = t('validation.required');

        if (formData.appointment_date) {
            const selectedDay = availableDays.find(day => day.date === formData.appointment_date);
            if (!selectedDay || !selectedDay.is_available) {
                newErrors.appointment_date = t('validation.dateNotAvailable') || 'Selected date is no longer available';
            }
        }

        if (formData.appointment_time) {
            const selectedTimeSlot = timeSlots.find(slot => slot.start === formData.appointment_time);
            if (!selectedTimeSlot) {
                newErrors.appointment_time = t('validation.timeNotAvailable') || 'Selected time slot is no longer available';
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email_address && !emailRegex.test(formData.email_address)) {
            newErrors.email_address = t('validation.email');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(ENDPOINTS.URINE_SCREENING.SUBMIT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Submit response error:', response.status, errorData);
                throw new Error(`Failed to submit form: ${response.status}`);
            }

            const responseData = await response.json();
            setShowSuccess(true);
            setTimeout(() => {
                router.push(`/${locale}`);
            }, 3000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({general: t('validation.submitError')});
        } finally {
            setIsSubmitting(false);
        }
    };

    const addSurgery = () => {
        setFormData(prev => ({
            ...prev,
            surgical_history: [...prev.surgical_history, {surgery: '', year: '', hospital_surgeon: ''}]
        }));
    };

    const removeSurgery = (index: number) => {
        setFormData(prev => ({
            ...prev,
            surgical_history: prev.surgical_history.filter((_, i) => i !== index)
        }));
    };

    const addAllergy = () => {
        setFormData(prev => ({
            ...prev,
            allergies: [...prev.allergies, {allergen: '', reaction: ''}]
        }));
    };

    const removeAllergy = (index: number) => {
        setFormData(prev => ({
            ...prev,
            allergies: prev.allergies.filter((_, i) => i !== index)
        }));
    };

    const addMedication = () => {
        setFormData(prev => ({
            ...prev,
            current_medications: [...prev.current_medications, {medication: '', dosage: '', frequency: ''}]
        }));
    };

    const removeMedication = (index: number) => {
        setFormData(prev => ({
            ...prev,
            current_medications: prev.current_medications.filter((_, i) => i !== index)
        }));
    };

    if (showSuccess) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500"/>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('success.title')}</h3>
                    <p className="text-gray-600 mb-6">{t('success.message')}</p>
                    <button
                        onClick={() => router.push(`/${locale}`)}
                        className="bg-brand hover:bg-brand/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        {t('success.backHome')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Patient Information Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-brand to-blue-600 px-8 py-6">
                        <div className="flex items-center space-x-3">
                            <User className="w-8 h-8 text-white"/>
                            <h2 className="text-2xl font-bold text-white">{t('sections.patient')}</h2>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('patientInfo.firstName')} *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.first_name}
                                    onChange={(e) => setFormData(prev => ({...prev, first_name: e.target.value}))}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('patientInfo.lastName')} *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.last_name}
                                    onChange={(e) => setFormData(prev => ({...prev, last_name: e.target.value}))}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('patientInfo.dateOfBirth')} *
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date_of_birth}
                                    onChange={(e) => setFormData(prev => ({...prev, date_of_birth: e.target.value}))}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.date_of_birth ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.date_of_birth &&
                                    <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('patientInfo.gender')} *
                                </label>
                                <select
                                    required
                                    value={formData.gender}
                                    onChange={(e) => setFormData(prev => ({...prev, gender: e.target.value as FormData['gender']}))}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">{t('patientInfo.selectGender')}</option>
                                    <option value="male">{t('patientInfo.genderOptions.M')}</option>
                                    <option value="female">{t('patientInfo.genderOptions.F')}</option>
                                    <option value="other">{t('patientInfo.genderOptions.O')}</option>
                                    <option value="prefer_not_to_say">{t('patientInfo.genderOptions.N')}</option>
                                </select>
                                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('patientInfo.phone')} *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone_number}
                                    onChange={(e) => setFormData(prev => ({...prev, phone_number: e.target.value}))}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.phone_number &&
                                    <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('patientInfo.email')} *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email_address}
                                    onChange={(e) => setFormData(prev => ({...prev, email_address: e.target.value}))}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.email_address ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.email_address &&
                                    <p className="text-red-500 text-sm mt-1">{errors.email_address}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('patientInfo.emergencyName')} *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.emergency_contact_name}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        emergency_contact_name: e.target.value
                                    }))}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.emergency_contact_name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.emergency_contact_name &&
                                    <p className="text-red-500 text-sm mt-1">{errors.emergency_contact_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('patientInfo.emergencyPhone')} *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.emergency_contact_number}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        emergency_contact_number: e.target.value
                                    }))}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.emergency_contact_number ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.emergency_contact_number &&
                                    <p className="text-red-500 text-sm mt-1">{errors.emergency_contact_number}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('patientInfo.address')} *
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.address}
                                    onChange={(e) => setFormData(prev => ({...prev, address: e.target.value}))}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointment Scheduling Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-brand to-blue-600 px-8 py-6">
                        <div className="flex items-center space-x-3">
                            <Clock className="w-8 h-8 text-white"/>
                            <h2 className="text-2xl font-bold text-white">{t('scheduling.title')}</h2>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Selected Appointment Summary */}
                        {(formData.appointment_date || formData.appointment_time) && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    <div className="text-sm text-green-800">
                                        <p className="font-medium">{t('scheduling.selectedAppointment') || 'Selected Appointment:'}</p>
                                        <div className="mt-1 space-y-1">
                                            {formData.appointment_date && (
                                                <p className="text-green-700">
                                                    <span className="font-medium">{t('scheduling.date') || 'Date:'}</span> {' '}
                                                    {parseDate(formData.appointment_date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'fr' ? 'fr-FR' : 'en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                        weekday: 'long'
                                                    })}
                                                </p>
                                            )}
                                            {formData.appointment_time && (
                                                <p className="text-green-700">
                                                    <span className="font-medium">{t('scheduling.time') || 'Time:'}</span> {' '}
                                                    {formData.appointment_time}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* API Error Recovery */}
                        {(apiErrors.availableDays || apiErrors.timeSlots) && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                    </div>
                                    <div className="text-sm text-red-800">
                                        <p className="font-medium mb-2">{t('scheduling.apiError.title') || 'Connection Issues Detected'}</p>
                                        <div className="space-y-2">
                                            {apiErrors.availableDays && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-red-700">{apiErrors.availableDays}</span>
                                                    <button
                                                        type="button"
                                                        onClick={fetchAvailableDays}
                                                        disabled={loadingAvailableDays}
                                                        className="text-sm text-red-600 hover:text-red-800 underline disabled:text-red-400"
                                                    >
                                                        {loadingAvailableDays ? t('scheduling.retrying') || 'Retrying...' : t('scheduling.retry') || 'Retry'}
                                                    </button>
                                                </div>
                                            )}
                                            {apiErrors.timeSlots && formData.appointment_date && (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-red-700">{apiErrors.timeSlots}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => fetchTimeSlots(formData.appointment_date)}
                                                        disabled={loadingTimeSlots}
                                                        className="text-sm text-red-600 hover:text-red-800 underline disabled:text-red-400"
                                                    >
                                                        {loadingTimeSlots ? t('scheduling.retrying') || 'Retrying...' : t('scheduling.retry') || 'Retry'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('scheduling.appointmentDate')} *
                                </label>

                                <select
                                    required
                                    value={formData.appointment_date}
                                    onChange={(e) => handleDateChange(e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.appointment_date ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">{t('scheduling.selectDate')}</option>
                                    {loadingAvailableDays ? (
                                        <option value="" disabled>
                                            {t('scheduling.loadingAvailableDays') || 'Loading available days...'}
                                        </option>
                                    ) : availableDays.length === 0 ? (
                                        <option value="">{t('scheduling.noAvailableDays') || 'No available days'}</option>
                                    ) : (
                                        availableDays
                                            .filter(day => day.is_available)
                                            .map((day) => {
                                                const parsedDate = parseDate(day.date);
                                                const formattedDate = parsedDate.toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'fr' ? 'fr-FR' : 'en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    weekday: 'long'
                                                });
                                                return (
                                                    <option key={day.date} value={day.date}>
                                                        {formattedDate}
                                                    </option>
                                                );
                                            })
                                    )}
                                </select>
                                {errors.appointment_date && <p className="text-red-500 text-sm mt-1">{errors.appointment_date}</p>}
                                {apiErrors.availableDays && (
                                    <div className="mt-1">
                                        <p className="text-red-500 text-sm">{apiErrors.availableDays}</p>
                                        <button
                                            type="button"
                                            onClick={fetchAvailableDays}
                                            className="text-sm text-brand hover:text-brand/80 underline mt-1"
                                        >
                                            {t('scheduling.retry') || 'Retry'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('scheduling.appointmentTime')} *
                                </label>


                                <select
                                    required
                                    value={formData.appointment_time}
                                    onChange={(e) => setFormData(prev => ({...prev, appointment_time: e.target.value}))}
                                    disabled={!formData.appointment_date || loadingTimeSlots}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.appointment_time ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">
                                        {loadingTimeSlots ? t('scheduling.loading') : t('scheduling.selectTime')}
                                    </option>
                                    {timeSlots.length === 0 && !loadingTimeSlots && formData.appointment_date && (
                                        <div className="mb-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <AlertCircle className="w-4 h-4 text-yellow-600" />
                                                <div className="text-sm text-yellow-800">
                                                    <p>{t('scheduling.noTimeSlotsWarning') || 'No time slots available for this date. Please select a different date.'}</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(prev => ({ ...prev, appointment_date: '', appointment_time: '' }));
                                                            setTimeSlots([]);
                                                        }}
                                                        className="text-yellow-700 hover:text-yellow-900 underline text-sm mt-1"
                                                    >
                                                        {t('scheduling.selectDifferentDate') || 'Select different date'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {timeSlots.map((slot) => (
                                        <option key={slot.start} value={slot.start}>
                                            {slot.display}
                                        </option>
                                    ))}
                                </select>
                                {errors.appointment_time && <p className="text-red-500 text-sm mt-1">{errors.appointment_time}</p>}
                                {apiErrors.timeSlots && (
                                    <div className="mt-1">
                                        <p className="text-red-500 text-sm">{apiErrors.timeSlots}</p>
                                        <button
                                            type="button"
                                            onClick={() => formData.appointment_date && fetchTimeSlots(formData.appointment_date)}
                                            className="text-sm text-brand hover:text-brand/80 underline mt-1"
                                        >
                                            {t('scheduling.retry') || 'Retry'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Medical History Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-6">
                        <div className="flex items-center space-x-3">
                            <Heart className="w-8 h-8 text-white"/>
                            <h2 className="text-2xl font-bold text-white">{t('sections.medical')}</h2>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="space-y-6">
                            {Object.entries(formData.medical_history).map(([key, condition]) => (
                                <div key={key} className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {t(`medicalHistory.${key}`)}
                                        </h3>
                                        <div className="flex space-x-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`medical_${key}`}
                                                    checked={condition.hasCondition === false}
                                                    onChange={() => setFormData(prev => ({
                                                        ...prev,
                                                        medical_history: {
                                                            ...prev.medical_history,
                                                            [key]: {...condition, hasCondition: false}
                                                        }
                                                    }))}
                                                    className="mr-2 text-brand focus:ring-brand"
                                                />
                                                {t('medicalHistory.no')}
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`medical_${key}`}
                                                    checked={condition.hasCondition === true}
                                                    onChange={() => setFormData(prev => ({
                                                        ...prev,
                                                        medical_history: {
                                                            ...prev.medical_history,
                                                            [key]: {...condition, hasCondition: true}
                                                        }
                                                    }))}
                                                    className="mr-2 text-brand focus:ring-brand"
                                                />
                                                {t('medicalHistory.yes')}
                                            </label>
                                        </div>
                                    </div>
                                    {condition.hasCondition && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t('medicalHistory.details')}
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={condition.details}
                                                onChange={(e) => setFormData(prev => ({
                                                    ...prev,
                                                    medical_history: {
                                                        ...prev.medical_history,
                                                        [key]: {...condition, details: e.target.value}
                                                    }
                                                }))}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Surgical History Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-brand to-blue-600 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Scissors className="w-8 h-8 text-white"/>
                                <h2 className="text-2xl font-bold text-white">{t('sections.surgical')}</h2>
                            </div>
                            <button
                                type="button"
                                onClick={addSurgery}
                                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                            >
                                <Plus className="w-5 h-5"/>
                                <span>{t('surgicalHistory.addSurgery')}</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-8">
                        {formData.surgical_history.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">{t('surgicalHistory.noSurgeries')}</p>
                        ) : (
                            <div className="space-y-6">
                                {formData.surgical_history.map((surgery, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-medium text-gray-900">{getLocalizedText('surgeryTitle', index + 1)}</h3>
                                            <button
                                                type="button"
                                                onClick={() => removeSurgery(index)}
                                                className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                                            >
                                                <Minus className="w-4 h-4"/>
                                                <span>{t('surgicalHistory.removeSurgery')}</span>
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('surgicalHistory.surgery')}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={surgery.surgery}
                                                    onChange={(e) => {
                                                        const newSurgeries = [...formData.surgical_history];
                                                        newSurgeries[index].surgery = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            surgical_history: newSurgeries
                                                        }));
                                                    }}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('surgicalHistory.year')}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={surgery.year}
                                                    onChange={(e) => {
                                                        const newSurgeries = [...formData.surgical_history];
                                                        newSurgeries[index].year = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            surgical_history: newSurgeries
                                                        }));
                                                    }}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('surgicalHistory.hospitalSurgeon')}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={surgery.hospital_surgeon}
                                                    onChange={(e) => {
                                                        const newSurgeries = [...formData.surgical_history];
                                                        newSurgeries[index].hospital_surgeon = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            surgical_history: newSurgeries
                                                        }));
                                                    }}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Allergies Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-brand to-blue-600 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <AlertCircle className="w-8 h-8 text-white"/>
                                <h2 className="text-2xl font-bold text-white">{t('sections.allergies')}</h2>
                            </div>
                            <button
                                type="button"
                                onClick={addAllergy}
                                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                            >
                                <Plus className="w-5 h-5"/>
                                <span>{t('allergies.addAllergy')}</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-8">
                        {formData.allergies.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">{t('allergies.noAllergies')}</p>
                        ) : (
                            <div className="space-y-6">
                                {formData.allergies.map((allergy, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-medium text-gray-900">{getLocalizedText('allergyTitle', index + 1)}</h3>
                                            <button
                                                type="button"
                                                onClick={() => removeAllergy(index)}
                                                className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                                            >
                                                <Minus className="w-4 h-4"/>
                                                <span>{t('allergies.removeAllergy')}</span>
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('allergies.allergen')}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={allergy.allergen}
                                                    onChange={(e) => {
                                                        const newAllergies = [...formData.allergies];
                                                        newAllergies[index].allergen = e.target.value;
                                                        setFormData(prev => ({...prev, allergies: newAllergies}));
                                                    }}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('allergies.reaction')}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={allergy.reaction}
                                                    onChange={(e) => {
                                                        const newAllergies = [...formData.allergies];
                                                        newAllergies[index].reaction = e.target.value;
                                                        setFormData(prev => ({...prev, allergies: newAllergies}));
                                                    }}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Current Medications Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-brand to-blue-600 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Pill className="w-8 h-8 text-white"/>
                                <h2 className="text-2xl font-bold text-white">{t('sections.medications')}</h2>
                            </div>
                            <button
                                type="button"
                                onClick={addMedication}
                                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                            >
                                <Plus className="w-5 h-5"/>
                                <span>{t('medications.addMedication')}</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-8">
                        {formData.current_medications.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">{t('medications.noMedications')}</p>
                        ) : (
                            <div className="space-y-6">
                                {formData.current_medications.map((medication, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-medium text-gray-900">{getLocalizedText('medicationTitle', index + 1)}</h3>
                                            <button
                                                type="button"
                                                onClick={() => removeMedication(index)}
                                                className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                                            >
                                                <Minus className="w-4 h-4"/>
                                                <span>{t('medications.removeMedication')}</span>
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('medications.medication')}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={medication.medication}
                                                    onChange={(e) => {
                                                        const newMedications = [...formData.current_medications];
                                                        newMedications[index].medication = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            current_medications: newMedications
                                                        }));
                                                    }}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('medications.dosage')}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={medication.dosage}
                                                    onChange={(e) => {
                                                        const newMedications = [...formData.current_medications];
                                                        newMedications[index].dosage = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            current_medications: newMedications
                                                        }));
                                                    }}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    {t('medications.frequency')}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={medication.frequency}
                                                    onChange={(e) => {
                                                        const newMedications = [...formData.current_medications];
                                                        newMedications[index].frequency = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            current_medications: newMedications
                                                        }));
                                                    }}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Family Medical History Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-brand to-blue-600 px-8 py-6">
                        <div className="flex items-center space-x-3">
                            <Users className="w-8 h-8 text-white"/>
                            <h2 className="text-2xl font-bold text-white">{t('sections.family')}</h2>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="space-y-6">
                            {['father', 'mother', 'siblings'].map((relation) => (
                                <div key={relation}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t(`familyHistory.${relation}`)} - {t('familyHistory.conditions')}
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.family_medical_history[relation as keyof FamilyHistory]}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            family_medical_history: {
                                                ...prev.family_medical_history,
                                                [relation]: e.target.value
                                            }
                                        }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                                        placeholder={getLocalizedText('familyPlaceholder', undefined, relation)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-12 py-4 text-white rounded-2xl text-lg font-semibold transition-all duration-200 ${
                            isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-brand to-blue-600 hover:from-brand/90 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                        }`}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center space-x-2">
                                <Loader2 className="w-6 h-6 animate-spin"/>
                                <span>{t('submitting')}</span>
                            </div>
                        ) : (
                            t('submit')
                        )}
                    </button>
                    
                    {/* Submit Instructions */}
                    <p className="text-sm text-gray-500 mt-4 max-w-2xl mx-auto">
                        {t('scheduling.submitInstructions') || 'After submitting, you will receive a confirmation email. Please keep this information for your records.'}
                    </p>
                    

                </div>

                {errors.general && (
                    <p className="text-red-500 text-center mt-4">{errors.general}</p>
                )}
            </form>
        </div>
    );
};

export default UrineScreeningMedicalForm;
