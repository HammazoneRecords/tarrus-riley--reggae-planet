import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, ExternalLink, Star, Truck, Shield } from 'lucide-react';

interface RileyFootwearProps {
  onBack: () => void;
}

const PRODUCTS = [
  {
    id: 1,
    name: 'Tarrus Classic',
    category: 'Dress Shoe',
    desc: 'Structured leather uppers, clean toe box, premium sole. The shoe that commands every room — board meeting or stage door.',
    tag: 'SIGNATURE',
    accent: '#fbbf24',
  },
  {
    id: 2,
    name: 'Singing Slide',
    category: 'Slipper / Sandal',
    desc: 'Wide-strap premium leather slide. Grounded, sovereign, effortless. Built for the artist who moves at their own pace.',
    tag: 'BESTSELLER',
    accent: '#10b981',
  },
  {
    id: 3,
    name: 'Roots Loafer',
    category: 'Loafer',
    desc: 'Soft leather penny loafer with contrast stitch. The everyday cornerstone — roots energy, refined finish.',
    tag: 'NEW',
    accent: '#fbbf24',
  },
  {
    id: 4,
    name: 'Livity Boot',
    category: 'Chelsea Boot',
    desc: 'Pull-on Chelsea silhouette in rich cognac leather. Structured ankle, elastic gore — concert-ready, road-approved.',
    tag: 'COMING SOON',
    accent: '#10b981',
  },
];

const RileyFootwear: React.FC<RileyFootwearProps> = ({ onBack }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#0a0a08] text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 bg-[#0a0a08]/80 backdrop-blur-xl border-b border-white/5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-white/60 hover:text-[#fbbf24] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Site
        </button>
        <div className="font-heading text-lg md:text-xl font-black tracking-tighter text-white">
          RILEY <span className="text-[#fbbf24]">FOOTWEAR</span>
        </div>
        <a
          href="https://tarrusrileymerch.printify.me"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#fbbf24] text-black px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white transition-colors"
        >
          <ShoppingBag className="w-4 h-4" /> Shop All
        </a>
      </nav>

      {/* Hero */}
      <header className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1200] via-[#0a0a08] to-[#001a0d]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#fbbf24]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#10b981]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#fbbf24]/60 mb-6">
              A Tarrus Riley Brand
            </p>
            <h1 className="text-[clamp(2.2rem,9vw,9rem)] font-heading font-black leading-none mb-6 tracking-tighter">
              RILEY<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#10b981]">FOOTWEAR</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 font-light max-w-xl leading-relaxed mb-10">
              Crafted for the conscious man. Leather goods that carry the weight of roots and the elegance of culture.
            </p>
            <a
              href="https://tarrusrileymerch.printify.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#fbbf24] text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white transition-colors"
            >
              <ShoppingBag className="w-5 h-5" /> Visit Full Store <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </header>

      {/* Trust bar */}
      <div className="border-y border-white/5 py-5 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 text-xs font-mono uppercase tracking-widest text-white/40">
          <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#fbbf24]" /> Premium Leather</span>
          <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-[#10b981]" /> Worldwide Shipping</span>
          <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#fbbf24]" /> Quality Guaranteed</span>
          <span className="flex items-center gap-2"><ShoppingBag className="w-4 h-4 text-[#10b981]" /> Print on Demand</span>
        </div>
      </div>

      {/* Products */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
            <h2 className="text-4xl md:text-6xl font-heading font-black uppercase leading-none">
              The <span className="text-[#fbbf24]">Collection</span>
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest max-w-xs text-left md:text-right">
              Each style designed to honour the craft of reggae's finest voices
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500"
              >
                {/* Placeholder image area */}
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-[#1a1200] to-[#001a0d] flex items-center justify-center">
                  <div className="text-7xl opacity-20 select-none">👞</div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at center, ${product.accent}10, transparent 70%)` }}
                  />
                  <span
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                    style={{ background: product.accent, color: '#000' }}
                  >
                    {product.tag}
                  </span>
                </div>

                <div className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: product.accent }}>
                    {product.category}
                  </p>
                  <h3 className="font-heading text-xl font-black uppercase mb-3">{product.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{product.desc}</p>
                  <a
                    href="https://tarrusrileymerch.printify.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 hover:text-black"
                    style={{
                      borderColor: `${product.accent}40`,
                      color: product.accent,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = product.accent)}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <ShoppingBag className="w-4 h-4" /> Shop Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-r from-[#1a1200] to-[#001a0d] border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-[#fbbf24]/60 mb-4">Full Catalogue</p>
          <h2 className="text-4xl md:text-6xl font-heading font-black uppercase mb-6 leading-none">
            More Styles at the<br /><span className="text-[#fbbf24]">Official Store</span>
          </h2>
          <p className="text-gray-400 mb-10 font-light leading-relaxed max-w-md mx-auto">
            Browse the complete Riley Footwear range — new drops, exclusive colourways, and limited editions on Printify.
          </p>
          <a
            href="https://tarrusrileymerch.printify.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#fbbf24] text-black px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white transition-colors"
          >
            <ExternalLink className="w-5 h-5" /> tarrusrileymerch.printify.me
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 text-center">
        <p className="text-white/20 font-mono text-xs uppercase tracking-widest">
          © Riley Footwear · A Tarrus Riley Brand · Powered by{' '}
          <button onClick={onBack} className="text-[#fbbf24]/40 hover:text-[#fbbf24] transition-colors underline underline-offset-4">
            Reggae Planet
          </button>
        </p>
      </footer>

    </div>
  );
};

export default RileyFootwear;
