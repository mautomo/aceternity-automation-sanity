# Devils Landing Test Project Setup

**Date:** 2025-11-01
**Project Location:** `W:\Dev\projects\NextJS\devils-landing`
**Editor:** Cursor
**Template:** Schema UI
**Purpose:** Test Aceternity Automation Package workflow

---

## Shell Choice

This guide provides commands for both **Bash** and **PowerShell**:

- **Bash / Git Bash / WSL**: Use if you have Git Bash, WSL, or Linux/macOS
- **PowerShell**: Use if you prefer native Windows PowerShell

**In Cursor**: Open terminal with **Ctrl+`** (backtick) and select your preferred shell.

---

## Quick Start

### 1. Verify Project Setup

**Bash / Git Bash / WSL:**
```bash
cd /w/Dev/projects/NextJS/devils-landing

# Check if it's a Next.js + Sanity project
ls -la package.json sanity.config.ts
```

**PowerShell:**
```powershell
cd W:\Dev\projects\NextJS\devils-landing

# Check if it's a Next.js + Sanity project
dir package.json, sanity.config.ts
```

### 2. Copy Automation Package Files

**Bash / Git Bash / WSL:**
```bash
# From automation package to devils-landing
cd /w/Dev/Templates/Aceternity/aceternity-automation-sanity

# Copy example components (reference)
cp -r components/blocks/aceternity /w/Dev/projects/NextJS/devils-landing/components/blocks/
cp -r sanity/schemas/blocks/aceternity /w/Dev/projects/NextJS/devils-landing/sanity/schemas/blocks/

# Copy workflow automation
cp -r .claude /w/Dev/projects/NextJS/devils-landing/

# Copy example scripts
mkdir -p /w/Dev/projects/NextJS/devils-landing/scripts
cp scripts/aceternity-fetch.ts /w/Dev/projects/NextJS/devils-landing/scripts/
```

**PowerShell:**
```powershell
# From automation package to devils-landing
cd W:\Dev\Templates\Aceternity\aceternity-automation-sanity

# Copy example components (reference)
Copy-Item -Path "components\blocks\aceternity" -Destination "W:\Dev\projects\NextJS\devils-landing\components\blocks\" -Recurse
Copy-Item -Path "sanity\schemas\blocks\aceternity" -Destination "W:\Dev\projects\NextJS\devils-landing\sanity\schemas\blocks\" -Recurse

# Copy workflow automation
Copy-Item -Path ".claude" -Destination "W:\Dev\projects\NextJS\devils-landing\" -Recurse

# Copy example scripts
New-Item -ItemType Directory -Path "W:\Dev\projects\NextJS\devils-landing\scripts" -Force
Copy-Item -Path "scripts\aceternity-fetch.ts" -Destination "W:\Dev\projects\NextJS\devils-landing\scripts\"
```

### 3. Schema UI Integration Pattern

Since devils-landing uses Schema UI template, follow this pattern:

**Schema UI Structure:**
```
devils-landing/
├── app/
├── components/
│   ├── blocks/          # ← Add Aceternity blocks here
│   └── ui/              # ← Add Aceternity UI components here
├── sanity/
│   ├── schemas/
│   │   ├── blocks/      # ← Add Aceternity schemas here
│   │   └── documents/
│   └── lib/
└── sanity.config.ts
```

### 4. Test First Component (Timeline)

**Step 1: Copy UI Component**

*Bash / Git Bash / WSL:*
```bash
cd /w/Dev/projects/NextJS/devils-landing
cp /w/Dev/Templates/Aceternity/aceternity-automation-sanity/components/ui/timeline.tsx components/ui/
```

*PowerShell:*
```powershell
cd W:\Dev\projects\NextJS\devils-landing
Copy-Item -Path "W:\Dev\Templates\Aceternity\aceternity-automation-sanity\components\ui\timeline.tsx" -Destination "components\ui\"
```

**Step 2: Copy Schema**

*Bash / Git Bash / WSL:*
```bash
cp /w/Dev/Templates/Aceternity/aceternity-automation-sanity/sanity/schemas/blocks/aceternity/timeline.ts sanity/schemas/blocks/aceternity/
```

*PowerShell:*
```powershell
Copy-Item -Path "W:\Dev\Templates\Aceternity\aceternity-automation-sanity\sanity\schemas\blocks\aceternity\timeline.ts" -Destination "sanity\schemas\blocks\aceternity\"
```

**Step 3: Copy Block Wrapper**

*Bash / Git Bash / WSL:*
```bash
cp /w/Dev/Templates/Aceternity/aceternity-automation-sanity/components/blocks/aceternity/timeline-block.tsx components/blocks/aceternity/
```

*PowerShell:*
```powershell
Copy-Item -Path "W:\Dev\Templates\Aceternity\aceternity-automation-sanity\components\blocks\aceternity\timeline-block.tsx" -Destination "components\blocks\aceternity\"
```

**Step 4: Register Schema**

In `sanity/schema.ts`:
```typescript
import timelineSchema from './schemas/blocks/aceternity/timeline';

