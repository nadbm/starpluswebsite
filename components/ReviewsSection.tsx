'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

interface Review {
    id?: number;
    name: string;
    title: string;
    content: string;
    rating: number;
    created_at?: string;
}

const TEST_REVIEWS: Review[] = [
    {
        name: "Sarah Johnson",
        title: "Exceptional Care and Professionalism",
        content: "My experience at Starplus was outstanding. The physiotherapist was knowledgeable and caring. After just a few sessions, I noticed significant improvement in my condition.",
        rating: 5
    },
    {
        name: "Michael Chen",
        title: "Great Massage Therapy",
        content: "The massage therapist was excellent and really helped with my chronic back pain. The facility is clean and modern, and the staff is very professional.",
        rating: 5
    },
    {
        name: "Emily Wilson",
        title: "Professional and Caring Staff",
        content: "I've been coming here for physiotherapy for the past month. The improvement in my mobility has been remarkable. The staff is always friendly and supportive.",
        rating: 4
    },
    {
        name: "Robert Brown",
        title: "Highly Recommend Their Services",
        content: "The online consultation service was convenient and efficient. The doctor was thorough and took time to address all my concerns. Very satisfied with the care provided.",
        rating: 5
    },
    {
        name: "Lisa Martinez",
        title: "Excellent Naturopathy Services",
        content: "The naturopath was very knowledgeable and provided a comprehensive treatment plan. Really appreciate the holistic approach to healthcare.",
        rating: 4
    },
    {
        name: "David Thompson",
        title: "Top-Notch Healthcare Facility",
        content: "From the reception to the treatment, everything was professionally handled. The staff is well-trained and the facility is equipped with modern equipment.",
        rating: 5
    }
];

export default function ReviewsSection() {
    const t = useTranslations('reviews');
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        content: '',
        service: 1,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/reviews/reviews/');
                const data = await response.json();
                if (data.results) {
                    setReviews(data.results);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);

                setReviews(TEST_REVIEWS);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/api/reviews/reviews/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    rating,
                }),
            });

            if (!response.ok) {
                throw new Error(t('errors.submission'));
            }

            setFormData({
                name: '',
                title: '',
                content: '',
                service: 1,
            });
            setRating(0);
            setHoverRating(0);
            setIsModalOpen(false);

            try {
                const refreshResponse = await fetch('http://localhost:8000/api/reviews/reviews/');
                const refreshData = await refreshResponse.json();
                if (refreshData.results) {
                    setReviews(refreshData.results);
                }
            } catch (error) {
                const newReview = {
                    ...formData,
                    rating,
                    id: Math.random(),
                };
                setReviews(prev => [newReview, ...prev]);
            }
        } catch (err) {
            setError(t('errors.submission'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const StarRating = ({ isHover = false }: { isHover?: boolean }) => {
        const currentRating = isHover ? (hoverRating || rating) : rating;
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={`star-${star}`}
                        className={`w-6 h-6 cursor-pointer transition-colors 
                        ${star <= currentRating ? 'fill-brand text-brand' : 'text-gray-300'}`}
                        onClick={() => {
                            setRating(star);
                            setHoverRating(star);
                        }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                    />
                ))}
            </div>
        );
    };

    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
                <div className="md:flex md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                            {t('title')}
                        </h2>
                        <p className="mt-6 max-w-lg leading-relaxed text-gray-700">
                            {t('description')}
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-6 inline-flex shrink-0 items-center gap-2 rounded-lg border border-brand px-6 py-3 text-brand transition hover:bg-brand hover:text-white md:mt-0"
                    >
                        <span className="font-medium">{t('shareButton')}</span>
                        <Star className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {reviews.map((review, index) => (
                        <blockquote
                            key={review.id || `review-${index}`}
                            className="flex h-full flex-col justify-between bg-white p-6 shadow-lg rounded-xl sm:p-8"
                        >
                            <div>
                                <div className="flex gap-0.5 text-brand">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < review.rating ? 'fill-brand' : ''
                                            }`}
                                        />
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <p className="text-2xl font-bold text-brand sm:text-3xl">
                                        {review.title}
                                    </p>
                                    <p className="mt-4 leading-relaxed text-gray-700">
                                        {review.content}
                                    </p>
                                </div>
                            </div>

                            <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                                &mdash; {review.name}
                            </footer>
                        </blockquote>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl p-8 max-w-lg w-full m-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            {t('modal.title1')}
                        </h3>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('modal.rating')}
                                </label>
                                <StarRating isHover={true} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('modal.name')}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('modal.title2')}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('modal.content')}
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({ ...formData, content: e.target.value })
                                    }
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand"
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                                >
                                    {t('modal.cancel')}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || rating === 0}
                                    className={`px-4 py-2 text-white rounded-lg ${
                                        isSubmitting || rating === 0
                                            ? 'bg-gray-400'
                                            : 'bg-brand hover:bg-brand/90'
                                    }`}
                                >
                                    {isSubmitting ? t('modal.submitting') : t('modal.submit')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}