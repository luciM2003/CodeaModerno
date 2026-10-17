"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useModal } from "@/context/ModalContext";
import { proyectos, type Proyecto } from "@/lib/proyectos";

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

// ─── Pisos de pantallas acostadas ─────────────────────────────────────────
// Un "tile" es una pantalla real (captura) o una tarjeta de marca lima/negra.
type Tile = { img: string; url: string } | { tone: "lime" | "dark"; kicker: string; big: string };

const shot = (p: Proyecto): Tile => ({ img: p.cover, url: `${p.slug}.codea` });
const ucobot = (n: "panel" | "reservas" | "pos" | "promotions"): Tile => ({ img: `/saas/ucobot-${n}.jpg`, url: `ucobot / ${n === "panel" ? "panel" : n === "pos" ? "punto de venta" : n === "promotions" ? "promociones" : "reservas"}` });
const lime = (kicker: string, big: string): Tile => ({ tone: "lime", kicker, big });
const dark = (kicker: string, big: string): Tile => ({ tone: "dark", kicker, big });

const SERVICIOS: Array<{ n: string; t: string; d: string; href: string; ext?: boolean; cols: Tile[][] }> = [
  {
    n: "01", t: "Landing Page", href: "/servicios",
    d: "Diseñamos páginas web orientadas a la conversión, con un mensaje claro y atractivo que capta la atención de tus clientes.",
    cols: [
      [shot(byslug("securify")), dark("Mensaje", "claro"), shot(byslug("vex"))],
      [shot(byslug("zenith")), lime("Orientadas a", "conversión"), shot(byslug("prisma"))],
      [shot(byslug("qelora")), shot(byslug("creative-studio")), dark("Diseño", "a medida")],
      [lime("Landing", "lista"), shot(byslug("wisa")), shot(byslug("securify"))],
    ],
  },
  {
    n: "02", t: "E-Commerce", href: "/servicios",
    d: "Desarrollamos tiendas online completas, intuitivas y seguras, para que puedas vender tus productos 24/7 sin límites.",
    cols: [
      [shot(byslug("stretch")), dark("Checkout", "seguro"), shot(byslug("bakery"))],
      [shot(byslug("wisa")), lime("Vendé", "24/7"), shot(byslug("stretch"))],
      [shot(byslug("bakery")), shot(byslug("wisa")), dark("Pagos", "online")],
      [lime("Tienda", "sin límites"), shot(byslug("stretch")), shot(byslug("bakery"))],
    ],
  },
  {
    n: "03", t: "Sistemas a Medida", href: "/servicios",
    d: "Creamos soluciones personalizadas según las necesidades de tu negocio, optimizando procesos y mejorando la eficiencia operativa.",
    cols: [
      [ucobot("pos"), dark("Procesos", "optimizados"), ucobot("promotions")],
      [ucobot("reservas"), lime("Eficiencia", "operativa"), ucobot("panel")],
      [ucobot("promotions"), ucobot("pos"), dark("Stock y", "caja")],
      [lime("A tu", "medida"), ucobot("panel"), ucobot("reservas")],
    ],
  },
  {
    n: "04", t: "Ucobot", href: "https://chatbot-sass-eight.vercel.app/", ext: true,
    d: "Tu propio chatbot con IA. Centraliza conversaciones y automatiza tu atención al cliente y ventas en WhatsApp.",
    cols: [
      [ucobot("panel"), dark("WhatsApp", "e Instagram"), ucobot("reservas")],
      [ucobot("promotions"), lime("Atiende", "24/7"), ucobot("pos")],
      [ucobot("reservas"), ucobot("panel"), dark("Ventas", "automáticas")],
      [lime("Chatbot", "con IA"), ucobot("promotions"), ucobot("panel")],
    ],
  },
  {
    n: "05", t: "Gestión de Redes", href: "/servicios",
    d: "Estrategia, producción de contenido e interacción con tu comunidad para comunicar de forma consistente y profesional.",
    cols: [
      [shot(byslug("prisma")), dark("Contenido", "que conecta"), shot(byslug("creative-studio"))],
      [shot(byslug("stretch")), lime("Tu", "comunidad"), shot(byslug("wisa"))],
      [shot(byslug("creative-studio")), shot(byslug("prisma")), dark("Estrategia", "consistente")],
      [lime("Redes", "que crecen"), shot(byslug("bakery")), shot(byslug("stretch"))],
    ],
  },
];

