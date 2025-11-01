"use client";

import { Timeline } from "@/components/ui/timeline";
import SectionContainer from "@/components/ui/section-container";

type TimelineItem = {
  _key: string;
  year: string;
  title: string;
  content?: string;
};

type TimelineBlockProps = {
  _type: "aceternity.timeline";
  _key: string;
  title?: string;
  subtitle?: string;
  items?: TimelineItem[];
  colorVariant?: string;
  padding?: string;
};

export default function TimelineBlock({
  title,
  subtitle,
  items,
  colorVariant,
  padding,
}: TimelineBlockProps) {
  if (!items || items.length === 0) {
    return null;
  }

  // Transform Sanity data to Timeline format
  const timelineEntries = items.map((item) => ({
    title: item.title || item.year,
    content: (
      <div>
        {item.year && <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">{item.year}</p>}
        {item.content && <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">{item.content}</p>}
      </div>
    ),
  }));

  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container px-4">
        {(title || subtitle) && (
          <div className="max-w-7xl mx-auto py-20">
            {title && (
              <h2 className="text-lg md:text-4xl mb-4 text-foreground max-w-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground text-sm md:text-base max-w-sm">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <Timeline data={timelineEntries} />
      </div>
    </SectionContainer>
  );
}
