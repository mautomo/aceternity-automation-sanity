# Test Project Setup - Aceternity Automation Package

**Purpose:** Test and validate the Aceternity Automation Package on a fresh project while establishing proper development workflow habits.

**Date:** 2025-11-01

---

## 🎯 Goals

1. **Test the Package:** Validate automation scripts work on clean install
2. **Learn Workflow:** Practice proper GitHub workflow (issues, branches, PRs, reviews)
3. **Build Habits:** Plan → Spec → Document → Code → Test → Review → Merge
4. **Improve Package:** Find and fix issues, improve documentation

---

## 📋 Template Comparison

### Option 1: Schema UI (Current Choice)
**URL:** https://www.sanity.io/templates/schema-ui

**Pros:**
- ✅ You already know it (used in Vconic)
- ✅ Simple structure, easy to understand
- ✅ Good for straightforward content models
- ✅ Fast setup
- ✅ Aceternity package already tested with this

**Cons:**
- ❌ Less flexible for complex content
- ❌ Simpler block system

**Best For:**
- Marketing sites
- Portfolios
- Simple blogs
- Landing pages

### Option 2: SanityPress
**URL:** https://www.sanity.io/templates/sanitypress

**Pros:**
- ✅ More comprehensive starter
- ✅ Blog-focused features
- ✅ Advanced content modeling
- ✅ More out-of-the-box features

**Cons:**
- ❌ You're unfamiliar with it
- ❌ More complex structure
- ❌ Aceternity package untested with this

**Best For:**
- Content-heavy sites
- Blogs/publications
- News sites
- Magazine-style layouts

### Option 3: SanityBlocks (Licensed)
**URL:** https://github.com/mautomo/sanityblocks

**Pros:**
- ✅ You already own the license
- ✅ Already forked
- ✅ Most advanced block system
- ✅ Component library included
- ✅ Monorepo structure (scalable)

**Cons:**
- ❌ Most complex setup
- ❌ Steeper learning curve
- ❌ Aceternity integration will be different

**Best For:**
- Large-scale projects
- Multiple sites from one codebase
- Advanced content requirements
- Team collaboration

### Recommendation for Testing

**Start with Schema UI** because:
1. You know it - focus on workflow, not learning template
2. Aceternity package already compatible
3. Quick setup lets you focus on testing automation
4. Can always migrate to SanityBlocks later

**Then try SanityPress** to:
1. Test package compatibility with different templates
2. Improve package to work with multiple templates
3. Document differences and create guides

**Finally, SanityBlocks** for:
1. Advanced testing
2. Template variant for v2.2.0
3. Production-ready option for complex projects

---

## 🚀 Test Project Setup (Schema UI)

### Step 1: Planning (Do This FIRST!)

Create a project spec BEFORE any code:

```bash
# Create project directory
mkdir aceternity-test-project
cd aceternity-test-project

# Initialize git immediately
git init
git branch -M main

# Create planning documents FIRST
```

**Create: PROJECT-SPEC.md**
```markdown
# Aceternity Test Project Specification

## Purpose
Test and validate Aceternity Automation Package on fresh Schema UI installation.

## Goals
- [ ] Validate setup wizard works
- [ ] Test Supabase integration
- [ ] Integrate 5 Aceternity components
- [ ] Verify design system page
- [ ] Test approval workflow
- [ ] Document any issues found

## Timeline
- Day 1: Setup and infrastructure
- Day 2: Component integration (3 components)
- Day 3: Testing and documentation
- Day 4: Advanced features

## Success Criteria
- [ ] Clean install works
- [ ] All scripts run successfully
- [ ] Components appear in Sanity
- [ ] No TypeScript errors
- [ ] Documentation is clear

## Issues to Watch For
- Setup wizard errors
- Supabase connection problems
- Type generation failures
- Missing dependencies
- Unclear documentation
```

### Step 2: GitHub Setup (Proper Workflow)

```bash
# Create GitHub repository FIRST
# Visit: https://github.com/new
# Name: aceternity-test-project
# Description: Testing Aceternity Automation Package
# Public or Private: Your choice
# Initialize with: Nothing (we have local git)

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/aceternity-test-project.git

# Create initial commit with planning docs
git add PROJECT-SPEC.md
git commit -m "docs: initial project specification"
git push -u origin main

# Create GitHub issue for setup
# Visit: https://github.com/YOUR_USERNAME/aceternity-test-project/issues/new
# Title: "Set up Schema UI template with Aceternity package"
# Body: Copy from PROJECT-SPEC.md
# Labels: setup, documentation
```

