# Aceternity UI Integration Guide

## Overview

This guide explains how to integrate Aceternity UI components (free and Pro) into your Vconic Next.js + Sanity project.

**Resources:**
- Free Components: https://ui.aceternity.com/components
- Pro Components: https://pro.aceternity.com/components
- Pro Templates: https://pro.aceternity.com/templates

## Your Current Setup

**Stack:**
- Next.js 15.5.4 with App Router
- React 19
- Tailwind CSS v4 (CSS-based config)
- TypeScript
- Sanity CMS for content
- shadcn/ui components

**Project Structure:**
```
components/
├── blocks/          # Sanity CMS block components
├── ui/              # shadcn/ui components
└── aceternity/      # ← Add Aceternity components here
```

---

## Integration Methods

### Method 1: Direct Component Copy (Recommended for Quick Integration)

**When to use:** Single components, quick prototypes, minor customizations needed

**Steps:**

1. **Copy the Component Code**
   - Visit Aceternity component page (e.g., https://ui.aceternity.com/components/3d-card)
   - Click "Show Code" or access Pro dashboard
   - Copy the component code

2. **Create Component File**
   ```bash
   # Create directory structure
   mkdir -p components/aceternity

   # Create component file
   touch components/aceternity/card-3d.tsx
   ```

3. **Paste and Adjust Imports**
   ```tsx
   // components/aceternity/card-3d.tsx
   "use client";

   import { cn } from "@/lib/utils";
   import { motion } from "motion/react";  // ✅ Already installed

   export function Card3D({ children, className }: {
     children: React.ReactNode;
     className?: string;
   }) {
     // ... component code
   }
   ```

4. **Install Missing Dependencies**
   ```bash
   # Check if dependencies exist
   npm list framer-motion

   # If needed, install
   npm install framer-motion
   ```

5. **Use in Your Project**
   ```tsx
   // app/page.tsx or components/blocks/hero/hero-1.tsx
   import { Card3D } from "@/components/aceternity/card-3d";

   export default function Hero() {
     return <Card3D>Content</Card3D>;
   }
   ```

---

### Method 2: Aceternity CLI (For Pro Subscribers)

**When to use:** Multiple components, want updates, Pro components

**Setup:**

1. **Install Aceternity CLI**
   ```bash
   npm install -g aceternity-ui
   ```

2. **Authenticate**
   ```bash
   aceternity-ui login
   # Enter your Pro credentials
   ```

3. **Initialize in Project**
   ```bash
   cd w:/Dev/Projects/NextJS/vconic-rapid-deploy
   aceternity-ui init
   ```

4. **Add Components**
   ```bash
   # List available components
   aceternity-ui list

   # Add specific component
   aceternity-ui add 3d-card

   # Add multiple
   aceternity-ui add 3d-card animated-beam sparkles
   ```

---

### Method 3: API Access (For Automation)

**When to use:** Batch importing, custom scripts, team workflows

**Setup:**

1. **Get API Key**
   - Visit https://pro.aceternity.com/settings/api
   - Generate new API key
   - Store in `.env.local`

2. **Create Environment Variable**
   ```bash
   # .env.local
   ACETERNITY_API_KEY=your_api_key_here
   ```

3. **Create Import Script**
   ```typescript
   // scripts/import-aceternity-component.ts
   import { writeFileSync } from "fs";
   import { join } from "path";

   async function importComponent(componentId: string) {
     const response = await fetch(
       `https://api.aceternity.com/v1/components/${componentId}`,
       {
         headers: {
           Authorization: `Bearer ${process.env.ACETERNITY_API_KEY}`,
         },
       }
     );

     const data = await response.json();
     const outputPath = join(
       process.cwd(),
       "components",
       "aceternity",
       `${componentId}.tsx`
     );

     writeFileSync(outputPath, data.code, "utf-8");
     console.log(`✅ Imported ${componentId}`);
   }

   // Usage
   importComponent("3d-card");
   ```

---

## Common Integration Patterns

### Pattern 1: Static Use (No CMS)

**Best for:** One-off effects, fixed UI elements

```tsx
// app/demo/page.tsx
import { SparklesCore } from "@/components/aceternity/sparkles";

export default function DemoPage() {
  return (
    <div className="relative h-screen">
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={100}
        className="absolute inset-0"
      />
      <h1>Demo Page with Sparkles</h1>
    </div>
  );
}
```

---

### Pattern 2: Sanity CMS Integration

**Best for:** Content-driven components, reusable blocks

**Step 1: Create Sanity Schema**

```typescript
// sanity/schemas/blocks/aceternity/card-3d.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "card-3d",
  title: "3D Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "link",
      type: "link",
    }),
  ],
});
```

**Step 2: Register Schema**

```typescript
// sanity/schemas/index.ts
import card3d from "./blocks/aceternity/card-3d";

