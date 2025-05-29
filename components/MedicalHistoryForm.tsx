'use client';

import React, {useState} from 'react';
import {useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';
import {useLocale} from 'next-intl';
import {
    User, Calendar, Phone, Mail, MapPin, Heart,
    Scissors, AlertCircle, Pill, Users, Plus,
    Minus, CheckCircle, Loader2
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

interface FormData {
    // Patient Information
    full_name: string;
    date_of_birth: string;
    gender: string;
    phone_number: string;
    email_address: string;
    address: string;
    emergency_contact_name: string;
    emergency_contact_number: string;

    // Medical History
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

    // Dynamic Arrays
    surgical_history: Surgery[];
    allergies: Allergy[];
    current_medications: Medication[];
    family_medical_history: FamilyHistory;
}

const MedicalHistoryForm = () => {
    const t = useTranslations('medicalForm');
    const router = useRouter();
    const locale = useLocale();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState<FormData>({
        full_name: '',
        date_of_birth: '',
        gender: '',
        phone_number: '',
        email_address: '',
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

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Required fields validation
        if (!formData.full_name) newErrors.full_name = t('validation.required');
        if (!formData.date_of_birth) newErrors.date_of_birth = t('validation.required');
        if (!formData.gender) newErrors.gender = t('validation.required');
        if (!formData.phone_number) newErrors.phone_number = t('validation.required');
        if (!formData.email_address) newErrors.email_address = t('validation.required');
        if (!formData.address) newErrors.address = t('validation.required');
        if (!formData.emergency_contact_name) newErrors.emergency_contact_name = t('validation.required');
        if (!formData.emergency_contact_number) newErrors.emergency_contact_number = t('validation.required');

        // Email validation
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
            const response = await fetch(ENDPOINTS.PATIENT_FORMS.SUBMIT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            setShowSuccess(true);
            setTimeout(() => {
                router.push(`/${locale}`);
            }, 3000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({general: 'Failed to submit form. Please try again.'});
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
                                    {t('patientInfo.fullName')} *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.full_name}
                                    onChange={(e) => setFormData(prev => ({...prev, full_name: e.target.value}))}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.full_name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
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
                                    onChange={(e) => setFormData(prev => ({...prev, gender: e.target.value}))}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="M">{t('patientInfo.genderOptions.M')}</option>
                                    <option value="F">{t('patientInfo.genderOptions.F')}</option>
                                    <option value="O">{t('patientInfo.genderOptions.O')}</option>
                                    <option value="N">{t('patientInfo.genderOptions.N')}</option>
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
                            <p className="text-gray-500 text-center py-8">No surgeries added yet. Click "Add Surgery" to
                                add one.</p>
                        ) : (
                            <div className="space-y-6">
                                {formData.surgical_history.map((surgery, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-medium text-gray-900">Surgery #{index + 1}</h3>
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
                            <p className="text-gray-500 text-center py-8">No allergies added yet. Click "Add Allergy" to
                                add one.</p>
                        ) : (
                            <div className="space-y-6">
                                {formData.allergies.map((allergy, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-medium text-gray-900">Allergy #{index + 1}</h3>
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
                            <p className="text-gray-500 text-center py-8">No medications added yet. Click "Add
                                Medication" to add one.</p>
                        ) : (
                            <div className="space-y-6">
                                {formData.current_medications.map((medication, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-medium text-gray-900">Medication
                                                #{index + 1}</h3>
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
                                        placeholder={`Enter medical conditions for ${relation}...`}
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
                </div>

                {errors.general && (
                    <p className="text-red-500 text-center mt-4">{errors.general}</p>
                )}
            </form>
        </div>
    );
};

export default MedicalHistoryForm;