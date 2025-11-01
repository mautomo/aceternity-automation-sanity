"use client";

import SectionContainer from "@/components/ui/section-container";

type HeroParallaxBlockProps = {
  _type: "aceternity.hero-parallax";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function HeroParallaxBlock(props: HeroParallaxBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          HeroParallax - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
