"use client";

import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import SectionContainer from "@/components/ui/section-container";

type DottedGlowBackgroundBlockProps = {
  _type: "aceternity.dotted-glow-background";
  _key: string;
  gap?: number;
  radius?: number;
  opacity?: number;
  speedMin?: number;
  speedMax?: number;
  colorVariant?: string;
  padding?: string;
};

export default function DottedGlowBackgroundBlock({
  gap,
  radius,
  opacity,
  speedMin,
  speedMax,
  colorVariant,
  padding,
}: DottedGlowBackgroundBlockProps) {
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="relative min-h-[400px]">
        <DottedGlowBackground
          className="absolute inset-0"
          gap={gap}
          radius={radius}
          opacity={opacity}
          speedMin={speedMin}
          speedMax={speedMax}
        />
      </div>
    </SectionContainer>
  );
}
