"use client";

import SectionContainer from "@/components/ui/section-container";

type NavbarMenuBlockProps = {
  _type: "aceternity.navbar-menu";
  _key: string;
  colorVariant?: string;
  padding?: string;
  [key: string]: any;
};

export default function NavbarMenuBlock(props: NavbarMenuBlockProps) {
  const { colorVariant, padding } = props;
  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container">
        <p className="text-muted-foreground">
          NavbarMenu - Integration in progress
        </p>
      </div>
    </SectionContainer>
  );
}
