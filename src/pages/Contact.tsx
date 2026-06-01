import React from 'react';
import { motion } from 'motion/react';
import { useLang } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from 'lucide-react';

export const Contact = () => {
  const { t } = useLang();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-6xl uppercase tracking-widest mb-6"
        >
          {t('contactUs')}
        </motion.h1>
        <div className="w-24 h-1 bg-gold mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium uppercase tracking-wider mb-2">{t('name')}</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-transparent border-b border-foreground/30 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium uppercase tracking-wider mb-2">{t('email')}</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-transparent border-b border-foreground/30 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium uppercase tracking-wider mb-2">{t('message')}</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full bg-transparent border-b border-foreground/30 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                placeholder="How can we collaborate?"
              ></textarea>
            </div>
            <button className="w-full py-4 bg-foreground text-background uppercase tracking-widest font-semibold hover:bg-gold transition-colors">
              {t('send')}
            </button>
          </form>
        </motion.div>

        {/* Contact Info & Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-12"
        >
          <div>
            <h3 className="font-display text-2xl uppercase tracking-widest mb-8 text-gold">{t('studioDetails')}</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-sm mb-1">{t('location')}</h4>
                  <p className="opacity-70 leading-relaxed text-sm">123 Luxury Avenue<br/>Design District, Global City 10001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-sm mb-1">{t('phone')}</h4>
                  <p className="opacity-70 leading-relaxed text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold uppercase tracking-wider text-sm mb-1">{t('email')}</h4>
                  <p className="opacity-70 leading-relaxed text-sm">info@mbstudio.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl uppercase tracking-widest mb-6">{t('socialConnect')}</h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="w-12 h-12 border border-foreground/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 border border-foreground/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-12 h-12 border border-foreground/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors font-bold text-sm">
                TK
              </a>
              <a href="#" className="w-12 h-12 border border-foreground/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-foreground/10">
            <h4 className="font-semibold uppercase tracking-wider text-sm mb-4">{t('businessHours')}</h4>
            <div className="space-y-2 opacity-70 text-sm">
              <p className="flex justify-between"><span>{t('mondayFriday')}</span> <span>09:00 - 18:00</span></p>
              <p className="flex justify-between"><span>{t('saturday')}</span> <span>10:00 - 15:00</span></p>
              <p className="flex justify-between"><span>{t('sunday')}</span> <span>{t('closed')}</span></p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-48 bg-card w-full relative overflow-hidden flex items-center justify-center border border-foreground/10">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
             <div className="relative z-10 flex flex-col items-center opacity-50">
                <MapPin size={32} className="mb-2" />
                <span className="uppercase tracking-widest text-xs font-semibold">{t('mapPlaceholder')}</span>
             </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};
