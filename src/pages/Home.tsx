import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { ArrowRight } from 'lucide-react';

const collections = [
  { id: 'fashion', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop' },
  { id: 'footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop' },
  { id: 'perfume', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop' },
  { id: 'jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop' },
  { id: 'bags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop' }
];

export const Home = () => {
  const { t, dir } = useLang();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop" 
            alt="Luxury Fashion Hero" 
            className="w-full h-full object-cover opacity-40 dark:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-widest mb-6"
          >
            MB<span className="text-gold">STUDIO</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl font-light tracking-wide max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <Link to="/collection/fashion" className="px-8 py-4 border border-foreground/30 hover:border-gold hover:text-gold transition-all duration-300 uppercase tracking-widest text-sm font-semibold flex items-center gap-3">
              {t('explore')}
              <ArrowRight size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl uppercase tracking-widest mb-4">{t('featuredCollections')}</h2>
          <div className="w-24 h-1 bg-gold"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((item, index) => (
            <Link 
              key={item.id} 
              to={`/collection/${item.id}`}
              className={`group relative overflow-hidden block ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''} ${index === 3 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              style={{ height: index === 0 || index === 3 ? '600px' : '400px' }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
              <img 
                src={item.image} 
                alt={t(item.id as keyof typeof t)} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-background/90 backdrop-blur-sm px-8 py-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 transform">
                  <h3 className="font-display text-2xl uppercase tracking-widest text-foreground">{t(item.id as keyof typeof t)}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Concepts Marquee / Banner */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-widest mb-6">{t('trendingConcepts')}</h2>
              <p className="opacity-80 leading-relaxed mb-8 max-w-lg">
                {t('trendingDesc')}
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 font-semibold uppercase tracking-wider text-sm hover:text-gold transition-colors pb-1 border-b border-foreground/20 hover:border-gold">
                {t('creativeProcess')}
                <ArrowRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
              </Link>
            </div>
            <div className="md:w-1/2 w-full h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" 
                alt="Trending Concepts" 
                className="w-full h-full object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-32 text-center px-4 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl uppercase tracking-widest mb-8">{t('visionMission')}</h2>
        <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 opacity-90">
          {t('visionDesc')}
        </p>
        <Link to="/about" className="px-8 py-3 border border-foreground hover:bg-foreground hover:text-background transition-colors uppercase tracking-widest text-sm font-semibold">
          {t('about')}
        </Link>
      </section>
    </div>
  );
};
