'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Handshake,
  UserCheck,
  MapPin,
  CreditCard,
  CheckSquare,
  ChevronDown,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Mail,
  Lock,
  Phone,
  Calendar,
  User,
} from 'lucide-react';
import AuthTabs from './AuthTabs';
import GoogleAuthButton from './GoogleAuthButton';
import { AuthMode } from './loginTypes';

interface AuthCardProps {
  mode: AuthMode;
  onSelectMode: (mode: AuthMode) => void;
}

export type RegistrationType = 'distributor' | 'customer';

const NEPAL_DISTRICTS = [
  'Achham', 'Arghakhanchi', 'Baglung', 'Baitadi', 'Bajhang', 'Bajura', 'Banke', 'Bardiya', 'Bhaktapur',
  'Bhojpur', 'Chitwan', 'Dadeldhura', 'Dailekh', 'Dang', 'Darchula', 'Dhading', 'Dhankuta', 'Dhanusha',
  'Dolakha', 'Dolpa', 'Doti', 'Gorkha', 'Gulmi', 'Humla', 'Ilam', 'Jajarkot', 'Jhapa', 'Jumla',
  'Kailali', 'Kalikot', 'Kanchanpur', 'Kapilvastu', 'Kaski', 'Kathmandu', 'Kavrepalanchok', 'Khotang', 'Lalitpur',
  'Lamjung', 'Mahottari', 'Makwanpur', 'Manang', 'Morang', 'Mugu', 'Mustang', 'Myagdi', 'Nawalpur',
  'Parasi', 'Nuwakot', 'Okhaldhunga', 'Palpa', 'Panchthar', 'Parbat', 'Parsa', 'Pyuthan', 'Ramechhap',
  'Rasuwa', 'Rautahat', 'Rolpa', 'Rukum East', 'Rukum West', 'Rupandehi', 'Salyan', 'Sankhuwasabha',
  'Saptari', 'Sarlahi', 'Sindhuli', 'Sindhupalchok', 'Siraha', 'Solukhumbu', 'Sunsari', 'Surkhet',
  'Syangja', 'Tanahun', 'Taplejung', 'Terhathum', 'Udayapur'
];

