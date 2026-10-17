import Header from "@/components/Header";
import HomeLanding from "@/components/HomeLanding";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Codea Desarrollos',
      image: 'https://codeadesarrollos.com/logo.png',
      description: 'Desarrolladora de software desde Mendoza, Argentina para toda América. Creamos soluciones tecnológicas, sitios web y apps a medida.',
      url: 'https://codeadesarrollos.com',
      telephone: '+5492616977056',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mendoza',
        addressRegion: 'Mendoza',
        addressCountry: 'AR'
      },
      priceRange: '$$',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
          ],
          opens: '09:00',
          closes: '18:00'
        }
      ],
      sameAs: [
        'https://www.instagram.com/codea.desarrollos/',
        'https://www.tiktok.com/@codeadesarrollos'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Codea Desarrollos Hero Video',
      description: 'Video de presentación de Codea Desarrollos, mostrando nuestra visión y servicios de desarrollo de software.',
      thumbnailUrl: 'https://codeadesarrollos.com/hero-poster.jpg',
      uploadDate: '2024-01-01T00:00:00Z',
      contentUrl: 'https://codeadesarrollos.com/hero-video.mp4',
      embedUrl: 'https://codeadesarrollos.com/hero-video.mp4'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="w-full">
        <HomeLanding />
      </main>
      <Footer />
    </div>
  );
}
