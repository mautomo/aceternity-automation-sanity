"use client";

import SectionContainer from "@/components/ui/section-container";

type InfiniteMovingCardsBlockProps = {
  _type: "aceternity.infinite-moving-cards";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function InfiniteMovingCardsBlock(props: InfiniteMovingCardsBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          InfiniteMovingCards - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