export default function AuthCard({ mode, onSelectMode }: AuthCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get('redirect') || null;

  // Mode & Registration Type
  const [registrationType, setRegistrationType] = useState<RegistrationType>('distributor');

  // Sponsor Verification State
  const [sponsorId, setSponsorId] = useState('');
  const [isSponsorConfirmed, setIsSponsorConfirmed] = useState(false);
  const [sponsorError, setSponsorError] = useState<string | null>(null);
  const [sponsorSuccess, setSponsorSuccess] = useState<string | null>(null);

  // Common Account Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Distributor Specific Fields
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [permanentDistrict, setPermanentDistrict] = useState('');
  const [currentDistrict, setCurrentDistrict] = useState('');
  const [idType, setIdType] = useState('Citizenship');
  const [idNumber, setIdNumber] = useState('');

  // Terms & Conditions Checkboxes
  const [agreeDistributorTerms, setAgreeDistributorTerms] = useState(false);
  const [acknowledgeIncome, setAcknowledgeIncome] = useState(false);
  const [certifyAccurate, setCertifyAccurate] = useState(false);
  const [agreeCustomerTerms, setAgreeCustomerTerms] = useState(false);

  // Login Specific State
  const [rememberMe, setRememberMe] = useState(false);

  // Feedback & Loading State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ── Sponsor Confirmation Handler ──
  const handleProceedSponsor = () => {
    const trimmed = sponsorId.trim();
    if (!trimmed) {
      setSponsorError('Please enter a Sponsor ID to proceed.');
      setIsSponsorConfirmed(false);
      setSponsorSuccess(null);
      return;
    }

    // Temporary validation rule: only '101' is valid
    if (trimmed === '101') {
      setIsSponsorConfirmed(true);
      setSponsorError(null);
      setSponsorSuccess('Sponsor ID 101 verified successfully.');
    } else {
      setIsSponsorConfirmed(false);
      setSponsorSuccess(null);
      setSponsorError('Invalid Sponsor ID. (Temporarily, only Sponsor ID 101 is valid)');
    }
  };

  // ── Form Submission Handler ──
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // ── Login Mode ──
    if (mode === 'login') {
      if (!email.trim() || !password) {
        setErrorMessage('Please enter both your email address and password.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('Welcome back to GVEDA.');
        setTimeout(() => {
          setSuccessMessage(null);
          if (redirectUrl) router.push(redirectUrl);
        }, 1200);
      }, 850);
      return;
    }

    // ── Sign Up Mode Validation ──
    if (!isSponsorConfirmed) {
      setErrorMessage('Please verify a valid Sponsor ID (101) by clicking "Proceed" before continuing.');
      return;
    }

    if (!name.trim()) {
      setErrorMessage('Please enter your Legal Full Name (As per National ID).');
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Please enter your primary Phone Number.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Please enter your Email Address.');
      return;
    }

    if (email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
      setErrorMessage('Email addresses do not match. Please verify.');
      return;
    }

    if (!password) {
      setErrorMessage('Please provide a secure password.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }

    // Distributor Specific Validations
    if (registrationType === 'distributor') {
      if (!dob) {
        setErrorMessage('Please provide your Date of Birth (As per National ID).');
        return;
      }

      if (!gender || gender === 'Select Gender') {
        setErrorMessage('Please select your Gender.');
        return;
      }

      if (!permanentDistrict || permanentDistrict === 'Select District') {
        setErrorMessage('Please select your Permanent District.');
        return;
      }

      if (!currentDistrict || currentDistrict === 'Select District') {
        setErrorMessage('Please select your Current District.');
        return;
      }

      if (!idNumber.trim()) {
        setErrorMessage(`Please enter your ${idType} Number.`);
        return;
      }

      if (!agreeDistributorTerms || !acknowledgeIncome || !certifyAccurate) {
        setErrorMessage('Please acknowledge and check all three Terms & Conditions items to complete distributor registration.');
        return;
      }
    }

    // Customer Specific Validations
    if (registrationType === 'customer') {
      if (!agreeCustomerTerms) {
        setErrorMessage("Please agree to GVEDA's Terms & Conditions and Privacy Policy to complete registration.");
        return;
      }
    }

    // Submission Simulation
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(
        registrationType === 'distributor'
          ? 'Distributor account registered successfully! Welcome to the GVEDA partner network.'
          : 'Customer account registered successfully! Welcome to GVEDA.'
      );
      setTimeout(() => {
        setSuccessMessage(null);
        if (redirectUrl) router.push(redirectUrl);
      }, 1400);
    }, 950);
  };

  const handleSelectMode = (newMode: AuthMode) => {
    onSelectMode(newMode);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <div className="w-full bg-white rounded-3xl sm:rounded-[32px] border border-[#e8e2d9] p-6 sm:p-8 md:p-10 xl:p-12  flex flex-col justify-between">
      <div>


        {/* ── Main Heading & Subtitle matching reference ── */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-[30px] font-heading font-medium text-primary tracking-tight">
            {mode === 'login' ? (
              <>
                Start Your Journey <span className="font-bold">with GVEDA</span>
              </>
            ) : (
              <>
                Register <span className="font-bold">with GVEDA</span>
              </>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-primary/60 mt-1 font-primary leading-relaxed">
            {mode === 'login'
              ? 'Enter your email and password for GVEDA to continue.'
              : 'Complete the form below to set up your account and get started.'}
          </p>
        </div>

        {/* ── Mode Segmented Switcher (Login / Sign Up) ── */}
        <AuthTabs mode={mode} onSelectMode={handleSelectMode} />

        {/* ── Notification & Error Banners ── */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-5 p-3.5 rounded-2xl bg-red-50/80 border border-red-200 text-xs sm:text-sm text-red-800 font-medium flex items-center gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-5 p-3.5 rounded-2xl bg-warm-ivory border border-secondary/40 text-xs sm:text-sm text-primary font-medium flex items-center gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Authentication Form ── */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-7">
          {mode === 'signup' ? (
            /* ==========================================================================
               SIGN UP MODE: DISTRIBUTOR & CUSTOMER (GVEDA LUXURY THEME, NO BLUE)
               ========================================================================== */
            <>
              {/* ── SECTION 1: SPONSOR INFORMATION ── */}
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-2 pb-2.5 border-b border-black/10 text-primary font-heading font-semibold text-sm sm:text-base">
                  <Handshake className="w-4 h-4 text-secondary shrink-0" />
                  <span>Sponsor Information</span>
                </div>

                <div className="flex flex-col gap-2 pt-0.5">
                  <label
                    htmlFor="sponsor-id-input"
                    className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5"
                  >
                    Sponsor ID
                  </label>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      id="sponsor-id-input"
                      type="text"
                      value={sponsorId}
                      onChange={(e) => {
                        setSponsorId(e.target.value);
                        if (isSponsorConfirmed) {
                          setIsSponsorConfirmed(false);
                          setSponsorSuccess(null);
                        }
                        setSponsorError(null);
                      }}
                      placeholder="Enter Sponsor ID (e.g. 101)"
                      className="w-full sm:max-w-md bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleProceedSponsor}
                      className="px-6 py-3 rounded-full bg-primary/70 hover:bg-black text-white text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer self-start sm:self-auto shadow-xs flex items-center justify-center gap-1.5 active:scale-[0.99]"
                    >
                      <span>Proceed</span>
                    </button>
                  </div>

                  {/* Sponsor Feedback Messages */}
                  {sponsorError && (
                    <p className="text-xs text-red-600 font-medium flex items-center gap-1.5 pt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{sponsorError}</span>
                    </p>
                  )}
                  {isSponsorConfirmed && sponsorSuccess && (
                    <p className="text-xs text-emerald-800 font-medium flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span>{sponsorSuccess}</span>
                    </p>
                  )}
                </div>

                {/* Account Mode Selection Switcher */}
                <div className="flex flex-col gap-2.5 pt-2">
                  <p className="text-xs text-primary/70 font-primary">
                    Choose the account that best fits your goals to get started.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setRegistrationType('distributor');
                        setErrorMessage(null);
                      }}
                      className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase transition-all cursor-pointer text-center ${registrationType === 'distributor'
                        ? 'bg-secondary text-white shadow-xs'
                        : 'bg-white border border-[#e8e2d9] text-primary/70 hover:border-primary hover:text-primary'
                        }`}
                    >
                      PARTNER AS A DISTRIBUTOR
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRegistrationType('customer');
                        setErrorMessage(null);
                      }}
                      className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase transition-all cursor-pointer text-center ${registrationType === 'customer'
                        ? 'bg-secondary text-white shadow-xs'
                        : 'bg-white border border-[#e8e2d9] text-primary/70 hover:border-primary hover:text-primary'
                        }`}
                    >
                      SHOP AS A CUSTOMER
                    </button>
                  </div>
                </div>
              </div>

              {/* ── SECTION 2: PRIMARY ACCOUNT DETAILS ── */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2.5 border-b border-black/10 text-primary font-heading font-semibold text-sm sm:text-base">
                  <UserCheck className="w-4 h-4 text-secondary shrink-0" />
                  <span>Primary Account Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Legal Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="reg-name" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-secondary" />
                      Legal Full Name (As per National ID)
                    </label>
                    <input
                      id="reg-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="reg-phone" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-secondary" />
                      Phone Number
                    </label>
                    <input
                      id="reg-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98XXXXXXXX"
                      className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="reg-email" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-secondary" />
                      Email Address
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
                    />
                  </div>

                  {/* Confirm Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="reg-confirm-email" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-secondary" />
                      Confirm Email Address
                    </label>
                    <input
                      id="reg-confirm-email"
                      type="email"
                      required
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      placeholder="Repeat email"
                      className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="reg-password" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-secondary" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="reg-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full pl-5 pr-11 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary p-1 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="reg-confirm-password" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-secondary" />
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="reg-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full pl-5 pr-11 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary p-1 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Distributor Extra Row: Alternate Phone, DOB, Gender */}
                {registrationType === 'distributor' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                    {/* Alternate Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-alt-phone" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-secondary" />
                        Alternate Phone
                      </label>
                      <input
                        id="reg-alt-phone"
                        type="tel"
                        value={alternatePhone}
                        onChange={(e) => setAlternatePhone(e.target.value)}
                        placeholder="Optional"
                        className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-dob" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-secondary" />
                        Date of Birth
                      </label>
                      <input
                        id="reg-dob"
                        type="date"
                        required
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary font-primary outline-none transition-all"
                      />
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-gender" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-secondary" />
                        Gender
                      </label>
                      <div className="relative">
                        <select
                          id="reg-gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary font-primary outline-none appearance-none transition-all cursor-pointer pr-10"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-primary/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Customer Extra Row: Alternate Phone */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-alt-phone-cust" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-secondary" />
                        Alternate Phone
                      </label>
                      <input
                        id="reg-alt-phone-cust"
                        type="tel"
                        value={alternatePhone}
                        onChange={(e) => setAlternatePhone(e.target.value)}
                        placeholder="Optional"
                        className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ── SECTION 3: ADDRESS INFORMATION (Distributor Only) ── */}
              {registrationType === 'distributor' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-black/10 text-primary font-heading font-semibold text-sm sm:text-base">
                    <MapPin className="w-4 h-4 text-secondary shrink-0" />
                    <span>Address Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {/* Permanent District */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-perm-district" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-secondary" />
                        District (Permanent Address)
                      </label>
                      <div className="relative">
                        <select
                          id="reg-perm-district"
                          value={permanentDistrict}
                          onChange={(e) => setPermanentDistrict(e.target.value)}
                          className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary font-primary outline-none appearance-none transition-all cursor-pointer pr-10"
                        >
                          <option value="">Select District</option>
                          {NEPAL_DISTRICTS.map((d) => (
                            <option key={`perm-${d}`} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-primary/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Current District */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-curr-district" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-secondary" />
                        District (Current Address)
                      </label>
                      <div className="relative">
                        <select
                          id="reg-curr-district"
                          value={currentDistrict}
                          onChange={(e) => setCurrentDistrict(e.target.value)}
                          className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary font-primary outline-none appearance-none transition-all cursor-pointer pr-10"
                        >
                          <option value="">Select District</option>
                          {NEPAL_DISTRICTS.map((d) => (
                            <option key={`curr-${d}`} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-primary/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SECTION 4: GOVERNMENT ID (Distributor Only) ── */}
              {registrationType === 'distributor' && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-black/10 text-primary font-heading font-semibold text-sm sm:text-base">
                    <CreditCard className="w-4 h-4 text-secondary shrink-0" />
                    <span>Government ID</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {/* ID Type */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-id-type" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-secondary" />
                        ID Type
                      </label>
                      <div className="relative">
                        <select
                          id="reg-id-type"
                          value={idType}
                          onChange={(e) => setIdType(e.target.value)}
                          className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary font-primary outline-none appearance-none transition-all cursor-pointer pr-10"
                        >
                          <option value="Citizenship">Citizenship</option>
                          <option value="National ID">National ID</option>
                          <option value="Passport">Passport</option>
                          <option value="Driving License">Driving License</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-primary/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* ID Number */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="reg-id-number" className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-secondary" />
                        ID Number ({idType})
                      </label>
                      <input
                        id="reg-id-number"
                        type="text"
                        required
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeholder={`Enter ${idType} Number`}
                        className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-primary/55 font-primary -mt-1">
                    This detail is used for verification purposes.
                  </p>
                </div>
              )}

              {/* ── SECTION 5: TERMS AND CONDITIONS ── */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 pb-2.5 border-b border-black/10 text-primary font-heading font-semibold text-sm sm:text-base">
                  <CheckSquare className="w-4 h-4 text-secondary shrink-0" />
                  <span>Terms and Conditions</span>
                </div>

                {registrationType === 'distributor' ? (
                  /* Distributor 3 Checkboxes */
                  <div className="flex flex-col gap-3 pt-1">
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        checked={agreeDistributorTerms}
                        onChange={(e) => setAgreeDistributorTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-[#d4cdc3] text-primary accent-primary focus:ring-0 cursor-pointer shrink-0"
                      />
                      <span className="text-xs text-primary/75 font-primary leading-relaxed group-hover:text-primary transition-colors">
                        I have read, understood, and agree to comply with the Distributor Agreement
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        checked={acknowledgeIncome}
                        onChange={(e) => setAcknowledgeIncome(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-[#d4cdc3] text-primary accent-primary focus:ring-0 cursor-pointer shrink-0"
                      />
                      <span className="text-xs text-primary/75 font-primary leading-relaxed group-hover:text-primary transition-colors">
                        I acknowledge that income depends on personal sales, consistency, and team performance
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        checked={certifyAccurate}
                        onChange={(e) => setCertifyAccurate(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-[#d4cdc3] text-primary accent-primary focus:ring-0 cursor-pointer shrink-0"
                      />
                      <span className="text-xs text-primary/75 font-primary leading-relaxed group-hover:text-primary transition-colors">
                        I certify that all information provided by me is true and accurate
                      </span>
                    </label>
                  </div>
                ) : (
                  /* Customer Terms Checkbox */
                  <div className="flex flex-col gap-3 pt-1">
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        checked={agreeCustomerTerms}
                        onChange={(e) => setAgreeCustomerTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-[#d4cdc3] text-primary accent-primary focus:ring-0 cursor-pointer shrink-0"
                      />
                      <span className="text-xs text-primary/75 font-primary leading-relaxed group-hover:text-primary transition-colors">
                        I have read, understood, and agree to GVEDA&apos;s Terms and Conditions and Privacy Policy
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* ── ACTION / SUBMIT BUTTON ── */}
              <div className="pt-2">
                {!isSponsorConfirmed ? (
                  /* Disabled button when sponsor not confirmed */
                  <button
                    type="button"
                    disabled
                    className="w-full sm:w-auto py-3.5 px-7 rounded-full bg-[#d8c7b5] text-white/90 text-xs sm:text-sm font-medium tracking-wide cursor-not-allowed opacity-90 transition-all shadow-xs self-start"
                  >
                    Confirm sponsor first...
                  </button>
                ) : (
                  /* Active Register Button */
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto py-3.5 px-8 rounded-full bg-primary hover:bg-black text-white text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group self-start"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Please wait...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {registrationType === 'distributor'
                            ? 'Register as Distributor'
                            : 'Register as Customer'}
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            /* ==========================================================================
               LOGIN MODE (ROUNDED FULL FIELDS & GVEDA PALETTE)
               ========================================================================== */
            <>
              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="auth-email"
                  className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-secondary" />
                  Email Address
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full px-5 py-3.5 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="auth-password"
                  className="text-[11px] font-primary font-medium tracking-wider text-primary/75 uppercase flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-secondary" />
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
                    className="w-full bg-white border border-[#e8e2d9] hover:border-secondary/60 focus:border-primary focus:ring-1 focus:ring-primary/15 rounded-full pl-5 pr-11 py-3.5 text-xs sm:text-sm text-primary placeholder:text-primary/35 font-primary outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/45 hover:text-primary cursor-pointer p-1 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Options Row: Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-0.5 px-1">
                <label className="flex items-center gap-2 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#d4cdc3] text-primary accent-primary focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs text-primary/70 group-hover:text-primary transition-colors font-primary">
                    Remember me
                  </span>
                </label>

                <button
                  type="button"
                  className="text-xs text-primary/60 hover:text-secondary transition-colors font-primary font-medium cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Primary Button for Login (25% width) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-[25%] sm:min-w-[130px] py-3.5 rounded-full bg-primary text-white hover:bg-black active:scale-[0.99] text-xs sm:text-sm font-medium transition-all duration-300 shadow-2xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group mt-1 self-start"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Please wait...</span>
                  </>
                ) : (
                  <>
                    <span className="font-heading font-medium tracking-wide">Login</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </>
          )}

          {/* Divider */}
          <div className="relative flex items-center justify-center my-1">
            <div className="border-t border-[#e8e2d9] w-full" />
            <span className="bg-white px-3 text-[10px] tracking-[0.2em] text-primary/45 font-primary uppercase whitespace-nowrap">
              or continue with
            </span>
            <div className="border-t border-[#e8e2d9] w-full" />
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
                  className="font-semibold text-primary hover:text-secondary underline underline-offset-2 transition-colors cursor-pointer ml-1 font-heading"
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
                  className="font-semibold text-primary hover:text-secondary underline underline-offset-2 transition-colors cursor-pointer ml-1 font-heading"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* ── Footer Copyright matching reference ── */}
      <div className="pt-8 mt-8 border-t border-black/5 text-center text-xs text-primary/45 font-primary">
        Copyright © {new Date().getFullYear()} GVEDA. All rights reserved.
      </div>
    </div>
  );
}
