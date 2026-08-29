'use client';

import React, { useState } from 'react';
import Button from '@/shared/ui/Button';

export default function FooterNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <div className="md:col-span-4 flex flex-col items-start">
      <h3 className="font-primary font-medium text-base sm:text-3xl tracking-wider text-primary uppercase">
        STAY UP TO DATE
      </h3>
      <p className="font-primary font-normal text-xs sm:text-sm text-primary/70 leading-relaxed mt-2.5 max-w-sm">
        Be the first to know about our latest botanical releases, skincare rituals, and exclusive offers.
      </p>

      <form onSubmit={handleSubscribe} className="w-full max-w-xs mt-6 flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="EMAIL"
          required
          className="w-full bg-transparent border-b border-black/25 pb-2 text-xs sm:text-sm font-primary placeholder:text-muted placeholder:text-[0.75rem] placeholder:tracking-widest uppercase focus:outline-none focus:border-primary transition-colors text-primary"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="w-fit"
        >
          {subscribed ? 'Subscribed ✓' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
}
