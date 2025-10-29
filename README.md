# Aceternity + Sanity CMS Automation

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Sanity](https://img.shields.io/badge/Sanity-v3-red.svg)](https://www.sanity.io/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org/)

Auto-integrate [Aceternity UI Pro](https://pro.aceternity.com) components with Sanity CMS in **2-5 minutes** instead of 30+ minutes manually.

**Time Savings**: 86% reduction in integration time ⚡

[Quick Start](#quick-install) • [Documentation](#documentation) • [Examples](#examples) • [Contributing](#support)

## Quick Install

### 1. Copy Files
```bash
# Copy all files from this package to your project root
cp -r * /path/to/your-project/
```

### 2. Add to package.json
```json
{
  "scripts": {
    "aceternity:fetch": "tsx scripts/aceternity-fetch.ts",
    "aceternity:integrate": "tsx scripts/aceternity-auto-integrate.ts",
    "scaffold:aceternity": "tsx scripts/scaffold-aceternity-component.ts"
  },
  "devDependencies": {
    "tsx": "^4.7.0"
  },
  "dependencies": {
    "motion": "^10.18.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  }
}
```

### 3. Add Environment Variables
Create/update `.env.local`:
```bash
ACETERNITY_API_KEY=your_api_key_from_aceternity_pro
ANTHROPIC_API_KEY=your_claude_api_key_optional
```

### 4. Create Directories
```bash
mkdir -p components/aceternity/{animations,cards,backgrounds}
mkdir -p components/blocks/aceternity
mkdir -p sanity/schemas/blocks/aceternity
```

### 5. Install Dependencies
```bash
npm install
```

## Usage

### Quick Integration (2 min)
```bash
# Fetch + auto-integrate in one step
npm run aceternity:integrate -- evervault-card "Evervault Card" "Hover card effect" CreditCard cards
```

### Step by Step
```bash
# 1. Fetch component from Aceternity Pro API
npm run aceternity:fetch -- sparkles

# 2. Auto-generate Sanity integration
npm run aceternity:integrate -- sparkles "Sparkles Effect" "Particle animation" Sparkles animations

# 3. Register in your project (manual steps provided by script)
```

### Scaffold Only
```bash
# Create boilerplate without fetching
npm run scaffold:aceternity -- button-3d "3D Button" "Interactive button" Cube animations
```

## What Each Script Does

### `aceternity-fetch.ts`
- Fetches components from Aceternity Pro API
- Auto-fixes imports (framer-motion → motion)
- Checks dependencies
- Saves to `components/aceternity/`

### `aceternity-auto-integrate.ts` ⭐ Most Powerful
- Analyzes component TypeScript interfaces
- Detects props automatically
- Generates Sanity schema with proper field types
- Creates block wrapper component
- Provides registration instructions

### `scaffold-aceternity-component.ts`
- Quick boilerplate generator
- Creates schema template
- Creates block wrapper template
- Useful when copying component manually

## Integration Pattern

Every Aceternity component needs 3 files:

```
1. Core Component (Aceternity UI)
   components/aceternity/{category}/{component}.tsx

2. Sanity Schema (CMS fields definition)
   sanity/schemas/blocks/aceternity/{component}.ts

3. Block Wrapper (connects Aceternity + Sanity)
   components/blocks/aceternity/{component}-block.tsx
```

Plus registration in 3 places:
- `sanity/schema.ts`
- `components/blocks/index.tsx`
- `sanity/schemas/documents/page.ts`

## Examples

### Example 1: Evervault Card
```bash
npm run aceternity:integrate -- evervault-card "Evervault Card" "Encrypted hover card" CreditCard cards
```

Creates:
- ✅ `components/aceternity/cards/evervault-card.tsx`
- ✅ `sanity/schemas/blocks/aceternity/evervault-card.ts`
- ✅ `components/blocks/aceternity/evervault-card-block.tsx`

### Example 2: Sparkles Effect
```bash
npm run aceternity:integrate -- sparkles "Sparkles" "Particle effect background" Sparkles animations
```

Creates:
- ✅ `components/aceternity/animations/sparkles.tsx`
- ✅ `sanity/schemas/blocks/aceternity/sparkles.ts`
- ✅ `components/blocks/aceternity/sparkles-block.tsx`

### Example 3: Hero Parallax
```bash
npm run aceternity:integrate -- hero-parallax "Hero Parallax" "3D scrolling hero" Layers backgrounds
```

Creates:
- ✅ `components/aceternity/backgrounds/hero-parallax.tsx`
- ✅ `sanity/schemas/blocks/aceternity/hero-parallax.ts`
- ✅ `components/blocks/aceternity/hero-parallax-block.tsx`

## Time Savings

| Task | Manual | Automated | Savings |
|------|--------|-----------|---------|
| Fetch component | 2 min | 30 sec | 75% |
| Create schema | 15 min | 1 min | 93% |
| Create wrapper | 10 min | 1 min | 90% |
| Registration | 5 min | 2 min | 60% |
| **Total** | **32 min** | **4.5 min** | **86%** |

## Requirements

- Next.js 14+ with App Router
- Sanity v3+
- TypeScript
- Tailwind CSS
- Aceternity UI Pro subscription (for API access)

## Troubleshooting

**"tsx not found"**
```bash
npm install -D tsx
```

**"API authentication failed"**
- Check `.env.local` has correct `ACETERNITY_API_KEY`
- Get key from https://pro.aceternity.com/settings/api

**"Component not found"**
- Verify component exists at https://pro.aceternity.com/components
- Check spelling matches exactly (kebab-case)

**TypeScript errors after registration**
```bash
npm run typegen
```

## For Claude Code Users

Add this to your project's `CLAUDE.md`:

```markdown
## Aceternity Automation

We have automation scripts for Aceternity UI Pro integration.

When asked to add Aceternity components:
1. Use: npm run aceternity:integrate -- [component-name] "Title" "Description" Icon category
2. Register the generated files as instructed
3. Run npm run typegen
4. Test in Sanity Studio

Time: 2-5 minutes per component instead of 30+ minutes manual.
```

## Documentation

- `ACETERNITY-INTEGRATION-GUIDE.md` - Complete integration guide
- `ACETERNITY-SANITY-VISUAL-EDITOR.md` - Visual editor patterns
- `ACETERNITY-API-AUTOMATION.md` - API setup details
- `ACETERNITY-QUICKSTART-AUTOMATION.md` - Quick reference

## Support

- Aceternity UI: https://pro.aceternity.com/docs
- Issues with scripts: Check script output messages
- Sanity integration: See documentation files

## License

MIT - Feel free to use in any project

## Credits

- Aceternity UI Pro: https://pro.aceternity.com
- Created for rapid Sanity CMS integration
- Saves ~25 minutes per component

---

**Setup time**: 5 minutes
**Time saved per component**: 25+ minutes
**ROI**: Positive after 1st component
