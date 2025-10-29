# Aceternity UI + Sanity Visual Editor Integration

## Overview

This guide explains how to make Aceternity UI components fully editable in Sanity Studio's visual editor (Presentation Tool).

**What you'll achieve:**
- ✅ Add Aceternity components to Sanity Studio
- ✅ Edit component props in real-time
- ✅ Live preview in the visual editor
- ✅ Type-safe integration with TypeScript
- ✅ Reusable across pages via CMS

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Sanity Studio                             │
│  ┌─────────────────┐         ┌──────────────────┐              │
│  │  Schema Editor  │────────▶│  Visual Editor   │              │
│  │  (Structure)    │         │  (Presentation)  │              │
│  └─────────────────┘         └──────────────────┘              │
│           │                           │                          │
│           │ Defines Props             │ Live Preview            │
│           ▼                           ▼                          │
│  ┌──────────────────────────────────────────────┐              │
│  │        Sanity Document (JSON)                 │              │
│  │  {                                            │              │
│  │    _type: "aceternity-sparkles",              │              │
│  │    particleDensity: 100,                      │              │
│  │    particleColor: "#00d71c"                   │              │
│  │  }                                            │              │
│  └──────────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────────┘
                          │
                          │ API / GROQ Query
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js Frontend                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Block Renderer                                           │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │  componentMap = {                               │     │  │
│  │  │    "aceternity-sparkles": SparklesBlock         │     │  │
│  │  │  }                                              │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  │                      │                                    │  │
│  │                      ▼                                    │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │  <SparklesBlock                                 │     │  │
│  │  │    particleDensity={100}                        │     │  │
│  │  │    particleColor="#00d71c"                      │     │  │
│  │  │  />                                             │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Implementation

### Step 1: Create Sanity Schema for Aceternity Component

**Example: Sparkles Component**

```typescript
// sanity/schemas/blocks/aceternity/sparkles.ts
import { defineField, defineType } from "sanity";
import { Sparkles } from "lucide-react";

export default defineType({
  name: "aceternity-sparkles",
  title: "Sparkles Effect",
  type: "object",
  icon: Sparkles,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Settings" },
    { name: "style", title: "Style" },
  ],
  fields: [
    // Content
    defineField({
      name: "title",
      title: "Title (Optional)",
      type: "string",
      description: "Internal title for organization",
      group: "content",
    }),

    // Settings - Particle Configuration
    defineField({
      name: "particleDensity",
      title: "Particle Density",
      type: "number",
      description: "Number of particles (50-200 recommended)",
      initialValue: 100,
      validation: (rule) => rule.min(10).max(500),
      group: "settings",
    }),
    defineField({
      name: "minSize",
      title: "Min Particle Size",
      type: "number",
      description: "Minimum particle size",
      initialValue: 0.4,
      validation: (rule) => rule.min(0.1).max(5),
      group: "settings",
    }),
    defineField({
      name: "maxSize",
      title: "Max Particle Size",
      type: "number",
      description: "Maximum particle size",
      initialValue: 1,
      validation: (rule) => rule.min(0.1).max(10),
      group: "settings",
    }),
    defineField({
      name: "speed",
      title: "Animation Speed",
      type: "number",
      description: "Speed of particle movement",
      initialValue: 1,
      validation: (rule) => rule.min(0.1).max(5),
      group: "settings",
    }),

    // Style
    defineField({
      name: "particleColor",
      title: "Particle Color",
      type: "string",
      description: "Hex color for particles (e.g., #00d71c)",
      initialValue: "#00d71c",
      validation: (rule) =>
        rule.regex(/^#[0-9A-Fa-f]{6}$/, {
          name: "hex color",
          invert: false,
        }),
      group: "style",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background",
      type: "string",
      options: {
        list: [
          { title: "Transparent", value: "transparent" },
          { title: "Black", value: "black" },
          { title: "White", value: "white" },
          { title: "Gradient", value: "gradient" },
        ],
      },
      initialValue: "transparent",
      group: "style",
    }),
    defineField({
      name: "height",
      title: "Height",
      type: "string",
      options: {
        list: [
          { title: "Auto", value: "auto" },
          { title: "Screen (100vh)", value: "screen" },
          { title: "Half Screen (50vh)", value: "half" },
          { title: "Small (300px)", value: "sm" },
          { title: "Medium (500px)", value: "md" },
          { title: "Large (700px)", value: "lg" },
        ],
      },
      initialValue: "auto",
      group: "style",
    }),

    // Positioning
    defineField({
      name: "zIndex",
      title: "Z-Index",
      type: "string",
      options: {
        list: [
          { title: "Background (-10)", value: "bg" },
          { title: "Normal (0)", value: "normal" },
          { title: "Above (10)", value: "above" },
        ],
      },
      initialValue: "bg",
      group: "style",
    }),

    // Common Fields
    defineField({
      name: "padding",
      title: "Section Padding",
      type: "sectionPadding",
      group: "style",
    }),
  ],
  preview: {
    select: {
      title: "title",
      particleDensity: "particleDensity",
      particleColor: "particleColor",
    },
    prepare({ title, particleDensity, particleColor }) {
      return {
        title: title || "Sparkles Effect",
        subtitle: `Density: ${particleDensity} | Color: ${particleColor}`,
        media: Sparkles,
      };
    },
  },
});
```

