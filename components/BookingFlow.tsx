'use client';

import React from 'react';
import {useTranslations} from "next-intl";
import {useState, useEffect} from "react";
import {MapPin, Car, Clock, Phone, Calendar, Users, Clock3} from 'lucide-react';
import {useRouter} from 'next/navigation';
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
}

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
        notes: ''
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
            description: "(514)-447-2175\ninfo@starpluscentre.com"
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

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(ENDPOINTS.APPOINTMENTS.ALL_SERVICES);
                const data: ServicesResponse = await response.json();
                const availableServices = data.results.filter(service => service.status === 1);
                setServices(availableServices);
            } catch (error) {
                console.error('Error fetching services:', error);
                setError(t('errors.loadingError'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

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

        setIsSubmitting(true);
        setError(null);

        let notesContent = bookingForm.notes;

        if (showVaccineOptions && selectedVaccineType) {
            notesContent = `Selected Vaccine: ${selectedVaccineType} (includes $25 nursing fee)\n\n${notesContent}`;
        }

        if (showPrescriptionUpload && prescriptionFile) {
            notesContent = `Prescription File Uploaded: ${notesContent}\n\n${prescriptionFile.name}`;
        }

        try {
            const requestData = {
                service: selectedService.id,
                date: selectedDate,
                start_time: selectedTime.start,
                end_time: selectedTime.end,
                client_first_name: bookingForm.firstName,
                client_last_name: bookingForm.lastName,
                client_email: bookingForm.email,
                client_phone: bookingForm.phone,
                notes: notesContent
            };

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
                notes: ''
            });

        } catch (error) {
            console.error('Error making booking:', error);
            setError(t('errors.bookingError'));
        } finally {
            setIsSubmitting(false);
        }
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
                                <p className="text-sm md:text-base text-gray-600">
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
                                        if (service.name === 'Urinalysis Analysis-Strip Test') {
                                            setShowUrinalysisRedirect(true);
                                            setSelectedService(null);
                                            setShowVaccineOptions(false);
                                            setShowPrescriptionUpload(false);
                                            setShowFollowUpInfo(false);
                                            setSelectedVaccineType(null);
                                            setPrescriptionFile(null);
                                        } else {
                                            setSelectedService(service);
                                            setShowVaccineOptions(service.name === 'Vaccine');
                                            setShowPrescriptionUpload(service.name === 'Blood Analysis');
                                            setShowFollowUpInfo(service.name === 'Online Consultation Follow-up');
                                            setShowUrinalysisRedirect(false);
                                            setSelectedVaccineType(null);
                                            setPrescriptionFile(null);
                                        }
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

                    {showUrinalysisRedirect && (
                        <div className="bg-white rounded-xl shadow-lg mb-8">
                            <div className="p-4 md:p-6 bg-brand rounded-t-xl">
                                <h3 className="text-xl md:text-2xl font-semibold text-white">
                                    {t('urinalysisRedirect.title')}
                                </h3>
                            </div>
                            <div className="p-4 md:p-6">
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <p className="text-blue-800">
                                            {t('urinalysisRedirect.description')}
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => {
                                                window.location.href = `/${locale}/urine-screening`;
                                            }}
                                            className="bg-brand hover:bg-brand/90 text-white px-6 py-3 rounded-xl transition-colors duration-200 font-medium"
                                        >
                                            {t('urinalysisRedirect.button')}
                                        </button>
                                    </div>
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
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm md:text-base"
                                            value={bookingForm.firstName}
                                            onChange={(e) => setBookingForm({...bookingForm, firstName: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('form.lastName')}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm md:text-base"
                                            value={bookingForm.lastName}
                                            onChange={(e) => setBookingForm({...bookingForm, lastName: e.target.value})}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('form.email')}
                                        </label>
                                        <input
                                            type="email"
                                            required
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
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm md:text-base"
                                            value={bookingForm.notes}
                                            onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                                        />
                                    </div>

                                    {showVaccineOptions && !selectedVaccineType && (
                                        <div className="md:col-span-2 text-red-600 text-sm">
                                            * Please select a vaccine type
                                        </div>
                                    )}

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