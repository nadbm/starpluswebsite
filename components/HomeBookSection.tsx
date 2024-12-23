import {useTranslations} from "next-intl";
import Link from "next/link";

export default function HomeBookSection() {
    const t = useTranslations('bookNowSection');
    return (
        <>
            <div className="h-110 flex items-center justify-center bg-no-repeat bg-cover bg-center my-5"
                 style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/home/hc3.jpg")', backgroundPosition: "10% 25%",backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                <div className="container flex flex-col items-center justify-center px-4">
                    <h2 className="text-4xl font-bold text-white mb-4 text-center
            xx:text-2xl xs:text-3xl sm:text-4xl lg:text-5xl">
                        {t('title')}
                    </h2>
                    <p className="text-2xl mb-8 text-gray-200 text-center max-w-3xl
            xx:text-lg xs:text-xl sm:text-2xl lg:text-3xl">
                        {t('description')}
                    </p>
                    <Link href="/booking"
                          className="bg-brand hover:bg-brand/90 text-white rounded-md transition-all duration-300
                xx:text-sm xx:px-6 xx:py-3
                sm:text-lg sm:px-8 sm:py-4
                lg:text-xl lg:px-10 lg:py-5
                font-semibold shadow-lg hover:shadow-xl">
                        {t('button')}
                    </Link>
                </div>
            </div>
        </>
    )
}