export const schemaTypes = [
  // ... existing schemas
  card3d,
];
```

**Step 3: Create Block Component**

```tsx
// components/blocks/aceternity/card-3d-block.tsx
import { Card3D } from "@/components/aceternity/card-3d";
import { Card3d } from "@/sanity.types";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

const builder = imageUrlBuilder(client);

export default function Card3DBlock({ title, description, image, link }: Card3d) {
  const imageUrl = image ? builder.image(image).url() : undefined;

  return (
    <Card3D className="max-w-sm">
      {imageUrl && <img src={imageUrl} alt={title || ""} />}
      <h3>{title}</h3>
      <p>{description}</p>
      {link && <a href={link.href}>{link.title}</a>}
    </Card3D>
  );
}
```

**Step 4: Register in Block Map**

```typescript
// components/blocks/index.tsx
import Card3DBlock from "./aceternity/card-3d-block";

export const blockComponents = {
  // ... existing blocks
  "card-3d": Card3DBlock,
};
```

---

### Pattern 3: Hero Section with Aceternity Effects

**Example: Hero with animated background**

```tsx
// components/blocks/hero/hero-aceternity.tsx
"use client";

import { SparklesCore } from "@/components/aceternity/sparkles";
import { TextGenerateEffect } from "@/components/aceternity/text-generate";
import { Button } from "@/components/ui/button";
import { Hero1 } from "@/sanity.types";

