import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Ticket, Globe, Zap, Music, MapPin, Menu, X, Calendar, 
  Play, ChevronLeft, ChevronRight, Mic2, Disc, Heart, 
  ShoppingBag, Mail, Sparkles, Volume2, Share2, Plus, 
  ExternalLink, Briefcase, Info, MessageSquare, Award
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard';
import RileyFootwear from './components/RileyFootwear';
import { Artist, MerchItem } from './types';

// Tarrus Riley Discography / Highlights
const DISCOGRAPHY: Artist[] = [
  {
    id: '1',
    name: 'She\'s Royal',
    genre: 'Lovers Rock',
    day: 'CLASSIC',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/84/fd/47/84fd47ef-cf8d-5d8e-9fa1-cd8baf5072e2/054645646864.jpg/600x600bb.jpg',
    description: 'A global anthem celebrating the beauty and divinity of women. One of the most iconic reggae songs of the 21st century.',
    youtube: 'https://www.youtube.com/watch?v=qGuLqe-NMKg',
  },
  {
    id: '2',
    name: 'Lion Paw',
    genre: 'Roots Reggae',
    day: 'ROOTS',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/74/2c/b3/742cb38e-14e6-61d2-b764-9e959abb902f/mzi.vpgvhcfi.jpg/600x600bb.jpg',
    description: 'A powerful conscious track about strength, resilience, and spiritual protection in the face of adversity.',
    youtube: 'https://www.youtube.com/watch?v=AmV0GXbLmRg',
  },
  {
    id: '3',
    name: 'Healing',
    genre: 'Contemporary Reggae',
    day: 'ALBUM',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e8/cd/9a/e8cd9ad7-bf66-e5ef-4a99-fbedf85f5b27/195375135461.png/600x600bb.jpg',
    description: 'Released during a time of global change, "Healing" is a project that speaks to the world\'s need for spiritual and social restoration.',
    youtube: 'https://www.youtube.com/watch?v=yLHdA-kLqi0',
  },
  {
    id: '4',
    name: 'Simple Blessings',
    genre: 'Dancehall Reggae',
    day: 'HITS',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/62/0e/09/620e0919-01c1-485d-b882-a671a6e55809/0.jpg/600x600bb.jpg',
    description: 'Featuring Konshens — a reminder to appreciate the small things in life. Uplifting vibes with a modern dancehall edge.',
    youtube: 'https://www.youtube.com/watch?v=GcXS4QLTF-8',
  },
  {
    id: '5',
    name: 'Love Situation',
    genre: 'Lovers Rock',
    day: 'ALBUM',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9d/f6/47/9df64725-58e3-aed8-de06-7b71f97c7efe/final.jpg/600x600bb.jpg',
    description: 'A full album journey through the landscape of love — tender, honest, and unmistakably Tarrus Riley.',
    youtube: 'https://www.youtube.com/watch?v=f6A4nM517KY',
  },
  {
    id: '6',
    name: 'Contagious',
    genre: 'Soulful Reggae',
    day: 'GOLD',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/56/5f/91/565f9115-cfd7-65b4-3ae8-6bd97458102c/054645186469.jpg/600x600bb.jpg',
    description: 'An album exploring love and connection through diverse musical influences — all rooted in the soul of Jamaica.',
    youtube: 'https://www.youtube.com/watch?v=PTB59VD2FpE',
  },
];