function Slab({ w, h, radius = 22, depth = 14, children }: { w: number; h: number; radius?: number; depth?: number; children: React.ReactNode }) {
  return (
    <div className="relative" style={{ width: w, height: h, transformStyle: "preserve-3d" }}>
      <div className="absolute inset-0" style={{ borderRadius: radius, transform: `translateZ(-${depth + 2}px)`, boxShadow: "-50px 70px 90px rgba(0,0,0,0.75)", background: "rgba(0,0,0,0.4)" }} />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="absolute inset-0" style={{ borderRadius: radius, transform: `translateZ(-${((i + 1) * depth) / 4}px)`, background: i === 3 ? "#050505" : "#1d1d1d", border: "1px solid rgba(255,255,255,0.05)" }} />
      ))}
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: radius, border: "1px solid rgba(255,255,255,0.14)", background: "#121212" }}>
        {children}
      </div>
    </div>
  );
}

function TileView({ tile, w = 360, h = 225 }: { tile: Tile; w?: number; h?: number }) {
  if ("img" in tile) {
    return (
      <Slab w={w} h={h}>
        <div className="absolute top-0 inset-x-0 z-10 flex items-center gap-1.5 px-3 h-7 bg-[#141414]/95 border-b border-white/[0.06]">
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />)}
          <span className="ml-2 h-4 px-2.5 rounded-full bg-white/[0.06] text-[8px] text-white/45 flex items-center">{tile.url}</span>
        </div>
        <div className="absolute inset-0 top-7">
          <Image src={tile.img} alt="" fill sizes={`${w + 40}px`} className="object-cover object-top" />
        </div>
      </Slab>
    );
  }
  const isLime = tile.tone === "lime";
  return (
    <Slab w={w} h={h}>
      <div className="absolute inset-0 p-6 flex flex-col justify-between" style={{ background: isLime ? LIME : "#0E0E0E", color: isLime ? "#000" : "#fff" }}>
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-60">{tile.kicker}</span>
        <span className="text-5xl font-black tracking-tighter leading-none">{tile.big}</span>
      </div>
    </Slab>
  );
}

