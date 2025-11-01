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
  workflow: <Workflow className="h-6 w-6 text-neutral-500" />,
  "shield-check": <ShieldCheck className="h-6 w-6 text-neutral-500" />,
  "message-square": <MessageSquare className="h-6 w-6 text-neutral-500" />,
  zap: <Zap className="h-6 w-6 text-neutral-500" />,
  "file-check": <FileCheck className="h-6 w-6 text-neutral-500" />,
  package: <Package className="h-6 w-6 text-neutral-500" />,
  database: <Database className="h-6 w-6 text-neutral-500" />,
  brain: <Brain className="h-6 w-6 text-neutral-500" />,
  "trending-up": <TrendingUp className="h-6 w-6 text-neutral-500" />,
  headphones: <Headphones className="h-6 w-6 text-neutral-500" />,
  cloud: <Cloud className="h-6 w-6 text-neutral-500" />,
  building: <Building className="h-6 w-6 text-neutral-500" />,
  rocket: <Rocket className="h-6 w-6 text-neutral-500" />,
  cpu: <Cpu className="h-6 w-6 text-neutral-500" />,
  shield: <Shield className="h-6 w-6 text-neutral-500" />,
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
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-10 text-center">
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
