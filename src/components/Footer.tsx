import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { Instagram, Facebook, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

// Custom TikTok Icon as lucide doesn't have it built-in natively sometimes or we can just use a text label for it.
const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="bg-background border-t border-foreground/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display font-bold text-3xl tracking-widest uppercase">
                MB<span className="text-gold">STUDIO</span>
              </span>
            </Link>
            <p className="text-sm opacity-70 leading-relaxed font-medium">
              {t('tagline')}
              <br />
              {t('subtitle')}
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6 uppercase tracking-wider">{t('collection')}</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li><Link to="/collection/fashion" className="hover:text-gold transition-colors">{t('fashion')}</Link></li>
              <li><Link to="/collection/footwear" className="hover:text-gold transition-colors">{t('footwear')}</Link></li>
              <li><Link to="/collection/perfume" className="hover:text-gold transition-colors">{t('perfume')}</Link></li>
              <li><Link to="/collection/jewelry" className="hover:text-gold transition-colors">{t('jewelry')}</Link></li>
              <li><Link to="/collection/bags" className="hover:text-gold transition-colors">{t('bags')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6 uppercase tracking-wider">{t('studioDetails')}</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li><Link to="/about" className="hover:text-gold transition-colors">{t('about')}</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">{t('contact')}</Link></li>
              <li><span className="hover:text-gold transition-colors cursor-pointer">{t('visionMission')}</span></li>
              <li><span className="hover:text-gold transition-colors cursor-pointer">{t('creativeProcess')}</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-6 uppercase tracking-wider">{t('socialConnect')}</h4>
            <div className="flex space-x-4 rtl:space-x-reverse mb-8">
              <a href="#" className="p-2 border border-foreground/20 rounded-full hover:border-gold hover:text-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 border border-foreground/20 rounded-full hover:border-gold hover:text-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 border border-foreground/20 rounded-full hover:border-gold hover:text-gold transition-colors">
                <TikTokIcon size={20} />
              </a>
              <a href="#" className="p-2 border border-foreground/20 rounded-full hover:border-gold hover:text-gold transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <div className="space-y-3 opacity-80 text-sm">
              <p className="flex items-center gap-3"><Mail size={16} /> info@mbstudio.com</p>
              <p className="flex items-center gap-3"><Phone size={16} /> +1 (555) 123-4567</p>
              <p className="flex items-start gap-3"><MapPin size={16} className="shrink-0 mt-1" /> 123 Luxury Avenue, Design District, Global City</p>
            </div>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50">
          <p>&copy; {new Date().getFullYear()} {t('allRightsReserved')}</p>
          <div className="flex space-x-6 rtl:space-x-reverse">
            <span className="hover:text-gold transition-colors cursor-pointer">{t('privacyPolicy')}</span>
            <span className="hover:text-gold transition-colors cursor-pointer">{t('termsOfService')}</span>
            <Link to="/admin/login" className="hover:text-gold transition-colors cursor-pointer">{t('adminLogin')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
