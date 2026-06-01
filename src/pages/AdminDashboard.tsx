import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { Plus, Trash2, Edit2, Eye, EyeOff, LogOut, ImagePlus } from 'lucide-react';

interface Category {
  id: string;
  name_en: string;
  name_ar: string;
}

interface Design {
  id: number;
  category_id: string;
  title: string;
  image_url: string;
  is_hidden: number;
}

export const AdminDashboard = () => {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // Upload State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchDesigns(selectedCategory);
    } else {
      setDesigns([]);
    }
  }, [selectedCategory]);

  const getToken = () => localStorage.getItem('admin_token');

  const checkAuth = async () => {
    const token = getToken();
    if (!token) {
      navigate('/admin/login');
      return;
    }
    const res = await fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!data.isAdmin) {
      localStorage.removeItem('admin_token');
      navigate('/admin/login');
    }
  };

  const logout = async () => {
    localStorage.removeItem('admin_token');
    await fetch('/api/auth/logout', { method: 'POST' });
    navigate('/');
  };

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
    if (data.length > 0 && !selectedCategory) {
      setSelectedCategory(data[0].id);
    }
  };

  const fetchDesigns = async (categoryId: string) => {
    const res = await fetch(`/api/designs?category=${categoryId}&showHidden=true`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await res.json();
    setDesigns(data);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle || !selectedCategory) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('image', uploadFile);
    formData.append('title', uploadTitle);
    formData.append('category_id', selectedCategory);

    try {
      const res = await fetch('/api/designs', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` },
        body: formData
      });
      if (res.ok) {
        setUploadFile(null);
        setUploadTitle('');
        fetchDesigns(selectedCategory);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (design: Design) => {
    await fetch(`/api/designs/${design.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        title: design.title,
        category_id: design.category_id,
        is_hidden: design.is_hidden ? 0 : 1
      })
    });
    fetchDesigns(selectedCategory);
  };

  const deleteDesign = async (id: number) => {
    if (!window.confirm('Are you sure?')) return;
    await fetch(`/api/designs/${id}`, { 
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    fetchDesigns(selectedCategory);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-foreground text-background py-6 px-8 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-display font-bold uppercase tracking-widest">
          {t('adminDashboard')}
        </h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => navigate('/')} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
            {t('backToSite')}
          </button>
          <button onClick={logout} className="flex gap-2 items-center bg-red-600 px-4 py-2 hover:bg-red-700 transition-colors">
            <LogOut size={16} /> {t('logout')}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-foreground/5 p-6 border border-foreground/10">
            <h2 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">{t('manageCategories')}</h2>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-start px-4 py-3 border transition-colors ${selectedCategory === cat.id ? 'bg-gold border-gold text-black font-semibold' : 'border-foreground/10 hover:border-gold/50'}`}
                >
                  {lang === 'ar' ? cat.name_ar : cat.name_en}
                </button>
              ))}
            </div>
            {/* Add Category Section here later if needed */}
          </div>

          <div className="bg-foreground/5 p-6 border border-foreground/10">
            <h2 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">{t('uploadDesign')}</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm mb-2 opacity-80">{t('title')}</label>
                <input 
                  type="text" 
                  value={uploadTitle}
                  onChange={e => setUploadTitle(e.target.value)}
                  className="w-full bg-background border border-foreground/20 px-3 py-2 focus:border-gold focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2 opacity-80">{t('image')}</label>
                <input 
                  type="file" 
                  accept="image/*,video/*"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadFile(e.target.files[0]);
                    }
                  }}
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-foreground file:text-background hover:file:bg-gold hover:file:text-black cursor-pointer"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading || !uploadFile || !uploadTitle}
                className="w-full bg-gold text-black py-3 px-4 uppercase font-bold tracking-wider hover:bg-yellow-500 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? '...' : <><ImagePlus size={18} /> {t('save')}</>}
              </button>
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map(design => (
              <div key={design.id} className={`bg-foreground/5 border border-foreground/10 relative group ${design.is_hidden ? 'opacity-60 saturate-50' : ''}`}>
                <div className="aspect-[4/5] overflow-hidden relative bg-foreground/10">
                  {design.image_url.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video 
                      src={design.image_url} 
                      className="w-full h-full object-cover"
                      muted 
                      loop
                      playsInline
                      onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                      onMouseLeave={(e) => {
                        const video = e.target as HTMLVideoElement;
                        video.pause();
                        video.currentTime = 0;
                      }}
                    />
                  ) : (
                    <img src={design.image_url} alt={design.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  )}
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => toggleVisibility(design)}
                      className="p-3 bg-white text-black hover:bg-gold transition-colors rounded-full"
                      title={design.is_hidden ? t('visible') : t('hidden')}
                    >
                      {design.is_hidden ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <button 
                      onClick={() => deleteDesign(design.id)}
                      className="p-3 bg-red-600 text-white hover:bg-red-700 transition-colors rounded-full"
                      title={t('delete')}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 flex gap-4 justify-between items-center bg-background">
                  <h3 className="font-medium truncate">{design.title}</h3>
                  {design.is_hidden && <span className="text-xs bg-red-500 text-white px-2 py-1 uppercase">{t('hidden')}</span>}
                </div>
              </div>
            ))}
            
            {designs.length === 0 && (
              <div className="col-span-full py-20 text-center opacity-50 border border-dashed border-foreground/20">
                <p>No designs uploaded yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
