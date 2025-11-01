"use client";

import { Spotlight } from "@/components/ui/spotlight";
import SectionContainer from "@/components/ui/section-container";

type SpotlightBlockProps = {
  _type: "aceternity.spotlight";
  _key: string;
  title?: string;
  heading?: string;
  subheading?: string;
  fill?: string;
  className?: string;
  colorVariant?: string;
  padding?: string;
};

export default function SpotlightBlock({
  title,
  heading,
  subheading,
  fill = "white",
  className,
  colorVariant,
  padding,
}: SpotlightBlockProps) {
  const hasContent = title || heading || subheading;

  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
        <Spotlight fill={fill} className="absolute inset-0" />
        {hasContent && (
          <div className={`container max-w-5xl relative z-10 px-4 ${className || ""}`}>
            {title && (
              <p className="text-lg md:text-xl text-primary font-semibold mb-4">
                {title}
              </p>
            )}
            {heading && (
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
                {subheading}
              </p>
            )}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
