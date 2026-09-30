'use client';

import React, { useState } from 'react';
import { MapPin, CheckCircle2, Save } from 'lucide-react';
import { AuthSession, updateAuthSession } from '@/features/auth/session';

interface AddressesTabProps {
  session: AuthSession;
}

const NEPAL_PROVINCES = [
  'Koshi Province',
  'Madhesh Province',
  'Bagmati Province',
  'Gandaki Province',
  'Lumbini Province',
  'Karnali Province',
  'Sudurpashchim Province',
];

const LOCAL_LEVEL_TYPES = [
  'Metropolitan City',
  'Sub-Metropolitan City',
  'Municipality',
  'Rural Municipality',
];

export default function AddressesTab({ session }: AddressesTabProps) {
  const [provinceName, setProvinceName] = useState(session.provinceName || 'Bagmati Province');
  const [districtName, setDistrictName] = useState(session.districtName || 'Kathmandu');
  const [typeName, setTypeName] = useState(session.typeName || 'Metropolitan City');
  const [localLevelName, setLocalLevelName] = useState(session.localLevelName || '');
  const [streetAddress, setStreetAddress] = useState(session.streetAddress || '');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAuthSession({
      provinceName: provinceName.trim(),
      districtName: districtName.trim(),
      typeName: typeName.trim(),
      localLevelName: localLevelName.trim(),
      streetAddress: streetAddress.trim(),
    });

    setSaveSuccess('Delivery address updated successfully.');
    setTimeout(() => {
      setSaveSuccess(null);
    }, 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* ── Tab Header ── */}
      <div className="pb-5 border-b border-[#111111]/10">
        <h2 className="text-xl font-bold text-[#111111] font-heading">
          Delivery Address
        </h2>
        <p className="text-xs text-[#111111]/60 font-primary mt-1">
          Manage your registered shipping location for formulation dispatch across Nepal
        </p>
      </div>

      {/* ── Address Form Container ── */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FAFAF8] border border-secondary/20 shadow-2xs">
        <div className="flex items-center gap-3 pb-4 border-b border-[#111111]/10 mb-6">
          <div className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
            <MapPin className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#111111] font-heading">Shipping Destination</h3>
            <p className="text-[11px] text-[#111111]/60 font-primary">
              Your primary address used during dispatch and courier fulfillment
            </p>
          </div>
        </div>

        {saveSuccess && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200 flex items-center gap-2.5 font-primary">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{saveSuccess}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs font-primary">
          {/* Row 1: Province & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#111111]/75 font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Province Name
              </label>
              <select
                value={provinceName}
                onChange={(e) => setProvinceName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#111111]/15 text-[#111111] focus:outline-none focus:border-secondary transition-colors cursor-pointer"
              >
                {NEPAL_PROVINCES.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#111111]/75 font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                District Name
              </label>
              <input
                type="text"
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
                placeholder="e.g. Kathmandu, Lalitpur, Kaski"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#111111]/15 text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Type Name & Local Level Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#111111]/75 font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Local Level Type
              </label>
              <select
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#111111]/15 text-[#111111] focus:outline-none focus:border-secondary transition-colors cursor-pointer"
              >
                {LOCAL_LEVEL_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#111111]/75 font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
                Local Level Name / Ward
              </label>
              <input
                type="text"
                value={localLevelName}
                onChange={(e) => setLocalLevelName(e.target.value)}
                placeholder="e.g. Kathmandu Metropolitan City, Ward 4"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#111111]/15 text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Street Address / Landmark */}
          <div>
            <label className="block text-[#111111]/75 font-semibold mb-1.5 uppercase tracking-wider text-[10px]">
              Street Address / Landmark
            </label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="e.g. Baluwatar Road, House #14, Near Embassy"
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#111111]/15 text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-7 py-3 rounded-full bg-[#111111] hover:bg-secondary text-[#FAFAF8] text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Address</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