### Step 3: Branch for Setup

```bash
# ALWAYS work in branches, never on main!
git checkout -b setup/schema-ui-template

# Now we can start actual work
```

### Step 4: Install Schema UI Template

```bash
# Follow Schema UI setup
npx create-sanity@latest init \
  --template schema-ui \
  --project aceternity-test \
  --dataset production

# Or clone directly
git clone https://github.com/sanity-io/template-nextjs-app-router-clean .
```

### Step 5: Install Aceternity Package

**Create: SETUP-LOG.md** (document everything!)
```markdown
# Setup Log

## 2025-11-01 10:00 - Template Installation

### Commands Run:
```bash
npm install
```

### Results:
- ✅ Dependencies installed
- ✅ Next.js 15.x
- ✅ Sanity 4.x
```

**Now copy Aceternity package files:**
```bash
# From Vconic project, copy these to test project:

# 1. Documentation
cp ../vconic-rapid-deploy/ACETERNITY-SETUP-GUIDE.md .
cp ../vconic-rapid-deploy/ACETERNITY-AUTOMATION-PACKAGE.md .
cp ../vconic-rapid-deploy/.env.example .

# 2. Supabase
cp -r ../vconic-rapid-deploy/supabase .

# 3. Scripts
mkdir -p scripts
cp ../vconic-rapid-deploy/scripts/setup-wizard.ts scripts/
cp ../vconic-rapid-deploy/scripts/supabase-init.ts scripts/
cp ../vconic-rapid-deploy/scripts/test-supabase.ts scripts/
cp ../vconic-rapid-deploy/scripts/aceternity-auto-integrate.ts scripts/

# 4. Design system components
mkdir -p components/design-system
cp -r ../vconic-rapid-deploy/components/design-system/* components/design-system/

# 5. Update package.json scripts
# Add these to package.json:
```json
{
  "scripts": {
    "setup:aceternity": "npx tsx scripts/setup-wizard.ts",
    "setup:supabase": "npx tsx scripts/supabase-init.ts",
    "test:supabase": "npx tsx scripts/test-supabase.ts",
    "aceternity:integrate": "npx tsx scripts/aceternity-auto-integrate.ts"
  }
}
```

# 6. Install additional dependencies
npm install @supabase/supabase-js @anthropic-ai/sdk
```

**Document in SETUP-LOG.md:**
```markdown
## 2025-11-01 10:30 - Aceternity Package Installation

### Files Copied:
- [x] Documentation (2 files)
- [x] Supabase schema
- [x] Scripts (4 files)
- [x] Design system components
- [x] package.json updated

### Dependencies Added:
- @supabase/supabase-js: ^2.39.0
- @anthropic-ai/sdk: ^0.68.0

### Issues Found:
- None yet (or list any)

### Improvements Needed:
- Maybe create a `npm init aceternity` command?
- Could automate file copying
```

### Step 6: Run Setup Wizard

```bash
# Run the setup wizard
npm run setup:aceternity

# Document results in SETUP-LOG.md
```

**Update SETUP-LOG.md:**
```markdown
## 2025-11-01 11:00 - Setup Wizard

### Wizard Prompts:
1. Project name: Aceternity Test
2. Primary color: #00d71c
3. Secondary color: #00a81c
4. Font family: Inter
5. Logo URL: /logo.svg
6. Supabase URL: [entered]
7. Supabase key: [entered]

### Results:
- ✅ Config created
- ✅ Supabase initialized
- ✅ Environment variables set
- ❌ Issue: [if any]

### Time Taken: ~5 minutes
```

### Step 7: Test Supabase

```bash
npm run test:supabase

# Document results
```

### Step 8: Commit Progress

```bash
# Add all files
git add .

# Commit with conventional commits
git commit -m "feat: integrate Aceternity Automation Package

- Copy package files from Vconic project
- Install dependencies (@supabase/supabase-js)
- Run setup wizard
- Initialize Supabase schema
- Configure environment

Closes #1"

# Push to feature branch
git push -u origin setup/schema-ui-template
```

### Step 9: Create Pull Request

**Don't merge yet!** Create PR for review:

