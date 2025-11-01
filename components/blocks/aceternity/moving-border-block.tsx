"use client";

import SectionContainer from "@/components/ui/section-container";

type MovingBorderBlockProps = {
  _type: "aceternity.moving-border";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function MovingBorderBlock(props: MovingBorderBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          MovingBorder - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