// Piso inclinado. Las rotaciones las aplica GSAP (data-floor), así se pueden animar con el scroll.
function Floor({ cols, className = "", wrapClassName = "", gap = 28, tile }: { cols: Tile[][]; className?: string; wrapClassName?: string; gap?: number; tile?: { w: number; h: number } }) {
  return (
    <div className={`absolute pointer-events-none ${className}`} style={{ perspective: 1800 }}>
      <div data-floor-wrap className={`absolute ${wrapClassName}`} style={{ transformStyle: "preserve-3d" }}>
        <div data-floor className="flex" style={{ gap, transformStyle: "preserve-3d" }}>
          {cols.map((col, ci) => (
            <div key={ci} data-floor-col className="flex flex-col" style={{ gap, transformStyle: "preserve-3d", marginTop: ci % 2 ? 120 : 0 }}>
              {col.map((t, ri) => (
                <div key={ri} data-floor-tile style={{ transformStyle: "preserve-3d" }}>
                  <TileView tile={t} w={tile?.w} h={tile?.h} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Piezas de texto ──────────────────────────────────────────────────────
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

function ArrowBtn({ dark: isDark = false }: { dark?: boolean }) {
  return (
    <span className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-[-45deg] ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </span>
  );
}

const mask = (a = 30, b = 75) => ({ maskImage: `linear-gradient(to bottom, transparent 0%, #000 ${a}%, #000 ${b}%, transparent 100%)`, WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, #000 ${a}%, #000 ${b}%, transparent 100%)` });
const grain = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")";

export default function HomeLanding() {
  const { openModal } = useModal();
  const rootRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<Proyecto | null>(null);
  const [servicio, setServicio] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Todos los pisos arrancan con la misma inclinación que el del hero
    gsap.set("[data-floor]", { rotationX: 58, rotationZ: -30, xPercent: -50 });

    // Servicio activo según el texto que se está leyendo
    gsap.utils.toArray<HTMLElement>("[data-servicio]").forEach((el, i) => {
      ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && setServicio(i) });
    });

    if (reduce) return;

    // ── Hero ───────────────────────────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from("[data-hero-eyebrow]", { autoAlpha: 0, y: 16, duration: 0.6, ease: "power3.out" })
      .from("[data-hero-word]", { yPercent: 110, duration: 1.1, stagger: 0.08, ease: "power4.out" }, "-=0.3")
      .from("[data-hero-sub]", { autoAlpha: 0, y: 20, duration: 0.7, ease: "power3.out" }, "-=0.7")
      .from("[data-hero-btn]", { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.5")
      .from("[data-hero] [data-floor]", { y: 500, rotationX: 75, autoAlpha: 0, duration: 1.8, ease: "power4.out" }, "-=1")
      .from("[data-hero] [data-floor-tile]", { z: -200, autoAlpha: 0, duration: 1, stagger: { each: 0.04, from: "center" }, ease: "power3.out" }, "-=1.5");

    // Cada piso con data-lift se "levanta" mientras su sección cruza la pantalla
    gsap.utils.toArray<HTMLElement>("[data-lift]").forEach((sec) => {
      const top = sec.dataset.lift === "top";
      const st = { trigger: sec, start: top ? "top top" : "top bottom", end: "bottom top", scrub: 1 };
      gsap.fromTo(sec.querySelectorAll("[data-floor]"), { rotationX: top ? 58 : 64, rotationZ: -30 }, { rotationX: 38, rotationZ: -18, y: -160, scale: 1.12, ease: "none", scrollTrigger: st });
      sec.querySelectorAll<HTMLElement>("[data-floor-col]").forEach((col, i) => {
        gsap.fromTo(col, { y: top ? 0 : i % 2 ? 160 : -100 }, { y: i % 2 ? -260 : 160, ease: "none", scrollTrigger: st });
      });
    });
    gsap.to("[data-hero-copy]", { y: -120, autoAlpha: 0.2, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 1 } });

    // Inclinación con el mouse (todos los pisos)
    const wraps = gsap.utils.toArray<HTMLElement>("[data-floor-wrap]");
    const tilts = wraps.map((w) => [gsap.quickTo(w, "rotationY", { duration: 0.8, ease: "power3.out" }), gsap.quickTo(w, "rotationX", { duration: 0.8, ease: "power3.out" })]);
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = -(e.clientY / window.innerHeight - 0.5) * 6;
      tilts.forEach(([tx, ty]) => { tx(x); ty(y); });
    };
    window.addEventListener("mousemove", onMove);

    // ── Reveals ────────────────────────────────────────────────────────
    gsap.set("[data-reveal]", { autoAlpha: 0, y: 50 });
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", overwrite: true }),
    });

    // ── Manifiesto ─────────────────────────────────────────────────────
    gsap.fromTo("[data-sw]", { opacity: 0.14 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: "[data-statement]", start: "top 75%", end: "bottom 45%", scrub: true } });

    // ── Proceso ────────────────────────────────────────────────────────
    gsap.fromTo("[data-process-line]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-process]", start: "top 70%", end: "center 50%", scrub: 1 } });

    // ── CTA ────────────────────────────────────────────────────────────
    gsap.fromTo("[data-cta-l1]", { xPercent: -18 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: "[data-cta]", start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.fromTo("[data-cta-l2]", { xPercent: 14 }, { xPercent: -8, ease: "none", scrollTrigger: { trigger: "[data-cta]", start: "top bottom", end: "bottom top", scrub: 1 } });
    gsap.fromTo("[data-cta-l3]", { xPercent: -10 }, { xPercent: 10, ease: "none", scrollTrigger: { trigger: "[data-cta]", start: "top bottom", end: "bottom top", scrub: 1 } });

    return () => window.removeEventListener("mousemove", onMove);
  }, { scope: rootRef });

  const movePreview = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    gsap.to(previewRef.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power3.out" });
  };

  const heroCols: Tile[][] = [
    [shot(byslug("prisma")), dark("Código", "limpio"), shot(byslug("wisa"))],
    [shot(byslug("zenith")), shot(byslug("bakery")), lime("Lanzados", `${proyectos.length} proyectos`)],
    [shot(byslug("qelora")), shot(byslug("securify")), shot(byslug("stretch"))],
    [lime("Lanzados", `${proyectos.length} proyectos`), shot(byslug("vex")), shot(byslug("creative-studio"))],
    [shot(byslug("stretch")), shot(byslug("zenith")), dark("Código", "limpio")],
  ];
  const projectCols: Tile[][] = [
    [shot(proyectos[0]), shot(proyectos[5]), dark("Diseño", "y código")],
    [shot(proyectos[1]), lime("Proyectos", `${proyectos.length} lanzados`), shot(proyectos[6])],
    [shot(proyectos[2]), shot(proyectos[7]), shot(proyectos[4])],
    [dark("2026", "nuevos sitios"), shot(proyectos[3]), shot(proyectos[8])],
    [shot(proyectos[4]), shot(proyectos[8]), lime("Resultados", "reales")],
    [shot(proyectos[6]), dark("Mendoza", "→ América"), shot(proyectos[1])],
  ];
  const saasCols: Tile[][] = [
    [ucobot("panel"), { img: "/restopro.png", url: "restopro" }, ucobot("promotions")],
    [lime("UcoBot", "IA 24/7"), ucobot("reservas"), dark("RestoPro", "gastronomía")],
    [ucobot("pos"), ucobot("panel"), { img: "/restopro.png", url: "restopro" }],
    [ucobot("promotions"), lime("SaaS", "propios"), ucobot("reservas")],
  ];

  return (
    <div ref={rootRef} className="bg-[#050505] text-white">
      <style>{`
        @keyframes codea-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .codea-marquee { animation: codea-marquee 40s linear infinite }
        .codea-marquee-wrap:hover .codea-marquee { animation-play-state: paused }
        @keyframes codea-spin { to { transform: rotate(360deg) } }
        .codea-spin { animation: codea-spin 14s linear infinite }
        @media (prefers-reduced-motion: reduce) { .codea-marquee, .codea-spin { animation: none } }
      `}</style>

      {/* ── Hero: video + piso de pantallas acostadas ─────────────────── */}
      <section data-hero data-lift="top" className="relative h-[100svh] min-h-[760px] overflow-hidden">
        <div className="absolute inset-0">
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/hero-poster.jpg">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/80" />
        <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none" style={{ backgroundImage: grain }} />

        <Floor cols={heroCols} className="inset-x-0 bottom-0 h-[46%] lg:h-[50%] [@media(min-height:950px)]:h-[56%]" wrapClassName="left-[30%] md:left-[26%] top-[30%]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050505] pointer-events-none" />

        <div data-hero-copy className="relative z-10 h-full flex flex-col items-center text-center pt-32 md:pt-40 px-5">
          <div data-hero-eyebrow><Eyebrow>Software factory · Mendoza → América</Eyebrow></div>
          <h1 className="mt-6 text-[17vw] sm:text-8xl md:text-[9.5rem] font-bold tracking-[-0.06em] leading-[0.85]">
            <span className="inline-block overflow-hidden align-bottom pb-[0.04em]"><span data-hero-word className="inline-block">codea</span></span>{" "}
            <span className="inline-block overflow-hidden align-bottom pb-[0.12em]"><span data-hero-word className="inline-block" style={{ color: LIME }}><Serif>desarrollos</Serif></span></span>
          </h1>
          <p data-hero-sub className="mt-6 max-w-xl text-base md:text-lg text-white/70 leading-relaxed">
            Ayudamos a emprendedores visionarios a construir marcas del mañana a través de sitios webs y diversas soluciones tecnológicas.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button data-hero-btn onClick={openModal} className="group flex items-center gap-3 pl-7 pr-2 py-2 rounded-full text-black text-base font-semibold" style={{ backgroundColor: LIME }}>
              Empezar un proyecto <ArrowBtn dark />
            </button>
            <a data-hero-btn href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 pl-7 pr-2 py-2 rounded-full text-base font-semibold border border-white/20 bg-black/30 backdrop-blur-md hover:bg-white/[0.08] transition-colors">
              Contactanos <ArrowBtn />
            </a>
          </div>
        </div>

        <div className="hidden md:flex absolute right-10 bottom-10 z-10 w-28 h-28 items-center justify-center">
          <svg viewBox="0 0 100 100" className="codea-spin absolute inset-0 w-full h-full">
            <defs><path id="codea-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
            <text fill="rgba(255,255,255,0.7)" fontSize="9.5" letterSpacing="3.4" fontWeight="600"><textPath href="#codea-circle">DISEÑO · CÓDIGO · RESULTADOS · </textPath></text>
          </svg>
          <span className="w-9 h-9 rounded-full flex items-center justify-center text-black" style={{ backgroundColor: LIME }}>↓</span>
        </div>
      </section>

      {/* ── Marcas que confían ───────────────────────────────────────── */}
      <section className="py-14 md:py-16 border-y border-white/[0.06]">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-white/40 mb-8">Marcas que confían en nosotros</p>
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

      {/* ── Servicios: lista + piso fijo que cambia ──────────────────── */}
      <section id="servicios" className="relative scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8">
          <div data-reveal className="mb-6 md:mb-0">
            <Eyebrow>Nuestros servicios</Eyebrow>
            <h2 className="mt-5 text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.95]">¿Qué <Serif className="text-white/60">hacemos</Serif>?</h2>
          </div>
        </div>

        <div className="relative md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Lista */}
          <div className="relative z-10 max-w-[1280px] md:ml-auto px-5 md:pl-8 md:pr-0 w-full md:max-w-[560px]">
            {SERVICIOS.map((s, i) => (
              <div key={s.n} data-servicio className="md:min-h-[78vh] flex flex-col justify-center py-10 md:py-0">
                <div className={`transition-opacity duration-500 ${servicio === i ? "md:opacity-100" : "md:opacity-25"}`}>
                  <span className="font-mono text-sm" style={{ color: LIME }}>{s.n}</span>
                  <h3 className="mt-3 text-4xl md:text-6xl font-bold tracking-[-0.045em] leading-[0.95]">{s.t}</h3>
                  <p className="mt-5 text-white/60 text-lg leading-relaxed max-w-md">{s.d}</p>
                  {s.ext ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="group mt-7 inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/15 text-sm font-semibold hover:border-white/40 transition-colors">Conocer UcoBot <ArrowBtn /></a>
                  ) : (
                    <Link href={s.href} className="group mt-7 inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/15 text-sm font-semibold hover:border-white/40 transition-colors">Conocer más <ArrowBtn /></Link>
                  )}
                </div>
                {/* En celular, cada servicio muestra su propio piso */}
                <div className="md:hidden relative mt-8 h-[300px] overflow-hidden rounded-[28px] bg-[#0A0A0A]">
                  <Floor cols={s.cols} className="inset-0 scale-[0.75] origin-center" wrapClassName="left-[30%] top-[0%]" />
                </div>
              </div>
            ))}
          </div>

          {/* Piso fijo (escritorio) */}
          <div className="hidden md:block relative">
            <div className="sticky top-0 h-screen overflow-hidden" style={mask(12, 88)}>
              {SERVICIOS.map((s, i) => (
                <div key={s.n} className={`absolute inset-0 transition-all duration-700 ease-out ${servicio === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
                  <Floor cols={s.cols} className="inset-0" wrapClassName="left-[42%] top-[10%]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Proyectos: piso a todo el ancho + lista con vista previa ─── */}
      <section id="proyectos" className="relative scroll-mt-20 pt-20 md:pt-28">
        <div data-lift="" className="relative h-[880px] md:h-[1000px] overflow-hidden">
          <Floor cols={projectCols} className="inset-0" wrapClassName="left-[45%] top-[18%]" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.85) 40%, rgba(5,5,5,0) 70%)" }} />
          <div className="xl:hidden absolute inset-0 bg-[#050505]/70 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
          <div data-reveal className="relative z-10 h-full max-w-[1280px] mx-auto px-5 md:px-8 flex flex-col justify-center">
            <Eyebrow>Nuestros proyectos</Eyebrow>
            <h2 className="mt-5 text-5xl md:text-8xl font-bold tracking-[-0.055em] leading-[0.9] max-w-[700px]">
              Diseño y código que <Serif className="text-white/70">generan</Serif> <span style={{ color: LIME }}><Serif>resultados</Serif></span>
            </h2>
            <Link href="/proyectos" className="group mt-9 flex items-center gap-3 pl-7 pr-2 py-2 rounded-full text-black text-base font-semibold w-fit" style={{ backgroundColor: LIME }}>
              Ver todos los proyectos <ArrowBtn dark />
            </Link>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-5 md:px-8 pb-28 md:pb-40" onMouseMove={movePreview} onMouseLeave={() => setPreview(null)}>
          {proyectos.map((p, i) => (
            <a
              key={p.slug}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              onMouseEnter={() => setPreview(p)}
              className="group grid grid-cols-[40px_1fr_auto] md:grid-cols-[60px_1fr_1fr_100px_40px] items-center gap-4 py-6 md:py-8 border-b border-white/[0.08] hover:border-white/30 transition-colors"
            >
              <span className="font-mono text-xs text-white/35">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-2xl md:text-5xl font-bold tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-3">{p.name}</span>
              <span className="hidden md:block text-white/45">{p.category}</span>
              <span className="hidden md:block text-white/45 text-sm">{p.year}</span>
              <span className="text-xl transition-transform group-hover:rotate-45" style={{ color: LIME }}>↗</span>
            </a>
          ))}
        </div>

        <div ref={previewRef} className="hidden md:block fixed left-0 top-0 z-50 pointer-events-none">
          <div className={`relative w-[340px] aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 shadow-2xl transition-all duration-300 -translate-x-1/2 -translate-y-1/2 ${preview ? "opacity-100 scale-100 rotate-[-4deg]" : "opacity-0 scale-75 rotate-0"}`}>
            {preview && <Image src={preview.cover} alt={`Proyecto ${preview.name}`} fill sizes="340px" className="object-cover object-top" />}
          </div>
        </div>
      </section>

      {/* ── Proceso ──────────────────────────────────────────────────── */}
      <section data-process className="max-w-[1280px] mx-auto px-5 md:px-8 pb-28 md:pb-40">
        <div data-reveal className="max-w-2xl">
          <Eyebrow>Nuestro método</Eyebrow>
          <h2 className="mt-5 text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.95]">De la <Serif className="text-white/60">idea</Serif> al <Serif className="text-white/60">lanzamiento</Serif></h2>
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
                <div className="mt-6 rounded-[30px] border p-8 h-[calc(100%-80px)] flex flex-col" style={{ background: i === 1 ? LIME : "#0C0C0C", borderColor: i === 1 ? LIME : "rgba(255,255,255,0.07)", color: i === 1 ? "#000" : "#fff" }}>
                  <span className="text-[5.5rem] font-black tracking-[-0.06em] leading-none" style={{ color: i === 1 ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.06)" }}>{p.n}</span>
                  <h3 className="mt-6 text-3xl font-bold tracking-tight">{p.t}</h3>
                  <p className={`mt-3 leading-relaxed ${i === 1 ? "text-black/70" : "text-white/55"}`}>{p.d}</p>
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

      {/* ── SaaS propios: piso de pantallas reales ───────────────────── */}
      <section id="herramientas" data-lift="" className="relative overflow-hidden min-h-[900px] md:min-h-[1000px] flex items-center">
        <Floor cols={saasCols} className="inset-0" wrapClassName="left-[58%] top-[16%]" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.85) 35%, rgba(5,5,5,0) 65%)" }} />
        <div className="md:hidden absolute inset-0 bg-[#050505]/75 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-8 py-24">
          <div data-reveal className="max-w-xl">
            <Eyebrow>Nuestros propios SaaS</Eyebrow>
            <h2 className="mt-5 text-5xl md:text-7xl font-bold tracking-[-0.05em] leading-[0.95]">Herramientas <Serif className="text-white/60">de Codea</Serif></h2>
            <p className="mt-6 text-white/55 text-lg leading-relaxed">Softwares que hemos desarrollado y cuentan con un modelo SaaS multiusuario, diseñados para escalar y resolver problemas complejos.</p>
          </div>

          <div className="mt-12 grid gap-4 max-w-xl">
            {[
              { n: "UcoBot", tags: ["IA", "Chatbots", "Omnicanal"], d: "Asistencia Inteligente Omnicanal. Crea chatbots personalizados para WhatsApp, Instagram, TikTok y Messenger para automatizar la atención al cliente.", href: "https://chatbot-sass-eight.vercel.app/" },
              { n: "RestoPro", tags: ["Gastronomía", "Gestión", "POS"], d: "Sistema integral de gestión para restaurantes, bares y cafeterías. Control de mesas, pedidos, inventario y facturación en tiempo real.", href: "https://restopro-five.vercel.app/" },
            ].map((t, i) => (
              <a key={t.n} href={t.href} target="_blank" rel="noopener noreferrer" data-reveal className="group rounded-[28px] p-7 border backdrop-blur-md transition-colors" style={{ background: i === 0 ? "rgba(255,255,255,0.04)" : LIME, borderColor: i === 0 ? "rgba(255,255,255,0.1)" : LIME, color: i === 0 ? "#fff" : "#000" }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-1.5">{t.tags.map((g) => <span key={g} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ background: i === 0 ? "rgba(255,255,255,0.08)" : "#000", color: i === 0 ? "rgba(255,255,255,0.7)" : "#fff" }}>{g}</span>)}</div>
                    <h3 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{t.n}</h3>
                  </div>
                  <ArrowBtn dark={i === 1} />
                </div>
                <p className={`mt-3 leading-relaxed ${i === 0 ? "text-white/55" : "text-black/65"}`}>{t.d}</p>
              </a>
            ))}
          </div>

          <p data-reveal className="mt-14 text-3xl md:text-5xl font-bold tracking-[-0.04em]">
            Transformá <Serif className="text-white/60">complejidad</Serif> en claridad
          </p>
        </div>
      </section>

      {/* ── CTA: let's code your business ────────────────────────────── */}
      <section data-cta className="relative overflow-hidden py-28 md:py-40">
        <div className="absolute inset-0">
          <video className="w-full h-full object-cover opacity-35" autoPlay muted loop playsInline preload="none" poster="/hero-poster.jpg">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/65 to-[#050505]" />
        <div className="relative z-10">
          <p className="text-center text-lg md:text-2xl text-white/60 mb-6">→ let&apos;s</p>
          <h2 className="text-[19vw] md:text-[14vw] font-black tracking-[-0.06em] leading-[0.82] uppercase whitespace-nowrap text-center select-none">
            <span data-cta-l1 className="block text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.9)" }}>Code</span>
            <span data-cta-l2 className="block" style={{ color: LIME }}>Your</span>
            <span data-cta-l3 className="block">Business</span>
          </h2>
          <div data-reveal className="mt-14 flex flex-col sm:flex-row gap-3 justify-center items-center px-5">
            <button onClick={openModal} className="group flex items-center gap-3 pl-8 pr-2 py-2 rounded-full text-black text-lg font-semibold" style={{ backgroundColor: LIME }}>
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
