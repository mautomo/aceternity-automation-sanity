"use client";

import SectionContainer from "@/components/ui/section-container";

type CoverBlockProps = {
  _type: "aceternity.cover";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function CoverBlock(props: CoverBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          Cover - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
