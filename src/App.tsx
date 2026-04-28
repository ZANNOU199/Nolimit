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
  ArrowUpRight,
  MapPin,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const IMAGES = {
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtD423J9h_46Z7V_GIn-W85-H_G762e_g96R_rL4_sO_W_81G_W_C-w_e5_Z-5V-5-5=s0",
  hero: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop",
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

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 px-6 bg-surface/80 backdrop-blur-md border-b-2 border-on-surface">
        <div className="h-full py-4">
          <img 
            src={IMAGES.logo} 
            alt="No Limit Crew Logo" 
            className="h-full w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-black/5 rounded-full transition-colors flex items-center gap-2"
        >
          <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">Menu</span>
          <Menu size={24} />
        </button>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] md:h-[95vh] overflow-hidden">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 grayscale contrast-[1.1] brightness-[0.8]"
          >
            <img 
              src={IMAGES.hero} 
              alt="Mouvement de danse" 
              className="w-full h-full object-cover origin-center"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface via-transparent to-transparent opacity-60" />

          <div className="absolute bottom-16 left-6 right-6 z-10 space-y-10 max-w-7xl mx-auto lg:px-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2 className="text-xs md:text-sm font-black tracking-[0.4em] uppercase text-primary mb-6">
                Énergie Pure. Savoir-faire Élite.
              </h2>
              
              <div className="relative -ml-6 -mr-6 md:-ml-20 md:-mr-20 overflow-hidden bg-accent-yellow/20 backdrop-blur-md py-4 border-y border-white/20 rotate-[-1deg]">
                <div className="flex whitespace-nowrap animate-marquee">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-white text-[clamp(2rem,5vw,3.5rem)] font-black uppercase tracking-tighter mx-8 flex items-center gap-8">
                      No Limit Crew <span className="w-5 h-5 bg-primary rotate-45 shrink-0" />
                      No Limit Crew <span className="w-5 h-5 bg-primary rotate-45 shrink-0" />
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-5">
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => document.getElementById('événements')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-primary text-white px-10 py-6 text-xs font-black tracking-[0.2em] uppercase transition-all shadow-[6px_6px_0px_#000] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Nos événements <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white text-on-surface px-10 py-6 text-xs font-black tracking-[0.2em] uppercase transition-all shadow-[6px_6px_0px_#aa3000] border border-on-surface"
              >
                Devenir partenaire
              </motion.button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="bg-on-surface text-surface py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {[
                { label: "Distinctions", value: "12+" },
                { label: "Spectacles Live", value: "500" },
                { label: "Années d'Activité", value: "15" },
                { label: "Communauté", value: "50k" }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 space-y-3 bg-on-surface hover:bg-white/5 transition-colors group"
                >
                  <div className="text-6xl font-black text-primary group-hover:scale-110 transition-transform origin-left duration-500">{stat.value}</div>
                  <div className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Crew / La Compagnie */}
        <section id="lacompagnie" className="py-40 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                  La <span className="text-primary block">Compagnie</span>
                </h2>
                <div className="inline-block bg-accent-orange px-4 py-2 text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                  Savoir-faire Élite
                </div>
                <p className="text-lg text-on-surface-muted font-medium leading-relaxed">
                  Spécialistes du mouvement d'élite dédiés à la préservation et à l'évolution de l'art urbain contemporain.
                </p>
                <div className="pt-8 border-t border-on-surface/10">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Fondée en 2009 — Paris</span>
                </div>
              </div>

              <div className="lg:col-span-8 flex flex-col gap-24">
                {[
                  { name: "Elena Rossi", role: "Direction Artistique", img: IMAGES.elena, bio: "Pionnière du mouvement fluide fusionnant breakdance et contemporain.", color: "bg-accent-green" },
                  { name: "Marcus Vane", role: "Directeur Technique", img: IMAGES.marcus, bio: "Expert en acrobaties de haute précision et scénographie dynamique.", color: "bg-accent-yellow" }
                ].map((member, i) => (
                  <motion.div 
                    key={i}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 100 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-8 items-center group bg-white p-6 border border-on-surface/5 shadow-sm"
                  >
                    <div className="overflow-hidden border-2 border-on-surface group-hover:border-primary transition-colors aspect-[4/5]">
                      <img 
                        src={member.img} 
                        alt={member.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-6 order-first md:order-none">
                      <div className="space-y-1">
                        <span className={`inline-block ${member.color} px-3 py-1 text-[10px] font-black uppercase text-on-surface tracking-[0.3em]`}>
                          {member.role}
                        </span>
                        <h3 className="text-4xl font-black uppercase tracking-tight">{member.name}</h3>
                      </div>
                      <p className="text-on-surface-muted leading-relaxed font-medium">
                        {member.bio}
                      </p>
                      <button className="text-xs font-black uppercase tracking-widest flex items-center gap-2 group/btn hover:text-primary transition-colors">
                        Voir le profil <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="événements" className="bg-surface-alt py-40 px-6 border-y border-on-surface/5">
          <div className="max-w-7xl mx-auto space-y-24">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 text-balance">
              <h2 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-none">Événements</h2>
              <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest border-b-2 border-primary pb-2 hover:text-primary transition-colors">
                Toutes les dates <ArrowUpRight size={18} />
              </button>
            </div>

            <div className="divide-y divide-on-surface/10 bg-white border border-on-surface/5 shadow-lg">
              {[
                { date: "24", month: "NOV", title: "Urban Genesis Tour", location: "Théâtre Principal, Paris FR", status: "Billets Disponibles", accent: true, theme: "bg-accent-orange" },
                { date: "02", month: "DÉC", title: "Elite Masterclass", location: "NLC Studio, Londres UK", status: "Places Limitées", accent: false, theme: "bg-accent-green" },
                { date: "15", month: "DÉC", title: "Archives: Vol. 04", location: "Première Diffusion Digitale", status: "Réserver ma place", accent: false, theme: "bg-accent-yellow" }
              ].map((event, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col md:flex-row gap-8 py-12 items-start md:items-center hover:bg-surface-alt transition-all px-10"
                >
                  <div className={`flex flex-col items-start md:items-center min-w-[100px] p-4 ${event.theme}`}>
                    <span className={`text-6xl font-black leading-none ${event.accent ? 'text-primary' : 'text-on-surface'}`}>{event.date}</span>
                    <span className="text-xs font-black tracking-[0.4em] text-on-surface/60 mt-2">{event.month}</span>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-2 text-on-surface-muted text-sm font-medium">
                      <MapPin size={16} className="text-primary" />
                      {event.location}
                    </div>
                  </div>

                  <button className={`w-full md:w-auto px-8 py-4 border-2 font-black uppercase tracking-widest text-[10px] transition-all ${event.accent ? 'bg-primary border-primary text-white shadow-[4px_4px_0px_#000]' : 'border-on-surface/20 hover:border-primary hover:bg-primary hover:text-white'}`}>
                    {event.status}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Archive */}
        <section id="archives" className="py-40 bg-surface">
          <div className="max-w-7xl mx-auto px-6 space-y-24">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">Archives<br/><span className="text-primary italic font-light ml-8 md:ml-20">Médias</span></h2>
              <div className="max-w-xs space-y-4">
                <div className="h-px w-12 bg-primary" />
                <p className="text-xs font-black uppercase tracking-widest text-on-surface-muted italic">
                  Capturer l'invisible à travers le regard de notre compagnie.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div 
                whileHover={{ y: -8 }}
                className="col-span-2 row-span-2 overflow-hidden border-2 border-on-surface group relative shadow-[12px_12px_0px_rgba(0,0,0,0.05)]"
              >
                <img src={IMAGES.archive3} alt="Performance" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              <div className="overflow-hidden border-2 border-on-surface group relative shadow-md">
                <img src={IMAGES.archive1} alt="Répétition" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="overflow-hidden border-2 border-on-surface group relative shadow-md">
                <img src={IMAGES.archive2} alt="Backstage" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="overflow-hidden border-2 border-on-surface col-span-2 aspect-[16/9] md:aspect-auto group relative shadow-md">
                <img src={IMAGES.archive4} alt="Street Performance" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
            </div>

            <button className="w-full py-8 border-2 border-on-surface font-black uppercase tracking-[0.4em] text-[10px] hover:bg-on-surface hover:text-surface transition-all shadow-[8px_8px_0px_#aa3000]">
              Explorer toute l'archive
            </button>
          </div>
        </section>

        {/* Connect Section */}
        <section id="contact" className="py-40 px-6 border-t border-on-surface/5 bg-surface-alt">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-20">
            <div className="space-y-10">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">Parlons <span className="text-primary italic">Danse</span></h2>
              <div className="space-y-6">
                <p className="text-xl font-medium text-on-surface-muted leading-relaxed">
                  Pour toute demande de spectacle, collaboration artistique ou partenariat stratégique.
                </p>
                <div className="flex flex-col gap-5 text-sm font-black uppercase tracking-widest pt-10">
                  <div className="flex items-center gap-4 hover:text-primary transition-colors cursor-pointer group">
                    <div className="w-10 h-10 bg-white border border-on-surface/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <MapPin size={18} />
                    </div>
                    Paris, France
                  </div>
                  <div className="flex items-center gap-4 hover:text-primary transition-colors cursor-pointer group">
                    <div className="w-10 h-10 bg-white border border-on-surface/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <Instagram size={18} />
                    </div>
                    @nolimitcrew_official
                  </div>
                </div>
              </div>
            </div>
            
            <form className="space-y-12 bg-white p-10 md:p-16 border border-on-surface/5 shadow-xl" onSubmit={(e) => e.preventDefault()}>
              {[
                { label: "Nom complet", type: "text", placeholder: "Ex: Jean Dupont" },
                { label: "Email professionnel", type: "email", placeholder: "Ex: contact@agence.com" }
              ].map((field, i) => (
                <div key={i} className="group relative border-b-2 border-on-surface/10 focus-within:border-primary transition-colors">
                  <label className="text-[10px] font-black uppercase text-on-surface-muted/40 mb-2 block tracking-[0.3em]">
                    {field.label}
                  </label>
                  <input 
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent px-0 py-4 outline-none font-bold text-xl placeholder:text-on-surface/10"
                  />
                </div>
              ))}
              <div className="group relative border-b-2 border-on-surface/10 focus-within:border-primary transition-colors">
                <label className="text-[10px] font-black uppercase text-on-surface-muted/40 mb-2 block tracking-[0.3em]">
                  Projet / Message
                </label>
                <textarea 
                  placeholder="Décrivez votre projet..."
                  rows={4}
                  className="w-full bg-transparent px-0 py-4 outline-none font-bold text-xl placeholder:text-on-surface/10 resize-none"
                />
              </div>
              <button className="w-full bg-on-surface text-surface py-6 font-black uppercase tracking-[0.3em] text-xs shadow-[8px_8px_0px_#aa3000] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all">
                Envoyer le message
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-on-surface text-surface py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-white/10 pb-20">
            <div className="h-12">
              <img src={IMAGES.logo} alt="NLC Logo" className="h-full w-auto grayscale invert" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              <a href="#" className="hover:text-primary transition-all">Instagram</a>
              <a href="#" className="hover:text-primary transition-all">Youtube</a>
              <a href="#" className="hover:text-primary transition-all">Vimeo</a>
              <a href="#" className="hover:text-primary transition-all">Dossier de Presse</a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-20 gap-8">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
              © 2024 No Limit Crew Association. Tous droits réservés.
            </p>
            <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
              <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 h-20 bg-surface border-2 border-on-surface shadow-[10px_10px_0px_rgba(0,0,0,0.1)] z-[90] rounded-none flex items-center justify-around px-2">
        {[
          { icon: Theater, label: "Dates", id: "événements" },
          { icon: Users, label: "Crew", id: "lacompagnie" },
          { icon: Dumbbell, label: "Booking", id: "contact" },
          { icon: Library, label: "Media", id: "archives" }
        ].map((item, i) => (
          <button 
            key={i}
            onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 group flex-1"
          >
            <div className="p-2 transition-all">
              <item.icon size={20} className="group-hover:text-primary transition-all" />
            </div>
            <span className="text-[7px] font-black uppercase tracking-[0.2em]">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-primary text-white p-12 flex flex-col justify-between overflow-hidden"
          >
            {/* Background elements for menu */}
            <div className="absolute top-0 right-0 text-[30rem] font-black opacity-10 select-none pointer-events-none uppercase leading-none tracking-tighter">
              NLC
            </div>

            <div className="flex justify-between items-center relative z-10">
              <span className="text-xs font-black uppercase tracking-[0.4em]">Navigation</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-white hover:rotate-90 transition-transform p-4">
                <Menu size={32} strokeWidth={3} />
              </button>
            </div>

            <div className="space-y-6 relative z-10">
              {['Accueil', 'La Compagnie', 'Événements', 'Archives', 'Contact'].map((item, i) => (
                <motion.a
                  key={i}
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-6xl md:text-9xl font-black uppercase tracking-tight hover:text-stroke hover:scale-105 origin-left transition-all"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div className="flex gap-8">
                <Instagram size={28} className="hover:scale-125 transition-transform cursor-pointer" />
                <Youtube size={28} className="hover:scale-125 transition-transform cursor-pointer" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">
                Crafting Movement Since 2009
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
