"use client";

import { memo } from "react";

function CosmicSpaceInner() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.12) 0%, transparent 65%),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124,58,237,0.06) 0%, transparent 60%),
          #07071a
        `,
      }}
    />
  );
}

export const CosmicSpace = memo(CosmicSpaceInner);