---

### Step 2: Create React Component Wrapper

**Block component that receives Sanity data:**

```tsx
// components/blocks/aceternity/sparkles-block.tsx
"use client";

import { SparklesCore } from "@/components/aceternity/animations/sparkles";
import { AceternitySpark les } from "@/sanity.types";
import { stegaClean } from "@sanity/client/stega";
import { cn } from "@/lib/utils";

export default function SparklesBlock({
  particleDensity,
  minSize,
  maxSize,
  speed,
  particleColor,
  backgroundColor,
  height,
  zIndex,
  padding,
}: AceternitySpar kles) {
  // Convert height option to CSS class
  const heightClass = {
    auto: "h-auto",
    screen: "h-screen",
    half: "h-[50vh]",
    sm: "h-[300px]",
    md: "h-[500px]",
    lg: "h-[700px]",
  }[stegaClean(height) || "auto"];

  // Convert z-index option to CSS class
  const zIndexClass = {
    bg: "-z-10",
    normal: "z-0",
    above: "z-10",
  }[stegaClean(zIndex) || "bg"];

  // Background color
  const bgClass = {
    transparent: "bg-transparent",
    black: "bg-black",
    white: "bg-white",
    gradient: "bg-gradient-to-b from-gray-900 to-black",
  }[stegaClean(backgroundColor) || "transparent"];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        heightClass,
        bgClass,
        padding?.top ? "pt-16 md:pt-28 lg:pt-32" : undefined,
        padding?.bottom ? "pb-16 md:pb-28 lg:pb-32" : undefined
      )}
    >
      <SparklesCore
        id="sparkles-effect"
        background="transparent"
        minSize={stegaClean(minSize) || 0.4}
        maxSize={stegaClean(maxSize) || 1}
        particleDensity={stegaClean(particleDensity) || 100}
        particleColor={stegaClean(particleColor) || "#00d71c"}
        speed={stegaClean(speed) || 1}
        className={cn("absolute inset-0", zIndexClass)}
      />
    </div>
  );
}
```

---

### Step 3: Register Schema in Sanity

```typescript
// sanity/schemas/index.ts
import aceternitySpa rkles from "./blocks/aceternity/sparkles";

// Add to block types array
const blockTypes = [
  // ... existing blocks
  aceternitySpar kles,
];

// Add to page blocks field
defineField({
  name: "blocks",
  type: "array",
  of: [
    // ... existing block types
    { type: "aceternity-sparkles" },
  ],
})
```

---

### Step 4: Register Component in Block Map

```typescript
// components/blocks/index.tsx
import SparklesBlock from "./aceternity/sparkles-block";

export const blockComponents: Record<string, React.ComponentType<any>> = {
  // ... existing components
  "aceternity-sparkles": SparklesBlock,
};
```

---

### Step 5: Generate Types

```bash
npm run typegen
```

This generates TypeScript types from your Sanity schemas in `sanity.types.ts`.

---

### Step 6: Configure Visual Editor (Presentation Tool)

Your project should already have this configured, but verify:

