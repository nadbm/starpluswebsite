'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { User, Heart, Pill, CheckCircle, Loader2, Stethoscope, Calendar } from 'lucide-react';
import { ENDPOINTS } from '@/constants/api';

const InputField = React.memo(({ label, required, error, ...props }: any) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input {...props} className={`w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${error ? 'border-red-500' : 'border-gray-300'}`} />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
));

const CheckboxField = React.memo(({ label, checked, onChange }: any) => (
    <label className="flex items-start p-3 hover:bg-brand/5 rounded-lg cursor-pointer transition-colors group">
        <input type="checkbox" checked={checked} onChange={onChange} className="mt-0.5 w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand/20" />
        <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
    </label>
));

const AcupunctureMedicalForm = () => {
    const t = useTranslations('acupunctureForm');
    const router = useRouter();
    const locale = useLocale();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [availableDays, setAvailableDays] = useState<any[]>([]);
    const [timeSlots, setTimeSlots] = useState<any[]>([]);
    const [loadingDays, setLoadingDays] = useState(false);
    const [loadingSlots, setLoadingSlots] = useState(false);

    const [formData, setFormData] = useState({
        appointment_date: '',
        appointment_time: '',
        first_name: '', last_name: '', gender: '', dob_day: '', dob_month: '', dob_year: '',
        address_no: '', address_street: '', address_apt: '', address_city: '', postal_code: '',
        phone_home: '', phone_work: '', phone_work_ext: '', parent_tutor: '',
        insurance_no: '', csst_no: '', saaq_no: '', reason_visit: '',
        under_doctor_care: false, doctor_name: '', doctor_firstname: '', doctor_specialty: '',
        doctor_phone: '', doctor_diagnosis: '', doctor_treatment: '', doctor_reaction: '',
        other_professionals: false, prof1_name: '', prof1_firstname: '', prof1_specialty: '',
        prof1_phone: '', prof1_treatment: '', prof1_reaction: '',
        prof2_name: '', prof2_firstname: '', prof2_specialty: '',
        prof2_phone: '', prof2_treatment: '', prof2_reaction: '',
        heart_problems: false, pacemaker: false, blood_pressure: '',
        prolonged_bleeding: false, anemia: false, lung_problems: false, asthma: false,
        hay_fever: false, thyroid_issues: false, epilepsy: false, nervous_disorders: false,
        frequent_headaches: false, dizziness: false, ear_problems: false, eye_problems: false,
        skin_disease: false, arthritis: false, std: false, digestive_issues: false,
        stomach_ulcer: false, liver_problems: false, kidney_problems: false, diabetes: false,
        food_allergies: false, medication_allergies: false, hiv_positive: false, aids: false,
        radiotherapy: false, pregnant: false, prostheses_joint: false, prostheses_breast: false,
        dependency_alcohol: false, dependency_drugs: false, dependency_tobacco: false,
        dependency_caffeine: false, hospitalizations: '', anticoagulants: false,
        corticosteroids: false, medications: ''
    });

    React.useEffect(() => {
        fetchAvailableDays();
    }, []);

    const fetchAvailableDays = async () => {
        setLoadingDays(true);
        try {
            const response = await fetch(ENDPOINTS.ACUPUNCTURE.AVAILABLE_DAYS);
            if (response.ok) {
                const data = await response.json();
                setAvailableDays(data || []);
            }
        } catch (error) {
            console.error('Error fetching available days:', error);
        } finally {
            setLoadingDays(false);
        }
    };

    const fetchTimeSlots = async (date: string) => {
        setLoadingSlots(true);
        try {
            const response = await fetch(`${ENDPOINTS.ACUPUNCTURE.TIME_SLOTS}?date=${date}`);
            if (response.ok) {
                const data = await response.json();
                setTimeSlots(data || []);
            }
        } catch (error) {
            console.error('Error fetching time slots:', error);
            setTimeSlots([]);
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleDateChange = (date: string) => {
        setFormData(prev => ({ ...prev, appointment_date: date, appointment_time: '' }));
        if (date) {
            fetchTimeSlots(date);
        } else {
            setTimeSlots([]);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.appointment_date) newErrors.appointment_date = t('validation.required');
        if (!formData.appointment_time) newErrors.appointment_time = t('validation.required');
        if (!formData.first_name) newErrors.first_name = t('validation.required');
        if (!formData.last_name) newErrors.last_name = t('validation.required');
        if (!formData.gender) newErrors.gender = t('validation.required');
        if (!formData.reason_visit) newErrors.reason_visit = t('validation.required');
        setErrors(newErrors);
        
        // 如果有错误，滚动到第一个错误字段
        if (Object.keys(newErrors).length > 0) {
            setTimeout(() => {
                const firstErrorField = document.querySelector('.border-red-500');
                if (firstErrorField) {
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
        
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        const submitData = formData;

        try {
            const response = await fetch(ENDPOINTS.ACUPUNCTURE.SUBMIT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                
                // 将后端返回的字段错误映射到前端errors状态
                const backendErrors: Record<string, string> = {};
                Object.keys(errorData).forEach(key => {
                    const errorMessages = errorData[key];
                    if (Array.isArray(errorMessages)) {
                        backendErrors[key] = errorMessages[0]; // 取第一个错误信息
                    } else {
                        backendErrors[key] = errorMessages;
                    }
                });
                
                setErrors(backendErrors);
                setIsSubmitting(false);
                
                // 滚动到第一个错误字段
                setTimeout(() => {
                    const firstErrorField = document.querySelector('.border-red-500');
                    if (firstErrorField) {
                        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
                
                return; // 不抛出错误，让用户看到具体字段的错误
            }
            
            await response.json();
            setShowSuccess(true);
            setTimeout(() => router.push(`/${locale}`), 3000);
        } catch (error) {
            setErrors({ general: t('validation.submitError') });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('success.title')}</h3>
                    <p className="text-gray-600 mb-6">{t('success.message')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-brand to-brand/90 px-8 py-5">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{t('sections.appointment')}</h2>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('fields.appointmentDate')} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    required
                                    value={formData.appointment_date}
                                    onChange={(e) => handleDateChange(e.target.value)}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.appointment_date ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">{loadingDays ? t('fields.loading') : t('fields.selectDate')}</option>
                                    {availableDays.filter(day => day.is_available).map((day) => (
                                        <option key={day.date} value={day.date}>
                                            {new Date(day.date + 'T00:00:00').toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'fr' ? 'fr-FR' : 'en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                weekday: 'long'
                                            })}
                                        </option>
                                    ))}
                                </select>
                                {errors.appointment_date && <p className="text-red-500 text-xs mt-1">{errors.appointment_date}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    {t('fields.appointmentTime')} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    required
                                    value={formData.appointment_time}
                                    onChange={(e) => setFormData(prev => ({ ...prev, appointment_time: e.target.value }))}
                                    disabled={!formData.appointment_date || loadingSlots}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.appointment_time ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <option value="">{loadingSlots ? t('fields.loading') : t('fields.selectTime')}</option>
                                    {timeSlots.map((slot) => (
                                        <option key={slot.start} value={slot.start}>
                                            {slot.display || `${slot.start} - ${slot.end}`}
                                        </option>
                                    ))}
                                </select>
                                {errors.appointment_time && <p className="text-red-500 text-xs mt-1">{errors.appointment_time}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-brand to-brand/90 px-8 py-5">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{t('sections.patient')}</h2>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label={t('fields.lastName')} required value={formData.last_name} onChange={(e: any) => setFormData(prev => ({ ...prev, last_name: e.target.value }))} error={errors.last_name} />
                            <InputField label={t('fields.firstName')} required value={formData.first_name} onChange={(e: any) => setFormData(prev => ({ ...prev, first_name: e.target.value }))} error={errors.first_name} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('fields.gender')} <span className="text-red-500">*</span></label>
                                <div className={`flex gap-6 p-3 rounded-lg ${errors.gender ? 'border-2 border-red-500 bg-red-50' : ''}`}>
                                    <label className="flex items-center cursor-pointer">
                                        <input type="radio" value="M" checked={formData.gender === 'M'} onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))} className="w-4 h-4 text-brand border-gray-300 focus:ring-brand/20" />
                                        <span className="ml-2 text-sm text-gray-700">{t('fields.male')}</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input type="radio" value="F" checked={formData.gender === 'F'} onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))} className="w-4 h-4 text-brand border-gray-300 focus:ring-brand/20" />
                                        <span className="ml-2 text-sm text-gray-700">{t('fields.female')}</span>
                                    </label>
                                </div>
                                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('fields.dateOfBirth')}</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <input 
                                        type="text" 
                                        placeholder={t('fields.year')} 
                                        maxLength={4} 
                                        value={formData.dob_year} 
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^\d]/g, '');
                                            setFormData(prev => ({ ...prev, dob_year: value }));
                                        }} 
                                        className={`w-full px-4 py-2.5 border rounded-lg text-center focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.dob_year ? 'border-red-500' : 'border-gray-300'}`} 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder={t('fields.month')} 
                                        maxLength={2} 
                                        value={formData.dob_month} 
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^\d]/g, '');
                                            setFormData(prev => ({ ...prev, dob_month: value }));
                                        }} 
                                        className={`w-full px-4 py-2.5 border rounded-lg text-center focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.dob_month ? 'border-red-500' : 'border-gray-300'}`} 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder={t('fields.day')} 
                                        maxLength={2} 
                                        value={formData.dob_day} 
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/[^\d]/g, '');
                                            setFormData(prev => ({ ...prev, dob_day: value }));
                                        }} 
                                        className={`w-full px-4 py-2.5 border rounded-lg text-center focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.dob_day ? 'border-red-500' : 'border-gray-300'}`} 
                                    />
                                </div>
                                {(errors.dob_day || errors.dob_month || errors.dob_year) && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.dob_day || errors.dob_month || errors.dob_year}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('fields.address')}</label>
                            <div className="space-y-2">
                                <div className="grid grid-cols-4 gap-2">
                                    <input type="text" placeholder={t('fields.addressNo')} value={formData.address_no} onChange={(e) => setFormData(prev => ({ ...prev, address_no: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg" />
                                    <input type="text" placeholder={t('fields.street')} value={formData.address_street} onChange={(e) => setFormData(prev => ({ ...prev, address_street: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg col-span-2" />
                                    <input type="text" placeholder={t('fields.apt')} value={formData.address_apt} onChange={(e) => setFormData(prev => ({ ...prev, address_apt: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg" />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="text" placeholder={t('fields.city')} value={formData.address_city} onChange={(e) => setFormData(prev => ({ ...prev, address_city: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg" />
                                    <input type="text" placeholder={t('fields.postalCode')} value={formData.postal_code} onChange={(e) => setFormData(prev => ({ ...prev, postal_code: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label={t('fields.phoneHome')} type="tel" value={formData.phone_home} onChange={(e: any) => setFormData(prev => ({ ...prev, phone_home: e.target.value }))} />
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('fields.phoneWork')}</label>
                                <div className="flex gap-2">
                                    <input type="tel" value={formData.phone_work} onChange={(e) => setFormData(prev => ({ ...prev, phone_work: e.target.value }))} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg" />
                                    <input type="text" placeholder={t('fields.ext')} value={formData.phone_work_ext} onChange={(e) => setFormData(prev => ({ ...prev, phone_work_ext: e.target.value }))} className="w-20 px-4 py-2.5 border border-gray-300 rounded-lg text-center" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InputField label={t('fields.parentTutor')} value={formData.parent_tutor} onChange={(e: any) => setFormData(prev => ({ ...prev, parent_tutor: e.target.value }))} />
                            <InputField label={t('fields.insuranceNo')} value={formData.insurance_no} onChange={(e: any) => setFormData(prev => ({ ...prev, insurance_no: e.target.value }))} />
                            <InputField label={t('fields.csstNo')} value={formData.csst_no} onChange={(e: any) => setFormData(prev => ({ ...prev, csst_no: e.target.value }))} />
                        </div>
                        <InputField label={t('fields.saaqNo')} value={formData.saaq_no} onChange={(e: any) => setFormData(prev => ({ ...prev, saaq_no: e.target.value }))} />
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('fields.reasonForVisit')} <span className="text-red-500">*</span></label>
                            <textarea required rows={3} value={formData.reason_visit} onChange={(e) => setFormData(prev => ({ ...prev, reason_visit: e.target.value }))} className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors ${errors.reason_visit ? 'border-red-500' : 'border-gray-300'}`} />
                            {errors.reason_visit && <p className="text-red-500 text-xs mt-1">{errors.reason_visit}</p>}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-brand to-brand/90 px-8 py-5">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{t('sections.medicalHistory')}</h2>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="border-l-4 border-brand pl-6">
                            <label className="flex items-center text-gray-900 font-semibold mb-4 cursor-pointer">
                                <input type="checkbox" checked={formData.under_doctor_care} onChange={(e) => setFormData(prev => ({ ...prev, under_doctor_care: e.target.checked }))} className="mr-3 w-5 h-5 text-brand" />
                                {t('fields.underDoctorCare')}
                            </label>
                            {formData.under_doctor_care && (
                                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <input type="text" placeholder={t('fields.doctorLastName')} value={formData.doctor_name} onChange={(e) => setFormData(prev => ({ ...prev, doctor_name: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                        <input type="text" placeholder={t('fields.doctorFirstName')} value={formData.doctor_firstname} onChange={(e) => setFormData(prev => ({ ...prev, doctor_firstname: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                        <input type="text" placeholder={t('fields.specialty')} value={formData.doctor_specialty} onChange={(e) => setFormData(prev => ({ ...prev, doctor_specialty: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                    </div>
                                    <input type="tel" placeholder={t('fields.phone')} value={formData.doctor_phone} onChange={(e) => setFormData(prev => ({ ...prev, doctor_phone: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                    <textarea placeholder={t('fields.diagnosis')} rows={2} value={formData.doctor_diagnosis} onChange={(e) => setFormData(prev => ({ ...prev, doctor_diagnosis: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                    <textarea placeholder={t('fields.treatment')} rows={2} value={formData.doctor_treatment} onChange={(e) => setFormData(prev => ({ ...prev, doctor_treatment: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                    <textarea placeholder={t('fields.reaction')} rows={2} value={formData.doctor_reaction} onChange={(e) => setFormData(prev => ({ ...prev, doctor_reaction: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                </div>
                            )}
                        </div>
                        <div className="border-l-4 border-brand/60 pl-6">
                            <label className="flex items-center text-gray-900 font-semibold mb-4 cursor-pointer">
                                <input type="checkbox" checked={formData.other_professionals} onChange={(e) => setFormData(prev => ({ ...prev, other_professionals: e.target.checked }))} className="mr-3 w-5 h-5 text-brand" />
                                {t('fields.otherProfessionals')}
                            </label>
                            {formData.other_professionals && (
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <input type="text" placeholder={t('fields.lastName')} value={formData.prof1_name} onChange={(e) => setFormData(prev => ({ ...prev, prof1_name: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                            <input type="text" placeholder={t('fields.firstName')} value={formData.prof1_firstname} onChange={(e) => setFormData(prev => ({ ...prev, prof1_firstname: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                            <input type="text" placeholder={t('fields.specialty')} value={formData.prof1_specialty} onChange={(e) => setFormData(prev => ({ ...prev, prof1_specialty: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                        </div>
                                        <input type="tel" placeholder={t('fields.phone')} value={formData.prof1_phone} onChange={(e) => setFormData(prev => ({ ...prev, prof1_phone: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                        <textarea placeholder={t('fields.treatmentReceived')} rows={2} value={formData.prof1_treatment} onChange={(e) => setFormData(prev => ({ ...prev, prof1_treatment: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                        <textarea placeholder={t('fields.reaction')} rows={2} value={formData.prof1_reaction} onChange={(e) => setFormData(prev => ({ ...prev, prof1_reaction: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <input type="text" placeholder={t('fields.lastName')} value={formData.prof2_name} onChange={(e) => setFormData(prev => ({ ...prev, prof2_name: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                            <input type="text" placeholder={t('fields.firstName')} value={formData.prof2_firstname} onChange={(e) => setFormData(prev => ({ ...prev, prof2_firstname: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                            <input type="text" placeholder={t('fields.specialty')} value={formData.prof2_specialty} onChange={(e) => setFormData(prev => ({ ...prev, prof2_specialty: e.target.value }))} className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                        </div>
                                        <input type="tel" placeholder={t('fields.phone')} value={formData.prof2_phone} onChange={(e) => setFormData(prev => ({ ...prev, prof2_phone: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                        <textarea placeholder={t('fields.treatmentReceived')} rows={2} value={formData.prof2_treatment} onChange={(e) => setFormData(prev => ({ ...prev, prof2_treatment: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                        <textarea placeholder={t('fields.reaction')} rows={2} value={formData.prof2_reaction} onChange={(e) => setFormData(prev => ({ ...prev, prof2_reaction: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-brand to-brand/90 px-8 py-5">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{t('sections.conditions')}</h2>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            {[
                                { key: 'heart_problems', label: t('conditions.heartProblems') },
                                { key: 'pacemaker', label: t('conditions.pacemaker') },
                                { key: 'prolonged_bleeding', label: t('conditions.prolongedBleeding') },
                                { key: 'anemia', label: t('conditions.anemia') },
                                { key: 'lung_problems', label: t('conditions.lungProblems') },
                                { key: 'asthma', label: t('conditions.asthma') },
                                { key: 'hay_fever', label: t('conditions.hayFever') },
                                { key: 'thyroid_issues', label: t('conditions.thyroidIssues') },
                                { key: 'epilepsy', label: t('conditions.epilepsy') },
                                { key: 'nervous_disorders', label: t('conditions.nervousDisorders') },
                                { key: 'frequent_headaches', label: t('conditions.frequentHeadaches') },
                                { key: 'dizziness', label: t('conditions.dizziness') },
                                { key: 'ear_problems', label: t('conditions.earProblems') },
                                { key: 'eye_problems', label: t('conditions.eyeProblems') },
                                { key: 'skin_disease', label: t('conditions.skinDisease') },
                                { key: 'arthritis', label: t('conditions.arthritis') },
                                { key: 'std', label: t('conditions.std') },
                                { key: 'digestive_issues', label: t('conditions.digestiveIssues') },
                                { key: 'stomach_ulcer', label: t('conditions.stomachUlcer') },
                                { key: 'liver_problems', label: t('conditions.liverProblems') },
                                { key: 'kidney_problems', label: t('conditions.kidneyProblems') },
                                { key: 'diabetes', label: t('conditions.diabetes') },
                                { key: 'food_allergies', label: t('conditions.foodAllergies') },
                                { key: 'medication_allergies', label: t('conditions.medicationAllergies') },
                                { key: 'hiv_positive', label: t('conditions.hivPositive') },
                                { key: 'aids', label: t('conditions.aids') },
                                { key: 'radiotherapy', label: t('conditions.radiotherapy') },
                                { key: 'pregnant', label: t('conditions.pregnant') },
                                { key: 'prostheses_joint', label: t('conditions.prosthesesJoint') },
                                { key: 'prostheses_breast', label: t('conditions.prosthesesBreast') }
                            ].map(({ key, label }) => (
                                <CheckboxField key={key} label={label} checked={formData[key as keyof typeof formData] as boolean} onChange={(e: any) => setFormData(prev => ({ ...prev, [key]: e.target.checked }))} />
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">{t('fields.bloodPressure')}</label>
                            <div className="flex gap-6">
                                <label className="flex items-center cursor-pointer">
                                    <input type="radio" value="high" checked={formData.blood_pressure === 'high'} onChange={(e) => setFormData(prev => ({ ...prev, blood_pressure: e.target.value }))} className="w-4 h-4 text-brand" />
                                    <span className="ml-2 text-sm text-gray-700">{t('fields.high')}</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input type="radio" value="low" checked={formData.blood_pressure === 'low'} onChange={(e) => setFormData(prev => ({ ...prev, blood_pressure: e.target.value }))} className="w-4 h-4 text-brand" />
                                    <span className="ml-2 text-sm text-gray-700">{t('fields.low')}</span>
                                </label>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">{t('fields.dependencies')}</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['alcohol', 'drugs', 'tobacco', 'caffeine'].map((dep) => (
                                    <CheckboxField key={dep} label={t(`fields.${dep}`)} checked={formData[`dependency_${dep}` as keyof typeof formData] as boolean} onChange={(e: any) => setFormData(prev => ({ ...prev, [`dependency_${dep}`]: e.target.checked }))} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-brand to-brand/90 px-8 py-5">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <Pill className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{t('sections.medications')}</h2>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('fields.hospitalizations')}</label>
                            <textarea rows={4} placeholder={t('fields.hospitalizationsPlaceholder')} value={formData.hospitalizations} onChange={(e) => setFormData(prev => ({ ...prev, hospitalizations: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-brand/30 cursor-pointer transition-colors">
                                <input type="checkbox" checked={formData.anticoagulants} onChange={(e) => setFormData(prev => ({ ...prev, anticoagulants: e.target.checked }))} className="mr-3 w-5 h-5 text-brand" />
                                <span className="text-sm font-medium text-gray-700">{t('fields.anticoagulants')}</span>
                            </label>
                            <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-brand/30 cursor-pointer transition-colors">
                                <input type="checkbox" checked={formData.corticosteroids} onChange={(e) => setFormData(prev => ({ ...prev, corticosteroids: e.target.checked }))} className="mr-3 w-5 h-5 text-brand" />
                                <span className="text-sm font-medium text-gray-700">{t('fields.corticosteroids')}</span>
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{t('fields.medications')}</label>
                            <textarea rows={4} placeholder={t('fields.medicationsPlaceholder')} value={formData.medications} onChange={(e) => setFormData(prev => ({ ...prev, medications: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                </div>

                {errors.general && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                        <p className="text-red-700 font-medium">{errors.general}</p>
                    </div>
                )}

                <button type="submit" disabled={isSubmitting} className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand hover:bg-brand/90 text-white shadow-lg hover:shadow-xl'}`}>
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            {t('submitting')}
                        </div>
                    ) : (
                        t('submit')
                    )}
                </button>
            </form>
        </div>
    );
};

export default AcupunctureMedicalForm;
