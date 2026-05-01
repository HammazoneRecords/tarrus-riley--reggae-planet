
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Artist } from '../types';
import { ArrowUpRight, Music, Twitter, Facebook, Link as LinkIcon, Share2 } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
  onClick: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
  const handleShare = (e: React.MouseEvent, platform: string) => {
    e.stopPropagation();
    const shareUrl = window.location.href;
    const shareText = `Check out ${artist.name} on the Tarrus Riley Reggae Planet! 🦁✨`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        // Basic feedback could be added here, but keeping it minimal per request
        break;
    }
  };

  return (
    <motion.div
      className="group relative h-[220px] md:h-[260px] w-full overflow-hidden border-b md:border-r border-white/10 bg-black cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={artist.image} 
          alt={artist.name} 
          className="h-full w-full object-cover grayscale will-change-transform"
          variants={{
            rest: { scale: 1, opacity: 0.5, filter: 'grayscale(100%)' },
            hover: { scale: 1.08, opacity: 0.8, filter: 'grayscale(0%)' }
          }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:bg-[#fbbf24]/10 transition-colors duration-700" />
      </div>

      {/* Social Share Overlay - Hidden by default, slides in from left on hover */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 pointer-events-none">
        {[
          { icon: Twitter, id: 'twitter', label: 'Share on X' },
          { icon: Facebook, id: 'facebook', label: 'Share on FB' },
          { icon: LinkIcon, id: 'copy', label: 'Copy Link' }
        ].map((platform, i) => (
          <motion.button
            key={platform.id}
            onClick={(e) => handleShare(e, platform.id)}
            variants={{
              rest: { x: -60, opacity: 0 },
              hover: { x: 0, opacity: 1 }
            }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-[#fbbf24] hover:border-[#fbbf24] transition-all pointer-events-auto"
            title={platform.label}
          >
            <platform.icon size={18} />
          </motion.button>
        ))}
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <span className="text-[10px] font-mono border border-[#fbbf24]/50 text-[#fbbf24] px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-[0.2em]">
             {artist.day}
           </span>
           <motion.div
             variants={{
               rest: { opacity: 0, x: 20, y: -20, rotate: -45 },
               hover: { opacity: 1, x: 0, y: 0, rotate: 0 }
             }}
             className="bg-[#fbbf24] text-black rounded-full p-3 will-change-transform shadow-lg shadow-black/50"
           >
             <ArrowUpRight className="w-6 h-6" />
           </motion.div>
        </div>

        <div className="relative">
          <motion.div
            variants={{
              rest: { width: 0 },
              hover: { width: 60 }
            }}
            className="h-1 bg-[#fbbf24] mb-4"
          />
          <div className="overflow-hidden">
            <motion.h3
              className="font-heading text-2xl md:text-3xl font-bold uppercase text-white tracking-tighter will-change-transform"
              variants={{
                rest: { y: 0 },
                hover: { y: -5 }
              }}
              transition={{ duration: 0.4 }}
            >
              {artist.name}
            </motion.h3>
          </div>
          <motion.div 
            className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] text-[#fbbf24]/80 mt-3 will-change-transform"
            variants={{
              rest: { opacity: 0, x: -10 },
              hover: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Music className="w-3 h-3" />
            {artist.genre}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
