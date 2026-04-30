import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Calendar, 
  Palette, 
  Plus, 
  Trash2, 
  LogOut,
  Image as ImageIcon,
  Play,
  Archive,
  Layers,
  Video
} from 'lucide-react';

// Default Data
const DEFAULT_DATA = {
  theme: {
    orange: '#E8511A',
    green: '#1E9E4A',
    yellow: '#F5A800',
    onSurface: '#1e1b19',
    surface: '#ffffff',
  },
  blogPosts: [
    {
      id: 1,
      category: "Culture",
      title: "Le Breaking aux JO 2024 : Une reconnaissance historique pour la scène africaine",
      date: "24 OCT 2024",
      image: "https://images.unsplash.com/photo-1535533725845-adcee9203a93?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 2,
      category: "Coulisses",
      title: "Reportage : 48h en immersion totale dans l'organisation de l'All Star Battle",
      date: "12 AOUT 2024",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop"
    }
  ],
  gallery: [
    { id: 1, url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop', title: 'Battle Finale', year: '2024' },
    { id: 2, url: 'https://images.unsplash.com/photo-1535533725845-adcee9203a93?q=80&w=800&auto=format&fit=crop', title: 'Performance Solo', year: '2023' },
    { id: 3, url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop', title: 'Workshop Elite', year: '2024' },
  ],
  highlights: {
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    posterUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1600&auto=format&fit=crop',
    title: 'ALL STAR BATTLE 2024',
    subtitle: 'Highlight du Festival'
  },
  backgrounds: {
    hero: 'https://i.ibb.co/Rps321Pt/78-A0328-resultat-resultat-resultat.webp',
    about: 'https://i.ibb.co/s9c104ts/bboy-steph-7-1777561657840.jpg',
    cta: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1600&auto=format&fit=crop'
  },
  events: [
    {
      id: 1,
      date: '18',
      month: 'OCT',
      title: 'Conférence & Masterclass',
      desc: 'Échanges sur la professionnalisation de la danse urbaine avec des experts internationaux.',
      type: 'Workshop'
    }
  ]
};

export function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'posts' | 'events' | 'theme' | 'gallery' | 'highlights' | 'backgrounds'>('theme');
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('nlc_cms_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const isOldDefault = (url: string) => !url || url.includes('unsplash.com');

        return {
          ...DEFAULT_DATA,
          ...parsed,
          backgrounds: { 
            ...DEFAULT_DATA.backgrounds, 
            ...parsed.backgrounds,
            hero: isOldDefault(parsed.backgrounds?.hero) ? DEFAULT_DATA.backgrounds.hero : parsed.backgrounds.hero,
            about: isOldDefault(parsed.backgrounds?.about) ? DEFAULT_DATA.backgrounds.about : parsed.backgrounds.about,
          },
          highlights: { ...DEFAULT_DATA.highlights, ...parsed.highlights },
          events: (!parsed.events || parsed.events.length <= 2) ? DEFAULT_DATA.events : parsed.events,
          gallery: (!parsed.gallery || parsed.gallery.length <= 4) ? DEFAULT_DATA.gallery : parsed.gallery
        };
      } catch (e) {
        return DEFAULT_DATA;
      }
    }
    return DEFAULT_DATA;
  });

  useEffect(() => {
    localStorage.setItem('nlc_cms_data', JSON.stringify(data));
    // Apply theme colors globally
    const root = document.documentElement;
    root.style.setProperty('--color-brand-orange', data.theme.orange);
    root.style.setProperty('--color-brand-green', data.theme.green);
    root.style.setProperty('--color-brand-yellow', data.theme.yellow);
    root.style.setProperty('--color-on-surface', data.theme.onSurface);
    root.style.setProperty('--color-surface', data.theme.surface);
  }, [data]);

  const updateTheme = (key: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      theme: { ...prev.theme, [key]: value }
    }));
  };

  const deletePost = (id: number) => {
    setData((prev: any) => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((p: any) => p.id !== id)
    }));
  };

  const addPost = () => {
    const newPost = {
      id: Date.now(),
      category: "Nouveau",
      title: "Titre de l'article",
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop"
    };
    setData((prev: any) => ({
      ...prev,
      blogPosts: [newPost, ...prev.blogPosts]
    }));
  };

  const updatePost = (id: number, field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((p: any) => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const updateHighlight = (field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      highlights: { ...prev.highlights, [field]: value }
    }));
  };

  const updateBackground = (field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      backgrounds: { ...prev.backgrounds, [field]: value }
    }));
  };

  const addEvent = () => {
    const newEvent = {
      id: Date.now(),
      date: '00',
      month: 'NEW',
      title: 'Nouvel Événement',
      location: 'Lomé, Togo',
      status: 'A venir',
      desc: 'Description de l\'événement...'
    };
    setData((prev: any) => ({
      ...prev,
      events: [newEvent, ...prev.events]
    }));
  };

  const deleteEvent = (id: number) => {
    setData((prev: any) => ({
      ...prev,
      events: prev.events.filter((e: any) => e.id !== id)
    }));
  };

  const updateEvent = (id: number, field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      events: prev.events.map((e: any) => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const addGalleryImage = () => {
    const newImg = {
      id: Date.now(),
      url: 'https://images.unsplash.com/photo-1535533725845-adcee9203a93?q=80&w=800&auto=format&fit=crop',
      title: 'Nouvelle Photo',
      year: '2025'
    };
    setData((prev: any) => ({
      ...prev,
      gallery: [newImg, ...prev.gallery]
    }));
  };

  const deleteGalleryImage = (id: number) => {
    setData((prev: any) => ({
      ...prev,
      gallery: prev.gallery.filter((img: any) => img.id !== id)
    }));
  };

  const updateGalleryImage = (id: number, field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      gallery: prev.gallery.map((img: any) => img.id === id ? { ...img, [field]: value } : img)
    }));
  };

  return (
    <div className="fixed inset-0 z-[200] bg-zinc-950 text-white font-sans flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-white/10 p-6 flex flex-col gap-8 overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-orange flex items-center justify-center">
            <LayoutDashboard size={18} />
          </div>
          <span className="font-black uppercase tracking-tighter text-xl text-brand-orange">NLC Console</span>
        </div>

        <nav className="flex flex-col gap-1">
          <TabButton active={activeTab === 'theme'} onClick={() => setActiveTab('theme')} icon={<Palette size={18} />} label="Apparence" />
          <TabButton active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} icon={<FileText size={18} />} label="Articles Blog" />
          <TabButton active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon={<Archive size={18} />} label="Galerie & Archives" />
          <TabButton active={activeTab === 'highlights'} onClick={() => setActiveTab('highlights')} icon={<Video size={18} />} label="Highlights Video" />
          <TabButton active={activeTab === 'backgrounds'} onClick={() => setActiveTab('backgrounds')} icon={<Layers size={18} />} label="Arrière-plans" />
          <TabButton active={activeTab === 'events'} onClick={() => setActiveTab('events')} icon={<Calendar size={18} />} label="Événements" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <button 
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 w-full text-zinc-400 hover:text-white transition-all"
          >
            <LogOut size={18} /> <span className="text-xs font-black uppercase tracking-widest">Retour au site</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-black">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
              {activeTab === 'theme' && 'Réglages du Thème'}
              {activeTab === 'posts' && 'Gestion du Blog'}
              {activeTab === 'gallery' && 'Galerie & Archives'}
              {activeTab === 'highlights' && 'Highlights & Video'}
              {activeTab === 'backgrounds' && 'Gestion des Images Fond'}
              {activeTab === 'events' && 'Gestion de l\'Agenda'}
            </h1>
            <p className="text-zinc-500 text-sm">Mode simulation Admin - Modifications locales uniquement.</p>
          </div>
          {activeTab === 'posts' && (
            <button onClick={addPost} className="admin-btn"><Plus size={16} /> Nouvel Article</button>
          )}
          {activeTab === 'gallery' && (
            <button onClick={addGalleryImage} className="admin-btn"><Plus size={16} /> Ajouter Photo</button>
          )}
          {activeTab === 'events' && (
            <button onClick={addEvent} className="admin-btn"><Plus size={16} /> Nouvel Événement</button>
          )}
        </header>

        {/* Tab content logic */}
        {activeTab === 'theme' && <ThemeTab data={data} updateTheme={updateTheme} />}
        {activeTab === 'posts' && <PostsTab posts={data.blogPosts} updatePost={updatePost} deletePost={deletePost} />}
        {activeTab === 'gallery' && <GalleryTab images={data.gallery} updateImage={updateGalleryImage} deleteImage={deleteGalleryImage} />}
        {activeTab === 'highlights' && <HighlightsTab data={data.highlights} update={updateHighlight} />}
        {activeTab === 'backgrounds' && <BackgroundsTab data={data.backgrounds} update={updateBackground} />}
        {activeTab === 'events' && <EventsTab events={data.events} updateEvent={updateEvent} deleteEvent={deleteEvent} />}
      </main>
    </div>
  );
}

