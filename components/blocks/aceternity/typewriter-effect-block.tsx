"use client";

import SectionContainer from "@/components/ui/section-container";

type TypewriterEffectBlockProps = {
  _type: "aceternity.typewriter-effect";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function TypewriterEffectBlock(props: TypewriterEffectBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          TypewriterEffect - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
