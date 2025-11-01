"use client";

import SectionContainer from "@/components/ui/section-container";

type CompareBlockProps = {
  _type: "aceternity.compare";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function CompareBlock(props: CompareBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          Compare - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