export default function HeroAceternity({ heading, subheading, links }: Hero1) {
  return (
    <section className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <SparklesCore
        id="hero-sparkles"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="absolute inset-0"
        particleColor="#00d71c"
      />

      {/* Content */}
      <div className="relative z-10 container text-center">
        <TextGenerateEffect
          words={heading || ""}
          className="text-5xl md:text-7xl font-bold text-white"
        />

        <p className="mt-6 text-xl text-gray-300">
          {subheading}
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          {links?.map((link) => (
            <Button key={link._key} variant={link.buttonVariant}>
              {link.title}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## Dependency Management

### Already Installed (You Have These)
✅ `motion` (Motion v12 - successor to framer-motion)
✅ `clsx` / `tailwind-merge`
✅ `lucide-react`
✅ `@radix-ui/*` (various components)

### Common Aceternity Dependencies

**If component needs Framer Motion:**
```bash
# Aceternity uses framer-motion, but you have 'motion' (v12)
# Option 1: Install framer-motion (compatible)
npm install framer-motion

# Option 2: Update imports to use 'motion' instead
# Change: import { motion } from "framer-motion"
# To:     import { motion } from "motion/react"
```

**Other common dependencies:**
```bash
# Three.js (for 3D components)
npm install three @react-three/fiber @react-three/drei

# GSAP (for complex animations)
npm install gsap

# Lottie (for Lottie animations)
npm install lottie-react
```

---

## Tailwind CSS v4 Compatibility

You're using Tailwind v4 (CSS-based config). Most Aceternity components work out of the box, but some adjustments may be needed:

### Issue: Custom Plugin Imports

**Aceternity component might have:**
```typescript
// tailwind.config.js
plugins: [require("tailwindcss-animate")]
```

**Your setup (CSS-based):**
```css
/* app/globals.css */
@plugin "tailwindcss-animate";
```

✅ **Already configured** - no action needed!

### Issue: Custom Colors

**If Aceternity component uses custom colors:**
```typescript
// Old way
colors: {
  aceternity: "#ff0000"
}
```

**Add to your CSS:**
```css
/* app/globals.css */
@theme {
  --color-aceternity: #ff0000;
}
```

---

## Step-by-Step: Adding Your First Aceternity Component

### Example: Adding "Animated Beam" Component

**1. Visit Component Page**
```
https://ui.aceternity.com/components/animated-beam
```

**2. Copy Code**
- Click "Show Code"
- Copy the component code

**3. Create File**
```bash
mkdir -p components/aceternity
touch components/aceternity/animated-beam.tsx
```

**4. Paste and Fix Imports**
```tsx
// components/aceternity/animated-beam.tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";  // Changed from framer-motion
import { useEffect, useRef, useState } from "react";

// ... rest of component code
```

**5. Check Dependencies**
```bash
# All dependencies already installed for this component
npm list motion clsx tailwind-merge
```

**6. Create Demo Page**
```tsx
// app/demo-beam/page.tsx
import { AnimatedBeam } from "@/components/aceternity/animated-beam";

export default function DemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AnimatedBeam />
    </div>
  );
}
```

**7. Test**
```bash
npm run dev
# Visit http://localhost:3005/demo-beam
```

---

## Best Practices

### 1. Organize by Category
```
components/aceternity/
├── animations/
│   ├── animated-beam.tsx
│   ├── sparkles.tsx
│   └── text-generate.tsx
├── cards/
│   ├── card-3d.tsx
│   └── card-hover.tsx
└── backgrounds/
    ├── grid-pattern.tsx
    └── dot-pattern.tsx
```

### 2. Create Type Definitions
```typescript
// types/aceternity.ts
export interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  rotateAmount?: number;
}
```

### 3. Document Usage
```markdown
# components/aceternity/README.md

## Installed Components

### Animated Beam
- Source: https://ui.aceternity.com/components/animated-beam
- Dependencies: motion
- Usage: See app/demo-beam/page.tsx

### Sparkles
- Source: https://ui.aceternity.com/components/sparkles
- Dependencies: motion
- Usage: Used in hero sections
```

### 4. Version Control
```typescript
// components/aceternity/version.ts
export const ACETERNITY_VERSIONS = {
  "animated-beam": "1.2.0",
  "sparkles": "1.0.5",
  "card-3d": "2.1.0",
};
```

---

## Troubleshooting

### Issue: Component uses Framer Motion but you have Motion

**Error:**
```
Cannot find module 'framer-motion'
```

**Fix:**
```bash
# Option 1: Install framer-motion
npm install framer-motion

# Option 2: Update imports
# Find: import { motion } from "framer-motion"
# Replace: import { motion } from "motion/react"
```

### Issue: TypeScript Errors

**Error:**
```
Property 'particleDensity' does not exist on type 'IntrinsicAttributes'
```

**Fix:**
```typescript
// Add type definition
interface SparklesProps {
  particleDensity?: number;
  // ... other props
}

export function SparklesCore(props: SparklesProps) {
  // ...
}
```

### Issue: CSS Not Applied

**Error:**
Component looks unstyled

**Fix:**
```css
/* app/globals.css - Add any custom Aceternity utilities */
@layer utilities {
  .animate-shimmer {
    animation: shimmer 2s linear infinite;
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

---

## Pro Tips

### 1. Lazy Load Heavy Components
```tsx
// For 3D components or heavy animations
import dynamic from "next/dynamic";

const Globe3D = dynamic(
  () => import("@/components/aceternity/globe-3d"),
  { ssr: false, loading: () => <div>Loading...</div> }
);
```

### 2. Create Wrapper Components
```tsx
// components/ui/vconic-card.tsx
import { Card3D } from "@/components/aceternity/card-3d";

export function VconicCard({ children, ...props }) {
  return (
    <Card3D
      containerClassName="vconic-theme"
      rotateAmount={15}
      {...props}
    >
      {children}
    </Card3D>
  );
}
```

### 3. Combine with Existing Components
```tsx
// Aceternity effect + shadcn button
import { SparklesCore } from "@/components/aceternity/sparkles";
import { Button } from "@/components/ui/button";

export function SparkleButton() {
  return (
    <Button className="relative overflow-hidden">
      <SparklesCore className="absolute inset-0" />
      <span className="relative z-10">Click Me</span>
    </Button>
  );
}
```

---

## Quick Reference

### Installation Commands
```bash
# Via CLI (if available)
aceternity-ui add [component-name]

# Manual install dependencies
npm install framer-motion three @react-three/fiber gsap
```

### File Locations
```
components/aceternity/     # Aceternity components
components/blocks/         # Sanity CMS blocks
components/ui/             # shadcn/ui components
sanity/schemas/blocks/     # Sanity schemas
```

### Key URLs
- Free: https://ui.aceternity.com/components
- Pro: https://pro.aceternity.com/components
- Templates: https://pro.aceternity.com/templates
- Docs: https://docs.aceternity.com

---

## Next Steps

1. ✅ Pick a component from Aceternity
2. ✅ Follow Method 1 (Direct Copy) for your first component
3. ✅ Test in a demo page
4. ✅ Once comfortable, integrate with Sanity CMS
5. ✅ Document your additions in this file

Need help? Check the Aceternity Discord or docs!
