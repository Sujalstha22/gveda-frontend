import React from 'react';
import TransitionLogo from './TransitionLogo';

interface TransitionOverlayProps {
  logoRef: React.RefObject<HTMLDivElement | null>;
}

const TransitionOverlay = React.forwardRef<HTMLDivElement, TransitionOverlayProps>(
  function TransitionOverlay({ logoRef }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className="fixed inset-0 w-screen h-screen min-h-dvh z-[9998] hidden overflow-hidden pointer-events-auto bg-warm-ivory"
        style={{
          background: 'var(--warm-ivory, #F7F5F1)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 lg:p-[5vw]">
          <TransitionLogo logoRef={logoRef} />
        </div>
      </div>
    );
  }
);

TransitionOverlay.displayName = 'TransitionOverlay';

export default TransitionOverlay;
