"use client";

import SectionContainer from "@/components/ui/section-container";

type LampBlockProps = {
  _type: "aceternity.lamp";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function LampBlock(props: LampBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          Lamp - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
