"use client";

import SectionContainer from "@/components/ui/section-container";

type ThreeDCardBlockProps = {
  _type: "aceternity.3d-card";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function ThreeDCardBlock(props: ThreeDCardBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          3D Card - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
