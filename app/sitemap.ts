import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://starpluscentre.com'
  const languages = ['en', 'fr', 'zh']
  
  const basePages = [
    '',
    '/booking',
    '/expertise',
    '/medical-form'
  ]
  
  const urls: MetadataRoute.Sitemap = []
  
  languages.forEach(lang => {
    basePages.forEach(page => {
      urls.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : page === '/booking' ? 0.9 : 0.8,
        alternates: {
          languages: languages.reduce((acc, l) => {
            acc[l === 'zh' ? 'zh-CN' : `${l}-CA`] = `${baseUrl}/${l}${page}`
            return acc
          }, {} as Record<string, string>)
        }
      })
    })
  })
  
  const services = [
    'physiotherapy',
    'massage-therapy', 
    'naturopathy',
    'general-practice',
    'mental-health',
    'nursing-services',
    'pharmacy-consultation',
    'nutritionist-services',
    'botox-services',
    'vaccine-services'
  ]
  
  languages.forEach(lang => {
    services.forEach(service => {
      urls.push({
        url: `${baseUrl}/${lang}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: languages.reduce((acc, l) => {
            acc[l === 'zh' ? 'zh-CN' : `${l}-CA`] = `${baseUrl}/${l}/services/${service}`
            return acc
          }, {} as Record<string, string>)
        }
      })
    })
  })
  
  return urls
} 