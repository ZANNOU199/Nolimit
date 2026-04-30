/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  ChevronDown,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  MapPin,
  Globe,
  X,
  Menu,
  Calendar,
  Play,
  Theater,
  Users,
  Dumbbell,
  Library
} from 'lucide-react';

const IMAGES = {
  logo: 'https://i.ibb.co/gFPmjbyS/Copie-de-LOGO-NO-LIMIT-CREW-ASSOCIATION-removebg-preview.png',
  hero: 'https://i.ibb.co/Rps321Pt/78-A0328-resultat-resultat-resultat.webp',
  gallery1: 'https://i.ibb.co/s9c104ts/bboy-steph-7-1777561657840.jpg',
  gallery2: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?q=80&w=1400&auto=format&fit=crop',
  gallery3: 'https://images.unsplash.com/photo-1550026399-392e69575ee2?q=80&w=1400&auto=format&fit=crop',
  gallery4: 'https://images.unsplash.com/photo-1516475429286-465d815a0df7?q=80&w=1400&auto=format&fit=crop',
  gallery5: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1400&auto=format&fit=crop',
};

const NAV_ITEMS = [
  { label: 'À propos', id: 'about' },
  { label: 'Festival', id: 'festival' },
  { label: 'Événements', id: 'événements' },
  { label: 'Journal', id: 'blog' },
  { label: 'Galerie', id: 'archives' },
  { label: 'Contact', id: 'contact' },
];

const BLOG_POSTS = [
  {
    category: "Culture",
    title: "Le Breaking aux JO 2024 : Une reconnaissance historique pour la scène africaine",
    date: "24 OCT 2024",
    image: "https://images.unsplash.com/photo-1535533725845-adcee9203a93?q=80&w=1200&auto=format&fit=crop"
  },
  {
    category: "Coulisses",
    title: "Reportage : 48h en immersion totale dans l'organisation de l'All Star Battle",
    date: "12 AOUT 2024",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop"
  },
  {
    category: "Elite",
    title: "Interview : Bboy Steph nous livre les secrets de la victoire du No Limit Crew",
    date: "05 JUIN 2024",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop"
  }
];

const EVENTS = [
  {
    date: '18',
    month: 'Juil',
    year: '2025',
    title: 'All Star Battle International',
    sub: '12ème Édition · Ouverture officielle',
    location: 'Institut Français du Togo, Lomé',
    status: 'Passé',
    accent: 'brand-orange',
  },
  {
    date: '25',
    month: 'Juil',
    year: '2025',
    title: 'En attendant James B.',
    sub: 'Spectacle de clôture · Scène Jimi Hope',
    location: 'IFT · Lomé, Togo',
    status: 'Passé',
    accent: 'brand-green',
  },
  {
    date: 'TBD',
    month: '2026',
    year: '',
    title: 'All Star Battle International',
    sub: '13ème Édition · Lomé',
    location: 'Lomé, Togo',
    status: 'À venir',
    accent: 'brand-yellow',
  },
];

/* ─────────────────────────────────────────────────────────
   COMPONENTS
   ───────────────────────────────────────────────────────── */

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const enter = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor]') as HTMLElement | null;
      if (el) { setHovering(true); setLabel(el.dataset.cursor || ''); }
    };
    const leave = () => { setHovering(false); setLabel(''); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseenter', enter, true);
    window.addEventListener('mouseleave', leave, true);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseenter', enter, true);
      window.removeEventListener('mouseleave', leave, true);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[200] pointer-events-none hidden md:flex items-center justify-center text-white"
      animate={{
        x: pos.x - (hovering ? 40 : 8),
        y: pos.y - (hovering ? 40 : 8),
        width: hovering ? 80 : 16,
        height: hovering ? 80 : 16,
        borderRadius: hovering ? '4px' : '50%',
        backgroundColor: hovering ? '#E8511A' : 'rgba(232,81,26,0.6)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {hovering && label && (
        <span className="text-[7px] font-black uppercase tracking-[0.2em] text-center leading-tight">{label}</span>
      )}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-6"
    >
      <span className="w-8 h-px bg-brand-orange" />
      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-orange">{children}</span>
    </motion.div>
  );
}


