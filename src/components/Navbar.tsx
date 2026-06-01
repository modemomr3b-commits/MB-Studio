import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const { lang, toggleLang, t, dir } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('fashion'), path: '/collection/fashion' },
    { name: t('footwear'), path: '/collection/footwear' },
    { name: t('perfume'), path: '/collection/perfume' },
    { name: t('jewelry'), path: '/collection/jewelry' },
    { name: t('bags'), path: '/collection/bags' },
    { name: t('videos'), path: '/collection/videos' },
    { name: t('contact'), path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-display font-bold text-2xl tracking-widest uppercase">
                MB<span className="text-gold">STUDIO</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium tracking-wide uppercase hover:text-gold transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            <button onClick={toggleTheme} className="p-2 hover:text-gold transition-colors">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 p-2 hover:text-gold transition-colors uppercase text-sm font-medium"
            >
              <Globe size={20} />
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 hover:text-gold transition-colors">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={toggleLang} className="p-2 hover:text-gold transition-colors font-medium">
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:text-gold transition-colors focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background absolute top-20 left-0 w-full"
          >
            <div className="px-4 pt-8 pb-12 space-y-6 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-xl font-medium tracking-wide uppercase hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
