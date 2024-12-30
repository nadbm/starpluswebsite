import Footer from "../../components/Footer";
import VideoBanner from "@/components/VideoBanner";
import About from "@/components/About";
import HomeBookSection from "@/components/HomeBookSection";
import Services2 from "@/components/Services2";
import Location from "@/components/Location";
import ContactForm from "@/components/ContactForm";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main>
                <VideoBanner />
                <About />
                <Services2 />
                <HomeBookSection />
                <Location />
                <ReviewsSection />
                <ContactForm />
            </main>
            <Footer/>
        </div>
    );
}
