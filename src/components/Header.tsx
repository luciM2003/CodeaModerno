"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useModal } from '@/context/ModalContext';
import { usePathname } from 'next/navigation';

const LIME = 'hsl(76,85%,67%)';

const links = [
  { href: '/servicios', label: 'servicios' },
  { href: '/proyectos', label: 'proyectos' },
  { href: '/about', label: 'sobre nosotros' },
];

export default function Header() {
  const { openModal } = useModal();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useGSAP(() => {
    gsap.from(barRef.current, { y: -40, autoAlpha: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });
  });

  const toggleMenu = () => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, { x: '100%', duration: 0.4, ease: 'power2.in', onComplete: () => setIsMenuOpen(false) });
    } else {
      setIsMenuOpen(true);
    }
  };

  useGSAP(() => {
    if (isMenuOpen && menuRef.current) {
      gsap.fromTo(menuRef.current, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power2.out' });
      gsap.from(menuRef.current.querySelectorAll('[data-menu-item]'), { y: 30, autoAlpha: 0, duration: 0.5, stagger: 0.07, delay: 0.15, ease: 'power3.out' });
    }
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-3 md:px-6 pt-3 md:pt-4 pointer-events-none">
      <div
        ref={barRef}
        className={`pointer-events-auto mx-auto max-w-[1240px] flex justify-between items-center rounded-full border transition-all duration-500 ${scrolled ? 'py-2 pl-5 pr-2 bg-black/60 border-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.45)]' : 'py-3 pl-6 pr-3 bg-white/[0.04] border-white/10 backdrop-blur-md'}`}
      >
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-black text-sm font-black" style={{ backgroundColor: LIME }}>c</span>
          <span className="text-xl font-bold tracking-tighter">Codea</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-white/70">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-full transition-colors hover:text-white hover:bg-white/[0.06] ${pathname === l.href ? 'text-white bg-white/[0.06]' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openModal}
            className="hidden md:flex group items-center gap-2 pl-5 pr-2 py-2 rounded-full text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: LIME }}
          >
            Empezar un proyecto
            <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:rotate-[-45deg]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </button>

          <button className="md:hidden w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center" onClick={toggleMenu} aria-label="Abrir menú">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div ref={menuRef} className="pointer-events-auto fixed inset-0 z-40 md:hidden bg-[#0A0A0A] w-full h-screen flex flex-col justify-between p-8">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold tracking-tighter text-white">Codea</span>
            <button className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center" onClick={toggleMenu} aria-label="Cerrar menú">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-white">
            {links.map((l) => (
              <Link data-menu-item key={l.href} href={l.href} onClick={toggleMenu} className="text-5xl font-bold tracking-tighter hover:text-[hsl(76,85%,67%)] transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            data-menu-item
            onClick={() => { toggleMenu(); openModal(); }}
            className="w-full py-4 rounded-full text-lg font-semibold text-black"
            style={{ backgroundColor: LIME }}
          >
            Empezar un proyecto →
          </button>
        </div>
      )}
    </header>
  );
}
