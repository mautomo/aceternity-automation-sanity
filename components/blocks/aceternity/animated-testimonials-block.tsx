"use client";

import SectionContainer from "@/components/ui/section-container";

type AnimatedTestimonialsBlockProps = {
  _type: "aceternity.animated-testimonials";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function AnimatedTestimonialsBlock(props: AnimatedTestimonialsBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          AnimatedTestimonials - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