```bash
# Use GitHub CLI (or web interface)
gh pr create \
  --title "feat: integrate Aceternity Automation Package" \
  --body "$(cat <<'EOF'
## Summary
Successfully integrated the Aceternity Automation Package into fresh Schema UI template.

## Changes
- Installed package files (docs, scripts, schemas)
- Configured Supabase integration
- Ran setup wizard
- Tested database connection

## Testing
- [x] Setup wizard completes
- [x] Supabase connection works
- [x] No TypeScript errors
- [ ] Components not yet integrated (next PR)

## Documentation
- Added SETUP-LOG.md with detailed steps
- Updated package.json with new scripts

## Issues Found
[List any issues or "None"]

## Next Steps
- Integrate first Aceternity component
- Test design system page
- Verify approval workflow

Closes #1
EOF
)" \
  --draft

# Or create via web at:
# https://github.com/YOUR_USERNAME/aceternity-test-project/compare/main...setup/schema-ui-template
```

---

## 🔄 Workflow for Each Feature

**ALWAYS follow this pattern:**

### 1. Issue First
```bash
# Create issue on GitHub
# Title: "Add Sparkles background component"
# Description: What, why, how
# Labels: enhancement, aceternity
# Assign to yourself
```

### 2. Specification
```markdown
# In issue description

## Component: Sparkles
**From:** https://ui.aceternity.com/components/sparkles

## Implementation Plan
1. [ ] Copy component from Aceternity
2. [ ] Fix imports (framer-motion → motion/react)
3. [ ] Run integration script
4. [ ] Test in design system
5. [ ] Add to Sanity schema
6. [ ] Verify in Studio
7. [ ] Document any issues

## Acceptance Criteria
- [ ] Component renders without errors
- [ ] Visible in design system
- [ ] Available in Sanity Studio
- [ ] TypeScript types generated
- [ ] No console warnings

## Time Estimate: 30 minutes
```

### 3. Create Branch
```bash
# From main, create feature branch
git checkout main
git pull
git checkout -b feat/sparkles-component
```

### 4. Implement
```bash
# Do the work
# Commit frequently with good messages

git add components/aceternity/backgrounds/sparkles.tsx
git commit -m "feat(sparkles): add component from Aceternity"

git add sanity/schemas/blocks/aceternity/sparkles.ts
git commit -m "feat(sparkles): add Sanity schema"

# Run integration script
npm run aceternity:integrate -- sparkles "Sparkles Effect" "Animated particles" Sparkles

git add .
git commit -m "feat(sparkles): integrate with Sanity"
```

### 5. Test Locally
```bash
# Run all checks
npm run typecheck  # Must pass
npm run lint       # Must pass
npm run build      # Must succeed
npm run dev        # Must run

# Manual testing:
# - Check http://localhost:3000/design-system
# - Check Sanity Studio
# - Verify no errors
```

### 6. Create PR
```bash
# Push branch
git push -u origin feat/sparkles-component

# Create PR (draft while testing)
gh pr create --draft \
  --title "feat: add Sparkles background component" \
  --body "$(cat <<'EOF'
## Summary
Integrated Sparkles animated background component from Aceternity.

## Testing
- [x] Component renders
- [x] Design system displays it
- [x] Sanity schema created
- [x] Types generated
- [x] No console errors

## Screenshots
[Add screenshots]

Closes #2
EOF
)"
```

### 7. Review Yourself
```bash
# Look at your own PR critically:
# - Is code clean?
# - Are commits logical?
# - Is documentation clear?
# - Did you test thoroughly?

# If yes, mark as ready:
gh pr ready <pr-number>
```

### 8. Merge
```bash
# After review (self or others):
gh pr merge <pr-number> --squash --delete-branch

# Or via web interface
```

### 9. Update Local
```bash
git checkout main
git pull
git branch -d feat/sparkles-component  # Cleanup
```

---

## 📊 Testing Checklist

### Package Validation

**Setup Phase:**
- [ ] `npm install` works cleanly
- [ ] `npm run setup:aceternity` completes
- [ ] `npm run setup:supabase` creates tables
- [ ] `npm run test:supabase` passes
- [ ] `.env.local` configured correctly

**Integration Phase:**
- [ ] First component integrates successfully
- [ ] Design system page displays component
- [ ] Sanity schema appears in Studio
- [ ] `npm run typegen` generates types
- [ ] No TypeScript errors
- [ ] No console warnings

**Build Phase:**
- [ ] `npm run dev` starts without errors
- [ ] `npm run build` succeeds
- [ ] Production build works
- [ ] No runtime errors

