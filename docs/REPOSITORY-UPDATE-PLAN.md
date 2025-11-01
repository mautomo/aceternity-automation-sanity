# Repository Update Plan - aceternity-automation-sanity

**Target:** https://github.com/mautomo/aceternity-automation-sanity
**Purpose:** Push critical findings and corrections based on real-world implementation analysis
**Date:** 2025-01-29

---

## Updates to Push

### 1. Analysis Document ⭐ NEW

**File:** `IMPLEMENTATION-ANALYSIS.md`
**Source:** PACKAGE-VS-IMPLEMENTATION-ANALYSIS.md (this project)
**Priority:** CRITICAL
**Purpose:** Document discovered gaps between v2.0 docs and actual usage

**Key Sections:**
- Naming convention mismatches (`aceternity.` prefix)
- Schema/component field name conflicts
- Data structure documentation gaps
- Automation vs manual integration reality
- Missing documentation areas

### 2. Corrected Documentation

**Files to Update:**

**README.md**
```diff
- _type: "timeline"
+ _type: "aceternity.timeline"

- Fully automated integration
+ Semi-automated with manual steps required
```

**ACETERNITY-AUTOMATION-PACKAGE.md**
```diff
+ ## Critical Notes
+
+ **Naming Convention:** All Aceternity blocks use `aceternity.` prefix:
+ - `aceternity.timeline` not `timeline`
+ - `aceternity.bento-grid` not `bento-grid`
+
+ **Field Names:** Schema field names MUST match component props:
+ - Timeline schema: `data` field
+ - Timeline component: expects `items`
+ - ⚠️ This mismatch is being fixed in v2.0.1
```

**ACETERNITY-SETUP-GUIDE.md**
```diff
+ ## Data Structure Requirements
+
+ Aceternity components integrate with Sanity's native data structures:
+
+ \`\`\`typescript
+ {
+   _key: "unique-key",  // Required for array items
+   _type: "object",     // Sanity type marker
+   // Your data fields...
+ }
+ \`\`\`
```

### 3. New Documentation Files

**File:** `SANITY-DATA-STRUCTURES.md`
**Priority:** HIGH
**Content:** Complete guide to Sanity's data structure requirements
```markdown
# Sanity Data Structures - Essential Knowledge

## The _key Field
Every item in a Sanity array needs a unique `_key`:
```typescript
items: [
  { _key: "item-1", title: "First" },
  { _key: "item-2", title: "Second" },
]
```

## The _type Marker
Objects in Sanity schemas need `_type`:
```typescript
{
  name: "items",
  type: "array",
  of: [
    {
      type: "object",  // ← _type will be "object"
      fields: [...]
    }
  ]
}
```

## Block Content vs Strings
Sanity's rich text is NOT a simple string:
```typescript
// Simple string
description: "Text here"

// Block content
description: [
  {
    _type: "block",
    children: [
      { _type: "span", text: "Text here" }
    ]
  }
]
```

## Array Fields
Arrays require proper structure:
```typescript
// Schema
{
  name: "items",
  type: "array",
  of: [{ type: "object", fields: [...] }]
}

// Data
items: [
  {
    _key: "unique-1",
    _type: "object",
    ...fields
  }
]
```
```

**File:** `BLOCK-WRAPPER-PATTERN.md`
**Priority:** HIGH
**Content:** Complete pattern for creating block wrappers
```markdown
# Block Wrapper Pattern - Complete Template

## Required Structure

Every Aceternity block wrapper must follow this pattern:

\`\`\`typescript
"use client";  // ← REQUIRED for Aceternity components

import { ComponentName } from "@/components/ui/component-name";
import SectionContainer from "@/components/ui/section-container";

// Type definitions matching Sanity schema
type ComponentItem = {
  _key: string;  // ← Always include _key for array items
  // ... other fields
};

type ComponentBlockProps = {
  _type: "aceternity.component-name";  // ← Full namespace
  _key: string;  // ← Always required
  title?: string;
  items?: ComponentItem[];
  colorVariant?: string;  // ← Sanity color-variant type
  padding?: string;  // ← Sanity section-padding type
};

export default function ComponentBlock({
  title,
  items,
  colorVariant,
  padding,
}: ComponentBlockProps) {
  // 1. Null checks
  if (!items || items.length === 0) {
    return null;
  }

  // 2. SectionContainer wrapper
  return (
    <SectionContainer
      color={colorVariant as any}
      padding={padding as any}
    >
      <div className="container max-w-7xl">
        {title && <h2>{title}</h2>}

        {/* 3. Aceternity component */}
        <ComponentName items={items} />
      </div>
    </SectionContainer>
  );
}
\`\`\`

## Checklist

- [ ] `"use client"` directive at top
- [ ] Proper TypeScript types
- [ ] `_key` in array item types
- [ ] `aceternity.` namespace in _type
- [ ] SectionContainer wrapper
- [ ] Null/empty checks
- [ ] Proper prop spreading
```