export const schema: SchemaTypeDefinition[] = [
  // ... existing schemas
  timelineSchema,  // ← Add this
];
```

**Step 5: Register Component**

In `components/blocks/index.tsx`:
```typescript
import TimelineBlock from './aceternity/timeline-block';

export const blockComponents = {
  // ... existing blocks
  'aceternity.timeline': TimelineBlock,  // ← Add this
};
```

**Step 6: Generate Types**

*Bash / Git Bash / WSL / PowerShell (npm commands work in all shells):*
```bash
npm run typegen
```

**Step 7: Test in Sanity Studio**

*Bash / Git Bash / WSL / PowerShell:*
```bash
npm run dev

# Open: http://localhost:3000/studio
# Create/edit a page
# Add "Timeline (Aceternity)" block
# Publish and view
```

---

## GitHub Workflow (Using Workflow Agent)

### Before Any Code

**1. Create Issue**

*Bash / Git Bash / WSL:*
```bash
cd /w/Dev/projects/NextJS/devils-landing
gh issue create --title "Test Aceternity Timeline integration" --body "
## Goal
Test Timeline component from Aceternity Automation Package

## Acceptance Criteria
- [ ] Timeline component renders
- [ ] Sanity integration works
- [ ] Types are correct
- [ ] No console errors

## Steps
1. Copy Timeline files
2. Register component
3. Test in Studio
4. Verify on frontend
"
```

*PowerShell:*
```powershell
cd W:\Dev\projects\NextJS\devils-landing
gh issue create --title "Test Aceternity Timeline integration" --body @"
## Goal
Test Timeline component from Aceternity Automation Package

## Acceptance Criteria
- [ ] Timeline component renders
- [ ] Sanity integration works
- [ ] Types are correct
- [ ] No console errors

## Steps
1. Copy Timeline files
2. Register component
3. Test in Studio
4. Verify on frontend
"@
```

**2. Create Feature Branch**

*Bash / Git Bash / WSL / PowerShell:*
```bash
git checkout -b feat/test-aceternity-timeline
```

**3. Document Your Plan**

Create `docs/aceternity-timeline-integration.md`:
```markdown
# Timeline Integration Test

## What We're Testing
- Component integration workflow
- Schema UI compatibility
- Type generation
- Visual editing

## Files to Create
- components/ui/timeline.tsx
- sanity/schemas/blocks/aceternity/timeline.ts
- components/blocks/aceternity/timeline-block.tsx

## Expected Outcome
Working timeline block in Sanity Studio
```

### After Implementation

**4. Commit with Proper Message**

*Bash / Git Bash / WSL / PowerShell (same commands):*
```bash
git add .
git commit -m "feat: integrate aceternity timeline component

- Add Timeline UI component from Aceternity
- Create Sanity schema with proper types
- Add block wrapper following best practices
- Register component in blocks index
- Generate types

Tested:
- ✅ Renders in Sanity Studio
- ✅ Types are correct
- ✅ Visual editing works

References: docs/aceternity-timeline-integration.md"
```

**5. Create Pull Request**

*Bash / Git Bash / WSL:*
```bash
git push -u origin feat/test-aceternity-timeline

gh pr create \
  --title "feat: Test Aceternity Timeline integration" \
  --body "## Summary
First test of Aceternity Automation Package workflow.

## Changes
- Integrated Timeline component
- Following Schema UI patterns
- Using GitHub Workflow Agent best practices

## Testing
- [x] Component renders
- [x] Sanity integration works
- [x] Types correct
- [x] No console errors

## Screenshots
[Add screenshots of Studio and frontend]

## Notes
This validates the automation package workflow for Schema UI template.

Closes #1"
```

*PowerShell:*
```powershell
git push -u origin feat/test-aceternity-timeline

gh pr create `
  --title "feat: Test Aceternity Timeline integration" `
  --body @"
## Summary
First test of Aceternity Automation Package workflow.

## Changes
- Integrated Timeline component
- Following Schema UI patterns
- Using GitHub Workflow Agent best practices

## Testing
- [x] Component renders
- [x] Sanity integration works
- [x] Types correct
- [x] No console errors

## Screenshots
[Add screenshots of Studio and frontend]

## Notes
This validates the automation package workflow for Schema UI template.

