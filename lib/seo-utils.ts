import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  locale: string
  ogTitle?: string
  ogDescription?: string
}

export function generatePageMetadata(config: SEOConfig): Metadata {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords.join(', '),
    openGraph: {
      title: config.ogTitle || config.title,
      description: config.ogDescription || config.description,
      type: 'website',
      locale: config.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: config.ogTitle || config.title,
      description: config.ogDescription || config.description,
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}

export function getSEOConfig(locale: string, pageType: string): SEOConfig {
  const configs: Record<string, Record<string, SEOConfig>> = {
    en: {
      home: {
        title: 'Starplus Health Center | Comprehensive Healthcare Services in Montreal',
        description: 'Professional healthcare services including physiotherapy, massage therapy, naturopathy, GP services, mental health support, and more. Located in Montreal, QC.',
        keywords: [
          'healthcare services Montreal',
          'physiotherapy Montreal', 
          'massage therapy Montreal',
          'naturopathy Montreal',
          'general practitioner Montreal',
          'mental health services Montreal',
          'Starplus Health Center',
          'Montreal health center',
          'Saint Laurent Boulevard clinic',
          'comprehensive healthcare Montreal'
        ],
        locale: 'en_CA'
      },
      booking: {
        title: 'Book Appointment | Starplus Health Center Montreal',
        description: 'Schedule your healthcare appointment online. Quick and easy booking for physiotherapy, massage therapy, naturopathy, and more healthcare services.',
        keywords: [
          'book appointment Montreal',
          'healthcare appointment booking',
          'physiotherapy appointment Montreal',
          'massage therapy booking',
          'online medical booking',
          'schedule healthcare appointment',
          'Starplus Health Center booking'
        ],
        locale: 'en_CA'
      },
      expertise: {
        title: 'Our Medical Team | Healthcare Professionals at Starplus Health Center',
        description: 'Meet our qualified healthcare professionals including physiotherapists, massage therapists, and naturopathic specialists in Montreal.',
        keywords: [
          'healthcare professionals Montreal',
          'physiotherapist Montreal',
          'massage therapist Montreal',
          'naturopathic doctor Montreal',
          'medical team Montreal',
          'Starplus Health Center staff'
        ],
        locale: 'en_CA'
      },
      'urine-screening': {
        title: 'Comprehensive Urine Screening | Disease Detection at Starplus Health Center Montreal',
        description: 'Advanced urinalysis testing for early disease detection. Screen for kidney disease, diabetes, UTI, and 15+ health conditions. Professional results in 24-72 hours. $300 CAD.',
        keywords: [
          'urine screening Montreal',
          'urinalysis testing Montreal',
          'urine test Montreal',
          'disease detection Montreal',
          'kidney disease screening',
          'diabetes screening',
          'UTI testing Montreal',
          'health screening Montreal',
          'medical testing Montreal',
          'Starplus Health Center',
          'comprehensive urine analysis',
          'early disease detection',
          'preventive healthcare Montreal'
        ],
        locale: 'en_CA'
      }
    },
    fr: {
      home: {
        title: 'Centre de Santé Starplus | Services de Soins de Santé Complets à Montréal',
        description: 'Services de soins de santé professionnels incluant physiothérapie, massothérapie, naturopathie, services de médecin généraliste, et plus. Situé à Montréal, QC.',
        keywords: [
          'services de santé Montréal',
          'physiothérapie Montréal',
          'massothérapie Montréal', 
          'naturopathie Montréal',
          'médecin généraliste Montréal',
          'services de santé mentale Montréal',
          'Centre de Santé Starplus',
          'centre de santé Montréal',
          'clinique Boulevard Saint-Laurent',
          'soins de santé complets Montréal'
        ],
        locale: 'fr_CA'
      },
      booking: {
        title: 'Prendre Rendez-vous | Centre de Santé Starplus Montréal',
        description: 'Planifiez votre rendez-vous de soins de santé en ligne. Réservation rapide et facile pour physiothérapie, massothérapie, naturopathie et plus.',
        keywords: [
          'prendre rendez-vous Montréal',
          'réservation soins de santé',
          'rendez-vous physiothérapie Montréal',
          'réservation massothérapie',
          'réservation médicale en ligne',
          'planifier rendez-vous santé',
          'réservation Centre Starplus'
        ],
        locale: 'fr_CA'
      },
      expertise: {
        title: 'Notre Équipe Médicale | Professionnels de la Santé au Centre Starplus',
        description: 'Rencontrez nos professionnels de la santé qualifiés incluant physiothérapeutes, massothérapeutes, et spécialistes naturopathes à Montréal.',
        keywords: [
          'professionnels de la santé Montréal',
          'physiothérapeute Montréal',
          'massothérapeute Montréal',
          'docteur naturopathe Montréal',
          'équipe médicale Montréal',
          'personnel Centre Starplus'
        ],
        locale: 'fr_CA'
      },
      'urine-screening': {
        title: 'Dépistage Urinaire Complet | Détection de Maladies au Centre Starplus Montréal',
        description: 'Tests d\'analyse d\'urine avancés pour la détection précoce de maladies. Dépistage pour maladie rénale, diabète, IVU, et 15+ conditions. Résultats professionnels en 24-72h. 300$ CAD.',
        keywords: [
          'dépistage urinaire Montréal',
          'analyse d\'urine Montréal',
          'test urinaire Montréal',
          'détection maladie Montréal',
          'dépistage maladie rénale',
          'dépistage diabète',
          'test IVU Montréal',
          'dépistage santé Montréal',
          'tests médicaux Montréal',
          'Centre Starplus',
          'analyse urine complète',
          'détection précoce maladie',
          'soins préventifs Montréal'
        ],
        locale: 'fr_CA'
      }
    },
    zh: {
      home: {
        title: 'Starplus健康中心 | 蒙特利尔综合医疗保健服务',
        description: '专业医疗保健服务，包括物理治疗、按摩治疗、自然疗法、全科医生服务、心理健康支持等。位于魁北克省蒙特利尔市。',
        keywords: [
          '蒙特利尔医疗保健服务',
          '蒙特利尔物理治疗',
          '蒙特利尔按摩治疗',
          '蒙特利尔自然疗法',
          '蒙特利尔全科医生',
          '蒙特利尔心理健康服务',
          'Starplus健康中心',
          '蒙特利尔健康中心',
          '圣劳伦大道诊所',
          '蒙特利尔综合医疗',
          '中文医疗服务蒙特利尔',
          '华人医生蒙特利尔'
        ],
        locale: 'zh_CN'
      },
      booking: {
        title: '预约挂号 | Starplus健康中心蒙特利尔',
        description: '在线预约医疗保健服务。快速便捷预约物理治疗、按摩治疗、自然疗法等医疗服务。',
        keywords: [
          '蒙特利尔预约挂号',
          '医疗预约',
          '蒙特利尔物理治疗预约',
          '按摩治疗预约',
          '在线医疗预约',
          '预约健康服务',
          'Starplus预约'
        ],
        locale: 'zh_CN'
      },
      expertise: {
        title: '我们的医疗团队 | Starplus健康中心医疗专家',
        description: '认识我们合格的医疗保健专家，包括物理治疗师、按摩治疗师和蒙特利尔的自然疗法专家。',
        keywords: [
          '蒙特利尔医疗专家',
          '蒙特利尔物理治疗师',
          '蒙特利尔按摩治疗师',
          '蒙特利尔自然疗法医生',
          '蒙特利尔医疗团队',
          'Starplus医疗人员'
        ],
        locale: 'zh_CN'
      },
      'urine-screening': {
        title: '全面尿液筛查 | Starplus健康中心蒙特利尔疾病检测',
        description: '先进尿液分析检测，早期疾病发现。筛查肾病、糖尿病、尿路感染等15+种疾病。24-72小时专业结果。300加元。',
        keywords: [
          '蒙特利尔尿液筛查',
          '蒙特利尔尿液分析',
          '蒙特利尔尿检',
          '蒙特利尔疾病检测',
          '肾病筛查',
          '糖尿病筛查',
          '蒙特利尔尿路感染检测',
          '蒙特利尔健康筛查',
          '蒙特利尔医疗检测',
          'Starplus健康中心',
          '全面尿液分析',
          '早期疾病发现',
          '蒙特利尔预防医疗',
          '华人医疗服务蒙特利尔'
        ],
        locale: 'zh_CN'
      }
    }
  }
  
  return configs[locale]?.[pageType] || configs.en.home
}

export function generateStructuredData(locale: string) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Starplus Health Center",
    "url": "https://starpluscentre.com",
    "telephone": "(514) 447-2175",
    "email": "info@starpluscentre.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "500, 998 Boul. Saint-Laurent",
      "addressLocality": "Montréal",
      "addressRegion": "QC", 
      "postalCode": "H2Z 9Y9",
      "addressCountry": "CA"
    }
  }
  
  const localizedData: Record<string, any> = {
    en: {
      ...baseData,
      "description": "Professional healthcare services including physiotherapy, massage therapy, naturopathy, GP services, mental health support, and comprehensive medical care in Montreal, Quebec.",
      "slogan": "Your Health, Our Mission"
    },
    fr: {
      ...baseData,
      "description": "Services de soins de santé professionnels incluant physiothérapie, massothérapie, naturopathie, services de médecin généraliste, soutien en santé mentale, et soins médicaux complets à Montréal, Québec.",
      "slogan": "Votre Santé, Notre Mission"
    },
    zh: {
      ...baseData,
      "description": "专业医疗保健服务，包括物理治疗、按摩治疗、自然疗法、全科医生服务、心理健康支持和魁北克蒙特利尔的综合医疗护理。",
      "slogan": "您的健康，我们的使命"
    }
  }
  
  return localizedData[locale] || localizedData.en
} 