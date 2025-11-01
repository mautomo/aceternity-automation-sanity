# Vconic Rapid Deploy - Aceternity Integration Guide

**Last Updated:** 2025-10-29
**Feature Status:** Optional Enhancement
**Audience:** Developers

---

## Overview

Aceternity Pro provides premium UI components with advanced animations. This project includes **automation scripts** to integrate Aceternity components with Sanity Studio, making them editable through the visual editor.

**Important:** Aceternity integration is **OPTIONAL**. The site works fully without it. Use Aceternity components when you want advanced animations and effects.

---

## What is Aceternity?

**Aceternity Pro** is a premium component library featuring:
- Advanced animations (particles, 3D effects, morphing)
- Built on Framer Motion (we use Motion library)
- Ready-to-use React components
- Tailwind CSS styling

**Website:** https://pro.aceternity.com

**Cost:** Subscription required for access to components

---

## Current Integration

### Integrated Components

Currently integrated with Sanity:
- **Evervault Card** - Interactive hover card with encryption effect

**Location:**
- Component: `components/aceternity/cards/evervault-card.tsx`
- Block Wrapper: `components/blocks/aceternity/evervault-card-block.tsx`
- Schema: `sanity/schemas/blocks/aceternity/evervault-card.ts`
- Registered in Studio ✅

### Example Usage

```typescript
// In Sanity Studio, add "Aceternity Evervault Card" block
// Configure:
{
  title: "Secure Data",
  description: "Bank-level encryption for your conversations",
  lineColor: "rgb(0, 215, 28)", // Vconic green
  gradientToColor: "#00d71c",
}

// Component renders automatically
```

---

## Integration Methods

### Method 1: AI-Assisted (Fastest - 2 minutes) ⭐

**Best for:** Most use cases, saves time

```bash
# 1. Copy component from Aceternity Pro
# Save to: components/aceternity/[category]/[component-name].tsx

# 2. Tell Claude Code:
"Integrate the [component-name] component I just added to
components/aceternity/. Analyze its props, generate Sanity schema,
create block wrapper, register everything, and run typegen."

# 3. Claude Code handles:
✅ Prop analysis
✅ Schema generation
✅ Block wrapper creation
✅ Registration in all files
✅ Type generation
✅ Testing guidance

# 4. Done! Test in Studio
```

### Method 2: Semi-Automated (5 minutes)

**Best for:** When you want more control

```bash
# 1. Copy component from Aceternity Pro
# Save to: components/aceternity/[category]/[component-name].tsx

# 2. Run auto-integration script
npm run aceternity:integrate -- component-name "Display Name" "Description" Icon

# Example:
npm run aceternity:integrate -- sparkles "Sparkles Effect" "Animated particles" Sparkles

# 3. Script outputs:
- Generated schema file
- Generated block wrapper
- Registration code to copy
- Next steps

# 4. Manually register (copy/paste from output):
# - Add to sanity/schema.ts
# - Add to components/blocks/index.tsx

# 5. Generate types
npm run typegen
```

### Method 3: API-Powered (3 minutes)

**Best for:** When you have API access (faster download)

```bash
# 1. Setup (one-time)
# Add to .env.local:
ACETERNITY_API_KEY=act_your_key_here

# 2. Fetch component
npm run aceternity:fetch -- component-name

# This downloads component automatically

# 3. Integrate with Method 1 or 2
npm run aceternity:integrate -- component-name "Name" "Desc" Icon

# 4. Register and typegen
```

### Method 4: Manual (15-30 minutes)

**Best for:** Learning, troubleshooting, custom needs

