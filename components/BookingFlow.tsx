'use client';

import React from 'react';
import {useTranslations} from "next-intl";
import {useState, useEffect} from "react";
import {MapPin, Car, Clock, Phone, Calendar, Users, Clock3} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useLocale} from 'next-intl';
import {ENDPOINTS} from "@/constants/api";

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
}

interface BookingForm {
    name: string;
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
                        Redirecting to homepage in {countdown} seconds...
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
        name: '',
        email: '',
        phone: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const infoCards = [
        {
            icon: Car,
            title: l('advantages.parking.title'),
            description: l('advantages.parking.description')
        },
        {
            icon: MapPin,
            title: l('advantages.location.title'),
            description: l('address.line1') + ', ' + l('address.line2')
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
        'Nursing Services': 'nursing',
        'Massage Therapy': 'massage',
        'Naturopathy': 'naturopathy',
        'Blood Draw Analysis': 'blood'
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
                isEmpty: false
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

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(ENDPOINTS.APPOINTMENTS.BOOK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service: selectedService.id,
                    date: selectedDate,
                    start_time: selectedTime.start,
                    end_time: selectedTime.end,
                    client_name: bookingForm.name,
                    client_email: bookingForm.email,
                    client_phone: bookingForm.phone,
                    notes: bookingForm.notes
                })
            });

            if (!response.ok) {
                throw new Error(t('errors.bookingError'));
            }

            setSuccess(true);
            setBookingForm({
                name: '',
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
                <div className="max-w-7xl mx-auto p-4 md:p-6">
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
                                    onClick={() => setSelectedService(service)}
                                    className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                                        selectedService?.id === service.id
                                            ? 'border-brand bg-brand/5 shadow-lg'
                                            : 'border-gray-200 hover:border-brand/50 hover:shadow-md'
                                    }`}
                                >
                                    <h3 className="font-medium text-base md:text-lg text-gray-800">
                                        {e(`${SERVICE_KEYS[service.name]}.title`)}
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-600 mt-2">
                                        {e(`${SERVICE_KEYS[service.name]}.description`)}
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
                                                }
                                            }}
                                        >
                                            {!day.isEmpty && (
                                                <>
                                                    <span>{day.date}</span>
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

                    {selectedDate && timeSlots.length > 0 && (
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
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('form.name')}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors text-sm md:text-base"
                                            value={bookingForm.name}
                                            onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
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