"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import SectionContainer from "@/components/ui/section-container";
import {
  Workflow,
  ShieldCheck,
  MessageSquare,
  Zap,
  FileCheck,
  Package,
  Database,
  Brain,
  TrendingUp,
  Headphones,
  Cloud,
  Building,
  Rocket,
  Cpu,
  Shield,
} from "lucide-react";

// Icon mapping for Lucide icons
const iconMap: Record<string, React.ReactNode> = {
  workflow: <Workflow className="h-6 w-6 text-muted-foreground" />,
  "shield-check": <ShieldCheck className="h-6 w-6 text-muted-foreground" />,
  "message-square": <MessageSquare className="h-6 w-6 text-muted-foreground" />,
  zap: <Zap className="h-6 w-6 text-muted-foreground" />,
  "file-check": <FileCheck className="h-6 w-6 text-muted-foreground" />,
  package: <Package className="h-6 w-6 text-muted-foreground" />,
  database: <Database className="h-6 w-6 text-muted-foreground" />,
  brain: <Brain className="h-6 w-6 text-muted-foreground" />,
  "trending-up": <TrendingUp className="h-6 w-6 text-muted-foreground" />,
  headphones: <Headphones className="h-6 w-6 text-muted-foreground" />,
  cloud: <Cloud className="h-6 w-6 text-muted-foreground" />,
  building: <Building className="h-6 w-6 text-muted-foreground" />,
  rocket: <Rocket className="h-6 w-6 text-muted-foreground" />,
  cpu: <Cpu className="h-6 w-6 text-muted-foreground" />,
  shield: <Shield className="h-6 w-6 text-muted-foreground" />,
};

type BentoGridItem = {
  _key: string;
  title: string;
  description?: string;
  icon?: string;
  className?: string;
  header?: any;
};

type BentoGridBlockProps = {
  _type: "aceternity.bento-grid";
  _key: string;
  title?: string;
  items?: BentoGridItem[];
  colorVariant?: string;
  padding?: string;
};

export default function BentoGridBlock({
  title,
  items,
  colorVariant,
  padding,
}: BentoGridBlockProps) {
  console.log("🔍 BentoGridBlock received props:", { title, items, colorVariant, padding });

  if (!items || items.length === 0) {
    console.log("⚠️ BentoGridBlock returning null - no items");
    return null;
  }

  console.log("✅ BentoGridBlock rendering with items:", items.length);

  return (
    <SectionContainer color={colorVariant as any} padding={padding as any}>
      <div className="container max-w-7xl">
        {title && (
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-10 text-center">
            {title}
          </h2>
        )}
        <BentoGrid>
          {items.map((item) => (
            <BentoGridItem
              key={item._key}
              title={item.title}
              description={item.description}
              icon={item.icon ? iconMap[item.icon] : undefined}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </div>
    </SectionContainer>
  );
}
