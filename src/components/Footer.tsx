import Link from 'next/link';

const LIME = 'hsl(76,85%,67%)';

export default function Footer() {
  return (
    <footer className="relative z-40 bg-[#0A0A0A] text-white rounded-t-[36px] md:rounded-t-[64px] overflow-hidden border-t border-white/[0.06]">
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-40 w-[900px] h-[400px] rounded-full blur-[140px] opacity-[0.12] pointer-events-none" style={{ backgroundColor: LIME }} />

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-8 pt-16 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-12 lg:col-span-7">
            <p className="text-sm uppercase tracking-[0.25em] text-white/40">¿Tenés un proyecto en mente?</p>
            <a href="mailto:hola@codea.com.ar" className="group mt-4 inline-flex items-center gap-4 text-[2.1rem] sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] whitespace-nowrap">
              hola@codea.com.ar
              <span className="hidden sm:flex w-14 h-14 rounded-full items-center justify-center text-black transition-transform group-hover:rotate-[-45deg]" style={{ backgroundColor: LIME }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </a>
            <div className="mt-8">
              <a
                href="https://wa.me/5492616977056?text=Hola%20vengo%20desde%20la%20pagina%20oficial%20de%20Codea%20Desarrollos%2C%20estoy%20interesado%20en......"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full hover:bg-[#1ebe5a] transition-colors font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Contactar por WhatsApp
              </a>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-5 grid grid-cols-2 gap-8 lg:justify-items-end">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">Menú</span>
              <Link href="/" className="text-white/70 hover:text-white transition-colors">Inicio</Link>
              <Link href="/servicios" className="text-white/70 hover:text-white transition-colors">Servicios</Link>
              <Link href="/proyectos" className="text-white/70 hover:text-white transition-colors">Proyectos</Link>
              <Link href="/about" className="text-white/70 hover:text-white transition-colors">Sobre nosotros</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">Social</span>
              <a href="https://www.instagram.com/codea.desarrollos/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">Instagram ↗</a>
              <a href="https://www.tiktok.com/@codeadesarrollos" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">TikTok ↗</a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Codea Desarrollos. Diseñamos el futuro digital de tu empresa con tecnología de vanguardia.</p>
          <p className="text-center">GONZALEZ VICARIO ALVARO SANTINO – CUIT 20-46866708-9</p>
        </div>
      </div>

      <div
        aria-hidden
        className="relative select-none pointer-events-none text-center font-black leading-[0.78] tracking-[-0.07em] mt-6 -mb-[0.08em]"
        style={{
          fontSize: 'clamp(90px, 27vw, 420px)',
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 85%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        codea
      </div>
    </footer>
  );
}
