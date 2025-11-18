import Footer from "../../../components/Footer";
import { Metadata } from "next";
import { getSEOConfig, generatePageMetadata } from "@/lib/seo-utils";
import AcupunctureHero from "@/components/AcupunctureHero";
import AcupunctureBenefits from "@/components/AcupunctureBenefits";
import AcupunctureProcess from "@/components/AcupunctureProcess";
import AcupuncturePricing from "@/components/AcupuncturePricing";
import AcupunctureCTA from "@/components/AcupunctureCTA";

interface PageProps {
    params: { locale: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const seoConfig = getSEOConfig(params.locale, 'acupuncture')
    return generatePageMetadata(seoConfig)
}

export default function AcupuncturePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main>
                <AcupunctureHero />
                <AcupunctureBenefits />
                <AcupunctureCTA />
                <AcupunctureProcess />
                <AcupuncturePricing />
            </main>
            <Footer/>
        </div>
    );
}
