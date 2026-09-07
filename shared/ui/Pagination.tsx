'use client';

import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  itemName?: string;
  className?: string;
  scrollTargetId?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 12,
  itemName = 'Formulations',
  className = '',
  scrollTargetId,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    onPageChange(page);

    if (scrollTargetId && typeof window !== 'undefined') {
      const el = document.getElementById(scrollTargetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Generate pagination items with ellipsis for clean display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : null;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : null;

  return (
    <nav
      aria-label="Pagination"
      className={`w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 sm:pt-14 border-t border-secondary/20 select-none ${className}`}
    >
      {/* Item Counter Summary */}
      {totalItems !== undefined && startItem !== null && endItem !== null ? (
        <p className="font-primary text-xs tracking-wider uppercase text-primary/60 font-medium order-2 sm:order-1">
          Showing <span className="text-primary font-semibold">{startItem}–{endItem}</span> of{' '}
          <span className="text-primary font-semibold">{totalItems}</span> {itemName}
        </p>
      ) : (
        <div className="order-2 sm:order-1" />
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 order-1 sm:order-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="h-9 sm:h-10 px-3 sm:px-3.5 rounded-full border border-secondary/35 text-primary/70 hover:text-primary hover:border-secondary hover:bg-secondary/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none transition-all duration-200 text-xs font-primary uppercase tracking-wider flex items-center gap-1 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Numbered Buttons */}
        {getPageNumbers().map((p, i) => {
          if (p === '...') {
            return (
              <span
                key={`ellipsis-${i}`}
                className="w-8 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-primary/40 font-primary text-xs"
              >
                …
              </span>
            );
          }

          const pageNum = Number(p);
          const isActive = pageNum === currentPage;

          return (
            <button
              key={`page-${pageNum}`}
              type="button"
              onClick={() => handlePageClick(pageNum)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-primary text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-rich-black text-warm-ivory shadow-xs border border-rich-black'
                  : 'bg-transparent text-primary/70 border border-secondary/35 hover:border-secondary hover:text-primary hover:bg-secondary/10'
              }`}
            >
              {String(pageNum).padStart(2, '0')}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className="h-9 sm:h-10 px-3 sm:px-3.5 rounded-full border border-secondary/35 text-primary/70 hover:text-primary hover:border-secondary hover:bg-secondary/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none transition-all duration-200 text-xs font-primary uppercase tracking-wider flex items-center gap-1 cursor-pointer"
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
