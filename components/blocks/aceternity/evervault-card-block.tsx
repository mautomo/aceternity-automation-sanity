"use client";

import { EvervaultCard } from "@/components/aceternity/cards/evervault-card";
import { stegaClean } from "@sanity/client/stega";
import SectionContainer from "@/components/ui/section-container";

export default function EvervaultCardBlock(props: any) {
  const { colorVariant, padding, text, description } = props;

  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* For now, showing a single card - can be enhanced to show multiple */}
          <div className="h-96">
            <EvervaultCard
              text={stegaClean(text) || "Hover me"}
              className="w-full h-full"
            />
            {description && (
              <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                {stegaClean(description)}
              </p>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
