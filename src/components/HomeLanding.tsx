"use client";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useModal } from "@/context/ModalContext";
import { proyectos } from "@/lib/proyectos";

gsap.registerPlugin(ScrollTrigger);

const LIME = "hsl(76,85%,67%)";
const WHATSAPP = "https://wa.me/5492616977056?text=Hola%20vengo%20desde%20la%20pagina%20oficial%20de%20Codea%20Desarrollos%2C%20estoy%20interesado%20en......";

const byslug = (slug: string) => proyectos.find((p) => p.slug === slug)!;

const CLIENTES = [
  { src: "/clients/birita.svg", alt: "La Birrita" },
  { src: "/clients/elsitio.svg", alt: "El Sitio Restó" },
  { src: "/clients/lithium.svg", alt: "Lithium" },
  { src: "/clients/move.svg", alt: "Move" },
  { src: "/clients/restobar.svg", alt: "Staff Catering" },
  { src: "/clients/sune_v2.svg", alt: "Sune" },
  { src: "/clients/wine.svg", alt: "Wine" },
];

const PASOS = [
  { n: "01", t: "Análisis", d: "Entendemos tus necesidades y diseñamos una estrategia eficiente con una arquitectura sólida, asegurando que tu idea sea escalable y sostenible a largo plazo." },
  { n: "02", t: "Desarrollo", d: "Convertimos tu problema en una solución, creando aplicaciones robustas con tecnologías modernas como React, .NET, Flutter, enfocándonos en alto rendimiento." },
  { n: "03", t: "Despliegue", d: "Entregamos un MVP desplegado y listo para usar, asegurando su correcto funcionamiento con pruebas finales y optimizaciones para ofrecer una experiencia fluida y eficiente." },
];

const STACK = ["React", "Next.js", ".NET", "Flutter", "Supabase", "Vercel"];

const STATEMENT: Array<{ t: string; serif?: boolean }> = [
  { t: "Los grandes" },
  { t: "productos", serif: true },
  { t: "no nacen" },
  { t: "por accidente.", serif: true },
  { t: "Nacen de un método, de un diseño pensado y de código que" },
  { t: "escala", serif: true },
  { t: "con tu negocio." },
];

// ─── Piezas visuales ──────────────────────────────────────────────────────
function Serif({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-normal italic ${className}`} style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", letterSpacing: "-0.02em" }}>
      {children}
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: LIME }} />
      {children}
    </span>
  );
}

function Browser({ src, alt, url, className = "", imgClassName = "", style }: { src: string; alt: string; url: string; className?: string; imgClassName?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-[16px] overflow-hidden bg-[#141414] border border-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ${className}`} style={style}>
      <div className="flex items-center gap-1.5 px-3.5 h-8 border-b border-white/[0.06]">
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />)}
        <span className="ml-3 h-5 px-3 rounded-full bg-white/[0.06] text-[10px] text-white/45 flex items-center truncate max-w-[60%]">{url}</span>
      </div>
      <div className="overflow-hidden">
        <img src={src} alt={alt} loading="lazy" className={`block w-full h-auto ${imgClassName}`} />
      </div>
    </div>
  );
}

function PhoneShot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative aspect-[9/19] rounded-[2.2rem] bg-black border-[7px] border-[#1a1a1a] ring-1 ring-white/10 overflow-hidden shadow-[0_40px_80px_-25px_rgba(0,0,0,0.9)] ${className}`}>
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[32%] h-[18px] bg-black rounded-full z-10" />
      <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover object-top bg-white" />
    </div>
  );
}

function ArrowBtn({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-[-45deg] ${dark ? "bg-black text-white" : "bg-white text-black"}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </span>
  );
}

const grain = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")";

