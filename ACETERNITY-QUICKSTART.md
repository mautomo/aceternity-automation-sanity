# Aceternity + Sanity Visual Editor - Quick Start

## 🚀 One-Command Scaffold

```bash
npm run scaffold:aceternity -- sparkles "Sparkles Effect" "Animated particle background" Sparkles
```

This creates:
- ✅ Sanity schema
- ✅ Block component wrapper
- ✅ Placeholder for Aceternity core component
- ✅ All necessary files and directories

---

## 📋 Complete Workflow (5 Steps)

### Step 1: Scaffold Component
```bash
npm run scaffold:aceternity -- <component-name> "<Display Name>" "<Description>" <Icon>
```

**Examples:**
```bash
npm run scaffold:aceternity -- sparkles "Sparkles Effect" "Animated particles" Sparkles
npm run scaffold:aceternity -- animated-beam "Animated Beam" "Connection lines" Zap
npm run scaffold:aceternity -- card-3d "3D Card" "Interactive card" Box
```

### Step 2: Add Aceternity Code

Visit https://ui.aceternity.com or https://pro.aceternity.com

Copy component code to:
```
components/aceternity/animations/[component-name].tsx
```

**Update import:**
```tsx
// Change this:
import { motion } from "framer-motion";

// To this:
import { motion } from "motion/react";
```

### Step 3: Customize Schema (Optional)

Edit the generated schema to add component-specific props:
```typescript
// sanity/schemas/blocks/aceternity/[component-name].ts

defineField({
  name: "yourPropName",
  title: "Your Prop Display Name",
  type: "number",  // or string, boolean, etc.
  initialValue: 100,
  validation: (rule) => rule.min(0).max(200),
}),
```

### Step 4: Register & Generate Types

**Register Schema:**
```typescript
// sanity/schemas/index.ts
import aceternitySparkles from "./blocks/aceternity/sparkles";

// Add to blockTypes array
const blockTypes = [
  // ... existing
  aceternitySparkles,
];
```

**Register Component:**
```typescript
// components/blocks/index.tsx
import SparklesBlock from "./aceternity/sparkles-block";

export const blockComponents = {
  // ... existing
  "aceternity-sparkles": SparklesBlock,
};
```

**Generate Types:**
```bash
npm run typegen
```

### Step 5: Use in Visual Editor

1. Start dev server: `npm run dev`
2. Open Sanity Studio: http://localhost:3000/studio
3. Go to **Presentation** tab
4. Select a page
5. Click **"+ Add Block"**
6. Search for your component
7. Add and configure
8. Watch live preview update
9. Click **Publish**

---

## 📁 File Structure

After scaffolding, you'll have:

```
components/
├── aceternity/
│   └── animations/
│       └── sparkles.tsx          # ← Add Aceternity code here
├── blocks/
│   └── aceternity/
│       └── sparkles-block.tsx    # ← Auto-generated wrapper

sanity/
└── schemas/
    └── blocks/
        └── aceternity/
            └── sparkles.ts       # ← Auto-generated schema
```

---

## 🎯 Quick Examples

### Example 1: Sparkles Background

**Scaffold:**
```bash
npm run scaffold:aceternity -- sparkles "Sparkles Effect" "Animated particles" Sparkles
```

**Add to page, edit in Studio:**
- Particle Density: 150
- Color: #00d71c (Vconic green)
- Background: Black

### Example 2: 3D Card

**Scaffold:**
```bash
npm run scaffold:aceternity -- card-3d "3D Card" "Interactive hover card" Box
```

**Customize schema to add:**
```typescript
defineField({
  name: "rotateAmount",
  title: "Rotation Amount",
  type: "number",
  initialValue: 15,
}),
```

### Example 3: Animated Beam

**Scaffold:**
```bash
npm run scaffold:aceternity -- animated-beam "Animated Beam" "Connection visualization" Zap
```

**Add array of connections:**
```typescript
defineField({
  name: "connections",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        { name: "from", type: "string" },
        { name: "to", type: "string" },
      ],
    },
  ],
}),
```

---

## 🔧 Common Customizations

### Add Color Picker
```typescript
defineField({
  name: "primaryColor",
  title: "Primary Color",
  type: "string",
  initialValue: "#00d71c",
  validation: (rule) =>
    rule.regex(/^#[0-9A-Fa-f]{6}$/, "Must be hex color"),
}),
```

### Add Toggle Switch
```typescript
defineField({
  name: "enableAnimation",
  title: "Enable Animation",
  type: "boolean",
  initialValue: true,
}),
```

### Add Dropdown
```typescript
defineField({
  name: "style",
  title: "Style Variant",
  type: "string",
  options: {
    list: [
      { title: "Default", value: "default" },
      { title: "Intense", value: "intense" },
      { title: "Subtle", value: "subtle" },
    ],
  },
  initialValue: "default",
}),
```

### Add Range Slider
```typescript
defineField({
  name: "intensity",
  title: "Effect Intensity",
  type: "number",
  initialValue: 5,
  validation: (rule) => rule.min(1).max(10),
}),
```

---

## 🐛 Troubleshooting

### Component not showing in Studio
✅ Check registered in `sanity/schemas/index.ts`
✅ Run `npm run typegen`
✅ Restart dev server

### TypeScript errors
✅ Run `npm run typegen`
✅ Restart TS server in VSCode (Cmd+Shift+P → "Restart TS Server")

### Preview not updating
✅ Check using `stegaClean()` on all props
✅ Verify component is client-side (`"use client"`)

### Animation not working
✅ Install dependencies: `npm install motion`
✅ Check imports use `motion/react` not `framer-motion`

---

## 📚 Resources

**Documentation:**
- Full Guide: [ACETERNITY-SANITY-VISUAL-EDITOR.md](ACETERNITY-SANITY-VISUAL-EDITOR.md)
- Integration Guide: [ACETERNITY-INTEGRATION-GUIDE.md](ACETERNITY-INTEGRATION-GUIDE.md)

**Aceternity:**
- Free Components: https://ui.aceternity.com/components
- Pro Components: https://pro.aceternity.com/components
- Pro Templates: https://pro.aceternity.com/templates

**Components Directory:**
- Tracking: [components/aceternity/README.md](components/aceternity/README.md)
- Schemas: [sanity/schemas/blocks/aceternity/README.md](sanity/schemas/blocks/aceternity/README.md)

---

## ⚡ Pro Tips

1. **Start Simple** - Begin with a simple component like Sparkles
2. **Copy First** - Get Aceternity code working before adding to Sanity
3. **Test Locally** - Test component standalone before integrating
4. **Document** - Update README.md files as you add components
5. **Reuse** - Create component variants using schema options vs new components

---

## 🎬 Watch It Work

1. Scaffold: `npm run scaffold:aceternity -- sparkles "Sparkles" "Particles" Sparkles`
2. Add code: Copy from Aceternity to `components/aceternity/animations/sparkles.tsx`
3. Register: Add to schemas and blocks index files
4. Types: Run `npm run typegen`
5. Studio: Open Presentation → Add Block → "Sparkles Effect"
6. Configure: Adjust density, color in sidebar
7. Watch: See live preview update instantly
8. Publish: Deploy to production!

---

**Need help?** Check the full guides or ask for assistance!