const MERCH: MerchItem[] = [
  { id: 'm1', name: 'Lion Paw Hoodie', price: '$65.00', category: 'Apparel', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop' },
  { id: 'm2', name: 'Healing Vinyl', price: '$35.00', category: 'Music', image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=500&auto=format&fit=crop' },
  { id: 'm3', name: 'Singy Singy Tee', price: '$30.00', category: 'Apparel', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop' },
  { id: 'm4', name: 'Livity Cap', price: '$25.00', category: 'Accessories', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop' },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [currentPage, setCurrentPage] = useState<'main' | 'footwear'>('main');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Artist | null>(null);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

  const getYouTubeId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  const openYouTube = (url: string) => {
    const id = getYouTubeId(url);
    if (id) setYoutubeVideoId(id);
  };
  
  const [bookingIndex, setBookingIndex] = useState<number | null>(null);
  const [bookedIndex, setBookedIndex] = useState<number | null>(null);

  const [subscribed, setSubscribed] = useState(false);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === 'ArrowLeft') navigateItem('prev');
      if (e.key === 'ArrowRight') navigateItem('next');
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const handleBooking = (index: number) => {
    setBookingIndex(index);
    setTimeout(() => {
      setBookingIndex(null);
      setBookedIndex(index);
    }, 3500);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateItem = (direction: 'next' | 'prev') => {
    if (!selectedItem) return;
    const currentIndex = DISCOGRAPHY.findIndex(a => a.id === selectedItem.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % DISCOGRAPHY.length;
    } else {
      nextIndex = (currentIndex - 1 + DISCOGRAPHY.length) % DISCOGRAPHY.length;
    }
    setSelectedItem(DISCOGRAPHY[nextIndex]);
  };
  
  if (currentPage === 'footwear') {
    return <RileyFootwear onBack={() => setCurrentPage('main')} />;
  }

  return (
    <div className="relative min-h-screen text-white selection:bg-[#fbbf24] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white cursor-default z-50">TARRUS RILEY</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Music', 'Journey', 'Merch', 'Bookings', 'Tour'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase() === 'music' ? 'discography' : item.toLowerCase() === 'bookings' ? 'collab' : item.toLowerCase())}
              className="hover:text-[#fbbf24] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage('footwear')}
          className="hidden md:inline-block border border-[#fbbf24] px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#fbbf24] hover:text-black transition-all duration-300 text-[#fbbf24] cursor-pointer bg-transparent"
          data-hover="true"
        >
          Riley Footwear
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#1a2e1a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Music', 'Journey', 'Merch', 'Bookings', 'Tour'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection(item.toLowerCase() === 'music' ? 'discography' : item.toLowerCase() === 'bookings' ? 'collab' : item.toLowerCase());
                }}
                className="text-4xl font-heading font-bold text-white hover:text-[#fbbf24] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); setCurrentPage('footwear'); }}
              className="mt-4 border border-[#fbbf24] px-10 py-4 text-sm font-bold tracking-widest uppercase text-[#fbbf24] bg-transparent hover:bg-[#fbbf24] hover:text-black transition-all"
            >
              Riley Footwear
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); scrollToSection('tour'); }}
              className="border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-[#fbbf24] text-black"
            >
              Tour Dates
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">

        {/* Hero video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/images/tarrurshero.mp4"
        />
        {/* Dark overlay so text stays legible */}
        <div className="absolute inset-0 bg-black/55 z-[1]" />

        <motion.div
          style={{ y, opacity }}
          className="z-[2] text-center flex flex-col items-center w-full max-w-6xl pb-40 md:pb-36"
        >
           {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-[#fbbf24] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-[#fbbf24]/20"
          >
            <span>THE BRONX → JAMAICA</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#10b981] rounded-full animate-pulse"/>
            <span>SINGY SINGY</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center">
            <GradientText 
              text="TARRUS RILEY" 
              as="h1" 
              className="text-[12vw] md:text-[10vw] leading-[0.9] font-black tracking-tighter text-center" 
            />
            {/* Optimized Glow - Reggae Colors */}
            <motion.div 
               className="absolute -z-20 w-[60vw] h-[60vw] bg-[#10b981]/10 blur-[60px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 8, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-2xl font-light max-w-2xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-4"
          >
            Born in The Bronx. Raised in Jamaica. Carrying the legacy of <span className="text-[#fbbf24] font-bold">Jimmy Riley</span> — and redefining it.
          </motion.p>
        </motion.div>

        {/* MARQUEE — single gold strip, scrolls left */}
        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="w-full py-3 md:py-5 bg-[#c9a227] text-black overflow-hidden border-t-4 border-b-4 border-black shadow-[0_-8px_40px_rgba(201,162,39,0.5)]">
            <motion.div
              className="flex w-fit will-change-transform"
              animate={{ x: "-50%" }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1].map((key) => (
                <div key={key} className="flex whitespace-nowrap shrink-0">
                  {[...Array(2)].map((_, i) => (
                    <span key={i} className="text-2xl md:text-5xl font-heading font-black px-10 flex items-center gap-5">
                      SHE'S ROYAL <span className="text-[#15803d]">✦</span>
                      LION PAW <span className="text-[#15803d]">✦</span>
                      HEALING <span className="text-[#15803d]">✦</span>
                      SIMPLE BLESSINGS <span className="text-[#15803d]">✦</span>
                      CONTAGIOUS <span className="text-[#15803d]">✦</span>
                      LOVE SITUATION <span className="text-[#15803d]">✦</span>
                      POVERTY <span className="text-[#15803d]">✦</span>
                      CALL MI <span className="text-[#15803d]">✦</span>
                      MAKE WE DANCE <span className="text-[#15803d]">✦</span>
                      IT'S SHOWTIME <span className="text-[#15803d]">✦</span>
                      LIGHTER <span className="text-[#15803d]">✦</span>
                      DIAMONDS AND GOLD <span className="text-[#15803d]">✦</span>
                      L.S.O.L <span className="text-[#15803d]">✦</span>
                      MY MOTHER <span className="text-[#15803d]">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* DISCOGRAPHY SECTION */}
      <section id="discography" className="relative z-10 py-8 md:py-10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-4 md:mb-6 px-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
              Golden{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#fbbf24]">Vibrations</span>
            </h2>
            <p className="text-[#fbbf24] font-mono text-xs tracking-widest mt-3 md:mt-0 max-w-xs text-right opacity-70">
              EXPLORING TWO DECADES OF MODERN CLASSICS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-black/30 backdrop-blur-md">
            {DISCOGRAPHY.map((item) => (
              <ArtistCard key={item.id} artist={item} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PLAYER SECTION */}
      <section className="relative z-10 py-20 md:py-32 bg-gradient-to-b from-black/0 to-black/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 backdrop-blur-xl">
             <div className="relative group w-64 h-64 shrink-0 shadow-2xl">
                <img src="/images/tarrus-direct.jpg" className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700" alt="Tarrus Riley" />
                <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-16 h-16 text-[#fbbf24] fill-current" />
                </button>
             </div>
             <div className="flex-1 text-center md:text-left">
                <span className="text-[#10b981] font-mono text-xs uppercase tracking-[0.3em] mb-4 block">NOW RESONATING</span>
                <h3 className="text-4xl md:text-6xl font-heading font-bold mb-4">HEALING</h3>
                <p className="text-gray-400 text-lg mb-8 max-w-xl">
                  The latest vibration from Tarrus Riley. A journey into the depths of roots and soul, crafted for the conscious mind.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                   <button className="bg-[#fbbf24] text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform" data-hover="true">
                     <Volume2 className="w-5 h-5" /> Listen Everywhere
                   </button>
                   <button className="border border-white/20 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white/10 transition-all" data-hover="true">
                     <Share2 className="w-5 h-5" /> Share
                   </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section id="journey" className="relative z-10 py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        <div className="absolute top-1/2 right-[-20%] w-[60vw] h-[60vw] bg-[#10b981]/10 rounded-full blur-[80px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 relative z-10">
              <h2 className="font-heading font-bold mb-6 md:mb-8 leading-tight">
                <span className="block text-xl md:text-3xl tracking-widest uppercase">Roots &</span>
                <GradientText text="CULTURE" className="text-5xl md:text-8xl" />
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-12 font-light leading-relaxed drop-shadow-md">
                Born April 26, 1981 in The Bronx, New York — raised in Jamaica. Son of ska and rocksteady legend Jimmy Riley. Tarrus (Singy Singy) made his recording debut as a teenager and released his first album, <em>Challenges</em>, in 2004. Two decades on, he is one of the most decorated voices in modern reggae.
              </p>

              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: Mic2, title: 'BLAKSOIL Movement', desc: 'Bredren Living According King Selassie-I Overstanding & Iritical Livity — Rastafari roots at the core of every note.' },
                  { icon: Heart, title: 'Billboard #1', desc: 'Love Situation (2014) — produced with Dean Fraser — became his first Billboard Reggae Albums chart-topper, described as "a true tribute to the rocksteady era".' },
                  { icon: Globe, title: 'Global Reach', desc: 'From Reggae Sumfest to Roskilde Festival. Featured on Major Lazer\'s "Powerful" (2015). "Lighter" ft. Shenseea & Rvssian (2020) became a Caribbean anthem.' },
                ].map((feature, i) => (
                  <div
                    key={i} 
                    className="flex items-start gap-6"
                  >
                    <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                      <feature.icon className="w-6 h-6 text-[#fbbf24]" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 font-heading">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[400px] md:h-[700px] w-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#10b981] to-[#fbbf24] rounded-3xl rotate-3 opacity-20 blur-2xl" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <img
                  src="/images/tarrus-roots.jpg"
                  alt="Tarrus Riley — Roots"
                  className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110 will-change-transform"
                  style={{ filter: 'contrast(1.12) brightness(0.78) saturate(0.5)' }}
                />
                {/* Warm amber tint — masks quality, reads as warm Jamaican light */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B5E3C]/40 to-[#C8860A]/20 mix-blend-multiply" />
                {/* Film grain simulation */}
                <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'grain\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23grain)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
                
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <div className="text-5xl md:text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 opacity-30">
                    JA
                  </div>
                  <div className="text-lg md:text-xl font-bold tracking-widest uppercase mt-2 text-[#fbbf24]">
                    The Sound of Resilience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MERCH SECTION */}
      <section id="merch" className="relative z-10 py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
               <h2 className="text-5xl md:text-8xl font-heading font-bold mb-4">
                 PLANET <span className="text-[#fbbf24]">MERCH</span>
               </h2>
               <p className="text-gray-400 text-lg uppercase tracking-widest">Wears of the Livity</p>
            </div>
            <a href="https://tarrusrileymerch.printify.me" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/20 px-8 py-3 rounded-full flex items-center gap-3 hover:bg-white hover:text-black transition-all" data-hover="true">
              <ShoppingBag className="w-5 h-5" /> View All Items
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MERCH.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                className="group relative bg-black/40 border border-white/10 rounded-3xl overflow-hidden p-4"
                data-hover="true"
              >
                <div className="aspect-[4/5] relative rounded-2xl overflow-hidden mb-6">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-mono bg-[#fbbf24] text-black px-2 py-0.5 rounded uppercase font-bold">{item.category}</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-2 font-heading">{item.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-[#10b981] font-mono text-lg">{item.price}</span>
                  <a href="https://tarrusrileymerch.printify.me" target="_blank" rel="noopener noreferrer" className="bg-white text-black p-2 rounded-full hover:bg-[#fbbf24] transition-colors">
                    <Plus className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLAB SECTION */}
      <section id="collab" className="relative z-10 py-14 md:py-20 px-4 md:px-6 bg-white/5 backdrop-blur-md border-y border-white/10 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#10b981]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

            {/* Left — heading + tagline */}
            <div className="w-full lg:w-2/5 flex-shrink-0">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-none mb-6">
                SINGY<br/><span className="text-[#10b981]">COLLAB</span>
              </h2>
              <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-md">
                Tarrus has performed on stages across the Caribbean, North America, and Europe — and continues to collaborate with artists who carry real intention. Management: Riley Media Group / Juke Boxx Productions.
              </p>
              <div className="mt-8 flex items-center gap-3 text-[#fbbf24]/60 font-mono text-xs uppercase tracking-widest">
                <Mic2 className="w-4 h-4" />
                Musical Director: Dean Fraser · Blak Soil Band
              </div>
            </div>

            {/* Right — form */}
            <div className="w-full lg:flex-1 bg-black/60 rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-[#fbbf24] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-heading uppercase tracking-tighter">Inquire for Sessions</h3>
              </div>

              <div className="mb-5 p-4 bg-[#fbbf24]/10 border border-[#fbbf24]/30 rounded-2xl flex gap-3 items-start">
                <Info className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <p className="text-[11px] font-mono text-[#fbbf24]/80 leading-relaxed uppercase tracking-wider">
                  Demo mode — contact routing inactive. Site owner activates this form with their own email after purchase.
                </p>
              </div>

              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-1">Producer/Artist Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[#fbbf24] transition-all text-sm" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-1">Project Genre</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[#fbbf24] transition-all text-sm" placeholder="Roots, Dancehall..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-1">Session Concept / Pitch</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus:outline-none focus:border-[#fbbf24] transition-all resize-none text-sm" placeholder="Tell us about the vibration..." />
                </div>
                <button
                  type="button"
                  disabled
                  className="w-full bg-white/10 text-white/40 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm cursor-not-allowed flex items-center justify-center gap-3 border border-white/10"
                >
                  Connect with Management — Demo Only <ExternalLink className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* TOUR SECTION */}
      <section id="tour" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-black/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-5xl md:text-9xl font-heading font-bold opacity-10 text-white">
               LIVE
             </h2>
             <p className="text-[#fbbf24] font-mono uppercase tracking-[0.3em] -mt-3 md:-mt-8 relative z-10 text-sm md:text-lg">
               WORLDWIDE FREQUENCIES
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'London, UK', price: 'O2 Brixton', date: 'Aug 12', accent: 'bg-white/5 border-white/10' },
              { name: 'Rotterdam, NL', price: 'Reggae Lake', date: 'Aug 24', accent: 'bg-[#10b981]/10 border-[#10b981]/30' },
              { name: 'Kingston, JA', price: 'Sabina Park', date: 'Dec 26', accent: 'bg-[#fbbf24]/10 border-[#fbbf24]/30' },
            ].map((tour, i) => {
              const isBooking = bookingIndex === i;
              const isBooked = bookedIndex === i;
              const isDisabled = (bookingIndex !== null) || (bookedIndex !== null);

              return (
                <motion.div
                  key={i}
                  whileHover={isDisabled ? {} : { y: -20 }}
                  className={`relative p-8 md:p-10 border backdrop-blur-md flex flex-col min-h-[450px] md:min-h-[500px] transition-all duration-500 ${tour.accent} ${isDisabled && !isBooked ? 'opacity-30 grayscale' : ''} will-change-transform rounded-2xl`}
                  data-hover={!isDisabled}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4 text-[#fbbf24] font-mono text-sm">
                      <Calendar className="w-4 h-4" />
                      {tour.date}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white leading-tight">{tour.name}</h3>
                    <div className="text-xl md:text-2xl font-light mb-8 md:mb-10 text-gray-300">
                      {tour.price}
                    </div>
                    <ul className="space-y-4 md:space-y-6 text-sm text-gray-400">
                      <li className="flex items-center gap-3"><Disc className="w-5 h-5 text-[#10b981]" /> Full Band Performance</li>
                      <li className="flex items-center gap-3"><Zap className="w-5 h-5 text-[#ef4444]" /> Exclusive VIP Access</li>
                      <li className="flex items-center gap-3"><Globe className="w-5 h-5 text-[#fbbf24]" /> Limited Merch On-Site</li>
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handleBooking(i)}
                    disabled={isDisabled}
                    className={`w-full py-4 rounded-xl text-sm font-bold uppercase tracking-[0.2em] border border-white/20 transition-all duration-300 mt-8 group overflow-hidden relative 
                      ${isBooked 
                        ? 'bg-[#10b981] text-white border-[#10b981] cursor-default' 
                        : isBooking 
                          ? 'bg-white/20 text-white cursor-wait'
                          : isDisabled 
                            ? 'cursor-not-allowed opacity-50' 
                            : 'text-white cursor-pointer hover:bg-white hover:text-black'
                      }`}
                  >
                    <span className="relative z-10">
                      {isBooking ? 'Checking Seats...' : isBooked ? 'Tickets Secured' : 'Get Tickets'}
                    </span>
                    {!isDisabled && !isBooked && !isBooking && (
                      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0" />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-[#064e3b] to-[#142614] border-y border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Sparkles className="w-12 h-12 text-[#fbbf24] mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">JOIN THE <span className="text-[#fbbf24]">TRIBE</span></h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto font-light">
            Stay tuned for exclusive drops, hidden tracks, and tour announcements before the rest of the world. Pure vibrations straight to your inbox.
          </p>
          
          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.form 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <input 
                  type="email" 
                  required
                  placeholder="Your Email Address" 
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-4 text-white focus:outline-none focus:border-[#fbbf24] transition-all" 
                />
                <button 
                  type="submit" 
                  className="bg-[#fbbf24] text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  data-hover="true"
                >
                  Join
                </button>
              </motion.form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#10b981]/20 border border-[#10b981]/40 rounded-full py-4 px-8 inline-flex items-center gap-3 text-[#10b981] font-bold"
              >
                <Heart className="w-5 h-5 fill-current" />
                Blessings! You're in.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 md:py-20 bg-black/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
             <div className="font-heading text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">TARRUS RILEY</div>
             <p className="text-gray-500 max-w-sm mb-6 font-light">
               Empowering humanity through conscious music and soulful storytelling. Welcome to the Reggae Planet.
             </p>
             <div className="flex gap-4 text-xs font-mono text-gray-600">
               <span>&copy; 2026 Tarrus Riley Music</span>
               <span>•</span>
               <span>Built for the fans</span>
             </div>
          </div>
          
          <div className="flex gap-8 md:gap-12 flex-wrap">
            {[
              { label: 'Instagram', url: 'https://www.instagram.com/tarrusrileyja/' },
              { label: 'Spotify', url: 'https://open.spotify.com/artist/4frHO7KPcfMjhnVdIMJ98c' },
              { label: 'YouTube', url: 'https://www.youtube.com/user/tarrusrileyja' },
              { label: 'Twitter', url: 'https://twitter.com/tarrusrileyja' },
            ].map(social => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#fbbf24] font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer"
                data-hover="true"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90svh] bg-[#142614] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#fbbf24]/5"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#fbbf24] hover:text-black transition-all"
                data-hover="true"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image — fixed height on mobile, fills column on desktop */}
              <div className="w-full md:w-[45%] h-56 sm:h-72 md:h-auto flex-shrink-0 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedItem.id}
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#142614] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content — scrollable on small screens */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 text-[#10b981] mb-4">
                    <span className="px-3 py-1 rounded-full border border-[#10b981]/30 font-mono text-xs tracking-widest uppercase">{selectedItem.day}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold uppercase leading-none mb-3 text-white break-words">
                    {selectedItem.name}
                  </h3>

                  <p className="text-base md:text-lg text-[#fbbf24] font-medium tracking-widest uppercase mb-6">
                    {selectedItem.genre}
                  </p>

                  <div className="h-px w-20 bg-[#fbbf24] mb-6 opacity-50" />

                  <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light mb-8">
                    {selectedItem.description}
                  </p>

                  <div className="flex items-center gap-4 flex-wrap">
                    {selectedItem.youtube && (
                      <button
                        onClick={() => openYouTube(selectedItem.youtube!)}
                        className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-[#fbbf24] transition-colors text-sm"
                        data-hover="true"
                      >
                        <Play className="w-4 h-4 fill-current" /> Listen on YouTube
                      </button>
                    )}
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => { e.stopPropagation(); navigateItem('prev'); }} className="p-3 rounded-full bg-white/10 text-white hover:bg-[#fbbf24] hover:text-black transition-all border border-white/10" data-hover="true">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); navigateItem('next'); }} className="p-3 rounded-full bg-white/10 text-white hover:bg-[#fbbf24] hover:text-black transition-all border border-white/10" data-hover="true">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube Embed Modal */}
      <AnimatePresence>
        {youtubeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setYoutubeVideoId(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              {/* Close button */}
              <button
                onClick={() => setYoutubeVideoId(null)}
                className="absolute -top-12 right-0 flex items-center gap-2 text-white/60 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
              >
                <X className="w-4 h-4" /> Close
              </button>

              {/* 16:9 iframe wrapper */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0`}
                  title="Tarrus Riley"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
