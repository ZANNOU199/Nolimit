/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Theater, 
  Users, 
  Dumbbell, 
  Library, 
  Instagram, 
  Youtube, 
  Twitter,
  Facebook,
  ArrowUpRight,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const IMAGES = {
  logo: "https://i.ibb.co/gFPmjbyS/Copie-de-LOGO-NO-LIMIT-CREW-ASSOCIATION-removebg-preview.png",
  hero: "https://i.ibb.co/Rps321Pt/78-A0328-resultat-resultat-resultat.webp",
  elena: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1974&auto=format&fit=crop",
  marcus: "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=2073&auto=format&fit=crop",
  archive1: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070&auto=format&fit=crop",
  archive2: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?q=80&w=1974&auto=format&fit=crop",
  archive3: "https://images.unsplash.com/photo-1550026399-392e69575ee2?q=80&w=2070&auto=format&fit=crop",
  archive4: "https://images.unsplash.com/photo-1516475429286-465d815a0df7?q=80&w=1974&auto=format&fit=crop",
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isHeroActive, setIsHeroActive] = useState(false);

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
    <div className="min-h-screen bg-surface selection:bg-brand-orange selection:text-white">
      {/* Top Bar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrollY > 50 ? 'h-16 bg-surface/90 glass-light' : 'h-24 bg-transparent'}`}
      >
        <div className="max-w-screen-2xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          <div className="h-full py-4 transition-all duration-500">
            <img 
              src={IMAGES.logo} 
              alt="No Limit Crew Logo" 
              className={`h-full w-auto object-contain transition-all duration-700 transform-gpu ${scrollY > 50 ? 'scale-90 opacity-100' : 'scale-100'}`}
              style={{ 
                imageRendering: 'auto'
              }}
              referrerPolicy="no-referrer"
            />
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group flex items-center gap-4 p-2"
          >
            <div className="flex flex-col gap-1.5">
              <div className={`w-8 h-1 bg-on-surface transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
              <div className={`w-8 h-1 bg-on-surface transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-1 bg-on-surface self-end transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5 -translate-x-1 w-8' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section 
          className="relative h-screen bg-on-surface overflow-hidden group/hero"
          onMouseMove={() => {
            setIsHeroActive(true);
            // Clear existing timeout if any is handled via state or just let it be transient
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
              alt="Mouvement de danse" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className={`absolute inset-0 bg-gradient-to-tr from-on-surface via-transparent to-transparent transition-opacity duration-1000 ${scrollY > 50 || isHeroActive ? 'opacity-40' : 'opacity-80'}`} />

          <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-center pb-8 sm:pb-16 px-6 md:px-12 max-w-screen-2xl mx-auto">
            <div className="space-y-10 max-w-4xl mt-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="space-y-6"
              >
                <div className={`overflow-hidden bg-brand-yellow/10 backdrop-blur-[2px] py-3 border-y border-white/10 -mx-6 md:-mx-12 rotate-[-2deg] transition-all duration-1000 ${scrollY > 50 || isHeroActive ? 'bg-black/20' : ''}`}>
                  <div className="flex whitespace-nowrap animate-marquee">
                    {[...Array(6)].map((_, i) => (
                      <span key={i} className="text-white text-[clamp(1.2rem,4vw,2.5rem)] font-bold uppercase tracking-tighter mx-10 flex items-center gap-10">
                        No Limit Crew <span className="w-3 h-3 md:w-4 md:h-4 bg-brand-orange rotate-45 shrink-0 shadow-[0_0_15px_rgba(232,81,26,0.5)]" />
                        No Limit Association <span className="w-3 h-3 md:w-4 md:h-4 bg-brand-green rotate-45 shrink-0 shadow-[0_0_15px_rgba(30,158,74,0.5)]" />
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={() => document.getElementById('événements')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative h-12 bg-brand-orange text-white px-8 text-[9px] font-black uppercase tracking-[0.4em] transition-all hover:bg-brand-orange/90 flex items-center justify-center gap-4 active:scale-95 shadow-[0_15px_30px_rgba(232,81,26,0.3)]"
                >
                  Nos événements <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                <button className="h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 text-[9px] font-black uppercase tracking-[0.4em] transition-all hover:bg-white hover:text-on-surface flex items-center justify-center active:scale-95">
                  Devenir partenaire
                </button>
              </motion.div>
            </div>

            {/* Scroll Indicator - 3 Arrows */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute bottom-32 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 flex flex-col items-center md:items-start gap-1 opacity-60"
            >
              {[...Array(3)].map((_, i) => (
                <ChevronDown key={i} size={14} className="text-brand-green -mt-2 first:mt-0" />
              ))}
            </motion.div>

            {/* Social Links at bottom of Hero */}
            <div className="absolute bottom-12 left-6 md:left-12 flex flex-col md:flex-row items-center gap-4 md:gap-8 pt-8 border-t border-white/10 w-[calc(100%-3rem)] md:w-auto">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">Suivez-nous</span>
              <div className="flex gap-6">
                {[Instagram, Youtube, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="text-white/40 hover:text-brand-orange transition-colors">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid - Bento Style */}
        <section className="bg-on-surface py-24 md:py-48 px-6 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {[
                { label: "Distinctions", value: "12", color: "text-brand-orange", icon: Theater },
                { label: "Spectacles Live", value: "500+", color: "text-brand-green", icon: Users },
                { label: "Années d'Activité", value: "14", color: "text-brand-yellow", icon: Library },
                { label: "Communauté", value: "50K", color: "text-white", icon: Instagram }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="relative p-12 overflow-hidden group bg-on-surface hover:bg-white/[0.03] transition-colors min-h-[350px] flex flex-col justify-between"
                >
                  <stat.icon className="absolute -top-6 -right-6 w-32 h-32 opacity-5 text-white group-hover:scale-125 transition-transform duration-1000" />
                  <div className={`text-7xl lg:text-9xl font-black ${stat.color} leading-none tracking-tighter group-hover:scale-105 transition-transform origin-left duration-700`}>
                    {stat.value}
                  </div>
                  <div className="space-y-4">
                    <div className="h-1 w-12 bg-white/10" />
                    <div className="text-[11px] font-black tracking-[0.4em] uppercase text-white opacity-40 group-hover:opacity-100 transition-opacity">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Crew / La Compagnie */}
        <section id="lacompagnie" className="py-24 md:py-48 px-6 bg-surface text-on-surface relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 blur-[150px] -translate-y-1/2 translate-x-1/2" />
          <div className="max-w-screen-2xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-20 items-start">
              <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
                <div className="space-y-6">
                  <h2 className="text-7xl md:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] text-balance">
                    La <span className="text-brand-green block italic">Compagnie</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-on-surface-muted font-light leading-relaxed max-w-xl">
                    Spécialistes du mouvement d'élite dédiés à la préservation et à l'évolution de l'art urbain contemporain.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-8 items-center pt-10 border-t border-on-surface/10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-green">Fondée EN</span>
                    <div className="text-2xl font-black">2009</div>
                  </div>
                  <div className="w-px h-10 bg-on-surface/10" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">SIÈGE</span>
                    <div className="text-2xl font-black">PARIS</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-32">
                {[
                  { name: "Elena Rossi", role: "Directrice Artistique", img: IMAGES.elena, bio: "Pionnière du mouvement fluide fusionnant breakdance et contemporain.", accent: "brand-green" },
                  { name: "Marcus Vane", role: "Directeur Technique", img: IMAGES.marcus, bio: "Expert en acrobaties de haute précision et scénographie dynamique.", accent: "brand-yellow" }
                ].map((member, i) => (
                  <motion.div 
                    key={i}
                    whileInView={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="group"
                  >
                    <div className="grid md:grid-cols-12 gap-12 items-center">
                      <div className="md:col-span-7 order-2 md:order-1">
                        <div className="relative aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 border-2 border-on-surface/5">
                           <div className={`absolute inset-0 bg-brand-${member.accent}/10 opacity-0 group-hover:opacity-100 transition-opacity z-10`} />
                           <img 
                            src={member.img} 
                            alt={member.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-5 order-1 md:order-2 space-y-8">
                        <div className="space-y-3">
                          <span className={`text-[11px] font-black uppercase tracking-[0.5em] text-brand-${member.accent}`}>{member.role}</span>
                          <h3 className="text-5xl font-black uppercase leading-tight tracking-tighter">{member.name}</h3>
                        </div>
                        <p className="text-lg text-on-surface-muted leading-relaxed font-light">
                          {member.bio}
                        </p>
                        <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] group/btn">
                          <span className="w-12 h-px bg-on-surface/20 group-hover/btn:w-20 group-hover/btn:bg-brand-orange transition-all duration-500" />
                          View Portfolio
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
              </div>
              <button className="h-16 border-b-2 border-brand-orange text-xs font-black uppercase tracking-[0.4em] px-2 hover:text-brand-orange transition-all flex items-center gap-4">
                View All dates <ArrowUpRight size={20} />
              </button>
            </div>

            <div className="divide-y divide-on-surface/10 bg-white border border-on-surface/5 shadow-2xl">
              {[
                { date: "24", month: "NOV", title: "Urban Genesis Tour", location: "Théâtre Principal, Paris FR", status: "Tickets", theme: "brand-orange", bg: "bg-accent-orange" },
                { date: "02", month: "DÉC", title: "Elite Masterclass", location: "NLC Studio, Londres UK", status: "Booking", theme: "brand-green", bg: "bg-accent-green" },
                { date: "15", month: "DÉC", title: "Archives: Vol. 04", location: "Global Digital Première", status: "Reserve", theme: "brand-yellow", bg: "bg-accent-yellow" }
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

        {/* Media Gallery / Archives */}
        <section id="archives" className="py-24 md:py-48 bg-surface-alt text-on-surface overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 space-y-24">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-10">
              <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8]">Archives</h2>
              <div className="max-w-md space-y-6">
                <p className="text-lg text-on-surface-muted italic font-light">
                  "L'art est un cri vers la liberté, un saut dans l'infini."
                </p>
                <div className="h-px w-full bg-on-surface/10" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                whileHover={{ scale: 0.98 }}
                className="md:col-span-2 md:row-span-2 relative aspect-[16/9] md:aspect-auto overflow-hidden group shadow-2xl border-2 border-on-surface/5"
              >
                <img src={IMAGES.archive3} alt="Performance" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-brand-orange/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              <div className="aspect-square relative overflow-hidden group border-2 border-on-surface/5">
                <img src={IMAGES.archive1} alt="Répétition" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square relative overflow-hidden group border-2 border-on-surface/5">
                <img src={IMAGES.archive2} alt="Backstage" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
              </div>
              <div className="md:col-span-3 aspect-[21/9] relative overflow-hidden group border-2 border-on-surface/5">
                <img src={IMAGES.archive4} alt="Street" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
              </div>
            </div>

            <button className="w-full h-24 border border-on-surface/10 font-black uppercase tracking-[0.5em] text-[10px] hover:bg-on-surface hover:text-white transition-all flex items-center justify-center gap-6 group shadow-lg">
              Full Media Archive <ArrowUpRight className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-48 px-6 bg-surface">
          <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-32">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-7xl md:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] text-balance">Elite <span className="text-brand-orange block">Booking</span></h2>
                <p className="text-xl text-on-surface-muted italic font-medium leading-relaxed max-w-md">
                  Inscrivez votre événement dans l'histoire de la culture urbaine. Contactez notre direction technique.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex flex-col gap-4 text-xs font-black uppercase tracking-[0.4em]">
                  {["Paris, France", "@nolimitcrew_official", "booking@nolimitcrew.pro"].map((item, i) => (
                    <motion.div key={i} whileHover={{ x: 10 }} className="flex items-center gap-6 cursor-pointer group">
                      <span className={`w-3 h-3 rotate-45 ${i === 0 ? 'bg-brand-orange' : i === 1 ? 'bg-brand-green' : 'bg-brand-yellow'}`} />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            <form className="space-y-12 bg-white p-8 md:p-16 border border-on-surface/5 shadow-2xl" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-12">
                {[
                  { label: "Nom Complet", placeholder: "Jean Dupont" },
                  { label: "Organisation", placeholder: "Agence Artistique" }
                ].map((field, i) => (
                  <div key={i} className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">{field.label}</label>
                    <input className="w-full bg-transparent border-b-2 border-on-surface/10 py-4 outline-none focus:border-brand-orange transition-colors text-xl font-bold" placeholder={field.placeholder} />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Message / Projet Details</label>
                <textarea className="w-full bg-transparent border-b-2 border-on-surface/10 py-4 outline-none focus:border-brand-orange transition-colors text-xl font-bold min-h-[150px] resize-none" placeholder="En quoi pouvons-nous vous aider ?" />
              </div>
              <button className="w-full h-20 bg-on-surface text-white font-black uppercase tracking-[0.4em] text-[10px] shadow-[10px_10px_0px_#E8511A] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all duration-300">
                Send Inquiry
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-on-surface text-white py-32 px-6 relative overflow-hidden border-t border-on-surface/5">
        <div className="max-w-screen-2xl mx-auto space-y-32">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-20">
            <div className="space-y-10 text-center md:text-left">
              <img 
                src={IMAGES.logo} 
                alt="NLC Logo" 
                className="h-20 w-auto mx-auto md:mx-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                style={{ imageRendering: 'auto' }}
                referrerPolicy="no-referrer" 
              />
              <p className="text-xs uppercase tracking-[0.6em] text-white/30 font-black">Energy. Elite. Evolution.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-32">
              {[
                { title: "Network", links: ["Instagram", "Youtube", "Twitter", "Facebook"] },
                { title: "Work", links: ["Events", "Gallery", "Company", "Partner"] }
              ].map((group, i) => (
                <div key={i} className="space-y-8">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{group.title}</h5>
                  <div className="flex flex-col gap-4 text-[10px] font-black uppercase tracking-[0.2em]">
                    {group.links.map((link, j) => (
                      <a key={j} href="#" className="hover:text-brand-orange transition-colors">{link}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 opacity-20 border-t border-white/10 pt-10">
            <p className="text-[9px] font-black uppercase tracking-[0.5em]">© 2024 No Limit Crew Association</p>
            <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.4em]">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Press Kit</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Nav */}
      <AnimatePresence>
        {scrollY > 100 && (
          <motion.nav 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="md:hidden fixed bottom-6 left-6 right-6 h-20 bg-surface/90 glass-light z-[90] rounded-none flex items-center justify-around px-2 shadow-2xl"
          >
            {[
              { icon: Theater, label: "Dates", id: "événements", color: "text-brand-orange" },
              { icon: Users, label: "Crew", id: "lacompagnie", color: "text-brand-green" },
              { icon: Dumbbell, label: "Booking", id: "contact", color: "text-brand-yellow" },
              { icon: Library, label: "Media", id: "archives", color: "text-brand-orange" }
            ].map((item, i) => (
              <button 
                key={i}
                onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="flex flex-col items-center gap-1 group flex-1"
              >
                <div className="p-2 transition-all">
                  <item.icon size={22} className={`${item.color} group-hover:scale-125 transition-transform`} />
                </div>
                <span className="text-[7px] font-black uppercase tracking-[0.2em]">{item.label}</span>
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-surface-dark text-white p-12 flex flex-col justify-between overflow-hidden"
          >
            {/* Artistic Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none overflow-hidden opacity-10">
              <div className="text-[40rem] font-black uppercase tracking-tighter leading-none select-none text-brand-orange/20 animate-marquee-fast whitespace-nowrap">
                NO LIMIT NO LIMIT NO LIMIT NO LIMIT
              </div>
            </div>

            <div className="flex justify-between items-center relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-orange">Navigation Elite</span>
              <button onClick={() => setIsMenuOpen(false)} className="group p-4">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute w-8 h-1 bg-white rotate-45 group-hover:bg-brand-orange transition-colors" />
                  <div className="absolute w-8 h-1 bg-white -rotate-45 group-hover:bg-brand-orange transition-colors" />
                </div>
              </button>
            </div>

            <div className="space-y-4 relative z-10">
              {[
                { name: 'Accueil', id: 'accueil', accent: 'brand-orange' },
                { name: 'La Compagnie', id: 'lacompagnie', accent: 'brand-green' },
                { name: 'Agenda', id: 'événements', accent: 'brand-orange' },
                { name: 'Archives', id: 'archives', accent: 'brand-yellow' },
                { name: 'Contact', id: 'contact', accent: 'brand-orange' }
              ].map((item, i) => (
                <motion.button
                  key={i}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    if (item.id === 'accueil') window.scrollTo({ top: 0, behavior: 'smooth' });
                    else document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="group block text-left"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-4xl md:text-8xl font-black uppercase tracking-tighter group-hover:translate-x-6 transition-transform duration-500 flex items-center">
                      {item.name}
                      <ArrowUpRight size={48} className="opacity-0 group-hover:opacity-100 group-hover:text-brand-orange transition-all ml-4" />
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end md:items-center relative z-10 gap-10">
              <div className="flex gap-10">
                {[Instagram, Youtube].map((Icon, i) => (
                  <Icon key={i} size={28} className="hover:text-brand-orange hover:scale-125 transition-all cursor-pointer" />
                ))}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 hidden md:block">
                Artistic Mastery Since 2009
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
