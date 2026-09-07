'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthTabs from './AuthTabs';
import GoogleAuthButton from './GoogleAuthButton';
import { AuthMode } from './loginTypes';

interface AuthCardProps {
  mode: AuthMode;
  onSelectMode: (mode: AuthMode) => void;
}

export default function AuthCard({ mode, onSelectMode }: AuthCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify and try again.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(
        mode === 'login'
          ? 'Welcome back to GVEDA.'
          : 'Your botanical account has been created successfully.'
      );
      setTimeout(() => setSuccessMessage(null), 4000);
    }, 850);
  };

  const handleSelectMode = (newMode: AuthMode) => {
    onSelectMode(newMode);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <div
      className={`w-full bg-white/95 rounded-2xl sm:rounded-3xl border border-secondary/30 p-6 sm:p-8 lg:p-9 shadow-[0_12px_40px_rgba(0,0,0,0.03)] backdrop-blur-xs flex flex-col ${
        mode === 'login'
          ? 'min-h-[480px] sm:min-h-[520px] lg:min-h-[540px] justify-center'
          : 'h-auto'
      }`}
    >

      {/* ── Mode Segmented Switcher ── */}
      <AuthTabs mode={mode} onSelectMode={handleSelectMode} />

      {/* ── Notification & Error Banners ── */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-4 p-3.5 rounded-xl bg-red-50/80 border border-red-200 text-xs sm:text-sm text-red-800 font-medium flex items-center gap-2.5"
          >
            <svg className="w-4 h-4 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{errorMessage}</span>
          </motion.div>
        )}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-4 p-3.5 rounded-xl bg-warm-ivory border border-secondary/40 text-xs sm:text-sm text-primary font-medium flex items-center gap-2.5"
          >
            <svg className="w-4 h-4 text-accent-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Authentication Form ── */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Full Name for Sign Up */}
        {mode === 'signup' && (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="auth-name"
              className="text-[11px] font-primary font-medium tracking-wider text-primary/80 uppercase flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-accent-gold/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              placeholder="e.g. Eleanor Vance"
              className="w-full bg-warm-ivory/50 hover:bg-warm-ivory/80 focus:bg-white border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
            />
          </div>
        )}

        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="auth-email"
            className="text-[11px] font-primary font-medium tracking-wider text-primary/80 uppercase flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 text-accent-gold/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Address
          </label>
          <input
            id="auth-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full bg-warm-ivory/50 hover:bg-warm-ivory/80 focus:bg-white border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="auth-password"
            className="text-[11px] font-primary font-medium tracking-wider text-primary/80 uppercase flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 text-accent-gold/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="w-full bg-warm-ivory/50 hover:bg-warm-ivory/80 focus:bg-white border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-xl pl-4 pr-11 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-primary/45 hover:text-primary cursor-pointer p-1 transition-colors"
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password for Sign Up */}
        {mode === 'signup' && (
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="auth-confirm-password"
              className="text-[11px] font-primary font-medium tracking-wider text-primary/80 uppercase flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-accent-gold/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="auth-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-warm-ivory/50 hover:bg-warm-ivory/80 focus:bg-white border border-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-xl pl-4 pr-11 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-primary/45 hover:text-primary cursor-pointer p-1 transition-colors"
              >
                {showConfirmPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Options Row: Remember Me & Forgot Password */}
        {mode === 'login' ? (
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-secondary/40 text-primary accent-primary focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-primary/70 group-hover:text-primary transition-colors font-primary">
                Remember me
              </span>
            </label>

            <button
              type="button"
              className="text-xs text-primary/60 hover:text-accent-gold transition-colors font-primary font-medium cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
        ) : (
          <div className="pt-0.5">
            <label className="flex items-start gap-2 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-secondary/40 text-primary accent-primary focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-primary/70 font-primary leading-relaxed">
                I agree to GVEDA&apos;s{' '}
                <span className="text-primary underline underline-offset-2 hover:text-accent-gold transition-colors">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="text-primary underline underline-offset-2 hover:text-accent-gold transition-colors">
                  Privacy Policy
                </span>
                .
              </span>
            </label>
          </div>
        )}

        {/* Submit Primary Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 sm:py-4 rounded-xl bg-primary text-white hover:bg-black active:scale-[0.99] text-sm sm:text-base font-antessa font-semibold transition-all duration-300 shadow-2xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group mt-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Please wait...</span>
            </>
          ) : (
            <>
              <span>{mode === 'login' ? 'Login' : 'Sign Up'}</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-1">
          <div className="border-t border-secondary/25 w-full" />
          <span className="bg-white px-3 text-[10px] tracking-[0.2em] text-primary/40 font-primary uppercase whitespace-nowrap">
            or continue with
          </span>
          <div className="border-t border-secondary/25 w-full" />
        </div>

        {/* Google Authentication Button */}
        <GoogleAuthButton />

        {/* Mode Toggle Footer */}
        <div className="pt-2 text-center text-xs sm:text-sm text-primary/65 font-primary">
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button
                type="button"
                onClick={() => handleSelectMode('signup')}
                className="font-semibold text-primary hover:text-accent-gold underline underline-offset-2 transition-colors cursor-pointer ml-1 font-antessa"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => handleSelectMode('login')}
                className="font-semibold text-primary hover:text-accent-gold underline underline-offset-2 transition-colors cursor-pointer ml-1 font-antessa"
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
