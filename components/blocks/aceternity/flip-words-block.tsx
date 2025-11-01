"use client";

import { FlipWords } from "@/components/ui/flip-words";
import SectionContainer from "@/components/ui/section-container";

type FlipWordsBlockProps = {
  _type: "aceternity.flip-words";
  _key: string;
  words?: string[];
  duration?: number;
  textClassName?: string;
  colorVariant?: string;
  padding?: string;
};

export default function FlipWordsBlock({
  words,
  duration,
  textClassName,
  colorVariant,
  padding,
}: FlipWordsBlockProps) {
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container flex items-center justify-center min-h-[200px]">
        <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          <FlipWords
            words={words || []}
            duration={duration}
            className={textClassName}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
