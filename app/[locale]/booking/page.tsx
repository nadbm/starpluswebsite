import { useTranslations } from "next-intl";
import BookingFlow from "@/components/BookingFlow";
import { Suspense } from "react";

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <Suspense fallback={<div>Loading...</div>}>
                    <BookingFlow />
                </Suspense>
            </div>
        </div>
    );
}