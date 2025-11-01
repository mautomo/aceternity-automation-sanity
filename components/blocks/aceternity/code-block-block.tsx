"use client";

import SectionContainer from "@/components/ui/section-container";

type CodeBlockBlockProps = {
  _type: "aceternity.code-block";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function CodeBlockBlock(props: CodeBlockBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          CodeBlock - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
