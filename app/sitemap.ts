import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://manuelbarbiere.it'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1, // Priorità massima per la Home Page (Parrucchiere Seregno e Brianza)
    },
    {
      url: `${baseUrl}/chi-siamo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servizi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9, // I servizi sono molto importanti per la SEO
    },
    {
      url: `${baseUrl}/galleria`,
      lastModified: new Date(),
      changeFrequency: 'weekly', // Le foto cambiano spesso
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contatti`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8, // Priorità alta per conversioni e prenotazioni contatti
    },
  ]
}
