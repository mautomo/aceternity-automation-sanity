"use client";

import SectionContainer from "@/components/ui/section-container";
import dynamic from "next/dynamic";

const SparklesCore = dynamic(
  () => import("@/components/ui/sparkles").then((mod) => mod.SparklesCore),
  { ssr: false }
);

type SparklesBlockProps = {
  _type: "aceternity.sparkles";
  _key: string;
  background?: string;
  particleColor?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleDensity?: number;
  colorVariant?: string;
  padding?: string;
};

export default function SparklesBlock({
  background,
  particleColor,
  minSize,
  maxSize,
  speed,
  particleDensity,
  colorVariant,
  padding,
}: SparklesBlockProps) {
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="relative min-h-[600px] w-full">
        <SparklesCore
          id="sparkles-block"
          background={background}
          particleColor={particleColor}
          minSize={minSize}
          maxSize={maxSize}
          speed={speed}
          particleDensity={particleDensity}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </SectionContainer>
  );
}
