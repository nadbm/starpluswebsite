// export const API_BASE_URL = 'https://api.starpluscentre.com';

// DEV
export const API_BASE_URL = 'http://127.0.0.1:8000';

export const ENDPOINTS = {
    APPOINTMENTS: {
        ALL_SERVICES: `${API_BASE_URL}/api/appointments/all-services/`,
        AVAILABLE_DAYS: `${API_BASE_URL}/api/appointments/availability/available_days/`,
        TIME_SLOTS: `${API_BASE_URL}/api/appointments/availability/time_slots/`,
        BOOK: `${API_BASE_URL}/api/appointments/appointments/`,
    },
    REVIEWS: {
        LIST: `${API_BASE_URL}/api/reviews/reviews/`,
        CREATE: `${API_BASE_URL}/api/reviews/reviews/`,
    },
    CONTACTS: {
        CREATE: `${API_BASE_URL}/api/contacts/contact/`,
    },
    PATIENT_FORMS: {
        SUBMIT: `${API_BASE_URL}/patient-forms/api/submit/`,
    }
};