"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import SectionContainer from "@/components/ui/section-container";

type TextGenerateEffectBlockProps = {
  _type: "aceternity.text-generate-effect";
  _key: string;
  title?: string;
  words?: string;
  text?: string; // Support both field names
  filter?: boolean;
  duration?: number;
  className?: string;
  colorVariant?: string;
  padding?: string;
};

export default function TextGenerateEffectBlock({
  title,
  words,
  text,
  filter,
  duration,
  className,
  colorVariant,
  padding,
}: TextGenerateEffectBlockProps) {
  // Use words or text, whichever is available
  const content = words || text || "";

  if (!content) {
    return null;
  }

  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container px-4">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            {title}
          </h2>
        )}
        <div className="[&_span]:!text-foreground">
          <TextGenerateEffect
            words={content}
            filter={filter}
            duration={duration}
            className={className}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