// Sub-components for cleaner code
function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-none transition-all ${active ? 'bg-brand-orange text-white' : 'hover:bg-white/5 text-zinc-400'}`}
    >
      {icon} <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function ThemeTab({ data, updateTheme }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
      <div className="space-y-8">
        <section className="space-y-6">
          <h3 className="section-title">Couleurs de Marque</h3>
          <div className="space-y-4">
            <ColorField label="Accents Orange" value={data.theme.orange} onChange={(v: string) => updateTheme('orange', v)} />
            <ColorField label="Accents Vert" value={data.theme.green} onChange={(v: string) => updateTheme('green', v)} />
            <ColorField label="Accents Jaune" value={data.theme.yellow} onChange={(v: string) => updateTheme('yellow', v)} />
          </div>
        </section>
        <section className="space-y-6">
          <h3 className="section-title">Couleurs Interface</h3>
          <div className="space-y-4">
            <ColorField label="Texte Principal" value={data.theme.onSurface} onChange={(v: string) => updateTheme('onSurface', v)} />
            <ColorField label="Fond Principal" value={data.theme.surface} onChange={(v: string) => updateTheme('surface', v)} />
          </div>
        </section>
      </div>
      <ThemePreview theme={data.theme} />
    </div>
  );
}

function PostsTab({ posts, updatePost, deletePost }: any) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {posts.map((post: any) => (
        <div key={post.id} className="admin-card group">
          <div className="w-full md:w-48 aspect-video md:aspect-square bg-black overflow-hidden relative">
             <img src={post.image} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Titre" value={post.title} onChange={(v) => updatePost(post.id, 'title', v)} />
              <div className="space-y-2">
                 <label className="input-label">Catégorie</label>
                 <select 
                  value={post.category}
                  onChange={(e) => updatePost(post.id, 'category', e.target.value)}
                  className="admin-input appearance-none"
                 >
                    <option>Culture</option>
                    <option>Coulisses</option>
                    <option>Elite</option>
                    <option>Nouveau</option>
                 </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <InputField label="Image URL" value={post.image} onChange={(v) => updatePost(post.id, 'image', v)} />
               <InputField label="Date" value={post.date} onChange={(v) => updatePost(post.id, 'date', v)} />
            </div>
          </div>
          <DeleteBtn onClick={() => deletePost(post.id)} />
        </div>
      ))}
    </div>
  );
}

function GalleryTab({ images, updateImage, deleteImage }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((img: any) => (
        <div key={img.id} className="bg-zinc-900 border border-white/5 flex flex-col group">
          <div className="aspect-square bg-black relative overflow-hidden">
            <img src={img.url} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            <button 
              onClick={() => deleteImage(img.id)}
              className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <InputField label="Titre Photo" value={img.title} onChange={(v) => updateImage(img.id, 'title', v)} />
            <div className="grid grid-cols-2 gap-2">
              <InputField label="Année" value={img.year} onChange={(v) => updateImage(img.id, 'year', v)} />
              <InputField label="URL Image" value={img.url} onChange={(v) => updateImage(img.id, 'url', v)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HighlightsTab({ data, update }: any) {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InputField label="Titre Video" value={data.title} onChange={(v) => update('title', v)} />
          <InputField label="Sous-titre" value={data.subtitle} onChange={(v) => update('subtitle', v)} />
          <InputField label="ID YouTube Embed" value={data.videoUrl} onChange={(v) => update('videoUrl', v)} />
        </div>
        <div className="space-y-6">
          <InputField label="URL Image Poster" value={data.posterUrl} onChange={(v) => update('posterUrl', v)} />
          <div className="aspect-video bg-black border border-white/10 rounded overflow-hidden">
            <img src={data.posterUrl} alt="Poster Preview" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundsTab({ data, update }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <BgCard label="Section Hero" value={data.hero} onChange={(v) => update('hero', v)} />
      <BgCard label="Section À Propos" value={data.about} onChange={(v) => update('about', v)} />
      <BgCard label="Section Appel à l'action" value={data.cta} onChange={(v) => update('cta', v)} />
    </div>
  );
}

function BgCard({ label, value, onChange }: any) {
  return (
    <div className="bg-zinc-900 border border-white/5 space-y-4">
      <div className="aspect-video bg-black overflow-hidden">
        <img src={value} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <InputField label={label} value={value} onChange={onChange} />
      </div>
    </div>
  );
}

function InputField({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="input-label">{label}</label>
      <input 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="admin-input"
      />
    </div>
  );
}

function DeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex items-start md:pt-4">
      <button 
        onClick={onClick}
        className="w-12 h-12 bg-red-950/30 text-red-500 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center border border-red-900/20"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

function ColorField({ label, value, onChange }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-zinc-900 border border-white/5 group hover:border-white/20 transition-all">
      <div className="space-y-1">
        <label className="input-label !text-zinc-400">{label}</label>
        <div className="text-sm border-b border-zinc-700 pb-1 w-24 group-hover:border-zinc-400">{value}</div>
      </div>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-12 h-12 bg-transparent cursor-pointer border-none" />
    </div>
  );
}

function ThemePreview({ theme }: any) {
  return (
    <div className="bg-zinc-900 border border-white/5 p-8 flex flex-col justify-center items-center gap-6">
      <div className="text-center space-y-4">
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Aperçu Couleurs</div>
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full shadow-lg" style={{ backgroundColor: theme.orange }} />
          <div className="w-12 h-12 rounded-full shadow-lg" style={{ backgroundColor: theme.green }} />
          <div className="w-12 h-12 rounded-full shadow-lg" style={{ backgroundColor: theme.yellow }} />
        </div>
      </div>
      <div className="w-full p-6 bg-black border border-white/10 rounded-xl space-y-3">
         <div className="h-4 w-2/3 bg-white/10 rounded" />
         <button className="h-10 w-full mt-2 font-black text-[9px] uppercase tracking-widest border border-white/20">Aperçu Bouton</button>
      </div>
      <p className="text-[10px] text-zinc-500 italic max-w-[200px] text-center">Les modifications sont auto-sauvegardées.</p>
    </div>
  );
}

function StaticMessage({ message }: { message: string }) {
  return (
    <div className="h-64 flex flex-col items-center justify-center bg-zinc-900 border border-white/5 border-dashed rounded-2xl text-zinc-500">
      <LayoutDashboard size={48} className="mb-4 opacity-20" />
      <p className="text-sm font-black uppercase tracking-widest">{message}</p>
    </div>
  );
}

function EventsTab({ events, updateEvent, deleteEvent }: any) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {events.map((event: any) => (
        <div key={event.id} className="admin-card group">
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField label="Titre" value={event.title} onChange={(v) => updateEvent(event.id, 'title', v)} />
              <InputField label="Date (ex: 18)" value={event.date} onChange={(v) => updateEvent(event.id, 'date', v)} />
              <InputField label="Mois (ex: OCT)" value={event.month} onChange={(v) => updateEvent(event.id, 'month', v)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Lieu / Sous-titre" value={event.location} onChange={(v) => updateEvent(event.id, 'location', v)} />
              <InputField label="Lien / Statut / Bouton" value={event.status} onChange={(v) => updateEvent(event.id, 'status', v)} />
            </div>
            <InputField label="Description" value={event.desc} onChange={(v) => updateEvent(event.id, 'desc', v)} />
          </div>
          <DeleteBtn onClick={() => deleteEvent(event.id)} />
        </div>
      ))}
    </div>
  );
}
