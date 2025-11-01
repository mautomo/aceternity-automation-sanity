# Aceternity Automation Package for Sanity CMS

**Version:** 2.0.1
**Components:** 26 production-tested
**Updated:** 2025-11-01

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![Sanity](https://img.shields.io/badge/Sanity-v4-red.svg)](https://www.sanity.io/)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black.svg)](https://nextjs.org/)

Complete integration package for [Aceternity UI](https://ui.aceternity.com) components with Sanity CMS. All **26 components** are production-tested with schemas, block wrappers, and TypeScript types.

⚠️ **Read [IMPLEMENTATION-ANALYSIS.md](./IMPLEMENTATION-ANALYSIS.md) first** for critical integration notes.

[Quick Start](#quick-start) • [Components](#components) • [Documentation](#documentation) • [Testing](#testing)

## Components

**26 Production-Tested Components** organized by category:

**Backgrounds (6)**
- Background Beams • Dotted Glow • Glowing Stars • Sparkles • Spotlight • Lamp

**Cards & Grids (7)**
- 3D Card • Bento Grid • Card Stack • Evervault Card • Hover Border Gradient • Infinite Moving Cards • Parallax Scroll

**Hero Sections (2)**
- Hero Parallax • Lamp

**Text Effects (4)**
- Cover • Flip Words • Text Generate Effect • Typewriter Effect

**Interactive (3)**
- Compare • Floating Dock • Moving Border

**Content (4)**
- Animated Testimonials • Code Block • Timeline • Tracing Beam

See [COMPONENTS-INVENTORY.md](./COMPONENTS-INVENTORY.md) for complete details.

---

## Quick Start

### Prerequisites

- Next.js 15+ with App Router
- Sanity v4 configured
- TypeScript 5.9+
- Aceternity UI license (components not included)

### Copy Components to Your Project

**Choose components you want** from [COMPONENTS-INVENTORY.md](./COMPONENTS-INVENTORY.md), then:

```bash
# Example: Copy Timeline component
cd your-project

# 1. Copy UI component
cp /path/to/aceternity-automation-sanity/components/ui/timeline.tsx components/ui/

# 2. Copy schema
cp /path/to/aceternity-automation-sanity/sanity/schemas/blocks/aceternity/timeline.ts sanity/schemas/blocks/aceternity/

# 3. Copy block wrapper
cp /path/to/aceternity-automation-sanity/components/blocks/aceternity/timeline-block.tsx components/blocks/aceternity/
```

### Register Component

**In `sanity/schema.ts`:**
```typescript
import timelineSchema from './schemas/blocks/aceternity/timeline';

export const schema: SchemaTypeDefinition[] = [
  // ... existing schemas
  timelineSchema,
];
```

**In `components/blocks/index.tsx`:**
```typescript
import TimelineBlock from './aceternity/timeline-block';

export const blockComponents = {
  // ... existing blocks
  'aceternity.timeline': TimelineBlock,
};
```

**Generate Types:**
```bash
npm run typegen
```

---

## What's Included

### Complete Component Files

**26 Aceternity Components** with all 3 required files:

1. **Schemas** (`sanity/schemas/blocks/aceternity/`)
   - Proper field types matching component props
   - `colorVariant` and `padding` fields
   - Preview configuration
   - TypeScript-safe

2. **Block Wrappers** (`components/blocks/aceternity/`)
   - `"use client"` directive
   - `SectionContainer` wrapper
   - Null checks
   - Proper type imports

3. **UI Components** (`components/ui/`)
   - Original Aceternity components
   - Motion/Framer Motion compatible
   - Production-tested

### Documentation

- [COMPONENTS-INVENTORY.md](./COMPONENTS-INVENTORY.md) - Complete component list
- [IMPLEMENTATION-ANALYSIS.md](./IMPLEMENTATION-ANALYSIS.md) - Critical findings & fixes
- [ACETERNITY-GUIDE.md](./ACETERNITY-GUIDE.md) - Integration guide
- [ROADMAP.md](./ROADMAP.md) - Feature roadmap
- [docs/WORKFLOW-QUICK-REFERENCE.md](./docs/WORKFLOW-QUICK-REFERENCE.md) - Best practices
- [docs/TEST-PROJECT-SETUP.md](./docs/TEST-PROJECT-SETUP.md) - Testing framework
- [DEVILS-LANDING-SETUP.md](./DEVILS-LANDING-SETUP.md) - Example test project setup

### Workflow Automation

- `.claude/agents/github-workflow-agent.md` - Planning enforcement
- `.claude/agents/in-sanity.md` - Component integration
- `.github/` - PR and issue templates

### Repository Configuration

- LICENSE (MIT with third-party notices)
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- .env.example
- .gitignore

---

## Critical Notes

⚠️ **Read [IMPLEMENTATION-ANALYSIS.md](./IMPLEMENTATION-ANALYSIS.md) for:**

1. **Namespace Requirement**: All components use `aceternity.*` prefix
2. **Field Name Alignment**: Schema must match component props exactly
3. **Sanity Data Structures**: Understanding `_key`, `_type`, block content
4. **SectionContainer Pattern**: Required wrapper for all blocks

---

## Testing

**Test this package** in a new project:

1. See [DEVILS-LANDING-SETUP.md](./DEVILS-LANDING-SETUP.md) for complete setup
2. Choose Schema UI template (recommended)
3. Follow planning-first workflow with GitHub Workflow Agent
4. Report issues on GitHub

**Time Estimates:**
- First component: ~40 minutes (with planning)
- Subsequent components: ~20 minutes

---

## License

**This automation package**: MIT License

**Important**: Aceternity UI components require separate license from https://ui.aceternity.com

See [LICENSE](./LICENSE) for complete details.

---

## Credits

- **Source**: Extracted from Vconic production project
- **Components**: All 26 tested in real-world use
- **Analysis**: Based on actual implementation patterns
- **Date**: 2025-11-01

---

**Repository**: https://github.com/mautomo/aceternity-automation-sanity
**Issues**: Report problems on GitHub
**Status**: Production-tested, ready for community use
