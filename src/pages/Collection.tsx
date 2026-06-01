import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { motion } from 'motion/react';

// Map categories to their specific subcategories
const categoryConfig: Record<string, string[]> = {
  footwear: ['mens_shoes', 'womens_shoes', 'kids_shoes'],
  fashion: ['mens_fashion', 'womens_fashion', 'kids_fashion'],
  bags: ['mens_bags', 'womens_bags', 'kids_bags', 'school_backpacks'],
  perfume: ['mens_perfume', 'womens_perfume', 'kids_perfume'],
  jewelry: ['womens_jewelry', 'mens_watches', 'kids_accessories'],
  videos: ['all_videos'],
};

export const Collection = () => {
  const { categoryId } = useParams();
  const { t } = useLang();
  
  const currentCategory = categoryId || 'fashion';
  const availableSubCategories = categoryConfig[currentCategory] || categoryConfig['fashion'];
  
  const [subCategory, setSubCategory] = useState<string>(availableSubCategories[0]);
  const [designs, setDesigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDesigns([]);
    if (!availableSubCategories.includes(subCategory)) {
      setSubCategory(availableSubCategories[0]);
    } else {
      loadDesigns(subCategory);
    }
  }, [categoryId, subCategory]);

  const loadDesigns = async (subCat: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/designs?category=${subCat}`);
      const data = await res.json();
      setDesigns(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const currentCategoryName = categoryId ? t(categoryId as keyof typeof t) : '';

  return (
    <div className="w-full min-h-screen pt-12 pb-24">
      <div className="text-center px-4 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-6xl uppercase tracking-widest mb-8"
        >
          {t('collection')} <span className="text-gold">{currentCategoryName}</span>
        </motion.h1>
        
        <div className="flex justify-center flex-wrap gap-8">
          {availableSubCategories.map(sub => (
            <button
              key={sub}
              onClick={() => setSubCategory(sub)}
              className={`text-lg font-medium uppercase tracking-widest pb-2 border-b-2 transition-colors ${
                subCategory === sub ? 'border-gold text-gold' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              {t(sub as keyof typeof t)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-20 text-xl tracking-widest uppercase animate-pulse">
            Loading...
          </div>
        ) : designs.length === 0 ? (
          <div className="text-center py-20 opacity-50 tracking-widest uppercase">
            No designs available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {designs.map((design, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 25) * 0.05 }}
                key={design.id}
                className="group relative cursor-pointer overflow-hidden bg-foreground/5 rounded-sm aspect-[4/5]"
              >
                <div className="absolute inset-0 flex items-center justify-center -z-10 animate-pulse bg-foreground/10">
                  <span className="text-xs uppercase tracking-widest opacity-40">Loading Design...</span>
                </div>
                {design.image_url.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video 
                    src={design.image_url} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                  />
                ) : (
                  <img 
                    src={design.image_url} 
                    alt={design.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-white font-display text-lg uppercase tracking-wider">{design.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
