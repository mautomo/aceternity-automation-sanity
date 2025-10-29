# Aceternity Integration - Quick Start with Automation

## 🎯 Choose Your Method

| Method | Time | Automation Level | Best For |
|--------|------|------------------|----------|
| **AI-Assisted (Claude Code)** | ~2 min | 95% | **Recommended** - Fastest |
| **Semi-Automated** | ~5 min | 80% | When you want control |
| **API-Powered** | ~3 min | 90% | When API docs available |
| **Manual** | ~15 min | 30% | Learning/troubleshooting |

---

## Method 1: AI-Assisted (Fastest - 2 minutes)

**Use Claude Code to do everything automatically!**

### Step 1: Copy Component from Aceternity

1. Visit https://pro.aceternity.com/components
2. Find component (e.g., "Sparkles")
3. Copy code
4. Paste into: `components/aceternity/animations/sparkles.tsx`

### Step 2: Ask Claude Code

**Just say:**
```
Integrate the sparkles component I just added to components/aceternity/animations/.
Analyze its props, generate Sanity schema, create block wrapper, register everything,
and run typegen. Make it editable in Sanity Studio's visual editor.
```

**Claude Code will:**
- ✅ Analyze component props
- ✅ Generate optimal Sanity schema
- ✅ Create block wrapper
- ✅ Register in schemas and blocks
- ✅ Run typegen
- ✅ Test in demo page

**Done!** Test in Studio: http://localhost:3005/studio

---

## Method 2: Semi-Automated (5 minutes)

**Use automation scripts with manual copy-paste**

### Step 1: Copy Component
Same as Method 1 - copy from Aceternity to `components/aceternity/animations/[name].tsx`

### Step 2: Run Auto-Integration
```bash
npm run aceternity:integrate -- sparkles "Sparkles Effect" "Animated particles" Sparkles
```

**This automatically:**
- ✅ Analyzes component props
- ✅ Generates Sanity schema
- ✅ Creates block wrapper
- ✅ Shows registration steps

### Step 3: Register (Manual)

**Add to `sanity/schemas/index.ts`:**
```typescript
import aceternitySparkles from "./blocks/aceternity/sparkles";
const blockTypes = [aceternitySparkles, /* ... */];
```

**Add to `components/blocks/index.tsx`:**
```typescript
import SparklesBlock from "./aceternity/sparkles-block";
export const blockComponents = {
  "aceternity-sparkles": SparklesBlock,
  // ...
};
```

### Step 4: Generate Types
```bash
npm run typegen
```

**Done!** Open Studio and add the block.

---

## Method 3: API-Powered (3 minutes)

**If you have Aceternity Pro API access**

### Setup (One Time)

1. Get API key: https://pro.aceternity.com/settings/api
2. Add to `.env.local`:
```bash
ACETERNITY_API_KEY=act_your_key_here
```

### Usage

**Fetch & integrate in one command:**
```bash
npm run aceternity:fetch -- sparkles
npm run aceternity:integrate -- sparkles "Sparkles" "Particles" Sparkles
```

The fetch script:
- Downloads component from API
- Auto-fixes imports
- Checks dependencies
- Saves to correct location

Then follow Method 2 steps 3-4.

---

## Method 4: Manual (15 minutes)

**For learning or when automation isn't working**

Follow the complete guide in [ACETERNITY-SANITY-VISUAL-EDITOR.md](ACETERNITY-SANITY-VISUAL-EDITOR.md)

---

## 📋 Complete Examples

### Example 1: Sparkles Background

**Method 1 (AI - Fastest):**
```
1. Copy Sparkles code from Aceternity
2. Paste to components/aceternity/animations/sparkles.tsx
3. Say to Claude: "Integrate the sparkles component with Sanity"
4. Done!
```

**Method 2 (Semi-Auto):**
```bash
# After copying code
npm run aceternity:integrate -- sparkles "Sparkles Effect" "Animated particle background" Sparkles

# Then register manually (shown in output)
# Run typegen
npm run typegen
```

### Example 2: 3D Card

**Method 1 (AI):**
```
1. Copy 3D Card code from Aceternity
2. Paste to components/aceternity/cards/card-3d.tsx
3. Say: "Integrate card-3d component from components/aceternity/cards/ with Sanity.
   Add fields for rotation amount, tilt degree, and card content."
4. Done!
```

**Method 2 (Semi-Auto):**
```bash
npm run aceternity:integrate -- card-3d "3D Card" "Interactive hover card" Box cards
# Then manual registration
```

---

## 🔧 Automation Features

### Smart Prop Analysis

The integration script automatically:
- Detects component props from TypeScript interfaces
- Maps to appropriate Sanity field types
- Adds sensible defaults
- Organizes into content/settings/style groups

**Example mapping:**
```typescript
// Component prop → Sanity field
particleDensity: number → number field with default 100
color: string → string field with hex validation
enabled: boolean → boolean field with default true
```

### Auto-Registration Helper

When using `aceternity:integrate`, you get exact code snippets to copy:

