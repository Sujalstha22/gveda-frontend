'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/shared/ui/Button';
import AuthTabs from './AuthTabs';
import GoogleAuthButton from './GoogleAuthButton';
import { AuthMode } from './loginTypes';

export default function AuthCard() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(
        mode === 'login'
          ? 'Welcome back to GVEDA.'
          : 'Your account has been created successfully.'
      );
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 900);
  };

  const handleSelectMode = (newMode: AuthMode) => {
    setMode(newMode);
    setSuccessMessage(null);
  };

  return (
    <div className="w-full max-w-md lg:max-w-[29vw] bg-surface/95 backdrop-blur-md border border-secondary/40 rounded-2xl lg:rounded-[1.4vw] p-6 sm:p-8 lg:p-[2.2vw] shadow-sm transition-all">
      {/* ── Mode Tabs ── */}
      <AuthTabs mode={mode} onSelectMode={handleSelectMode} />

      {/* ── Notification Banner ── */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 rounded-lg bg-secondary/15 border border-secondary/40 text-xs lg:text-[0.75vw] text-primary font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-[1vw]">
        {/* Full Name for Sign Up */}
        {mode === 'signup' && (
          <div className="flex flex-col gap-1.5 lg:gap-[0.35vw]">
            <label
              htmlFor="auth-name"
              className="text-[10px] sm:text-xs lg:text-[0.7vw] font-primary font-medium tracking-widest text-primary/70 uppercase flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 lg:w-[0.8vw] lg:h-[0.8vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Full Name
            </label>
            <input
              id="auth-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Abhishek Subedi"
              className="w-full bg-[#EBF0F5]/50 hover:bg-[#EBF0F5]/80 focus:bg-white border border-black/10 focus:border-primary rounded-xl lg:rounded-[0.6vw] px-4 py-2.5 sm:py-3 lg:py-[0.55vw] text-xs sm:text-sm lg:text-[0.8vw] text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
            />
          </div>
        )}

        {/* Email Input */}
        <div className="flex flex-col gap-1.5 lg:gap-[0.35vw]">
          <label
            htmlFor="auth-email"
            className="text-[10px] sm:text-xs lg:text-[0.7vw] font-primary font-medium tracking-widest text-primary/70 uppercase flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 lg:w-[0.8vw] lg:h-[0.8vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </label>
          <input
            id="auth-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="webxnepal@gmail.com"
            className="w-full bg-[#EBF0F5]/50 hover:bg-[#EBF0F5]/80 focus:bg-white border border-black/10 focus:border-primary rounded-xl lg:rounded-[0.6vw] px-4 py-2.5 sm:py-3 lg:py-[0.55vw] text-xs sm:text-sm lg:text-[0.8vw] text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1.5 lg:gap-[0.35vw]">
          <label
            htmlFor="auth-password"
            className="text-[10px] sm:text-xs lg:text-[0.7vw] font-primary font-medium tracking-widest text-primary/70 uppercase flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 lg:w-[0.8vw] lg:h-[0.8vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Password
          </label>
          <div className="relative">
            <input
              id="auth-password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#EBF0F5]/50 hover:bg-[#EBF0F5]/80 focus:bg-white border border-black/10 focus:border-primary rounded-xl lg:rounded-[0.6vw] pl-4 pr-10 py-2.5 sm:py-3 lg:py-[0.55vw] text-xs sm:text-sm lg:text-[0.8vw] text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 hover:text-primary cursor-pointer p-1"
            >
              {showPassword ? (
                <svg className="w-4 h-4 lg:w-[0.9vw] lg:h-[0.9vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              ) : (
                <svg className="w-4 h-4 lg:w-[0.9vw] lg:h-[0.9vw]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        {mode === 'login' && (
          <div className="flex justify-end -mt-1 lg:-mt-[0.2vw]">
            <button
              type="button"
              className="text-[11px] sm:text-xs lg:text-[0.72vw] text-primary/60 hover:text-primary transition-colors font-primary font-normal cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Submit Primary Button */}
        <div className="pt-2">
          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={loading}
            className="w-full py-3 lg:py-[0.65vw] text-xs lg:text-[0.75vw] tracking-[0.16em] uppercase rounded-xl lg:rounded-[0.6vw] shadow-xs hover:scale-[1.01] transition-transform cursor-pointer"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'LOGIN' : 'SIGN UP'}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4 lg:my-[0.9vw]">
          <div className="border-t border-black/10 w-full" />
          <span className="bg-surface px-3 text-[10px] lg:text-[0.65vw] tracking-widest text-primary/40 font-primary uppercase">
            OR
          </span>
          <div className="border-t border-black/10 w-full" />
        </div>

        {/* Google Authentication Button */}
        <GoogleAuthButton />

        {/* Mode Toggle Footer */}
        <div className="pt-2 text-center text-xs lg:text-[0.75vw] text-primary/65 font-primary">
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button
                type="button"
                onClick={() => handleSelectMode('signup')}
                className="font-semibold text-primary hover:text-secondary underline underline-offset-2 transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => handleSelectMode('login')}
                className="font-semibold text-primary hover:text-secondary underline underline-offset-2 transition-colors cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