Closes #1
"@
```

---

## Cursor-Specific Tips

### 1. Use Cursor Rules

Create `.cursorrules` in devils-landing:
```
# Aceternity Integration Rules

When integrating Aceternity components:
1. Always use aceternity.* namespace prefix
2. Match schema field names to component props
3. Include "use client" directive
4. Wrap in SectionContainer
5. Add proper null checks
6. Use _key for array items

See: W:\Dev\Templates\Aceternity\aceternity-automation-sanity\IMPLEMENTATION-ANALYSIS.md
```

### 2. Cursor Chat Context

When asking Cursor for help:
```
@workspace I'm integrating Aceternity components using the automation package at W:\Dev\Templates\Aceternity\aceternity-automation-sanity.

Please follow these patterns:
- Namespace: aceternity.*
- Read: IMPLEMENTATION-ANALYSIS.md for critical notes
- Pattern: SectionContainer wrapper required
```

### 3. Quick Commands in Cursor

**Ctrl+Shift+P** → Type:
- "Cursor: Chat" - Ask about Aceternity patterns
- "Git: Create Branch" - Quick feature branch
- "Terminal: New Terminal" - Run commands
- "Terminal: Select Default Profile" - Choose Bash vs PowerShell

**Terminal Shortcuts:**
- **Ctrl+`** (backtick) - Toggle terminal
- **Ctrl+Shift+`** - Create new terminal

---

## Common Issues & Fixes

### Issue: Command Not Found (Bash commands in PowerShell)

If you see errors like `cp: command not found` or `mkdir: command not found`:
- You're using PowerShell but trying Bash commands
- Switch to PowerShell commands in this guide OR
- Use Git Bash / WSL instead

### Issue: Types Not Found

*Bash / Git Bash / WSL / PowerShell:*
```bash
# Regenerate types
npm run typegen

# If that fails, check sanity.config.ts
```

### Issue: Component Not Rendering

**Check:**
1. ✅ Registered in `components/blocks/index.tsx`?
2. ✅ Using correct type: `aceternity.timeline`?
3. ✅ Has `"use client"` directive?
4. ✅ Null checks in place?

### Issue: Schema Not Appearing in Studio

**Check:**
1. ✅ Imported in `sanity/schema.ts`?
2. ✅ Using `defineType()` from Sanity?
3. ✅ Has proper `name` field?
4. ✅ Restarted dev server?

---

## Testing Checklist

Before marking integration complete:

- [ ] Component file copied to `components/ui/`
- [ ] Schema created in `sanity/schemas/blocks/aceternity/`
- [ ] Block wrapper created in `components/blocks/aceternity/`
- [ ] Schema registered in `sanity/schema.ts`
- [ ] Component registered in `components/blocks/index.tsx`
- [ ] Types generated: `npm run typegen`
- [ ] Dev server running without errors
- [ ] Block appears in Studio
- [ ] Can add/edit block in Studio
- [ ] Block renders on frontend
- [ ] No console errors
- [ ] Proper GitHub workflow followed

---

## Next Steps After Timeline

Once Timeline integration works:

1. **Test Another Component**
   - Try Bento Grid or Background Beams
   - Verify same workflow works

2. **Document Findings**
   - Note any issues in devils-landing repo
   - Create issues in automation repo if needed

3. **Report Back**
   - What worked well?
   - What needs improvement?
   - Documentation gaps?

---

## Quick Reference Links

**Automation Package:**
- Main: `W:\Dev\Templates\Aceternity\aceternity-automation-sanity`
- Analysis: [IMPLEMENTATION-ANALYSIS.md](file:///W:/Dev/Templates/Aceternity/aceternity-automation-sanity/IMPLEMENTATION-ANALYSIS.md)
- Workflow: [docs/WORKFLOW-QUICK-REFERENCE.md](file:///W:/Dev/Templates/Aceternity/aceternity-automation-sanity/docs/WORKFLOW-QUICK-REFERENCE.md)

**Test Project:**
- Location: `W:\Dev\projects\NextJS\devils-landing`
- Template: Schema UI
- Editor: Cursor

**GitHub:**
- Automation Repo: https://github.com/mautomo/aceternity-automation-sanity
- Issues: Create for any problems found

---

## Time Estimate

**First Component (Timeline):**
- Planning: 10 minutes
- Implementation: 15 minutes
- Testing: 10 minutes
- Documentation: 5 minutes
- **Total: ~40 minutes**

**Second Component (with experience):**
- Planning: 5 minutes
- Implementation: 10 minutes
- Testing: 5 minutes
- **Total: ~20 minutes**

---

**Status:** Ready to test
**Date:** 2025-11-01
**Focus:** Validate automation package workflow with Schema UI