**Documentation Phase:**
- [ ] ACETERNITY-SETUP-GUIDE.md is clear
- [ ] Instructions work as written
- [ ] No missing steps
- [ ] Troubleshooting section helpful

### Issues to Document

**If you find any issues, document them:**

```markdown
# ISSUES-FOUND.md

## Issue 1: Missing dependency

**Description:** Setup wizard fails because...

**Error:**
```
Error message here
```

**Solution:**
```bash
npm install missing-package
```

**Suggested Fix:**
- Update package.json to include dependency
- Update ACETERNITY-SETUP-GUIDE.md with note

---

## Issue 2: Unclear documentation

**Description:** Step 5 says "configure environment" but doesn't explain...

**Suggestion:**
Add example showing:
```
VARIABLE=value
```
```

---

## 🎯 Success Metrics

Track your progress:

```markdown
# TEST-RESULTS.md

## Day 1: Setup
- Time: 2 hours
- Issues: 2 (documented)
- Status: ✅ Complete

## Day 2: Components
- Components integrated: 3
- Time per component: ~30 min avg
- Issues: 1 (type error fixed)
- Status: ✅ Complete

## Day 3: Testing
- All checks passing: ✅
- Documentation updated: ✅
- Status: ✅ Complete

## Overall Assessment
- **Setup Experience:** 8/10 (clear but found 2 issues)
- **Integration Speed:** 9/10 (very fast once working)
- **Documentation Quality:** 7/10 (good but needs examples)
- **Would Recommend:** Yes, with documented improvements
```

---

## 🔄 Iterative Improvement

After testing:

### 1. Consolidate Findings
```bash
# Create comprehensive report
# File: PACKAGE-IMPROVEMENTS.md

## Issues Found
1. Missing dependency X
2. Unclear documentation in section Y
3. Script fails on Windows with error Z

## Suggested Improvements
1. Add dependency to package.json
2. Rewrite section Y with examples
3. Add Windows-specific path handling

## New Features Needed
1. `npm init aceternity` command
2. Template detection
3. Auto-copy files
```

### 2. Create Issues in Package Repo
```bash
# For each improvement, create issue in:
# https://github.com/mautomo/aceternity-automation-sanity/issues

# Example:
# Title: "Add missing @anthropic-ai/sdk dependency"
# Label: bug
# Body: Detailed description from testing
```

### 3. Submit PRs
```bash
# Fork aceternity-automation-sanity
# Fix issues you found
# Submit PRs with your improvements

# This is valuable contribution!
```

---

## 📝 Template for Other Templates

Once Schema UI testing is complete, repeat for SanityPress and SanityBlocks:

```bash
# Create new test projects
mkdir aceternity-test-sanitypress
mkdir aceternity-test-sanityblocks

# Follow same workflow:
# 1. Planning documents
# 2. GitHub setup
# 3. Branch strategy
# 4. Installation
# 5. Testing
# 6. Documentation
# 7. PRs
```

Create comparison:

```markdown
# TEMPLATE-COMPARISON.md

## Schema UI
- Setup time: 2 hours
- Components integrated: 5
- Issues: 2 minor
- **Verdict:** ✅ Recommended for simple sites

## SanityPress
- Setup time: 3 hours
- Components integrated: 5
- Issues: 3 (template-specific)
- **Verdict:** ✅ Good for blogs, needs adaptation

## SanityBlocks
- Setup time: 4 hours
- Components integrated: 5
- Issues: 5 (monorepo complexity)
- **Verdict:** ⚠️ Advanced only, needs separate guide
```

---

## 🎉 Final Deliverables

After completing all testing:

### 1. Package Improvements
- PRs submitted to aceternity-automation-sanity
- Issues documented
- Documentation improved

### 2. Template Guides
- SCHEMA-UI-GUIDE.md
- SANITYPRESS-GUIDE.md
- SANITYBLOCKS-GUIDE.md

### 3. Test Projects
- 3 working example projects
- Documented in README
- Available as templates

### 4. Workflow Documentation
- GITHUB-WORKFLOW-BEST-PRACTICES.md
- PR-TEMPLATE-EXAMPLES.md
- BRANCH-STRATEGY-GUIDE.md

---

**Next Steps:**
1. Create `aceternity-test-project` directory
2. Write PROJECT-SPEC.md FIRST
3. Set up GitHub repo
4. Follow this guide step-by-step
5. Document everything you find!

**Remember:** Planning before coding = Better code, less bugs, clearer thinking!