**File:** `MULTI-VERSION-HOMEPAGE-STRATEGY.md`
**Priority:** MEDIUM
**Content:** Strategy for creating multiple homepage versions
```markdown
# Multi-Version Homepage Strategy

## Use Case: A/B Testing Homepages

The Vconic project demonstrated creating multiple homepage versions:
- Default version (standard blocks)
- Michael version (business-focused)
- Perry version (developer-focused)

## Implementation Pattern

### Step 1: Create Base Version
\`\`\`typescript
// scripts/create-michael-version.ts
const michaelContent = {
  _type: "page",
  _id: "michael-version-page",
  slug: { current: "michael-version" },
  blocks: [
    // Standard blocks
  ]
};
\`\`\`

### Step 2: Selective Enhancement
\`\`\`typescript
// scripts/integrate-aceternity-michael.ts
const updatedBlocks = blocks.map((block, index) => {
  // Replace specific blocks with Aceternity versions
  if (index === 6 && block._type === "timeline-row") {
    return {
      _type: "aceternity.timeline",
      // Transform data...
    };
  }
  return block;  // Keep others unchanged
});
\`\`\`

### Step 3: Data Transformation
Handle data structure changes:
\`\`\`typescript
// Before (standard block)
{
  _type: "timeline-row",
  timelines: [...]
}

// After (Aceternity block)
{
  _type: "aceternity.timeline",
  items: timelines.map(t => ({
    _key: t._key,
    year: t.year,
    title: t.title,
    // Transform structure...
  }))
}
\`\`\`

## Best Practices

1. **Version Naming:** Use descriptive slugs (`/michael-version`, `/perry-version`)
2. **Content Reuse:** Share common content, vary presentation
3. **Gradual Enhancement:** Start with standard blocks, enhance selectively
4. **Track Performance:** Use analytics to compare versions
5. **Document Changes:** Keep change log per version
```

### 4. Template Corrections

**File:** `templates/schema-template.ts`
```typescript
// CORRECTED: Field name matches component expectation
export default defineType({
  name: "aceternity.component-name",  // ← Full namespace
  title: "Component Name",
  type: "object",
  icon: IconName,
  fields: [
    defineField({
      name: "items",  // ← Match component prop name
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "_key", type: "string" },  // ← Document _key
            { name: "title", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "colorVariant",
      title: "Background Color",
      type: "color-variant",  // ← Shared type
    }),
    defineField({
      name: "padding",
      title: "Section Padding",
      type: "section-padding",  // ← Shared type
    }),
  ],
});
```

### 5. Issue Creation

**Create GitHub issues for critical fixes:**

**Issue #1: Fix naming convention throughout**
```
Title: [v2.0.1] Standardize aceternity.* namespace in all documentation

Description:
All Aceternity blocks use `aceternity.` prefix but documentation shows
inconsistent naming. This causes confusion and integration failures.

Tasks:
- [ ] Update README.md examples
- [ ] Fix ACETERNITY-AUTOMATION-PACKAGE.md
- [ ] Correct ACETERNITY-SETUP-GUIDE.md
- [ ] Update all code templates
- [ ] Add validation to catch mismatches

Priority: CRITICAL
Label: bug, documentation
Milestone: v2.0.1
```

**Issue #2: Schema/Component field name mismatch**
```
Title: [v2.0.1] Fix timeline schema/component field name conflict

Description:
Timeline schema defines `data` field but component expects `items`.
This breaks type safety and requires manual transformation.

Tasks:
- [ ] Decide on standard field name (recommend: `items`)
- [ ] Update schema template
- [ ] Update component template
- [ ] Regenerate types
- [ ] Update migration guide

Priority: CRITICAL
Label: bug, breaking-change
Milestone: v2.0.1
```

