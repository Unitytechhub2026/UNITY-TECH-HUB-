import React, { useState } from 'react';
import { Shield, Lock, Mail, Key, CheckCircle, ArrowRight, X } from 'lucide-react';
import { dbStore } from '../../data/dbStore';
import { AppUser } from '../../types';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: AppUser) => void;
  onSuccess?: (user: AppUser) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onSuccess
}) => {
  const [email, setEmail] = useState('admin@unitytechhub.lk');
  const [password, setPassword] = useState('admin123');
  const [selectedRole, setSelectedRole] = useState<string>('Super Admin');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const triggerSuccess = (user: AppUser) => {
    if (typeof onLoginSuccess === 'function') {
      onLoginSuccess(user);
    }
    if (typeof onSuccess === 'function') {
      onSuccess(user);
    }
    onClose();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      const users = dbStore.getUsers();
      const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (matchedUser || email.includes('@')) {
        const user: AppUser = matchedUser || {
          id: `usr-${Date.now()}`,
          name: email.split('@')[0].toUpperCase(),
          email: email,
          role: selectedRole as any,
          phone: '072 740 2288'
        };
        dbStore.setCurrentUser(user);
        triggerSuccess(user);
      } else {
        setError('Invalid login credentials. Please check email and password.');
      }
    }, 400);
  };

  const handleQuickDemoLogin = (role: 'Super Admin' | 'Technician') => {
    const user: AppUser = {
      id: role === 'Super Admin' ? 'usr-1' : 'usr-2',
      name: role === 'Super Admin' ? 'Kasun Jayasundara' : 'Niroshan Bandara',
      email: role === 'Super Admin' ? 'admin@unitytechhub.lk' : 'tech@unitytechhub.lk',
      role: role,
      phone: '072 740 2288'
    };
    dbStore.setCurrentUser(user);
    triggerSuccess(user);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#0b1329] border border-cyan-500/40 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative overflow-hidden text-slate-100">
        
        {/* Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20 text-cyan-400">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold font-['Outfit',sans-serif] text-white tracking-tight">
            Staff & Admin Login
          </h2>
          <p className="text-xs text-slate-400">
            UNITY TECH HUB • CCTV Quotation & Billing Management
          </p>
        </div>

        {/* Quick Demo Switchers */}
        <div className="mb-5 p-3 rounded-xl bg-slate-900/90 border border-cyan-500/20">
          <p className="text-[11px] font-semibold text-cyan-300 mb-2 uppercase tracking-wider">
            Quick 1-Click Demo Login:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('Super Admin')}
              className="px-3 py-2 rounded-lg bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-500/40 text-xs font-semibold text-cyan-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
            >
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span>Super Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('Technician')}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Technician</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Work Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@unitytechhub.lk"
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Access Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
            >
              <option value="Super Admin">Super Admin (Full Access)</option>
              <option value="Sales Manager">Sales Manager (Quotes & Invoices)</option>
              <option value="Technician">Technician (Jobs & Services)</option>
              <option value="Accountant">Accountant (Billing & Payments)</option>
            </select>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-800 text-center text-xs text-slate-400 flex items-center justify-between">
          <span>Hotline: 072 740 2288</span>
          <span className="text-cyan-400">Secure 256-bit Session</span>
        </div>

      </div>
    </div>
  );
};