```typescript
// Output shows exactly what to add where:
✅ Add to sanity/schemas/index.ts:
   import aceternitySparkles from "./blocks/aceternity/sparkles";

✅ Add to components/blocks/index.tsx:
   import SparklesBlock from "./aceternity/sparkles-block";
   "aceternity-sparkles": SparklesBlock,
```

---

## 💡 Pro Tips

### Tip 1: Use AI for Complex Components

For components with many props or complex configuration:
```
"Integrate [component] with these specific Sanity fields:
- Intensity slider (1-10)
- Color picker with Vconic green default
- Toggle for auto-play
- Duration in milliseconds (100-5000)
Make the preview show the intensity and color values."
```

### Tip 2: Batch Integration

Tell Claude Code:
```
"I've copied 5 components to components/aceternity/:
- sparkles
- animated-beam
- card-3d
- background-gradient
- text-generate

Integrate all of them with Sanity, generating optimal schemas for each."
```

### Tip 3: Custom Field Configuration

Be specific about fields you want:
```
"Integrate sparkles component but add these custom fields:
- Preset dropdown: subtle, normal, intense
- Animation speed: 0.5x, 1x, 2x, 4x
- Particle shape: circle, square, star
Map preset to automatically set good defaults for density and size."
```

---

## 🎨 Advanced AI Prompts

### Generate with Theme Integration

```
"Integrate [component] with Sanity and add a 'theme' field that maps to our
Vconic brand colors. When theme is 'brand', use #00d71c. When 'accent', use
our secondary color. Add preview that shows the selected theme."
```

### Responsive Configuration

```
"Integrate [component] with mobile/desktop variants. Add fields for:
- Mobile particle density (lower)
- Desktop particle density (higher)
- Breakpoint selection
Generate the block component with responsive props."
```

### Content-Driven Components

```
"Integrate [component] but make it content-driven. Add:
- Rich text field for overlay content
- Image upload option
- CTA button configuration
- Alignment options
The component should render the Aceternity effect as background with content on top."
```

---

## 📊 Time Comparison

**Traditional Manual Method:**
1. Copy component: 2 min
2. Understand props: 5 min
3. Write schema: 10 min
4. Create wrapper: 5 min
5. Register: 3 min
6. Test: 5 min
**Total: ~30 minutes**

**AI-Assisted Method:**
1. Copy component: 2 min
2. Ask Claude: 30 seconds
3. Test: 1 min
**Total: ~3.5 minutes**

**Time saved: 88%** 🚀

---

## 🐛 Troubleshooting

### "Component props not detected"

**Solution:** Make sure component has TypeScript interface or clear prop destructuring:
```typescript
// Good - will be detected
interface SparklesProps {
  particleDensity: number;
  color: string;
}

// Also good
function Sparkles({ particleDensity, color }: { particleDensity: number; color: string }) {
```

### "Schema generation failed"

**Fallback to manual:**
```bash
npm run scaffold:aceternity -- sparkles "Sparkles" "Description" Sparkles
# Then manually add fields based on component props
```

### "Import errors after integration"

Check that imports use Motion (not framer-motion):
```typescript
// Change this:
import { motion } from "framer-motion";

// To this:
import { motion } from "motion/react";
```

---

## 📚 Complete Workflow

### Daily Workflow (Adding New Components)

1. **Morning:** Browse Aceternity Pro for components you need
2. **Copy:** Save 3-5 components to local folder
3. **AI Integrate:** Ask Claude to integrate all at once
4. **Test:** Verify each in demo pages
5. **Studio:** Add to pages via visual editor
6. **Deploy:** Push to production

**Time for 5 components: ~15 minutes total**

### Weekly Workflow (Maintenance)

1. **Update:** Check for Aceternity component updates
2. **Refine:** Optimize schemas based on usage
3. **Document:** Update component README
4. **Review:** Check Studio editor experience

---

## 🎬 Quick Start Right Now

**Want to try it immediately? Here's the absolute fastest path:**

1. **Copy any Aceternity component** → Save to `components/aceternity/animations/[name].tsx`

2. **Tell me (Claude Code):**
   ```
   "Integrate the [name] component I just added"
   ```

3. **I'll handle everything and you can test in Studio in 2 minutes!**

---

## 📖 Documentation Reference

| Guide | When to Use |
|-------|-------------|
| [ACETERNITY-API-AUTOMATION.md](ACETERNITY-API-AUTOMATION.md) | API setup & advanced automation |
| [ACETERNITY-SANITY-VISUAL-EDITOR.md](ACETERNITY-SANITY-VISUAL-EDITOR.md) | Complete integration guide |
| [ACETERNITY-INTEGRATION-GUIDE.md](ACETERNITY-INTEGRATION-GUIDE.md) | General Aceternity usage |
| [ACETERNITY-QUICKSTART.md](ACETERNITY-QUICKSTART.md) | Basic quick start |

---

**Ready to integrate your first component?** Pick a method above and let's go! 🚀
