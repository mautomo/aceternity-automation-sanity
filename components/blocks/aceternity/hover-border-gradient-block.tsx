"use client";

import SectionContainer from "@/components/ui/section-container";

type HoverBorderGradientBlockProps = {
  _type: "aceternity.hover-border-gradient";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function HoverBorderGradientBlock(props: HoverBorderGradientBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          HoverBorderGradient - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
