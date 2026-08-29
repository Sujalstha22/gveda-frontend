import React from 'react';
import Link from 'next/link';
import { usePages } from '@/features/pages';

const POLICY_LABELS: Record<string, string> = {
  'privacy-policy': 'Privacy',
  'associate-policy': 'Associate Standards',
  'terms-and-conditions': 'Terms',
  'cancellation-exchange-refund-policy': 'Returns & Refunds',
  'shipping-policy': 'Shipping',
  'global-victors-code-of-ethics-and-conduct': 'Code of Ethics',
  'policy-on-team-poaching': 'Team Integrity',
  'income-distribution-guidelines': 'Income Guidelines',
  'gveda-official-content-creation-digital-conduct-policy': 'Digital Conduct',
};

function getPolicyLabel(slug: string, title: string) {
  return POLICY_LABELS[slug] ?? title.replace(/\s*-\s*/g, ' ');
}

export default function FooterPolicies() {
  const { data } = usePages();
  const pages = data?.results ?? [];

  if (pages.length === 0) return null;

  return (
    <section className="mt-12 border-t border-black/10 pt-2" aria-label="Policy links">
      <details className="group/policies border-b border-black/10">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
          <span className="flex flex-col gap-1.5">
            <span className="font-primary text-xs font-medium uppercase tracking-[0.15em] text-primary/70">
              Policies & Guidelines
            </span>
            <span className="max-w-2xl font-primary text-xs leading-relaxed text-primary/50">
              Clear references for privacy, orders, associate conduct, and digital standards.
            </span>
          </span>
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-full border border-secondary/40 text-lg font-light leading-none text-primary/70 transition-transform duration-300 group-open/policies:rotate-45"
          >
            +
          </span>
        </summary>

        <div className="grid grid-cols-1 gap-x-8 gap-y-3 pb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pages.map((p) => (
            <Link
              key={p.slug}
              href={`/policies/${p.slug}`}
              className="group/link flex items-center justify-between gap-4 border-t border-secondary/25 pt-3 font-primary text-xs font-light leading-relaxed text-primary/65 transition-colors hover:text-primary"
            >
              <span>{getPolicyLabel(p.slug, p.title)}</span>
              <span
                aria-hidden="true"
                className="text-primary/35 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:text-secondary"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </details>
    </section>
  );
}
