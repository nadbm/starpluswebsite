import { useTranslations } from "next-intl";
import BookingFlow from "@/components/BookingFlow";
import { Suspense } from "react";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";

export default function BookingPage() {
    const t = useTranslations('carousel');

    const slides = [
        {
            image: "https://images.unsplash.com/photo-1448697138198-9aa6d0d84bf4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: t("title1"),
            description: t("description1")
        },
        {
            image: "https://images.unsplash.com/photo-1640841932394-7e135c0c6c3c?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: t("title1"),
            description: t("description2")
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Carousel slides={slides} autoPlayInterval={5000} />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <Suspense fallback={<div>Loading...</div>}>
                    <BookingFlow />
                </Suspense>
            </div>
            <Footer/>
        </div>
    );
}