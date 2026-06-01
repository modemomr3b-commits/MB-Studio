import React from 'react';
import { motion } from 'motion/react';
import { useLang } from '../context/LanguageContext';

export const About = () => {
  const { t } = useLang();

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative h-[60vh] w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2670&auto=format&fit=crop" 
            alt="About MB Studio" 
            className="w-full h-full object-cover opacity-30 dark:opacity-20 grayscale"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl uppercase tracking-widest mb-6"
          >
            {t('about')}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-24 h-1 bg-gold mx-auto"
          />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-24 space-y-32">
        {/* Brand Story */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl uppercase tracking-widest mb-6">{t('brandStory')}</h2>
            <p className="opacity-80 leading-relaxed mb-4">
              {t('brandStory1')}
            </p>
            <p className="opacity-80 leading-relaxed">
               {t('brandStory2')}
            </p>
          </div>
          <div className="aspect-[4/5] bg-card overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=800&auto=format&fit=crop" 
              alt="Brand Story" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
          <div className="order-2 md:order-1 aspect-[4/5] bg-card overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" 
              alt="Vision and Mission" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-display text-3xl uppercase tracking-widest mb-6">{t('visionMission')}</h2>
            <p className="opacity-80 leading-relaxed mb-4">
              <strong>{t('ourVision')}</strong> {t('visionText')}
            </p>
            <p className="opacity-80 leading-relaxed">
              <strong>{t('ourMission')}</strong> {t('missionText')}
            </p>
          </div>
        </div>

        {/* Philosophy */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl uppercase tracking-widest mb-6">{t('designPhilosophy')}</h2>
          <p className="opacity-80 leading-relaxed text-lg italic font-display">
            {t('designQuote')}
          </p>
          <p className="mt-8 opacity-70 leading-relaxed">
             {t('designDesc')}
          </p>
        </div>
      </section>
    </div>
  );
};
