'use client';

import { useSyncExternalStore } from 'react';

const SESSION_KEY = 'gveda_auth_session';
const AUTH_SESSION_CHANGE_EVENT = 'gveda_auth_session_change';

let cachedAuthSessionRaw: string | null | undefined;
let cachedAuthSessionValue: AuthSession | null | undefined;

export interface AuthSession {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  sponsorId?: string;
  isDist?: boolean;
  isVerified?: boolean;
  provinceName?: string;
  districtName?: string;
  typeName?: string;
  localLevelName?: string;
  streetAddress?: string;
  token?: string;
  loginAt: number;
}

export function saveAuthSession(data: {
  id?: string;
  email?: string;
  fullName?: string;
  name?: string;
  phoneNumber?: string;
  phone?: string;
  sponsorId?: string;
  isDist?: boolean;
  isVerified?: boolean;
  provinceName?: string;
  districtName?: string;
  typeName?: string;
  localLevelName?: string;
  streetAddress?: string;
  token?: string;
}): AuthSession {
  const session: AuthSession = {
    id: data.id || `gv_${Date.now()}`,
    email: data.email || 'customer@gveda.com',
    fullName: data.fullName || data.name || (data.email ? data.email.split('@')[0] : 'Valued Customer'),
    phoneNumber: data.phoneNumber || data.phone || '',
    sponsorId: data.sponsorId,
    isDist: Boolean(data.isDist),
    isVerified: data.isVerified,
    provinceName: data.provinceName || 'Bagmati Province',
    districtName: data.districtName || 'Kathmandu',
    typeName: data.typeName || 'Metropolitan City',
    localLevelName: data.localLevelName || 'Ward 4',
    streetAddress: data.streetAddress || '',
    token: data.token,
    loginAt: Date.now(),
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      cachedAuthSessionRaw = null;
      cachedAuthSessionValue = session;
      window.dispatchEvent(new Event(AUTH_SESSION_CHANGE_EVENT));
    } catch (e) {
      console.error('Failed to save auth session:', e);
    }
  }

  return session;
}

export function updateAuthSession(updates: Partial<AuthSession>): AuthSession | null {
  const current = getAuthSession();
  if (!current) return null;

  const updated: AuthSession = {
    ...current,
    ...updates,
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
      cachedAuthSessionRaw = null;
      cachedAuthSessionValue = updated;
      window.dispatchEvent(new Event(AUTH_SESSION_CHANGE_EVENT));
    } catch (e) {
      console.error('Failed to update auth session:', e);
    }
  }

  return updated;
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw === cachedAuthSessionRaw) {
      return cachedAuthSessionValue ?? null;
    }

    cachedAuthSessionRaw = raw;
    if (!raw) {
      cachedAuthSessionValue = null;
      return null;
    }

    const session: AuthSession = JSON.parse(raw);
    cachedAuthSessionValue = session;
    return session;
  } catch {
    cachedAuthSessionRaw = null;
    cachedAuthSessionValue = null;
    return null;
  }
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(SESSION_KEY);
    cachedAuthSessionRaw = null;
    cachedAuthSessionValue = null;
    window.dispatchEvent(new Event(AUTH_SESSION_CHANGE_EVENT));
  } catch (e) {
    console.error('Failed to clear auth session:', e);
  }
}

function getAuthSessionSnapshot(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  return getAuthSession();
}

function subscribeAuthSession(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === SESSION_KEY || event.key === null) {
      cachedAuthSessionRaw = undefined;
      onStoreChange();
    }
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(AUTH_SESSION_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(AUTH_SESSION_CHANGE_EVENT, onStoreChange);
  };
}

export function useAuthSession(): AuthSession | null {
  return useSyncExternalStore(subscribeAuthSession, getAuthSessionSnapshot, () => null);
}

export function useAuthHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
