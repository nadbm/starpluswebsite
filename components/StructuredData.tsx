import Script from 'next/script'

interface StructuredDataProps {
  locale: string
}

const StructuredData = ({ locale }: StructuredDataProps) => {
  const getLocalizedContent = (locale: string) => {
    switch (locale) {
      case 'fr':
        return {
          name: "Centre de Santé Starplus",
          alternateName: ["Starplus Health Center", "Centre Starplus", "Starplus", "Starplus Montreal", "Starplus Québec"],
          description: "Services de soins de santé professionnels incluant physiothérapie, massothérapie, naturopathie, services de médecin généraliste, soutien en santé mentale, et soins médicaux complets à Montréal, Québec.",
          slogan: "Votre Santé, Notre Mission"
        }
      case 'zh':
        return {
          name: "Starplus健康中心",
          alternateName: ["Starplus Health Center", "星加健康中心", "蒙特利尔星加健康中心", "星加", "星加蒙特利尔", "Starplus"],
          description: "专业医疗保健服务，包括物理治疗、按摩治疗、自然疗法、全科医生服务、心理健康支持和魁北克蒙特利尔的综合医疗护理。",
          slogan: "您的健康，我们的使命"
        }
      default:
        return {
          name: "Starplus Health Center",
          alternateName: ["Starplus Centre", "Starplus Medical Center", "Starplus", "Starplus Montreal", "Starplus Quebec", "Starplus Health"],
          description: "Professional healthcare services including physiotherapy, massage therapy, naturopathy, GP services, mental health support, and comprehensive medical care in Montreal, Quebec.",
          slogan: "Your Health, Our Mission"
        }
    }
  }

  const localizedContent = getLocalizedContent(locale)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": localizedContent.name,
    "alternateName": localizedContent.alternateName,
    "description": localizedContent.description,
    "slogan": localizedContent.slogan,
    "url": "https://starpluscentre.com",
    "telephone": ["(514) 447-4786", "(514) 447-2175"],
    "email": "info@starpluscentre.com",
    "logo": "https://starpluscentre.com/logo/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "500, 998 Boul. Saint-Laurent",
      "addressLocality": "Montréal",
      "addressRegion": "QC",
      "postalCode": "H2Z 9Y9",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.5147",
      "longitude": "-73.6137"
    },
    "openingHours": [
      "Mo 10:00-16:00",
      "We 10:00-16:00",
      "Th 10:00-16:00", 
      "Fr 10:00-16:00",
      "Sa 10:00-13:00",
      "Su 10:00-16:00"
    ],
    "priceRange": "$$",
    "currenciesAccepted": "CAD",
    "paymentAccepted": "Cash, Credit Card, Debit Card, Insurance",
    "medicalSpecialty": [
      "Physiotherapy",
      "Massage Therapy",
      "Naturopathy",
      "General Practice",
      "Mental Health",
      "Nursing Services",
      "Pharmaceutical Consultation",
      "Nutritional Counseling",
      "Traditional Chinese Medicine",
      "Botox Services",
      "Vaccine Services",
      "Urinalysis Analysis"
    ],
    "hasMap": "https://maps.google.com/?q=500,+998+Boul.+Saint-Laurent,+Montréal,+QC,+H2Z+9Y9",
    "areaServed": [
      {
        "@type": "City",
        "name": "Montreal",
        "sameAs": "https://en.wikipedia.org/wiki/Montreal"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Quebec",
        "sameAs": "https://en.wikipedia.org/wiki/Quebec"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "45.5147",
        "longitude": "-73.6137"
      },
      "geoRadius": "50000"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": "Physiotherapy",
          "description": "Professional physiotherapy services including sports rehabilitation, orthopedic injury treatment, and personalized recovery plans"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": "Massage Therapy",
          "description": "Therapeutic massage services for relaxation, pain relief, and improved circulation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure", 
          "name": "Naturopathy",
          "description": "Natural healing treatments and holistic wellness consultations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": "General Practice",
          "description": "Primary healthcare services for individuals and families"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": "Mental Health Services", 
          "description": "Professional psychological support and counseling services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": "Traditional Chinese Medicine Consultation",
          "description": "Professional TCM diagnosis and consultation using traditional Chinese medicine principles to assess health conditions and provide personalized wellness recommendations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalProcedure",
          "name": "Urinalysis Analysis-Strip Test",
          "description": "Professional urinalysis services using strip test technology for rapid and accurate health screening"
        }
      }
    ],
    "employee": [
      {
        "@type": "Person",
        "name": "Qi Meng Sun",
        "jobTitle": "Physiotherapist",
        "description": "Experienced physiotherapist specializing in rehabilitation and pain management"
      }
    ],
    "founder": {
      "@type": "Organization",
      "description": "Founded through the unique partnership of an experienced clinical laboratory specialist and a forward-thinking successful businessman"
    },
    "knowsAbout": [
      "Healthcare",
      "Physiotherapy", 
      "Massage Therapy",
      "Naturopathy",
      "Pain Management",
      "Sports Rehabilitation",
      "Mental Health",
      "Preventive Care",
      "Holistic Medicine",
      "Family Medicine"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

export default StructuredData 