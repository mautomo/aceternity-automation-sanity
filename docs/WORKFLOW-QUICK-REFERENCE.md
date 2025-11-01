# Development Workflow - Quick Reference

**Anti-Pattern:** Jump in → Code → Realize mistakes → Refactor → Repeat
**Best Practice:** Plan → Spec → Branch → Code → Test → Review → Merge → Iterate

---

## 🚫 NEVER Do This

```bash
# ❌ Start coding immediately
git checkout main
*starts writing code*

# ❌ Commit to main directly
git add .
git commit -m "stuff"
git push

# ❌ Skip planning
"I'll just quickly add this feature..."
*3 hours later, spaghetti code*

# ❌ No documentation
git commit -m "update"
*6 months later: "What does this code do?"*
```

---

## ✅ ALWAYS Do This

### 1. Start with a Question

**Before writing ANY code, ask:**
- What problem am I solving?
- Why is this needed?
- How will I know when it's done?
- What could go wrong?

### 2. Create an Issue

```markdown
# GitHub Issue Template

**Title:** [Clear, actionable description]

## Problem
[What's broken or missing?]

## Proposed Solution
[How will we fix it?]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Notes
[Any implementation details]

## Time Estimate
[Be honest: 30min, 2hr, 1 day, etc.]
```

### 3. Write a Spec (Even if Brief!)

```markdown
# SPEC-[feature-name].md

## Goal
[One sentence]

## Current State
[What exists now]

## Desired State
[What should exist]

## Implementation Plan
1. [ ] Step 1
2. [ ] Step 2
3. [ ] Step 3

## Files to Change
- [ ] `file1.ts`
- [ ] `file2.tsx`

## Tests Needed
- [ ] Unit test for X
- [ ] Integration test for Y

## Documentation Updates
- [ ] README
- [ ] Code comments
```

### 4. Create Feature Branch

```bash
# ALWAYS branch from main
git checkout main
git pull
git checkout -b feat/descriptive-name

# Branch naming:
feat/feature-name       # New feature
fix/bug-description     # Bug fix
chore/task-description  # Maintenance
docs/what-docs          # Documentation
refactor/what-changed   # Refactoring
test/what-tested        # Tests
```

### 5. Code with Intention

```bash
# Make small, logical commits
git add specific-file.ts
git commit -m "feat(component): add base structure"

git add tests/component.test.ts
git commit -m "test(component): add unit tests"

# NOT this:
git add .
git commit -m "update"
```

### 6. Test Before Pushing

```bash
# Run these BEFORE every push
npm run typecheck   # ✓ No type errors
npm run lint        # ✓ No linting errors
npm run build       # ✓ Build succeeds
npm run test        # ✓ Tests pass

# Only push if ALL pass
```

### 7. Create Pull Request

```bash
# Push your branch
git push -u origin feat/feature-name

# Create PR (start as draft)
gh pr create --draft \
  --title "feat: clear description" \
  --body "See template"
```

**PR Description Template:**
```markdown
## Summary
[What changed and why]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## Testing
- [ ] Tested locally
- [ ] Types pass
- [ ] Build succeeds
- [ ] Tests pass

## Screenshots
[For UI changes]

Closes #[issue-number]
```

### 8. Review Your Own PR

**Before marking as ready:**
- [ ] Read through all changes
- [ ] Check for debug code
- [ ] Verify commit messages
- [ ] Test one more time
- [ ] Update documentation
- [ ] Add screenshots (if UI)

```bash
# If satisfied:
gh pr ready <pr-number>
```

### 9. Merge and Clean Up

```bash
# After approval, merge via GitHub

# Then locally:
git checkout main
git pull
git branch -d feat/feature-name  # Delete local branch
```

---

## 📋 Complete Example: Adding a Component

```bash
# 1. PLAN (5 minutes)
echo "Planning to add Sparkles component..."

# Create issue on GitHub:
# Title: "Add Sparkles background component"
# Body: [Use issue template above]

# 2. SPEC (5 minutes)
cat > SPEC-sparkles.md <<'EOF'
## Add Sparkles Component

**Goal:** Integrate Aceternity Sparkles animated background.

**Plan:**
1. Copy component from Aceternity
2. Fix imports
3. Create Sanity schema
4. Add to design system
5. Test in Studio

**Time:** 30 minutes
EOF

git add SPEC-sparkles.md
git commit -m "docs: add Sparkles component spec"

# 3. BRANCH (1 minute)
git checkout -b feat/sparkles-component

# 4. IMPLEMENT (20 minutes)
# ... do the work ...

git add components/aceternity/backgrounds/sparkles.tsx
git commit -m "feat(sparkles): add component from Aceternity"

git add sanity/schemas/blocks/aceternity/sparkles.ts
git commit -m "feat(sparkles): add Sanity schema"

npm run aceternity:integrate -- sparkles "Sparkles" "Animated particles" Sparkles
git add .
git commit -m "feat(sparkles): integrate with Sanity CMS"

# 5. TEST (5 minutes)
npm run typecheck  # ✓
npm run lint       # ✓
npm run build      # ✓
npm run dev        # ✓
# Manual testing: check design system and Studio

# 6. PR (2 minutes)
git push -u origin feat/sparkles-component

gh pr create --draft \
  --title "feat: add Sparkles background component" \
  --body "Integrated Sparkles from Aceternity. Closes #42"

# 7. REVIEW (3 minutes)
# Check PR on GitHub
# Verify all files look good
# Mark as ready if satisfied

gh pr ready <pr-number>

# 8. MERGE (1 minute)
# Click merge on GitHub (or use CLI)
gh pr merge <pr-number> --squash --delete-branch

# 9. CLEANUP (1 minute)
git checkout main
git pull
git branch -d feat/sparkles-component

# Total time: ~40 minutes
# But organized, documented, reviewable!
```

