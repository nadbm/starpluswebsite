'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';

const PHOTOS = [
    '/photos/d378a05b11dde6d1ce57623b051a1404.jpg',
    '/photos/730e619eeea62bec38f0fbbb56fa8ca3.jpg',
    '/photos/b427559b349a149c19636799723f1158.jpg',
    '/photos/501c5efae72c22a71b49274eada7dec5.jpg',
    '/photos/98e5fd0a817cf7ffccc7515a3b4bd85a.jpg',
    '/photos/d5c36914546834e61bb851e0860ac299.jpg',
    '/photos/056533017217d547eddc04eab975c874.jpg',
    '/photos/62f3e52f0f1566ef04990ca1b5afb1f7.jpg',
    '/photos/d1130de5c70b05d4e94f3f9fa4582c24.jpg',
];

const GRID_ITEMS: { index: number; className: string }[] = [
    { index: 0, className: 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2' },
    { index: 1, className: 'col-span-1 row-span-1' },
    { index: 2, className: 'col-span-1 row-span-1' },
    { index: 3, className: 'col-span-1 row-span-1' },
    { index: 4, className: 'col-span-1 row-span-1' },
    { index: 5, className: 'col-span-1 row-span-1' },
    { index: 6, className: 'col-span-1 row-span-1' },
    { index: 7, className: 'col-span-1 row-span-1' },
    { index: 8, className: 'col-span-1 row-span-1' },
];

export default function PhotoGallery() {
    const t = useTranslations('gallery');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const closeLightbox = useCallback(() => setActiveIndex(null), []);

    const goToPrevious = useCallback(() => {
        setActiveIndex((current) =>
            current === null ? null : (current - 1 + PHOTOS.length) % PHOTOS.length
        );
    }, []);

    const goToNext = useCallback(() => {
        setActiveIndex((current) =>
            current === null ? null : (current + 1) % PHOTOS.length
        );
    }, []);

    useEffect(() => {
        if (activeIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeIndex, closeLightbox, goToPrevious, goToNext]);

    return (
        <>
            <section className="bg-white py-16" id="gallery">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 xx:text-2xl sm:text-3xl lg:text-4xl">
                            {t('title')}
                        </h2>
                        <span className="mt-4 block w-24 h-1 bg-brand mx-auto" />
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto xx:text-sm sm:text-base lg:text-lg">
                            {t('description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] gap-3 sm:gap-4">
                        {GRID_ITEMS.map(({ index, className }) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setActiveIndex(index)}
                                className={`group relative overflow-hidden rounded-xl shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${className}`}
                                aria-label={t('viewPhoto', { number: index + 1 })}
                            >
                                <Image
                                    src={PHOTOS[index]}
                                    alt={t('imageAlt', { number: index + 1 })}
                                    fill
                                    sizes="(max-width: 640px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 text-brand shadow-lg">
                                        <Expand className="w-5 h-5" />
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {activeIndex !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label={t('imageAlt', { number: activeIndex + 1 })}
                >
                    <button
                        type="button"
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        aria-label={t('close')}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                        className="absolute left-2 sm:left-4 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        aria-label={t('previous')}
                    >
                        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>

                    <div
                        className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={PHOTOS[activeIndex]}
                            alt={t('imageAlt', { number: activeIndex + 1 })}
                            fill
                            sizes="100vw"
                            className="object-contain"
                            priority
                        />
                    </div>

                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); goToNext(); }}
                        className="absolute right-2 sm:right-4 z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        aria-label={t('next')}
                    >
                        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>

                    <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium">
                        {activeIndex + 1} / {PHOTOS.length}
                    </p>
                </div>
            )}
        </>
    );
}
