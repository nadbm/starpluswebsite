'use client';

import React from 'react';
import {useTranslations} from "next-intl";
import {useState, useEffect} from "react";

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

export default function BookingFlow() {
    const t = useTranslations('booking');
    const e = useTranslations('services2');
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

    // Fetch services on component mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/appointments/all-services/');
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

    // Fetch available days when service is selected
    useEffect(() => {
        if (selectedService) {
            const fetchAvailableDays = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(
                        `http://localhost:8000/api/appointments/availability/available_days/?service_id=${selectedService.id}`
                    );
                    const data: AvailableDay[] = await response.json();
                    setAvailableDays(data);
                    if (data.length > 0) {
                        const firstDate = new Date(data[0].date + 'T00:00:00');
                        setCurrentMonth(firstDate.toLocaleString('default', {month: 'long', year: 'numeric'}));
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
                `http://localhost:8000/api/appointments/availability/time_slots/?service_id=${selectedService.id}&date=${date}`
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
            const response = await fetch('http://localhost:8000/api/appointments/appointments/', {
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
        } catch (error) {
            console.error('Error making booking:', error);
            setError(t('errors.bookingError'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const getDayClasses = (day: CalendarDay): string => {
        const base = "w-full p-4 rounded-lg flex items-center justify-center transition-all duration-300 ";

        if (day.isEmpty) {
            return base + "invisible";
        }

        if (!day.isAvailable) {
            return base + "bg-gray-100 text-gray-400 cursor-not-allowed";
        }

        if (selectedDate === day.dateString) {
            return base + "bg-brand text-white shadow-lg";
        }

        return base + "hover:bg-brand/10 cursor-pointer";
    };

    const SERVICE_KEYS: Record<string, string> = {
        'Physiotherapy': 'physio',
        'General Practitioner': 'gp',
        'Online Consultation': 'online',
        'Nursing Services': 'nursing',
        'Massage Therapy': 'massage',
        'Naturopathy': 'naturopathy',
        'Blood Draw Analysis': 'blood'
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {t('success.title')}
                    </h2>
                    <p className="text-gray-600 mb-2">{t('success.message')}</p>
                    <p className="text-gray-600">{t('success.confirmation')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    {error}
                </div>
            )}

            {/* Service Selection */}
            <div className="bg-white rounded-xl shadow-lg mb-8">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {t('selectService')}
                    </h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                        <button
                            key={service.id}
                            onClick={() => setSelectedService(service)}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                selectedService?.id === service.id
                                    ? 'border-brand bg-brand/5'
                                    : 'border-gray-200 hover:border-brand/50'
                            }`}
                        >
                            <h3 className="font-medium text-lg">
                                {e(`${SERVICE_KEYS[service.name]}.title`)}
                            </h3>
                        </button>
                    ))}
                </div>
            </div>

            {/* Calendar Selection */}
            {selectedService && (
                <div className="bg-white rounded-xl shadow-lg mb-8">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {t('selectDate')}
                            </h2>
                            <div className="text-lg text-gray-600">
                                {currentMonth}
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {calendarDays.length === 0 ? (
                            <div className="text-center py-8">
                                <h3 className="text-xl font-medium text-gray-600">
                                    {t('noTimesAvailable')}
                                </h3>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-7 mb-4">
                                    {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
                                        <div key={day} className="text-center font-medium text-gray-500">
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
                                            {!day.isEmpty ? day.date : ''}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Time Slot Selection */}
            {selectedDate && timeSlots.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {t('selectTime')}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        {timeSlots.map((slot, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedTime(slot)}
                                className={`p-3 text-center rounded-lg border transition-colors duration-200 ${
                                    selectedTime === slot
                                        ? 'border-brand bg-brand/5'
                                        : 'border-gray-200 hover:border-brand hover:bg-brand/5'
                                }`}
                            >
                                {`${formatTime(slot.start)} - ${formatTime(slot.end)}`}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Booking Form */}
            {selectedTime && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                        {t('form.title')}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('form.name')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={bookingForm.name}
                                onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('form.email')}
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={bookingForm.email}
                                onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('form.phone')}
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={bookingForm.phone}
                                onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                            />
                        </div>

                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('form.notes')}
                            </label>
                            <textarea
                                id="notes"
                                rows={4}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={bookingForm.notes}
                                onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full p-4 text-white rounded-lg transition-all duration-200 ${
                                    isSubmitting
                                        ? 'bg-gray-400'
                                        : 'bg-brand hover:bg-brand/90'
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
            )}

            {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    {error}
                </div>
            )}

            {success && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
                    <h3 className="font-semibold">{t('success.title')}</h3>
                    <p>{t('success.message')}</p>
                    <p className="mt-2">{t('success.confirmation')}</p>
                </div>
            )}
        </div>
    );
}