---

## ⏱️ Time Breakdown

**Bad Workflow:**
- Jump in: 0 minutes (no planning)
- Code: 3 hours (trial and error)
- Debug: 2 hours (mistakes from no planning)
- Refactor: 1 hour (cleanup)
- **Total: 6 hours, messy result**

**Good Workflow:**
- Planning: 10 minutes
- Spec: 5 minutes
- Setup branch: 1 minute
- Code: 20 minutes (clear plan)
- Test: 5 minutes
- PR: 5 minutes
- Review: 3 minutes
- **Total: 49 minutes, clean result**

**Savings: 5 hours, 11 minutes + much better code!**

---

## 🎯 Workflow Checklist

Print this and keep it visible:

```
□ Created issue describing work
□ Wrote specification (even brief)
□ Created feature branch (not on main!)
□ Made small, logical commits
□ Wrote tests
□ Ran typecheck/lint/build
□ Created PR with clear description
□ Reviewed my own code
□ Updated documentation
□ Merged and cleaned up
```

---

## 🔄 When Things Go Wrong

### "I already started coding on main!"

```bash
# Create branch with current changes
git checkout -b feat/my-feature

# Reset main to remote
git checkout main
git reset --hard origin/main

# Continue work on feature branch
git checkout feat/my-feature
```

### "I committed to main by accident!"

```bash
# Move commit to new branch
git branch feat/my-feature
git reset --hard HEAD~1
git checkout feat/my-feature

# Now commit is on feature branch
```

### "I forgot to create an issue!"

```bash
# Create issue now, add to PR description
# Better late than never
```

### "My PR is too big!"

```bash
# Split into smaller PRs
git checkout -b feat/part-1
# Cherry-pick specific commits
git cherry-pick <commit-hash>

# Create multiple smaller PRs
```

---

## 📚 Learning Resources

### Git Workflow
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Branching Strategy](https://nvie.com/posts/a-successful-git-branching-model/)

### Best Practices
- [Code Review Guidelines](https://google.github.io/eng-practices/review/)
- [Writing Good Commit Messages](https://chris.beams.io/posts/git-commit/)
- [Pull Request Best Practices](https://github.blog/2015-01-21-how-to-write-the-perfect-pull-request/)

---

## 💡 Pro Tips

### Commit Messages

```bash
# Good
git commit -m "feat(sparkles): add animated background component

- Copied from Aceternity UI
- Added Sanity schema integration
- Configured color customization
- Added to design system

Closes #42"

# Bad
git commit -m "update"
git commit -m "fix stuff"
git commit -m "wip"
```

### Branch Names

```bash
# Good
feat/sparkles-background
fix/navbar-mobile-menu
docs/setup-guide-improvements
chore/update-dependencies

# Bad
feature
my-branch
test
updates
```

### PR Titles

```bash
# Good
feat: add Sparkles animated background component
fix: resolve navbar overflow on mobile
docs: improve setup guide with examples
chore: update dependencies to latest versions

# Bad
Update
Fix bug
Changes
New feature
```

---

## 🎓 The Mindset Shift

### Before: Code-First

```
"I need to add a feature"
→ Start coding immediately
→ Figure it out as I go
→ Debug for hours
→ Messy, undocumented code
→ Hard to review
→ Difficult to maintain
```

### After: Plan-First

```
"I need to add a feature"
→ What problem does this solve?
→ Write a quick spec
→ Create issue and branch
→ Code with clear goal
→ Test thoroughly
→ Create reviewable PR
→ Clean, documented code
→ Easy to maintain
```

---

## ✅ Success Indicators

**You're doing it right when:**
- You can explain why every line of code exists
- Your PR gets approved quickly
- Future you understands past you's code
- Team members praise your PRs
- Features work first time
- Bugs are rare
- Documentation is always current
- You sleep well at night

---

**Remember:**
> "Weeks of coding can save you hours of planning." - Anonymous Developer

**Actually:**
> "Hours of planning can save you weeks of coding." - Wise Developer

---

**Keep this visible. Refer to it before every feature. Make it a habit!**