**Issue #3: Missing Sanity data structure documentation**
```
Title: [v2.1.0] Add comprehensive Sanity data structures guide

Description:
Package assumes knowledge of Sanity's native data structures (_key, _type,
block content). This is not documented, causing integration failures.

Tasks:
- [ ] Create SANITY-DATA-STRUCTURES.md
- [ ] Explain _key requirements
- [ ] Document _type markers
- [ ] Show block content vs strings
- [ ] Add array field examples
- [ ] Include in README

Priority: HIGH
Label: documentation, enhancement
Milestone: v2.1.0
```

---

## Commit Strategy

### Commit 1: Critical Documentation Fixes (v2.0.1)
```bash
git add IMPLEMENTATION-ANALYSIS.md
git add README.md
git add ACETERNITY-AUTOMATION-PACKAGE.md
git add ACETERNITY-SETUP-GUIDE.md

git commit -m "docs(v2.0.1): fix critical naming and documentation issues

BREAKING CHANGE: Clarified that all Aceternity blocks require aceternity.* namespace prefix

Fixed:
- Documented aceternity.* naming convention requirement
- Clarified schema/component field name expectations
- Added notes about Sanity data structure requirements
- Corrected automation claims (semi-automated, not fully automated)

Based on analysis of real-world Vconic implementation (Michael homepage version)
which revealed gaps between documented package and actual usage patterns.

See IMPLEMENTATION-ANALYSIS.md for complete findings.

Closes #1
Closes #2"
```

### Commit 2: New Documentation (v2.1.0)
```bash
git add SANITY-DATA-STRUCTURES.md
git add BLOCK-WRAPPER-PATTERN.md
git add MULTI-VERSION-HOMEPAGE-STRATEGY.md

git commit -m "docs(v2.1.0): add missing essential documentation

Added comprehensive guides for:
- Sanity data structures (_key, _type, block content)
- Complete block wrapper pattern with all requirements
- Multi-version homepage strategy (A/B testing)

These documents fill critical gaps identified in implementation analysis.

Closes #3"
```

### Commit 3: Template Corrections
```bash
git add templates/schema-template.ts
git add templates/block-wrapper-template.tsx

git commit -m "fix(v2.0.1): correct templates with real-world patterns

Updated templates to match actual working implementation:
- Added aceternity.* namespace
- Fixed field name consistency
- Included all required elements (\"use client\", SectionContainer)
- Added proper TypeScript types
- Included _key in array items

Templates now reflect proven patterns from Vconic project."
```

---

## Pre-Push Checklist

Before pushing to https://github.com/mautomo/aceternity-automation-sanity:

- [ ] All documentation uses `aceternity.*` naming
- [ ] Schema templates match component expectations
- [ ] Examples show real Sanity data structures
- [ ] "Automation" claims are accurate
- [ ] New guides are complete and clear
- [ ] Issues created for tracking
- [ ] Commit messages are descriptive
- [ ] CHANGELOG.md updated (if exists)
- [ ] Version number bumped (v2.0.1)

---

## Post-Push Actions

1. **Create v2.0.1 Release**
   ```
   Title: v2.0.1 - Critical Documentation Fixes
   Tag: v2.0.1
   Description: See commits for details
   ```

2. **Update README Badge**
   ```markdown
   ![Version](https://img.shields.io/badge/version-2.0.1-blue)
   ```

3. **Announce Changes**
   - GitHub Discussions post
   - Update any tutorials
   - Notify test project users

4. **Plan v2.1.0**
   - Address remaining issues
   - Build true automation OR
   - Rebrand as "Integration Framework"

---

## Repository Status After Updates

**Files Added:**
- IMPLEMENTATION-ANALYSIS.md
- SANITY-DATA-STRUCTURES.md
- BLOCK-WRAPPER-PATTERN.md
- MULTI-VERSION-HOMEPAGE-STRATEGY.md

**Files Updated:**
- README.md
- ACETERNITY-AUTOMATION-PACKAGE.md
- ACETERNITY-SETUP-GUIDE.md
- templates/schema-template.ts
- templates/block-wrapper-template.tsx

**Issues Created:**
- #1: Naming convention standardization
- #2: Field name mismatch fix
- #3: Data structure documentation

**Version:**
- Current: v2.0.0
- After updates: v2.0.1

---

**Next Step:** Execute this plan to update the repository