export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isHeroActive, setIsHeroActive] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const resetHero = () => {
      timeout = setTimeout(() => setIsHeroActive(false), 3000);
    };

    if (isHeroActive) {
      resetHero();
    }

    return () => clearTimeout(timeout);
  }, [isHeroActive]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset || document.documentElement.scrollTop);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-brand-orange selection:text-white font-sans overflow-x-hidden">
      <CustomCursor />

      {/* ── NAV (Editorial Version) ────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 80 ? 'bg-white/95 backdrop-blur-xl shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
          <a href="#" className="shrink-0" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img src={IMAGES.logo} alt="NLC" className="h-10 md:h-12 lg:h-16 w-auto object-contain transition-all" referrerPolicy="no-referrer" />
          </a>

          <nav className="ml-auto hidden md:flex items-center gap-4 lg:gap-8 xl:gap-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] lg:tracking-[0.4em] text-on-surface-muted hover:text-brand-orange transition-colors whitespace-nowrap"
                style={{ color: scrollY < 80 ? 'white' : undefined }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 lg:gap-6">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden flex flex-col gap-[4px] lg:gap-[5px] p-2 group"
              aria-label="Menu"
            >
              <span className={`block w-6 lg:w-7 h-[2px] transition-all group-hover:bg-brand-orange ${scrollY < 80 ? 'bg-white' : 'bg-on-surface'}`} />
              <span className={`block w-4 lg:w-5 h-[2px] self-end transition-all group-hover:w-7 group-hover:bg-brand-orange ${scrollY < 80 ? 'bg-white' : 'bg-on-surface'}`} />
              <span className={`block w-6 lg:w-7 h-[2px] transition-all group-hover:bg-brand-orange ${scrollY < 80 ? 'bg-white' : 'bg-on-surface'}`} />
            </button>
          </div>
        </div>
      </header>

      <main>
        <h1 className="sr-only">All Star Battle International - Organisation de danse en Afrique - No Limit Crew</h1>
        {/* Hero Section */}
        <section 
          className="relative h-screen bg-on-surface overflow-hidden group/hero"
          onMouseMove={() => {
            setIsHeroActive(true);
          }}
          onMouseLeave={() => setIsHeroActive(false)}
          onTouchStart={() => setIsHeroActive(true)}
          onTouchEnd={() => setTimeout(() => setIsHeroActive(false), 2000)}
        >
          <motion.div 
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              filter: (scrollY > 50 || (isHeroActive && scrollY < 300)) ? 'grayscale(0) brightness(1) contrast(1)' : 'grayscale(1) brightness(0.6) contrast(1.2)'
            }}
            transition={{ 
              filter: { duration: 1.5, ease: "easeOut" },
              default: { duration: 2.5, ease: [0.16, 1, 0.3, 1] }
            }}
            className="absolute inset-0"
          >
            <img 
              src={IMAGES.hero} 
              alt="Mouvement de danse spectaculaire" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className={`absolute inset-0 bg-gradient-to-tr from-on-surface via-transparent to-transparent transition-opacity duration-1000 ${scrollY > 50 || isHeroActive ? 'opacity-40' : 'opacity-80'}`} />

          <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-center pb-8 sm:pb-16 text-center px-4">
            <div className="space-y-6 sm:space-y-10 w-full mt-48 md:mt-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="flex flex-col items-center"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-yellow block mb-4">SINCE 2005</span>
                
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-6 w-full"
              >
                <div className={`overflow-hidden bg-brand-yellow/10 backdrop-blur-[2px] py-3 border-y border-white/10 w-full rotate-[-1deg] transition-all duration-1000 ${scrollY > 50 || isHeroActive ? 'bg-black/40' : ''}`}>
                  <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(6)].map((_, i) => (
                      <span key={i} className="text-white text-[clamp(1.2rem,3vw,2rem)] font-bold uppercase tracking-tighter mx-10 flex items-center gap-8">
                        <span>All Star Battle <span className="text-brand-orange italic">International</span></span>
                        <span className="w-2 h-2 md:w-3 md:h-3 bg-white/30 rotate-45 shrink-0" />
                        <span className="opacity-80">No Limit Crew <span className="italic">Association</span></span>
                        <span className="w-2 h-2 md:w-3 md:h-3 bg-white/30 rotate-45 shrink-0" />
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
              >
                <button 
                  onClick={() => scrollTo('événements')}
                  className="group relative h-12 bg-white text-on-surface px-10 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-brand-orange hover:text-white flex items-center justify-center gap-4 active:scale-95 shadow-2xl"
                >
                  Explorer l'agenda <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                <a 
                  href="https://allstarbattle.dance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 bg-brand-orange text-white px-10 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-on-surface flex items-center justify-center active:scale-95 shadow-xl"
                >
                  Site Officiel ASB
                </a>

                <button 
                  onClick={() => scrollTo('contact')}
                  className="h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:bg-white/20 flex items-center justify-center active:scale-95"
                >
                  Devenir partenaire
                </button>
              </motion.div>
            </div>

            {/* Scroll Indicator - 3 Arrows */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1 opacity-60 mt-12 md:mt-20"
            >
              {[...Array(3)].map((_, i) => (
                <ChevronDown key={i} size={14} className="text-brand-yellow -mt-2 first:mt-0" />
              ))}
            </motion.div>
          </div>

            {/* Social Links at bottom of Hero - Full Width */}
            <div className="absolute bottom-12 left-0 right-0 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 pt-8 border-t border-white/10 px-6">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Suivez-nous</span>
              <div className="flex gap-6">
                {[Instagram, Youtube, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="text-white/40 hover:text-brand-orange transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
        </section>

        {/* Stats Grid - Bento Style */}
        <section className="bg-on-surface py-10 md:py-12 px-6 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {[
                { label: "Danseurs", value: "+500", color: "text-brand-orange", icon: Users },
                { label: "Pays Représentés", value: "+20", color: "text-brand-green", icon: MapPin },
                { label: "Éditions Menées", value: "12", color: "text-brand-yellow", icon: Library },
                { label: "Spectateurs", value: "10K+", color: "text-white", icon: Users }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="relative p-6 overflow-hidden group bg-on-surface hover:bg-white/[0.03] transition-colors min-h-[160px] flex flex-col justify-between"
                >
                  <stat.icon className="absolute -top-4 -right-4 w-16 h-16 opacity-5 text-white group-hover:scale-125 transition-transform duration-1000" />
                  <div className={`text-4xl lg:text-5xl font-black ${stat.color} leading-none tracking-tighter group-hover:scale-105 transition-transform origin-left duration-700`}>
                    {stat.value}
                  </div>
                  <div className="space-y-3">
                    <div className="h-1 w-8 bg-white/10" />
                    <div className="text-[9px] font-black tracking-[0.4em] uppercase text-white opacity-40 group-hover:opacity-100 transition-opacity">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      {/* ── ABOUT SECTION ─────────────────────────────────── */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>L'Association</SectionLabel>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
              Pionniers du<br />
              <span className="text-brand-orange italic">Breaking</span><br />
              en Afrique
            </h2>
            <p className="text-on-surface-muted text-lg font-light leading-relaxed mb-8">
              Depuis 2005, No Limit Crew œuvre pour la promotion et la professionnalisation des danses urbaines au Togo et à l'international.
            </p>
            <div className="flex gap-10">
              <div className="text-center">
                <div className="text-4xl font-black text-brand-orange">20+</div>
                <div className="text-[8px] font-black uppercase tracking-[0.3em] text-on-surface-muted">Ans d'impact</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-brand-green">12</div>
                <div className="text-[8px] font-black uppercase tracking-[0.3em] text-on-surface-muted">Éditions ASB</div>
              </div>
            </div>
          </div>
          <div className="aspect-square bg-on-surface/5 relative overflow-hidden">
             <img src={IMAGES.gallery1} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="About" />
          </div>
        </div>
      </section>

        {/* Events Section */}
        <section id="événements" className="bg-surface py-24 md:py-48 px-6 border-y border-on-surface/5">
          <div className="max-w-screen-2xl mx-auto space-y-24">
            <div className="flex flex-col md:flex-row justify-between items-end gap-10">
              <div className="space-y-6 max-w-2xl">
                <h2 className="text-7xl md:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] text-balance">Agenda</h2>
                <p className="text-xl text-on-surface-muted italic">Retrouvez-nous lors de nos prochaines tournées mondiales et sessions d'élite.</p>
                <div className="pt-4">
                  <a 
                    href="https://allstarbattle.dance" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange hover:gap-6 transition-all"
                  >
                    Site Officiel All Star Battle International <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
              <a 
                href="https://allstarbattle.dance"
                target="_blank"
                rel="noopener noreferrer"
                className="h-16 border-b-2 border-brand-orange text-xs font-black uppercase tracking-[0.4em] px-2 hover:text-brand-orange transition-all flex items-center gap-4"
              >
                Toutes les dates <ArrowUpRight size={20} />
              </a>
            </div>

            <div className="divide-y divide-on-surface/10 bg-white border border-on-surface/5 shadow-2xl">
              {[
                { date: "12", month: "AVR", title: "ASB Qualifiers West", location: "Centre Culturel, Lomé TG", status: "Open Now", theme: "brand-orange", bg: "bg-brand-orange/5" },
                { date: "02", month: "JUIL", title: "All Star Battle Int.", location: "Institut Français, Lomé TG", status: "Event", theme: "brand-green", bg: "bg-brand-green/5" },
                { date: "15", month: "AOÛT", title: "Masterclass Elite", location: "NLC Academy, Lomé TG", status: "Booking", theme: "brand-yellow", bg: "bg-brand-yellow/5" }
              ].map((event, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-16 px-8 items-center hover:bg-surface-alt transition-all"
                >
                  <div className={`md:col-span-2 flex flex-col items-center justify-center p-6 ${event.bg} rounded-sm`}>
                    <span className={`text-6xl font-black leading-none text-${event.theme}`}>{event.date}</span>
                    <span className="text-[10px] font-black tracking-[0.5em] text-on-surface/40 mt-3">{event.month}</span>
                  </div>
                  
                  <div className="md:col-span-7 space-y-4 text-center md:text-left">
                    <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter group-hover:text-brand-orange transition-colors duration-500">
                      {event.title}
                    </h4>
                    <div className="flex items-center justify-center md:justify-start gap-3 text-on-surface-muted text-sm font-medium">
                      <div className={`w-2 h-2 rounded-full bg-${event.theme}`} />
                      {event.location}
                    </div>
                  </div>

                  <div className="md:col-span-3 flex justify-center md:justify-end">
                    <button className={`w-full md:w-48 h-16 border-2 border-on-surface font-black uppercase tracking-[0.4em] text-[10px] transition-all hover:bg-on-surface hover:text-white hover:shadow-[8px_8px_0px_#E8511A]`}>
                      {event.status}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      {/* ── PARTNERS / TRUSTED BY ───────────────────────────── */}
      <section className="py-12 bg-surface-alt border-y border-on-surface/5">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface/30 whitespace-nowrap">Collaborateurs & Partenaires</span>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-10 md:gap-20 opacity-40 grayscale">
               {['INSTITUT FRANÇAIS', 'MINISTÈRE DE LA CULTURE', 'CANAL+', 'ORANGE', 'MOOV AFRICA'].map(name => (
                 <span key={name} className="text-lg md:text-xl font-black tracking-tighter whitespace-nowrap">{name}</span>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHT VIDEO ───────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <SectionLabel>Highlights</SectionLabel>
            <a 
              href="https://allstarbattle.dance" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange hover:translate-x-2 transition-transform inline-flex items-center gap-2"
            >
              AllStarBattle.dance &rarr;
            </a>
          </div>
          <div className="relative aspect-video bg-on-surface overflow-hidden group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
            {!isVideoPlaying ? (
              <div 
                className="absolute inset-0 cursor-pointer group"
                onClick={() => setIsVideoPlaying(true)}
              >
                <img 
                  src={IMAGES.hero} 
                  alt="Video Poster" 
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-on-surface/40 group-hover:bg-on-surface/25 transition-colors duration-500 flex items-center justify-center">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-brand-orange text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <Play fill="currentColor" size={40} className="ml-2" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 right-6 md:right-12 flex justify-between items-end">
                  <div className="space-y-2 md:space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-px bg-brand-orange" />
                      <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Highlight du Festival</p>
                    </div>
                    <h3 className="text-2xl md:text-5xl font-black uppercase text-white tracking-widest leading-none">ALL STAR BATTLE 2024</h3>
                  </div>
                  <div className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white border-b border-white/30 pb-2 hover:border-brand-orange transition-colors">
                    VOIR LE FILM
                  </div>
                </div>
              </div>
            ) : (
              <iframe 
                className="w-full h-full absolute inset-0"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3" 
                title="All Star Battle Highlights"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </section>

      {/* ── BLOG / JOURNAL SECTION ────────────────────────── */}
      <section id="blog" className="py-24 md:py-48 bg-surface-alt px-6 md:px-12 border-y border-on-surface/5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <SectionLabel>Le Journal</SectionLabel>
              <h2 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] mb-8">
                Chroniques<br />
                <span className="text-brand-orange italic">Urbaines</span>
              </h2>
            </div>
            <button className="h-16 group flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] px-2 hover:text-brand-orange transition-all">
              Toutes les actualités <ArrowUpRight size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-on-surface/10 border border-on-surface/10 overflow-hidden shadow-2xl">
            {BLOG_POSTS.map((post, i) => (
              <motion.article 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="group relative bg-white overflow-hidden flex flex-col h-full min-h-[500px]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={post.image} 
                    alt="" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                  />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="bg-brand-orange text-white text-[8px] font-black uppercase tracking-widest px-3 py-1">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="text-[10px] font-black tracking-[0.4em] text-on-surface/30">
                      {post.date}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight group-hover:text-brand-orange transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  
                  <button className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface hover:text-brand-orange transition-all">
                    Lire l'article <span className="w-8 h-px bg-on-surface group-hover:bg-brand-orange group-hover:w-12 transition-all" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY / ARCHIVES (Editorial Style) ────────────── */}
      <section id="archives" className="py-24 md:py-32 px-6 md:px-12 bg-on-surface text-white">
        <div className="max-w-screen-2xl mx-auto">
          <SectionLabel>Galerie & Archives</SectionLabel>
          <div className="grid grid-cols-12 grid-rows-2 gap-3 h-[70vw] max-h-[700px]">
             <div className="col-span-12 md:col-span-7 row-span-2 relative overflow-hidden group">
               <img src={IMAGES.gallery3} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="" />
               <div className="absolute inset-0 bg-brand-orange/10 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="col-span-12 md:col-span-5 row-span-1 relative overflow-hidden">
               <img src={IMAGES.gallery4} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" />
             </div>
             <div className="col-span-6 md:col-span-2 row-span-1 relative overflow-hidden">
               <img src={IMAGES.gallery2} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" />
             </div>
             <div className="col-span-6 md:col-span-3 row-span-1 relative overflow-hidden">
               <img src={IMAGES.gallery5} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="" />
             </div>
          </div>
          <div className="mt-12 flex justify-center">
            <button 
              onClick={() => window.open('https://www.instagram.com/nolimitcrew_togo', '_blank')}
              className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/50 hover:text-brand-orange transition-colors"
            >
              Voir plus <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACT (New Editorial Version) ────────────────── */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
                Devenir<br />
                <span className="text-brand-orange italic">partenaire</span>
              </h2>
              <p className="text-on-surface-muted text-lg font-light max-w-sm">
                Rejoignez une plateforme internationale de danse et touchez une audience mondiale. Devenez un acteur majeur de la culture urbaine.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: "Danseurs", val: "+500" },
                   { label: "Pays", val: "+20" },
                   { label: "Audience", val: "Int." },
                   { label: "Impact", val: "Global" }
                 ].map((stat, i) => (
                   <div key={i} className="p-4 border border-on-surface/5 bg-surface-alt">
                     <div className="text-2xl font-black text-brand-orange">{stat.val}</div>
                     <div className="text-[8px] font-black uppercase tracking-widest text-on-surface-muted">{stat.label}</div>
                   </div>
                 ))}
              </div>

              <div className="pt-2">
                 <button className="w-full sm:w-auto h-14 bg-brand-orange text-white px-10 text-[9px] font-black uppercase tracking-[0.4em] hover:bg-brand-orange/90 transition-all shadow-xl hover:shadow-brand-orange/30">
                   Devenir partenaire officiel
                 </button>
                 <p className="text-[8px] font-bold uppercase tracking-widest text-on-surface/30 mt-4">Dossier sponsor 2025 disponible</p>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Adresse', val: "Lomé, Togo — Afrique de l'Ouest" },
                { icon: Instagram, label: 'Instagram', val: '@nolimitcrew_togo' },
                { icon: Twitter, label: 'X / Twitter', val: '@NolimitTogo' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="w-10 h-10 border border-on-surface/10 flex items-center justify-center">
                    <item.icon size={14} className="text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-[0.3em] text-on-surface-muted">{item.label}</div>
                    <div className="text-sm font-bold">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </main>

      {/* ── FOOTER (New Editorial Version) ─────────────────── */}
      <footer className="bg-on-surface text-white py-20 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 pb-16 border-b border-white/10">
              <div className="space-y-6">
                <img src={IMAGES.logo} className="h-24 w-auto" alt="Logo" />
                <nav className="flex flex-wrap gap-x-8 gap-y-4">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-brand-orange transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="flex gap-8">
                 {[
                   { Icon: Instagram, url: "https://www.instagram.com/nolimitcrew_togo" },
                   { Icon: Youtube, url: "https://youtube.com/@AllStarBattleInt" },
                   { Icon: Globe, url: "https://allstarbattle.dance" },
                   { Icon: Twitter, url: "#" },
                   { Icon: Facebook, url: "#" }
                 ].map((item, i) => (
                   <a 
                     key={i} 
                     href={item.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-white/30 hover:text-brand-orange transition-colors"
                   >
                     <item.Icon size={20} />
                   </a>
                 ))}
              </div>
           </div>
           <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">© 2025 Association No Limit Crew · Lomé, Togo</span>
              <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
                 <a href="#" className="hover:text-white/50 transition-colors">Mentions légales</a>
                 <a href="#" className="hover:text-white/50 transition-colors">Confidentialité</a>
              </div>
           </div>
        </div>
      </footer>

      {/* Mobile Nav removed as requested */}


      {/* ── OVERLAY MENU ───────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-on-surface text-white flex flex-col p-8 md:p-16"
          >
            <div className="flex justify-between items-center mb-8">
              <img src={IMAGES.logo} alt="NLC" className="h-12 w-auto" />
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-12 h-12 border border-white/20 flex items-center justify-center hover:border-brand-orange"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-start mt-4 gap-0 md:gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { scrollTo(item.id); setIsMenuOpen(false); }}
                  className="group text-left flex items-center justify-between py-2 md:py-4 border-b border-white/5 hover:border-brand-orange transition-colors"
                >
                  <span className="text-lg sm:text-2xl md:text-7xl font-black uppercase tracking-tighter group-hover:text-brand-orange transition-colors">
                    {item.label}
                  </span>
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </nav>
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-10">
              <div className="flex gap-10">
                {[
                  { Icon: Instagram, url: "https://www.instagram.com/nolimitcrew_togo" },
                  { Icon: Youtube, url: "https://youtube.com/@AllStarBattleInt" },
                  { Icon: Globe, url: "https://allstarbattle.dance" }
                ].map((item, i) => (
                  <a 
                    key={i} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-brand-orange hover:scale-125 transition-all cursor-pointer"
                  >
                    <item.Icon size={28} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 border border-on-surface/10 bg-surface-alt text-center">
        <div className="text-4xl text-brand-green mb-4">✓</div>
        <h3 className="text-2xl font-black mb-2">Message envoyé !</h3>
        <p className="text-on-surface-muted font-light">Nous vous répondrons très bientôt.</p>
        <button onClick={() => setSent(false)} className="mt-4 text-[10px] font-black uppercase tracking-widest text-brand-orange">Envoyer un autre</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-surface-alt border border-on-surface/5">
      <div className="grid md:grid-cols-2 gap-6">
        <input placeholder="Nom" required className="bg-transparent border-b border-on-surface/20 py-3 outline-none focus:border-brand-orange transition-colors" />
        <input placeholder="Email" type="email" required className="bg-transparent border-b border-on-surface/20 py-3 outline-none focus:border-brand-orange transition-colors" />
      </div>
      <textarea placeholder="Message" rows={4} className="w-full bg-transparent border-b border-on-surface/20 py-3 outline-none focus:border-brand-orange transition-colors resize-none" />
      <button className="w-full h-14 bg-on-surface text-white font-black uppercase tracking-widest text-xs hover:bg-brand-orange transition-colors">Envoyer</button>
    </form>
  );
}
