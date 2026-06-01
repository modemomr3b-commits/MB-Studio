import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export const AdminLogin = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(t('password') + ' ' + 'غير صحيحة');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md p-8 border border-foreground/10 bg-foreground/5 shadow-2xl relative">
        <h2 className="text-3xl font-display font-bold uppercase tracking-widest text-center mb-8">
          {t('adminLogin')}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-center text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium opacity-80 mb-2 uppercase tracking-wider">
              {t('password')}
            </label>
            <input
              type="password"
              className="w-full bg-background border border-foreground/20 px-4 py-3 focus:border-gold focus:outline-none transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background py-4 uppercase tracking-widest font-semibold hover:bg-gold hover:text-black transition-colors disabled:opacity-50"
          >
            {loading ? '...' : t('login')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')} 
            className="text-sm opacity-60 hover:opacity-100 hover:text-gold transition-colors"
          >
            &larr; {t('backToSite')}
          </button>
        </div>
      </div>
    </div>
  );
};
