"use client";

import SectionContainer from "@/components/ui/section-container";
import dynamic from "next/dynamic";

const GlowingStarsBackgroundCard = dynamic(
  () => import("@/components/ui/glowing-stars").then((mod) => mod.GlowingStarsBackgroundCard),
  { ssr: false }
);

const GlowingStarsTitle = dynamic(
  () => import("@/components/ui/glowing-stars").then((mod) => mod.GlowingStarsTitle),
  { ssr: false }
);

const GlowingStarsDescription = dynamic(
  () => import("@/components/ui/glowing-stars").then((mod) => mod.GlowingStarsDescription),
  { ssr: false }
);

type GlowingStarsBlockProps = {
  _type: "aceternity.glowing-stars";
  _key: string;
  title?: string;
  description?: string;
  colorVariant?: string;
  padding?: string;
};

export default function GlowingStarsBlock({
  title,
  description,
  colorVariant,
  padding,
}: GlowingStarsBlockProps) {
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container flex items-center justify-center">
        <GlowingStarsBackgroundCard>
          {title && <GlowingStarsTitle>{title}</GlowingStarsTitle>}
          {description && (
            <GlowingStarsDescription>{description}</GlowingStarsDescription>
          )}
        </GlowingStarsBackgroundCard>
      </div>
    </SectionContainer>
  );
}
