"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import SectionContainer from "@/components/ui/section-container";

type BackgroundBeamsBlockProps = {
  _type: "aceternity.background-beams";
  _key: string;
  colorVariant?: string;
  padding?: string;
  overlay?: boolean; // If true, renders as absolute overlay (no height)
  height?: string; // Optional custom height
};

export default function BackgroundBeamsBlock({
  colorVariant,
  padding,
  overlay = true, // Default to overlay mode
  height = "600px",
}: BackgroundBeamsBlockProps) {
  if (overlay) {
    // Overlay mode: absolute positioned, no height, overlays previous section
    return (
      <div className="absolute inset-x-0 top-0 h-screen pointer-events-none z-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
        <BackgroundBeams className="absolute inset-0" />
      </div>
    );
  }

  // Standalone section mode - use Schema UI SectionContainer pattern
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="relative w-full" style={{ minHeight: height }}>
        <BackgroundBeams className="absolute inset-0" />
      </div>
    </SectionContainer>
  );
}