```typescript
// sanity.config.ts
import { defineConfig } from "sanity";
import { presentationTool } from "@sanity/presentation";

export default defineConfig({
  // ... other config
  plugins: [
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft",
        },
        previewMode: {
          enable: "/api/preview",
        },
      },
      resolve: {
        mainDocuments: defineLocations({
          locations: [
            {
              title: "Home",
              href: "/",
            },
            {
              title: "Page",
              href: (doc) => `/${doc?.slug?.current}`,
            },
          ],
        }),
      },
    }),
    // ... other plugins
  ],
});
```

---

## Complete Example: Animated Beam Component

Let me show you a complete implementation from start to finish.

### Schema

```typescript
// sanity/schemas/blocks/aceternity/animated-beam.ts
import { defineField, defineType } from "sanity";
import { Zap } from "lucide-react";

export default defineType({
  name: "aceternity-animated-beam",
  title: "Animated Beam",
  type: "object",
  icon: Zap,
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      description: "For organization only",
    }),
    defineField({
      name: "fromElement",
      title: "From Element",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "icon", type: "string", title: "Icon Name (lucide)" },
      ],
    }),
    defineField({
      name: "toElement",
      title: "To Element",
      type: "object",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "icon", type: "string", title: "Icon Name (lucide)" },
      ],
    }),
    defineField({
      name: "beamColor",
      title: "Beam Color",
      type: "string",
      options: {
        list: [
          { title: "Green (Vconic)", value: "#00d71c" },
          { title: "Blue", value: "#3b82f6" },
          { title: "Purple", value: "#a855f7" },
          { title: "Red", value: "#ef4444" },
        ],
      },
      initialValue: "#00d71c",
    }),
    defineField({
      name: "duration",
      title: "Animation Duration (seconds)",
      type: "number",
      initialValue: 3,
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: "padding",
      type: "sectionPadding",
    }),
  ],
  preview: {
    select: {
      title: "title",
      from: "fromElement.label",
      to: "toElement.label",
    },
    prepare({ title, from, to }) {
      return {
        title: title || "Animated Beam",
        subtitle: `${from} → ${to}`,
        media: Zap,
      };
    },
  },
});
```

### Component

```tsx
// components/blocks/aceternity/animated-beam-block.tsx
"use client";

import { AnimatedBeam } from "@/components/aceternity/animations/animated-beam";
import { AceternityAnimatedBeam } from "@/sanity.types";
import { stegaClean } from "@sanity/client/stega";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

export default function AnimatedBeamBlock({
  fromElement,
  toElement,
  beamColor,
  duration,
  padding,
}: AceternityAnimatedBeam) {
  // Get icon components
  const FromIcon = fromElement?.icon
    ? (LucideIcons as any)[stegaClean(fromElement.icon)] || LucideIcons.Circle
    : LucideIcons.Circle;

  const ToIcon = toElement?.icon
    ? (LucideIcons as any)[stegaClean(toElement.icon)] || LucideIcons.Circle
    : LucideIcons.Circle;

  return (
    <section
      className={cn(
        "relative w-full bg-background",
        padding?.top ? "pt-16 md:pt-28 lg:pt-32" : undefined,
        padding?.bottom ? "pb-16 md:pb-28 lg:pb-32" : undefined
      )}
    >
      <div className="container">
        <div className="flex items-center justify-center gap-32">
          {/* From Element */}
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full border-2 border-border p-8">
              <FromIcon className="h-12 w-12" />
            </div>
            <p className="text-sm font-medium">
              {stegaClean(fromElement?.label) || "Source"}
            </p>
          </div>

          {/* Animated Beam */}
          <AnimatedBeam
            color={stegaClean(beamColor) || "#00d71c"}
            duration={stegaClean(duration) || 3}
          />

          {/* To Element */}
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full border-2 border-border p-8">
              <ToIcon className="h-12 w-12" />
            </div>
            <p className="text-sm font-medium">
              {stegaClean(toElement?.label) || "Target"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Advanced Patterns

### Pattern 1: Nested Content in Aceternity Components

**Example: 3D Card with Portable Text**

```typescript
// Schema
defineField({
  name: "content",
  title: "Card Content",
  type: "blockContent", // Portable text
}),

// Component
import { PortableText } from "@portabletext/react";

