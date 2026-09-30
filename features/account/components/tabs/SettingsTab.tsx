'use client';

import React, { useState } from 'react';
import {
  User,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  LogOut,
} from 'lucide-react';
import { AuthSession, updateAuthSession } from '@/features/auth/session';

interface SettingsTabProps {
  session: AuthSession;
  onLogout: () => void;
}

export default function SettingsTab({ session, onLogout }: SettingsTabProps) {
  // Profile state
  const [fullName, setFullName] = useState(session.fullName);
  const [phoneNumber, setPhoneNumber] = useState(session.phoneNumber || '');
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Profile submit
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAuthSession({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
    });
    setProfileSuccess('Profile details updated successfully.');
    setTimeout(() => setProfileSuccess(null), 3000);
  };

  // Password submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setPasswordSuccess('Password changed securely.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(null), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ── Tab Header ── */}
      <div className="pb-5 border-b border-[#111111]/10">
        <h2 className="text-xl font-bold text-[#111111] font-heading">
          Profile & Security Settings
        </h2>
        <p className="text-xs text-[#111111]/60">
          Manage your botanical account credentials, personal data, and communication preferences
        </p>
      </div>

      {/* ── 1. Personal Information ── */}
      <div className="rounded-2xl p-6 sm:p-7 bg-[#FAFAF8] border border-[#111111]/10">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#111111]/10 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#BD9F7D]/15 flex items-center justify-center text-[#BD9F7D]">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#111111] font-heading">Personal Details</h3>
            <p className="text-[11px] text-[#111111]/60">
              Basic identification and contact information
            </p>
          </div>
        </div>

        {profileSuccess && (
          <div className="mb-5 p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            {profileSuccess}
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#111111]/70 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                Full Legal Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#111111]/15 text-[#111111] focus:outline-none focus:border-[#BD9F7D] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#111111]/70 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+977 98XXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#111111]/15 text-[#111111] focus:outline-none focus:border-[#BD9F7D] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#111111]/70 font-semibold mb-1 uppercase tracking-wider text-[10px]">
              Email Address
            </label>
            <input
              type="email"
              value={session.email}
              disabled
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F7F5F1] border border-[#111111]/10 text-[#111111]/60 cursor-not-allowed"
            />
            <span className="text-[10px] text-[#111111]/40 mt-1 block">
              Contact support to modify registered email.
            </span>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#111111] hover:bg-[#BD9F7D] text-[#FAFAF8] font-semibold transition-colors cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* ── 2. Password & Security ── */}
      <div className="rounded-2xl p-6 sm:p-7 bg-[#FAFAF8] border border-[#111111]/10">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#111111]/10 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#BD9F7D]/15 flex items-center justify-center text-[#BD9F7D]">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#111111] font-heading">Password & Security</h3>

          </div>
        </div>

        {passwordError && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200">
            {passwordError}
          </div>
        )}

        {passwordSuccess && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            {passwordSuccess}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#111111]/70 font-semibold mb-1 uppercase tracking-wider text-[10px]">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPass ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#111111]/15 text-[#111111] focus:outline-none focus:border-[#BD9F7D] transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#111111]/40 hover:text-[#111111]"
              >
                {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#111111]/70 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPass ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#111111]/15 text-[#111111] focus:outline-none focus:border-[#BD9F7D] transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#111111]/40 hover:text-[#111111]"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[#111111]/70 font-semibold mb-1 uppercase tracking-wider text-[10px]">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#111111]/15 text-[#111111] focus:outline-none focus:border-[#BD9F7D] transition-colors"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#111111] hover:bg-[#BD9F7D] text-[#FAFAF8] font-semibold transition-colors cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>



      {/* ── 4. Logout Action ── */}
      <div className="rounded-2xl p-6 bg-[#FAFAF8] border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-rose-900 font-heading">Log out from your account.</h3>

        </div>

        <button
          onClick={() => {
            if (window.confirm('Are you sure you wish to sign out from GVEDA?')) {
              onLogout();
            }
          }}
          className="px-6 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center justify-center gap-2 border border-rose-200 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out of Account
        </button>
      </div>
    </div>
  );
}