export default function HomeLanding() {
  const { openModal } = useModal();
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ── Hero ───────────────────────────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from("[data-hero-eyebrow]", { autoAlpha: 0, y: 16, duration: 0.6, ease: "power3.out" })
      .from("[data-hero-word]", { yPercent: 110, duration: 1, stagger: 0.06, ease: "power4.out" }, "-=0.3")
      .from("[data-hero-sub]", { autoAlpha: 0, y: 20, duration: 0.7, ease: "power3.out" }, "-=0.6")
      .from("[data-hero-btn]", { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.5")
      .from("[data-hero-shot]", { autoAlpha: 0, y: 120, rotate: 0, duration: 1.2, stagger: 0.12, ease: "power4.out" }, "-=0.9")
      .from("[data-hero-stat]", { autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "-=0.8");

    gsap.utils.toArray<HTMLElement>("[data-hero-shot]").forEach((el, i) => {
      gsap.to(el, { yPercent: -10 - i * 8, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 1 } });
    });
    gsap.to("[data-hero-video]", { scale: 1.12, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 1 } });

    // ── Reveals genéricos ──────────────────────────────────────────────
    gsap.set("[data-reveal]", { autoAlpha: 0 });
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 85%",
      once: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", overwrite: true }),
    });

    // ── Manifiesto: las palabras se encienden ──────────────────────────
    gsap.fromTo("[data-sw]", { opacity: 0.14 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: "[data-statement]", start: "top 75%", end: "bottom 45%", scrub: true } });

    // ── Proyectos: parallax de la portada dentro del marco ─────────────
    gsap.utils.toArray<HTMLElement>("[data-project-img]").forEach((img) => {
      gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1 } });
    });

    // ── Proceso: la línea se dibuja ────────────────────────────────────
    gsap.fromTo("[data-process-line]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-process]", start: "top 70%", end: "center 50%", scrub: 1 } });

    // ── CTA: las líneas se cruzan ──────────────────────────────────────
    gsap.fromTo("[data-cta-l1]", { xPercent: -18 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: "[data-cta]", start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.fromTo("[data-cta-l2]", { xPercent: 14 }, { xPercent: -8, ease: "none", scrollTrigger: { trigger: "[data-cta]", start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.fromTo("[data-cta-l3]", { xPercent: -10 }, { xPercent: 10, ease: "none", scrollTrigger: { trigger: "[data-cta]", start: "top bottom", end: "bottom top", scrub: 1 } });
  }, { scope: rootRef });

  const hero = [byslug("zenith"), byslug("qelora"), byslug("vex")];
  const destacados = ["zenith", "securify", "creative-studio", "qelora", "vex", "stretch"].map(byslug);

  return (
    <div ref={rootRef} className="bg-[#050505] text-white">
      <style>{`
        @keyframes codea-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .codea-marquee { animation: codea-marquee 40s linear infinite }
        .codea-marquee-wrap:hover .codea-marquee { animation-play-state: paused }
        @keyframes codea-blink { 50% { opacity: 0 } }
        .codea-caret { animation: codea-blink 1s steps(1) infinite }
        @media (prefers-reduced-motion: reduce) { .codea-marquee, .codea-caret { animation: none } }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section data-hero className="relative min-h-[100svh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <video data-hero-video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/hero-poster.jpg">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
        <div className="absolute -left-40 bottom-0 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25" style={{ backgroundColor: LIME }} />
        <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none" style={{ backgroundImage: grain }} />

        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 md:px-8 pt-36 pb-12 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <div data-hero-eyebrow><Eyebrow>codea desarrollos · Mendoza → América</Eyebrow></div>
              <h1 className="mt-7 text-[13vw] sm:text-7xl lg:text-[5.6rem] font-bold tracking-[-0.055em] leading-[0.92]">
                {["Diseño", "y", "código"].map((w) => (
                  <span key={w} className="inline-block overflow-hidden align-bottom mr-[0.22em] pb-[0.06em]"><span data-hero-word className="inline-block">{w}</span></span>
                ))}
                <br />
                <span className="inline-block overflow-hidden align-bottom mr-[0.22em] pb-[0.06em]"><span data-hero-word className="inline-block">que</span></span>
                <span className="inline-block overflow-hidden align-bottom mr-[0.22em] pb-[0.12em]"><span data-hero-word className="inline-block" style={{ color: LIME }}><Serif>hace crecer</Serif></span></span>
                <br />
                {["tu", "negocio."].map((w) => (
                  <span key={w} className="inline-block overflow-hidden align-bottom mr-[0.22em] pb-[0.06em]"><span data-hero-word className="inline-block">{w}</span></span>
                ))}
              </h1>
              <p data-hero-sub className="mt-7 max-w-xl text-base md:text-lg text-white/65 leading-relaxed">
                Ayudamos a emprendedores visionarios a construir marcas del mañana a través de sitios webs y diversas soluciones tecnológicas.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button data-hero-btn onClick={openModal} className="group flex items-center gap-3 pl-7 pr-2 py-2 rounded-full text-black text-base font-semibold transition-transform hover:scale-[1.03]" style={{ backgroundColor: LIME }}>
                  Empezar un proyecto <ArrowBtn dark />
                </button>
                <a data-hero-btn href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 pl-7 pr-2 py-2 rounded-full text-base font-semibold border border-white/20 bg-white/[0.04] backdrop-blur-md hover:bg-white/[0.08] transition-colors">
                  Hablemos por WhatsApp <ArrowBtn />
                </a>
              </div>
            </div>

            {/* Portadas reales en abanico */}
            <div className="hidden lg:block lg:col-span-5 relative h-[440px]">
              {hero.map((p, i) => (
                <a
                  key={p.slug}
                  data-hero-shot
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group absolute w-[440px] transition-transform"
                  style={{ right: i * 46 - 20, top: 40 + i * 92, zIndex: 3 - i, transform: `rotate(${[-6, 3, -2][i]}deg)` }}
                >
                  <Browser src={p.cover} alt={`Proyecto ${p.name}`} url={`${p.slug}.codea`} className="group-hover:border-white/30 transition-colors" />
                </a>
              ))}
              <div data-hero-shot className="absolute -left-6 top-8 z-10 flex items-center gap-2 pl-2 pr-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-black text-xs font-bold" style={{ backgroundColor: LIME }}>✓</span>
                <span className="text-xs font-semibold">Zenith Realty · lanzado</span>
              </div>
            </div>
          </div>

          <div className="mt-14 md:mt-20 pt-6 border-t border-white/10 grid grid-cols-3 gap-6 max-w-2xl">
            {[
              { k: `${proyectos.length}`, v: "proyectos lanzados" },
              { k: "2", v: "SaaS propios en producción" },
              { k: "AR → CA", v: "de Mendoza para América" },
            ].map((s) => (
              <div key={s.v} data-hero-stat>
                <div className="text-2xl md:text-4xl font-bold tracking-tight">{s.k}</div>
                <div className="mt-1 text-xs md:text-sm text-white/50">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marcas que confían ───────────────────────────────────────── */}
      <section className="py-14 md:py-20 border-b border-white/[0.06]">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-white/40 mb-10">Marcas que confían en nosotros</p>
        <div className="codea-marquee-wrap overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)" }}>
          <div className="codea-marquee flex w-max items-center gap-10 md:gap-16">
            {[...CLIENTES, ...CLIENTES].map((c, i) => (
              <img key={i} src={c.src} alt={c.alt} loading="lazy" className="h-20 md:h-28 w-[150px] md:w-[190px] object-contain opacity-70 hover:opacity-100 transition-opacity" style={{ filter: "brightness(0) invert(1)" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifiesto ───────────────────────────────────────────────── */}
      <section data-statement className="max-w-[1100px] mx-auto px-5 md:px-8 py-28 md:py-40">
        <p className="text-[2.1rem] sm:text-5xl md:text-[4.2rem] font-semibold tracking-[-0.045em] leading-[1.05]">
          {STATEMENT.map((seg, si) =>
            seg.serif ? (
              <span key={si} data-sw style={{ color: LIME }}><Serif>{seg.t}</Serif>{" "}</span>
            ) : (
              seg.t.split(" ").map((w, wi) => <span key={`${si}-${wi}`} data-sw>{w} </span>)
            )
          )}
        </p>
      </section>

      {/* ── Servicios: bento ─────────────────────────────────────────── */}
      <section id="servicios" className="max-w-[1240px] mx-auto px-5 md:px-8 pb-28 md:pb-40 scroll-mt-28">
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Eyebrow>Nuestros servicios</Eyebrow>
            <h2 className="mt-5 text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.95]">¿Qué <Serif className="text-white/60">hacemos</Serif>?</h2>
          </div>
          <Link href="/servicios" className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/15 text-sm font-semibold w-fit hover:border-white/40 transition-colors">
            Ver todos los servicios <ArrowBtn />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* Landing page */}
          <Link href="/servicios" data-reveal className="group md:col-span-7 relative rounded-[32px] bg-[#0E0E0E] border border-white/[0.07] overflow-hidden min-h-[560px] p-8 md:p-10 flex flex-col hover:border-white/20 transition-colors">
            <div className="relative z-10 max-w-sm">
              <span className="text-xs text-white/40 font-mono">01</span>
              <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Landing Page</h3>
              <p className="mt-3 text-white/55 leading-relaxed">Diseñamos páginas web orientadas a la conversión, con un mensaje claro y atractivo que capta la atención de tus clientes.</p>
            </div>
            <div className="absolute left-[10%] md:left-[18%] right-[-14%] top-[300px] md:top-[290px] transition-transform duration-700 group-hover:-translate-y-3 group-hover:-rotate-1">
              <Browser src={byslug("securify").cover} alt="Landing Securify" url="securify.codea" />
            </div>
            <div className="absolute -right-10 -top-10 w-72 h-72 rounded-full blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-700" style={{ backgroundColor: LIME }} />
          </Link>

          {/* E-commerce */}
          <Link href="/servicios" data-reveal className="group md:col-span-5 relative rounded-[32px] overflow-hidden min-h-[560px] p-8 md:p-10 flex flex-col" style={{ background: `linear-gradient(160deg, ${LIME} 0%, hsl(76,70%,52%) 100%)` }}>
            <div className="relative z-10 max-w-xs text-black">
              <span className="text-xs text-black/50 font-mono">02</span>
              <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">E-Commerce</h3>
              <p className="mt-3 text-black/65 leading-relaxed">Desarrollamos tiendas online completas, intuitivas y seguras, para que puedas vender tus productos 24/7 sin límites.</p>
            </div>
            <img src="/mokup.png" alt="Tienda online en un celular" loading="lazy" className="absolute right-[-4%] top-[270px] w-[70%] max-w-[330px] transition-transform duration-700 group-hover:-translate-y-4 group-hover:rotate-2" />
          </Link>

          {/* Sistemas a medida: editor de código */}
          <Link href="/servicios" data-reveal className="group md:col-span-5 relative rounded-[32px] bg-[#0E0E0E] border border-white/[0.07] overflow-hidden min-h-[420px] p-8 md:p-10 flex flex-col hover:border-white/20 transition-colors">
            <div className="relative z-10 max-w-sm">
              <span className="text-xs text-white/40 font-mono">03</span>
              <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Sistemas a Medida</h3>
              <p className="mt-3 text-white/55 leading-relaxed">Creamos soluciones personalizadas según las necesidades de tu negocio, optimizando procesos y mejorando la eficiencia operativa.</p>
            </div>
            <div className="mt-auto pt-8 transition-transform duration-700 group-hover:-translate-y-2">
              <div className="rounded-2xl bg-black border border-white/10 p-4 font-mono text-[12px] leading-[1.8] shadow-2xl">
                <div className="flex gap-1.5 mb-3">{["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />)}</div>
                <div><span className="text-[#C792EA]">const</span> <span className="text-white">pedido</span> = <span className="text-[#C792EA]">await</span> <span className="text-[#82AAFF]">crearPedido</span>({"{"}</div>
                <div className="pl-4"><span className="text-white/60">cliente</span>: <span style={{ color: LIME }}>&quot;Martina&quot;</span>,</div>
                <div className="pl-4"><span className="text-white/60">total</span>: <span className="text-[#F78C6C]">12500</span>,</div>
                <div>{"}"});</div>
                <div><span className="text-white/35">{"// ✓ stock y caja actualizados"}</span><span className="codea-caret inline-block w-2 h-4 ml-1 align-middle" style={{ backgroundColor: LIME }} /></div>
              </div>
            </div>
          </Link>

          {/* UcoBot: chat */}
          <a href="https://chatbot-sass-eight.vercel.app/" target="_blank" rel="noopener noreferrer" data-reveal className="group md:col-span-7 relative rounded-[32px] bg-[#0E0E0E] border border-white/[0.07] overflow-hidden min-h-[420px] p-8 md:p-10 flex flex-col md:flex-row gap-8 hover:border-white/20 transition-colors">
            <div className="relative z-10 md:max-w-[260px]">
              <span className="text-xs text-white/40 font-mono">04</span>
              <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Ucobot</h3>
              <p className="mt-3 text-white/55 leading-relaxed">Tu propio chatbot con IA. Centraliza conversaciones y automatiza tu atención al cliente y ventas en WhatsApp.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: LIME }}>Conocer UcoBot ↗</span>
            </div>
            <div className="flex-1 flex flex-col justify-end gap-2.5 text-[13px] transition-transform duration-700 group-hover:-translate-y-2">
              <div className="self-start max-w-[80%] rounded-2xl rounded-bl-md px-4 py-2.5 bg-white/[0.08]">¡Hola! ¿Tienen turnos para mañana? 👋</div>
              <div className="self-end max-w-[80%] rounded-2xl rounded-br-md px-4 py-2.5 text-black" style={{ backgroundColor: LIME }}>¡Hola! Sí, tengo 10:00 y 16:30. ¿Cuál te reservo?</div>
              <div className="self-start max-w-[80%] rounded-2xl rounded-bl-md px-4 py-2.5 bg-white/[0.08]">16:30 perfecto 🙌</div>
              <div className="self-end flex items-center gap-2 rounded-full pl-2 pr-4 py-1.5 bg-white text-black text-[12px] font-semibold">
                <span className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center text-[10px]">✓</span>
                Turno reservado por la IA
              </div>
            </div>
          </a>

          {/* Gestión de redes */}
          <Link href="/servicios" data-reveal className="group md:col-span-12 relative rounded-[32px] bg-[#0E0E0E] border border-white/[0.07] overflow-hidden p-8 md:p-10 flex flex-col lg:flex-row lg:items-center gap-10 hover:border-white/20 transition-colors">
            <div className="lg:max-w-sm shrink-0">
              <span className="text-xs text-white/40 font-mono">05</span>
              <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Gestión de Redes</h3>
              <p className="mt-3 text-white/55 leading-relaxed">Estrategia, producción de contenido e interacción con tu comunidad para comunicar de forma consistente y profesional.</p>
            </div>
            <div className="flex gap-3 md:gap-4 overflow-hidden lg:-mr-24">
              {["prisma", "stretch", "bakery", "wisa", "creative-studio"].map((slug, i) => {
                const p = byslug(slug);
                return (
                  <div key={slug} className="shrink-0 w-[150px] md:w-[190px] rounded-2xl bg-[#161616] border border-white/[0.07] overflow-hidden transition-transform duration-700" style={{ transform: `translateY(${i % 2 ? 14 : 0}px)` }}>
                    <div className="flex items-center gap-2 px-3 py-2">
                      <span className="w-5 h-5 rounded-full" style={{ background: "linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)" }} />
                      <span className="text-[10px] font-semibold text-white/70 truncate">{p.name.toLowerCase().replace(/\s/g, "")}</span>
                    </div>
                    <img src={p.cover} alt="" loading="lazy" className="w-full aspect-square object-cover" />
                    <div className="px-3 py-2 flex items-center gap-3 text-[11px] text-white/60">
                      <span>♥ {[248, 512, 186, 734, 391][i]}</span><span>💬 {[18, 42, 9, 57, 23][i]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Link>
        </div>
      </section>

      {/* ── Proyectos ────────────────────────────────────────────────── */}
      <section id="proyectos" className="bg-[#F4F4F1] text-black rounded-[36px] md:rounded-[64px] py-24 md:py-36 scroll-mt-20">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8">
          <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">
                <span className="w-1.5 h-1.5 rounded-full bg-black" /> Nuestros proyectos
              </span>
              <h2 className="mt-5 text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.95]">
                Diseño y código
                <br />
                que <Serif className="text-black/55">generan resultados</Serif>
              </h2>
            </div>
            <Link href="/proyectos" className="group flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-black text-white text-sm font-semibold w-fit">
              Ver todos los proyectos <ArrowBtn />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-y-20">
            {destacados.map((p, i) => (
              <a key={p.slug} href={p.href} target="_blank" rel="noopener noreferrer" data-reveal className={`group block ${i % 2 ? "md:mt-24" : ""}`}>
                <div className="relative rounded-[24px] overflow-hidden bg-black aspect-[16/11] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)]">
                  <img data-project-img src={p.cover} alt={`Portada del proyecto ${p.name}`} loading="lazy" className="absolute inset-0 w-full h-[112%] -top-[6%] object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: `inset 0 0 120px -30px ${p.accent}` }} />
                  <span className="absolute right-4 top-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-semibold translate-y-[-8px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    Ver sitio ↗
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{p.name}</h3>
                    <p className="mt-1 text-black/50">{p.category}</p>
                  </div>
                  <span className="mt-1.5 px-3 py-1 rounded-full border border-black/10 text-xs font-semibold text-black/60">{p.year}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proceso ──────────────────────────────────────────────────── */}
      <section data-process className="max-w-[1240px] mx-auto px-5 md:px-8 py-28 md:py-40">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>Nuestro método</Eyebrow>
          <h2 className="mt-5 text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.95]">
            De la <Serif className="text-white/60">idea</Serif> al <Serif className="text-white/60">lanzamiento</Serif>
          </h2>
          <p className="mt-6 text-white/55 text-lg leading-relaxed">Nuestro método de trabajo está diseñado para transformar ideas complejas en productos digitales excepcionales, paso a paso.</p>
        </div>

        <div className="relative mt-16">
          <div className="hidden md:block absolute left-0 right-0 top-[27px] h-px bg-white/10">
            <div data-process-line className="h-full origin-left" style={{ backgroundColor: LIME }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PASOS.map((p, i) => (
              <div key={p.n} data-reveal className="relative">
                <span className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center font-mono text-sm font-bold text-black" style={{ backgroundColor: LIME }}>{p.n}</span>
                <div className="mt-6 rounded-[28px] bg-[#0E0E0E] border border-white/[0.07] p-7 h-[calc(100%-80px)] flex flex-col">
                  {/* mini visual de cada paso */}
                  <div className="h-[150px] rounded-2xl bg-black border border-white/[0.06] p-4 overflow-hidden">
                    {i === 0 && (
                      <div className="grid grid-cols-3 gap-2 h-full">
                        {["Objetivos", "Usuarios", "Alcance"].map((c, k) => (
                          <div key={c} className="rounded-xl p-2.5 flex flex-col gap-1.5" style={{ backgroundColor: k === 1 ? LIME : "rgba(255,255,255,0.05)", color: k === 1 ? "#000" : "#fff" }}>
                            <span className="text-[10px] font-semibold">{c}</span>
                            {[80, 60, 70].map((w, z) => <span key={z} className="h-1 rounded-full" style={{ width: `${w}%`, backgroundColor: k === 1 ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.15)" }} />)}
                          </div>
                        ))}
                      </div>
                    )}
                    {i === 1 && (
                      <div className="font-mono text-[11px] leading-[1.75]">
                        <div><span className="text-[#C792EA]">export default function</span> <span className="text-[#82AAFF]">App</span>() {"{"}</div>
                        <div className="pl-4"><span className="text-[#C792EA]">return</span> &lt;<span style={{ color: LIME }}>Negocio</span> <span className="text-white/60">escala</span> /&gt;</div>
                        <div>{"}"}</div>
                        <div className="mt-2 flex gap-1.5 flex-wrap">{STACK.slice(0, 4).map((s) => <span key={s} className="px-2 py-0.5 rounded-md bg-white/[0.06] text-[10px] text-white/70">{s}</span>)}</div>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="font-mono text-[11px] leading-[1.8] text-white/70">
                        <div><span style={{ color: LIME }}>$</span> deploy --prod</div>
                        <div className="text-white/40">› build optimizado</div>
                        <div className="text-white/40">› pruebas finales ok</div>
                        <div className="text-[#28C840]">✓ MVP en producción<span className="codea-caret inline-block w-2 h-3.5 ml-1 align-middle bg-[#28C840]" /></div>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight">{p.t}</h3>
                  <p className="mt-2 text-sm text-white/55 leading-relaxed">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="mt-14 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-[0.25em] text-white/40 mr-3">Stack</span>
          {STACK.map((s) => <span key={s} className="px-4 py-2 rounded-full border border-white/10 text-sm text-white/70">{s}</span>)}
        </div>
      </section>

      {/* ── SaaS propios ─────────────────────────────────────────────── */}
      <section id="herramientas" className="max-w-[1240px] mx-auto px-5 md:px-8 pb-28 md:pb-40">
        <div data-reveal className="text-center max-w-2xl mx-auto">
          <Eyebrow>Nuestros propios SaaS</Eyebrow>
          <h2 className="mt-5 text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.95]">Herramientas <Serif className="text-white/60">de Codea</Serif></h2>
          <p className="mt-6 text-white/55 text-lg leading-relaxed">Softwares que hemos desarrollado y cuentan con un modelo SaaS multiusuario, diseñados para escalar y resolver problemas complejos.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-5">
          <a href="https://chatbot-sass-eight.vercel.app/" target="_blank" rel="noopener noreferrer" data-reveal className="group lg:col-span-8 relative rounded-[32px] overflow-hidden bg-[#0E0E0E] border border-white/[0.07] p-8 md:p-10 min-h-[520px] hover:border-white/20 transition-colors">
            <div className="absolute -right-24 -bottom-24 w-[420px] h-[420px] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: LIME }} />
            <div className="relative z-10 max-w-md">
              <div className="flex flex-wrap gap-2">{["IA", "Chatbots", "Omnicanal"].map((t) => <span key={t} className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-white/[0.07] text-white/70">{t}</span>)}</div>
              <h3 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">UcoBot</h3>
              <p className="mt-3 text-white/55 leading-relaxed">Asistencia Inteligente Omnicanal. Crea chatbots personalizados para WhatsApp, Instagram, TikTok y Messenger para automatizar la atención al cliente.</p>
              <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-white/70">
                {["Procesamiento de Lenguaje Natural", "Multi-agente y Multi-canal", "Respuestas Automáticas", "Calificación de Leads"].map((f) => (
                  <li key={f} className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: LIME }} />{f}</li>
                ))}
              </ul>
            </div>
            <div className="relative lg:absolute lg:right-[-6%] lg:bottom-[-8%] mt-8 lg:mt-0 lg:w-[58%] transition-transform duration-700 group-hover:-translate-y-3 group-hover:-rotate-1">
              <Browser src="/saas/ucobot-panel.jpg" alt="Panel de UcoBot" url="ucobot / panel" />
            </div>
            <span className="relative z-10 mt-8 lg:absolute lg:left-10 lg:bottom-10 inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-white text-black text-sm font-semibold">Visitar sitio <ArrowBtn dark /></span>
          </a>

          <a href="https://restopro-five.vercel.app/" target="_blank" rel="noopener noreferrer" data-reveal className="group lg:col-span-4 relative rounded-[32px] overflow-hidden p-8 md:p-10 min-h-[520px] text-black flex flex-col" style={{ background: `linear-gradient(170deg, ${LIME} 0%, hsl(76,70%,55%) 100%)` }}>
            <div className="flex flex-wrap gap-2">{["Gastronomía", "Gestión", "POS"].map((t) => <span key={t} className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-black text-white">{t}</span>)}</div>
            <h3 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">RestoPro</h3>
            <p className="mt-3 text-black/65 leading-relaxed">Sistema integral de gestión para restaurantes, bares y cafeterías. Control de mesas, pedidos, inventario y facturación en tiempo real.</p>
            <div className="mt-auto pt-8 flex justify-center">
              <PhoneShot src="/restopro.png" alt="RestoPro" className="w-[200px] transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-2" />
            </div>
          </a>
        </div>

        <p data-reveal className="mt-14 text-center text-3xl md:text-5xl font-bold tracking-[-0.04em]">
          Transformá <Serif className="text-white/60">complejidad</Serif> en claridad
        </p>
      </section>

      {/* ── CTA: let's code your business ────────────────────────────── */}
      <section data-cta className="relative overflow-hidden py-28 md:py-40">
        <div className="absolute inset-0">
          <video className="w-full h-full object-cover opacity-30" autoPlay muted loop playsInline preload="none" poster="/hero-poster.jpg">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/70 to-[#050505]" />
        <div className="relative z-10">
          <p className="text-center text-lg md:text-2xl text-white/60 mb-6">→ let&apos;s</p>
          <h2 className="text-[19vw] md:text-[14vw] font-black tracking-[-0.06em] leading-[0.82] uppercase whitespace-nowrap text-center select-none">
            <span data-cta-l1 className="block text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}>Code</span>
            <span data-cta-l2 className="block" style={{ color: LIME }}>Your</span>
            <span data-cta-l3 className="block">Business</span>
          </h2>
          <div data-reveal className="mt-14 flex flex-col sm:flex-row gap-3 justify-center items-center px-5">
            <button onClick={openModal} className="group flex items-center gap-3 pl-8 pr-2 py-2 rounded-full text-black text-lg font-semibold transition-transform hover:scale-[1.03]" style={{ backgroundColor: LIME }}>
              Empezar mi proyecto <ArrowBtn dark />
            </button>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 pl-8 pr-2 py-2 rounded-full text-lg font-semibold border border-white/20 bg-white/[0.04] backdrop-blur-md hover:bg-white/[0.08] transition-colors">
              Escribinos por WhatsApp <ArrowBtn />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