export default function Card3DBlock({ title, content, image }: Card3D) {
  return (
    <Card3D>
      {image && <img src={imageUrl} alt={title} />}
      <h3>{title}</h3>
      <PortableText value={content} />
    </Card3D>
  );
}
```

---

### Pattern 2: Conditional Rendering Based on CMS

```typescript
defineField({
  name: "enableParallax",
  title: "Enable Parallax Effect",
  type: "boolean",
  initialValue: true,
}),

// Component
export default function HeroBlock({ enableParallax, ...props }) {
  if (stegaClean(enableParallax)) {
    return <HeroWithParallax {...props} />;
  }
  return <HeroStatic {...props} />;
}
```

---

### Pattern 3: Array of Aceternity Elements

```typescript
// Schema - Array of 3D cards
defineField({
  name: "cards",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
        { name: "image", type: "image" },
        { name: "rotateAmount", type: "number", initialValue: 15 },
      ],
    },
  ],
}),

// Component
export default function Cards3DGrid({ cards }: Cards3DGrid) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {cards?.map((card) => (
        <Card3D key={card._key} rotateAmount={card.rotateAmount}>
          <img src={getImageUrl(card.image)} />
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </Card3D>
      ))}
    </div>
  );
}
```

---

## Testing in Visual Editor

### Step 1: Start Dev Server
```bash
npm run dev
```

### Step 2: Start Sanity Studio
```bash
# If embedded in project
npm run dev

# If separate studio
cd studio && npm run dev
```

### Step 3: Open Visual Editor
1. Go to Sanity Studio (usually http://localhost:3000/studio)
2. Navigate to "Presentation" tab
3. Select a page to edit
4. Click "+" to add new block
5. Search for your Aceternity component
6. Add it to the page

### Step 4: Live Edit
- Change values in the studio sidebar
- Watch preview update in real-time
- Adjust settings until satisfied
- Click "Publish"

---

## Common Issues & Solutions

### Issue: Component Not Showing in Block List

**Solution:**
```typescript
// Make sure it's added to page blocks array
defineField({
  name: "blocks",
  type: "array",
  of: [
    { type: "aceternity-sparkles" }, // ← Add here
  ],
})
```

### Issue: TypeScript Errors

**Solution:**
```bash
# Regenerate types
npm run typegen

# Restart TS server in VSCode
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Issue: Preview Not Updating

**Solution:**
```tsx
// Ensure you're using stegaClean
import { stegaClean } from "@sanity/client/stega";

const value = stegaClean(props.someValue);
```

### Issue: Animation Not Working

**Solution:**
```tsx
// Make sure component is client-side
"use client";

// Check Motion is installed
npm list motion framer-motion
```

---

## Best Practices

### 1. Group Related Fields
```typescript
groups: [
  { name: "content", title: "Content" },
  { name: "animation", title: "Animation Settings" },
  { name: "style", title: "Styling" },
],
```

### 2. Provide Good Defaults
```typescript
initialValue: 100,  // Sensible default
validation: (rule) => rule.min(10).max(500),  // Guard rails
```

### 3. Use Descriptive Titles
```typescript
title: "Particle Density",
description: "Number of particles (50-200 recommended)",
```

### 4. Add Preview Images
```typescript
preview: {
  prepare() {
    return {
      title: "Sparkles Effect",
      subtitle: "Animated particle background",
      media: SparklesIcon,  // Visual icon
    };
  },
}
```

### 5. Validate Input
```typescript
validation: (rule) =>
  rule.regex(/^#[0-9A-Fa-f]{6}$/, "Must be valid hex color")
```

---

## Quick Checklist

When adding a new Aceternity component to Sanity:

- [ ] Copy Aceternity component to `components/aceternity/`
- [ ] Create Sanity schema in `sanity/schemas/blocks/aceternity/`
- [ ] Create block wrapper in `components/blocks/aceternity/`
- [ ] Register schema in `sanity/schemas/index.ts`
- [ ] Register component in `components/blocks/index.tsx`
- [ ] Run `npm run typegen`
- [ ] Test in Sanity Studio visual editor
- [ ] Verify live preview updates
- [ ] Document in `components/aceternity/README.md`

---

## Next Steps

1. Pick your first Aceternity component to integrate
2. Follow this guide step-by-step
3. Test in visual editor
4. Repeat for more components

Need help with a specific component? Let me know!
