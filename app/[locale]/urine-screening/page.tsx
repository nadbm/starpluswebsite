import Footer from "../../../components/Footer";
import { Metadata } from "next";
import { getSEOConfig, generatePageMetadata } from "@/lib/seo-utils";
import UrineScreeningHero from "@/components/UrineScreeningHero";
import UrineScreeningImportance from "@/components/UrineScreeningImportance";
import UrineScreeningDiseases from "@/components/UrineScreeningDiseases";
import UrineScreeningProcess from "@/components/UrineScreeningProcess";
import UrineScreeningPricing from "@/components/UrineScreeningPricing";
import UrineScreeningConvenience from "@/components/UrineScreeningConvenience";
import UrineScreeningWhyChoose from "@/components/UrineScreeningWhyChoose";
import UrineScreeningCTA from "@/components/UrineScreeningCTA";

interface PageProps {
    params: { locale: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const seoConfig = getSEOConfig(params.locale, 'urine-screening')
    return generatePageMetadata(seoConfig)
}

export default function UrineScreeningPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main>
                <UrineScreeningHero />
                <UrineScreeningImportance />
                <UrineScreeningDiseases />
                <UrineScreeningCTA />
                <UrineScreeningProcess />
                <UrineScreeningConvenience />
                <UrineScreeningPricing />
                <UrineScreeningWhyChoose />
            </main>
            <Footer/>
        </div>
    );
}
