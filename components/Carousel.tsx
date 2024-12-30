'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
    slides: {
        image: string;
        title: string;
        description: string;
        ctaText?: string;
        ctaLink?: string;
    }[];
    autoPlayInterval?: number;
}

const Carousel = ({ slides, autoPlayInterval = 5000 }: CarouselProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [slides.length, autoPlayInterval]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="relative w-full h-110 overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 via-blue-800/40 to-blue-900/50" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <h2 className="font-bold tracking-wide mb-6
                xx:text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                                {slide.title}
                            </h2>
                            <p className="max-w-4xl mx-auto mb-8
                xx:text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl">
                                {slide.description}
                            </p>
                            {slide.ctaText && slide.ctaLink && (
                                            <a
                                                href={slide.ctaLink}
                                                className="inline-block bg-brand hover:bg-brand/90 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300
                                xx:text-sm xx:px-4 xx:py-2
                                xs:text-base xs:px-5 xs:py-2.5
                                sm:text-lg sm:px-6 sm:py-3
                                md:text-xl md:px-7 md:py-3.5
                                lg:text-2xl lg:px-8 lg:py-4"
                                            >
                                    {slide.ctaText}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;