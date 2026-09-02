import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Lock, Eye, EyeOff, X, AlertTriangle, KeyRound } from 'lucide-react';
import { verifyOwnerPassword } from '../../services/ownerSecurity';

interface OwnerVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (verifiedPassword: string) => void;
  actionMessage?: string;
  actionTitle?: string;
}

export const OwnerVerificationModal: React.FC<OwnerVerificationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  actionMessage = 'Enter Owner Password to add a new product.',
  actionTitle = 'OWNER VERIFICATION'
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setErrorMessage(null);
      setShowPassword(false);
      setIsVerifying(false);
      // Auto focus input
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isVerifying) return;

    setErrorMessage(null);
    setIsVerifying(true);

    const result = await verifyOwnerPassword(password);
    setIsVerifying(false);

    if (result.success) {
      const pwd = password;
      setPassword('');
      setErrorMessage(null);
      onSuccess(pwd);
      onClose();
    } else {
      setErrorMessage(result.error || 'Incorrect password. Access denied.');
      if (inputRef.current) {
        inputRef.current.select();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      id="owner-verification-overlay"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md transition-all animate-fadeIn"
      onKeyDown={handleKeyDown}
    >
      <div 
        id="owner-verification-card"
        className="bg-gradient-to-b from-[#0b1329] to-[#040814] border-2 border-amber-500/50 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl shadow-amber-500/10 relative text-slate-100 space-y-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="owner-verification-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="owner-verification-cancel-x"
          title="Cancel"
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Security Badge Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Security Required
              </span>
            </div>
            <h2 
              id="owner-verification-title"
              className="text-lg font-black font-['Outfit',sans-serif] text-white tracking-wide uppercase mt-0.5"
            >
              {actionTitle}
            </h2>
          </div>
        </div>

        {/* Message */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <p className="font-medium text-slate-200">{actionMessage}</p>
          <p className="text-[11px] text-slate-400 mt-1">
            Product inventory, pricing, and catalog specifications can only be managed with authorized owner credentials.
          </p>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div 
            id="owner-verification-error-alert"
            className="p-3.5 rounded-2xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs flex items-center gap-2.5 animate-shake shadow-lg shadow-red-950/40"
          >
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="font-bold text-red-300">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2 text-[11px] flex items-center justify-between">
              <span>Owner Password</span>
              <span className="text-slate-500 font-normal normal-case">Masked input</span>
            </label>
            
            <div className="relative">
              <KeyRound className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                ref={inputRef}
                id="owner-password-input"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Enter Password"
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 rounded-lg"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              id="owner-verification-cancel-btn"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-semibold transition-all cursor-pointer text-xs"
            >
              CANCEL
            </button>

            <button
              type="submit"
              id="owner-verification-submit-btn"
              disabled={isVerifying}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black tracking-wider uppercase shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer text-xs flex items-center gap-2 disabled:opacity-50"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{isVerifying ? 'VERIFYING...' : 'VERIFY'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
