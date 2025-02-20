import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";

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