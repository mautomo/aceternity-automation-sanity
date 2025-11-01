"use client";

import SectionContainer from "@/components/ui/section-container";

type ParallaxScrollBlockProps = {
  _type: "aceternity.parallax-scroll";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function ParallaxScrollBlock(props: ParallaxScrollBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          ParallaxScroll - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
