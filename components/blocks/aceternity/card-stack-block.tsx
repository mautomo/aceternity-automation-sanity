"use client";

import SectionContainer from "@/components/ui/section-container";

type CardStackBlockProps = {
  _type: "aceternity.card-stack";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function CardStackBlock(props: CardStackBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          CardStack - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