See [Manual Integration Steps](#manual-integration-steps) below.

---

## Quick Start

### Prerequisites

```bash
# 1. Aceternity Pro subscription (for component access)
# 2. Claude AI API key (for AI-assisted integration) - optional
# 3. Motion library (already installed)
npm install motion
```

### Integration in 3 Minutes

```bash
# Step 1: Get component
# Go to https://pro.aceternity.com/components
# Find component (e.g., "Background Beams")
# Copy code
# Paste to: components/aceternity/animations/background-beams.tsx

# Step 2: Integrate (AI method)
# Tell Claude Code:
"Integrate background-beams component from components/aceternity/animations/
with Sanity. Add fields for beam color (default Vconic green #00d71c),
animation speed, and enable/disable toggle."

# Step 3: Test
npm run dev
# Open http://localhost:3000/studio
# Create page → Add Block → Find "Background Beams"
# Configure and preview
```

---

## Automation Scripts

### aceternity:integrate

**Generates Sanity integration for Aceternity component**

```bash
npm run aceternity:integrate -- <component-name> <display-name> <description> <icon>

# Arguments:
# - component-name: kebab-case file name (without .tsx)
# - display-name: Human-readable name
# - description: Short description for Studio
# - icon: Lucide icon name (PascalCase)

# Example:
npm run aceternity:integrate -- card-3d "3D Card" "Interactive hover card" Box

# Output:
# ✅ Creates sanity/schemas/blocks/aceternity/card-3d.ts
# ✅ Creates components/blocks/aceternity/card-3d-block.tsx
# ✅ Outputs registration code to copy
# ✅ Shows next steps
```

### aceternity:fetch

**Downloads component from Aceternity API**

```bash
npm run aceternity:fetch -- <component-name>

# Requires: ACETERNITY_API_KEY in .env.local

# Example:
npm run aceternity:fetch -- sparkles

# Output:
# ✅ Downloads component code
# ✅ Auto-fixes imports (framer-motion → motion/react)
# ✅ Checks dependencies
# ✅ Saves to components/aceternity/
```

### scaffold:aceternity

**Creates basic structure without AI**

```bash
npm run scaffold:aceternity -- <component-name> <display-name> <description> <icon>

# Creates:
# - Empty schema file
# - Basic block wrapper
# - Registration template

# Then manually add fields to schema
```

---

## Manual Integration Steps

For when automation doesn't work or you want full control:

### Step 1: Add Component

```typescript
// 1. Copy from Aceternity Pro
// 2. Save to: components/aceternity/[category]/component-name.tsx
// 3. Fix imports:

// Change this:
import { motion } from "framer-motion";

// To this:
import { motion } from "motion/react";

// 4. Test component renders:
// Create test page and import component
```

### Step 2: Create Schema

```typescript
// sanity/schemas/blocks/aceternity/component-name.ts
import { defineType } from 'sanity';
import { Icon } from 'lucide-react'; // Choose appropriate icon

export default defineType({
  name: 'aceternity-component-name',
  title: 'Component Display Name',
  type: 'object',
  icon: Icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    // Add fields based on component props
    {
      name: 'colorPrimary',
      title: 'Primary Color',
      type: 'string',
      initialValue: '#00d71c', // Vconic green
    },
    {
      name: 'animationSpeed',
      title: 'Animation Speed',
      type: 'number',
      validation: (Rule) => Rule.min(0.5).max(2),
      initialValue: 1,
    },
    // Shared fields
    {
      name: 'padding',
      title: 'Section Padding',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'py-8' },
          { title: 'Medium', value: 'py-16' },
          { title: 'Large', value: 'py-24' },
        ],
      },
      initialValue: 'py-16',
    },
    {
      name: 'colorVariant',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Muted', value: 'muted' },
          { title: 'Primary', value: 'primary' },
        ],
      },
      initialValue: 'default',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Aceternity Component Name',
      };
    },
  },
});
```

### Step 3: Create GROQ Query

```typescript
// sanity/queries/aceternity/component-name.ts
import { defineQuery } from 'next-sanity';

export const ACETERNITY_COMPONENT_NAME_QUERY = defineQuery(`
  _type == "aceternity-component-name" => {
    _type,
    _key,
    title,
    colorPrimary,
    animationSpeed,
    padding,
    colorVariant,
  }
`);
```

### Step 4: Create Block Wrapper

```typescript
// components/blocks/aceternity/component-name-block.tsx
import { PAGE_QUERYResult } from "@/sanity.types";
import SectionContainer from "@/components/ui/section-container";
import ComponentName from "@/components/aceternity/category/component-name";

type AceternityComponentNameProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "aceternity-component-name" }
>;

export default function AceternityComponentNameBlock({
  title,
  colorPrimary,
  animationSpeed,
  padding,
  colorVariant,
}: AceternityComponentNameProps) {
  return (
    <SectionContainer padding={padding} color={colorVariant}>
      <div className="relative">
        {title && <h2 className="text-3xl font-bold mb-8">{title}</h2>}

        <ComponentName
          colorPrimary={colorPrimary || "#00d71c"}
          animationSpeed={animationSpeed || 1}
        />
      </div>
    </SectionContainer>
  );
}
```

### Step 5: Register Schema

```typescript
// sanity/schema.ts
import aceternityComponentName from './schemas/blocks/aceternity/component-name';

const schema = defineSchema({
  types: [
    // ... other types
    aceternityComponentName,
  ],
});
```

### Step 6: Register Block Component

```typescript
// components/blocks/index.tsx
import AceternityComponentNameBlock from './aceternity/component-name-block';

export const blockComponents: Record<string, React.ComponentType<any>> = {
  // ... other blocks
  'aceternity-component-name': AceternityComponentNameBlock,
};
```

### Step 7: Add Query to Page Query

```typescript
// sanity/queries/page.ts
import { ACETERNITY_COMPONENT_NAME_QUERY } from './aceternity/component-name';

const BLOCKS_QUERY = `
  blocks[] {
    ${ACETERNITY_COMPONENT_NAME_QUERY},
    // ... other queries
  }
`;
```

### Step 8: Generate Types

```bash
npm run typegen
```

### Step 9: Test

```bash
# Start dev server
npm run dev

# Open Studio
# http://localhost:3000/studio

# Create test page
# Add your new block
# Configure and preview
```

---

## Best Practices

### Component Organization

```
components/aceternity/
├── animations/      # Background effects, particles
├── cards/           # Card components
├── buttons/         # Interactive buttons
├── backgrounds/     # Full-page backgrounds
└── effects/         # Special effects
```

### Schema Field Types

**Common Aceternity props → Sanity fields:**

```typescript
// Colors
color: string → { type: 'string', initialValue: '#00d71c' }

// Numbers (intensity, speed, etc.)
intensity: number → { type: 'number', validation: Rule.min(0).max(100) }

// Booleans (enable/disable)
enabled: boolean → { type: 'boolean', initialValue: true }

// Enums
size: 'sm' | 'md' | 'lg' → {
  type: 'string',
  options: { list: ['sm', 'md', 'lg'] }
}

// Arrays
items: Array<T> → { type: 'array', of: [{ type: 'object', fields: [...] }] }
```

### Performance Considerations

**Aceternity components can be heavy. Optimize:**

```typescript
// 1. Dynamic imports for heavy components
const HeavyAceternity = dynamic(
  () => import('@/components/aceternity/heavy-component'),
  { ssr: false } // Client-side only
);

// 2. Conditional loading
{isVisible && <AceternityComponent />}

// 3. Reduce particle counts on mobile
const particleCount = isMobile ? 50 : 200;

// 4. Disable on low-performance devices
{!reducedMotion && <AnimatedComponent />}
```

### Brand Integration

**Always use Vconic green as default:**

```typescript
// In schema
{
  name: 'color',
  type: 'string',
  initialValue: '#00d71c', // Vconic green
}

// In component
<AceternityComponent
  color={color || '#00d71c'}
  gradientTo="#00a81c" // Vconic dark green
/>
```

---

## Troubleshooting

### "Component not rendering"

**Check:**
1. Import path correct
2. Motion library installed: `npm list motion`
3. Component exported as default
4. No console errors

**Fix:**
```typescript
// Verify export
export default function Component() { ... }

// Not:
export function Component() { ... }
```

### "Props not detected by script"

**Ensure clear prop types:**

```typescript
// Good - script can detect
interface Props {
  color: string;
  intensity: number;
}

export default function Component({ color, intensity }: Props) { ... }

// Bad - script can't detect
export default function Component(props: any) { ... }
```

### "Animation not smooth"

**Optimize:**
```typescript
// 1. Use transform (GPU-accelerated)
<motion.div
  style={{ transform: `translateX(${x}px)` }} // Good
  style={{ left: `${x}px` }}                   // Bad (CPU)
/>

// 2. Reduce particle count
const particles = isMobile ? 50 : 200;

// 3. Use will-change sparingly
<div className="will-change-transform">
```

### "Build fails with Aceternity component"

**Common issues:**

```typescript
// 1. Fix framer-motion imports
import { motion } from "motion/react"; // Correct
import { motion } from "framer-motion"; // Wrong

// 2. Use dynamic imports for client-only components
const Component = dynamic(() => import('./component'), { ssr: false });

// 3. Check all dependencies installed
npm install motion clsx tailwind-merge
```

---

## Example: Full Integration

### Complete example of integrating "Sparkles" component:

```bash
# 1. Copy component from Aceternity
# components/aceternity/animations/sparkles.tsx

# 2. Run integration (AI method)
# Tell Claude: "Integrate sparkles component with these fields:
# - Particle density (50-200, default 100)
# - Color (hex, default Vconic green)
# - Animation speed (0.5-2.0, default 1.0)
# - Enable toggle"

# 3. Claude generates:
```

```typescript
// sanity/schemas/blocks/aceternity/sparkles.ts
export default defineType({
  name: 'aceternity-sparkles',
  title: 'Sparkles Effect',
  type: 'object',
  icon: Sparkles,
  fields: [
    {
      name: 'particleDensity',
      title: 'Particle Density',
      type: 'number',
      validation: (Rule) => Rule.min(50).max(200),
      initialValue: 100,
    },
    {
      name: 'color',
      title: 'Sparkle Color',
      type: 'string',
      initialValue: '#00d71c',
    },
    {
      name: 'speed',
      title: 'Animation Speed',
      type: 'number',
      validation: (Rule) => Rule.min(0.5).max(2),
      initialValue: 1.0,
    },
    {
      name: 'enabled',
      title: 'Enable Effect',
      type: 'boolean',
      initialValue: true,
    },
  ],
});
```

```typescript
// components/blocks/aceternity/sparkles-block.tsx
export default function SparklesBlock({
  particleDensity,
  color,
  speed,
  enabled,
}: Props) {
  if (!enabled) return null;

  return (
    <div className="relative min-h-[400px]">
      <Sparkles
        density={particleDensity || 100}
        color={color || '#00d71c'}
        speed={speed || 1.0}
      />
    </div>
  );
}
```

```bash
# 4. Test in Studio
npm run dev
# Open /studio → Add Sparkles block → Configure → Preview
```

---

## Advanced Features

### Preset Configurations

**Allow users to choose presets:**

```typescript
// In schema
{
  name: 'preset',
  title: 'Effect Preset',
  type: 'string',
  options: {
    list: [
      { title: 'Subtle', value: 'subtle' },
      { title: 'Normal', value: 'normal' },
      { title: 'Intense', value: 'intense' },
    ],
  },
  initialValue: 'normal',
}

// In component
const presets = {
  subtle: { density: 50, speed: 0.5 },
  normal: { density: 100, speed: 1.0 },
  intense: { density: 200, speed: 2.0 },
};

const config = presets[preset] || presets.normal;
```

### Responsive Configuration

**Different settings for mobile/desktop:**

```typescript
{
  name: 'mobileDensity',
  title: 'Particle Density (Mobile)',
  type: 'number',
  initialValue: 50,
},
{
  name: 'desktopDensity',
  title: 'Particle Density (Desktop)',
  type: 'number',
  initialValue: 150,
}

// In component
const density = isMobile ? mobileDensity : desktopDensity;
```

---

## When to Use Aceternity

### Good Use Cases ✅

- **Hero sections:** Impressive entry point
- **Feature highlights:** Draw attention
- **Testimonials:** Engaging backgrounds
- **About page:** Company story enhancement
- **Landing pages:** High-impact conversions

### Avoid ❌

- **Every page:** Too much can hurt performance
- **Mobile-heavy traffic:** Heavy on mobile devices
- **Accessibility-critical:** Can distract screen readers
- **Fast-loading priority:** Adds bundle size

---

## Cost Consideration

**Aceternity Pro:** Subscription required
- Check current pricing at https://pro.aceternity.com/pricing
- One-time payment or subscription
- Access to all components

**ROI Assessment:**
- Use for high-value pages (homepage, landing pages)
- Balance cost vs. development time saved
- Consider building custom animations for simple effects

---

## Alternatives

If Aceternity is too expensive or heavy:

1. **Custom CSS animations** - For simple effects
2. **Motion library alone** - Use motion/react directly
3. **Tailwind animate** - Built-in simple animations
4. **GSAP** - More control, steeper learning curve
5. **Lottie** - For complex but lighter animations

---

## Quick Reference

### Commands

```bash
# AI integration (recommended)
# Just tell Claude Code to integrate component

# Semi-automated
npm run aceternity:integrate -- <name> "<title>" "<desc>" <icon>

# API fetch
npm run aceternity:fetch -- <component-name>

# Scaffold
npm run scaffold:aceternity -- <name> "<title>" "<desc>" <icon>

# Regenerate types (after any schema change)
npm run typegen
```

### File Locations

```
Component:    components/aceternity/[category]/[name].tsx
Schema:       sanity/schemas/blocks/aceternity/[name].ts
Block:        components/blocks/aceternity/[name]-block.tsx
Query:        sanity/queries/aceternity/[name].ts
```

### Integration Checklist

- [ ] Component copied and imports fixed
- [ ] Schema created with proper fields
- [ ] GROQ query created
- [ ] Block wrapper created
- [ ] Schema registered in sanity/schema.ts
- [ ] Block registered in components/blocks/index.tsx
- [ ] Query added to page query
- [ ] Types generated (`npm run typegen`)
- [ ] Tested in Studio
- [ ] Tested on frontend
- [ ] Performance checked
- [ ] Mobile tested

---

## Support

**Aceternity:** https://aceternity.com/support
**Motion Library:** https://motion.dev/docs
**Project Issues:** Check project GitHub issues

---

**Remember:** Aceternity is optional. Use it strategically for maximum impact with minimal performance cost.
