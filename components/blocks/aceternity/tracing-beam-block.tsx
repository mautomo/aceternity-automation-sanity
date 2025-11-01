"use client";

import SectionContainer from "@/components/ui/section-container";

type TracingBeamBlockProps = {
  _type: "aceternity.tracing-beam";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function TracingBeamBlock(props: TracingBeamBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          TracingBeam - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
