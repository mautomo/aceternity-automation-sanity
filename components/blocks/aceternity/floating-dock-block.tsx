"use client";

import SectionContainer from "@/components/ui/section-container";

type FloatingDockBlockProps = {
  _type: "aceternity.floating-dock";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function FloatingDockBlock(props: FloatingDockBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          FloatingDock - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
