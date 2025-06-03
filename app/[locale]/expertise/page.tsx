import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { getSEOConfig, generatePageMetadata } from "@/lib/seo-utils";

interface PageProps {
    params: { locale: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const seoConfig = getSEOConfig(params.locale, 'expertise')
    return generatePageMetadata(seoConfig)
}

export default function ExpertisePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main>
                <Expertise />
            </main>
            <Footer/>
        </div>
    );
}