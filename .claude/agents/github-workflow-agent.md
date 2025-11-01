# GitHub Workflow Agent

**Version:** 1.0.0 (Planned for v2.1.0)
**Status:** Specification
**Purpose:** Automate GitHub workflow management, PR creation, branch strategies, and CI/CD integration

---

## Mission

Enforce proper software development workflow through automated GitHub integration. Prevent "build-first, plan-later" anti-patterns by requiring planning, documentation, and testing before merging.

---

## Core Responsibilities

### 1. Branch Strategy Management

**Create Feature Branches:**
- Detect when starting new work
- Prompt for feature/fix/chore classification
- Auto-create branch with proper naming
- Set up branch protection rules

**Branch Naming Convention:**
```
feat/descriptive-feature-name
fix/issue-description
chore/maintenance-task
docs/documentation-update
refactor/code-improvement
test/test-addition
```

### 2. Planning Enforcement

**Before Any Code:**
- [ ] Create issue describing the work
- [ ] Write technical specification
- [ ] Document acceptance criteria
- [ ] Get approval (if required)
- [ ] Create feature branch
- [ ] ONLY THEN start coding

**Specification Template:**
```markdown
## Problem Statement
[What problem are we solving?]

## Proposed Solution
[How will we solve it?]

## Technical Approach
[Implementation details]

## Files to Change
- [ ] File 1
- [ ] File 2

## Testing Strategy
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing checklist

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Documentation Updates
- [ ] README
- [ ] Code comments
- [ ] API docs
```

### 3. Pull Request Automation

**Auto-Create PRs:**
```typescript
interface PRCreation {
  title: string;          // From issue/branch name
  description: string;    // Auto-generated from commits
  labels: string[];       // Auto-detected (feat, fix, docs, etc.)
  reviewers: string[];    // Based on files changed
  linkedIssues: number[]; // Auto-linked from commits
  draft: boolean;         // Default true until tests pass
}
```

**PR Checklist Enforcement:**
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Screenshots added (for UI changes)
- [ ] Breaking changes documented
- [ ] Migration guide written (if breaking)

### 4. CI/CD Integration

**Automated Checks:**
```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

**Quality Gates:**
- TypeScript: 100% type safety
- ESLint: 0 errors, 0 warnings
- Build: Must succeed
- Lighthouse: 90+ on all metrics
- Bundle size: Must not increase >10%

### 5. Testing Workflow

**Test Before Merge:**
```bash
# Agent runs automatically before allowing merge
npm run typecheck      # ✓ Types pass
npm run lint          # ✓ Linting passes
npm run test          # ✓ Tests pass
npm run build         # ✓ Build succeeds
npm run test:e2e      # ✓ E2E tests pass (Playwright)
```

**Visual Testing (Puppeteer):**
- Capture screenshots of changed pages
- Compare with baseline
- Flag visual regressions
- Require approval for intentional changes

### 6. Documentation Requirements

**Auto-Check Documentation:**
- [ ] README updated if public API changes
- [ ] CHANGELOG entry added
- [ ] Code comments for complex logic
- [ ] JSDoc for exported functions
- [ ] Migration guide for breaking changes
- [ ] Examples updated

### 7. Release Automation

**Semantic Versioning:**
```typescript
interface ReleaseStrategy {
  major: string[];  // Breaking changes: feat!, fix!
  minor: string[];  // New features: feat
  patch: string[];  // Bug fixes: fix
  skip: string[];   // No release: chore, docs, style
}
```

**Auto-Generate:**
- CHANGELOG from commit messages
- Release notes from PR descriptions
- Version bump based on conventional commits
- Git tags
- GitHub release with assets

---

## Workflow Patterns

### Pattern 1: Feature Development

```bash
# 1. Agent prompts for planning
Agent: "What are you building?"
You: "Add Sparkles background component"

Agent: "Creating issue and spec..."
# Creates GitHub issue #42

Agent: "Write technical specification"
# Opens editor with template

# 2. After spec approved
Agent: "Creating feature branch: feat/sparkles-background"
git checkout -b feat/sparkles-background

# 3. Development with checkpoints
Agent: "Checkpoint - commit your changes"
git add .
git commit -m "feat: add sparkles component base"

# 4. Ready for review
Agent: "Run pre-PR checks..."
npm run typecheck ✓
npm run lint ✓
npm run build ✓

Agent: "Creating draft PR..."
# Creates PR linked to issue #42

# 5. After tests pass
Agent: "All checks passed! Ready for review."
# Marks PR as ready for review

# 6. After approval
Agent: "Merging PR #43..."
git checkout main
git merge feat/sparkles-background
git push

Agent: "Cleaning up..."
git branch -d feat/sparkles-background
git push origin --delete feat/sparkles-background
```

### Pattern 2: Bug Fix

```bash
Agent: "Bug detected. Creating issue..."
# Issue #44: "Fix sparkles animation lag"

Agent: "Creating hotfix branch: fix/sparkles-lag"
git checkout -b fix/sparkles-lag

# Fix implemented
Agent: "Testing fix..."
npm run test ✓

Agent: "Creating PR for hotfix..."
# Auto-labels as "bug", "hotfix"

# After merge
Agent: "Releasing patch version..."
# v2.0.1 → v2.0.2
```

### Pattern 3: Breaking Change

```bash
Agent: "⚠️ Breaking change detected!"
Agent: "Migration guide required."

# Opens template:
## Breaking Changes in v3.0.0

### What Changed
[Description]

### Migration Path
```bash
# Before
[old code]

# After
[new code]
```

### Why This Change
[Rationale]
```

---

## Integration Points

### With Other Agents

**Sanity Setup Agent:**
- Creates setup branch
- Runs setup wizard
- Creates PR with setup commit
- Tags reviewers

**Schema Builder Agent:**
- Creates schema branch per specification
- Commits schema + component + query
- Runs typegen
- Creates PR

**Validation Agent:**
- Runs on every PR
- Posts results as PR comment
- Blocks merge if tests fail
- Updates status checks

### With MCP Servers

**GitHub MCP:**
```typescript
// Create issue
mcp.github.createIssue({
  title: "Add sparkles component",
  body: specificationContent,
  labels: ["enhancement", "aceternity"],
});

// Create PR
mcp.github.createPR({
  title: "feat: add sparkles background",
  head: "feat/sparkles-background",
  base: "main",
  draft: true,
});

// Add review comment
mcp.github.addReviewComment({
  pr: 43,
  body: "Looks good! ✅",
  event: "APPROVE",
});
```

**Playwright MCP:**
```typescript
// Run E2E tests
mcp.playwright.runTests({
  pattern: "**/*.spec.ts",
  headed: false,
  screenshot: "on-failure",
});
```

**Puppeteer MCP:**
```typescript
// Capture visual regression
mcp.puppeteer.compareScreenshots({
  baseline: "main",
  current: "feat/sparkles-background",
  pages: ["/", "/design-system"],
});
```

---

## Anti-Patterns to Prevent

### ❌ Build Without Planning
```bash
# BAD
git checkout -b feat/new-thing
# starts coding immediately
```

```bash
# GOOD
Agent: "What's your plan?"
# Write spec → Review → Approve → THEN code
```

### ❌ Commit to Main
```bash
# BAD
git checkout main
git commit -m "quick fix"
git push
```

```bash
# GOOD
Agent: "Creating hotfix branch..."
# Branch → Fix → PR → Review → Merge
```

### ❌ Skip Tests
```bash
# BAD
git push --no-verify
```

```bash
# GOOD
Agent: "Running pre-push checks..."
# Tests must pass before push
```

### ❌ Unclear Commits
```bash
# BAD
git commit -m "update stuff"
```

```bash
# GOOD
Agent: "Conventional commit format:"
# feat: add sparkles background component
```

---

## Configuration

### .github-workflow-agent.json
```json
{
  "branchStrategy": "git-flow",
  "requireIssue": true,
  "requireSpec": true,
  "requireTests": true,
  "requireReview": true,
  "autoCreatePR": true,
  "autoLinkIssues": true,
  "enforceConventionalCommits": true,
  "qualityGates": {
    "typeCheck": true,
    "lint": true,
    "build": true,
    "tests": true,
    "e2e": true,
    "lighthouse": 90
  },
  "reviewers": {
    "feat": ["@team-leads"],
    "fix": ["@maintainers"],
    "breaking": ["@core-team"]
  }
}
```

---

## Success Criteria

Agent successfully enforces workflow when:

- [ ] No commits directly to main/develop
- [ ] All features have issues + specs
- [ ] All PRs pass quality gates
- [ ] All code is reviewed before merge
- [ ] Documentation always updated
- [ ] Breaking changes have migration guides
- [ ] Releases are automated
- [ ] Commit history is clean and meaningful

---

## Benefits

### For Individual Developers
- **Consistency:** Same workflow every time
- **Quality:** Can't skip important steps
- **Learning:** Best practices enforced
- **Speed:** Automation handles boilerplate

### For Teams
- **Visibility:** All work tracked in issues/PRs
- **Review:** Easy to review scoped changes
- **History:** Clean, searchable commit history
- **Onboarding:** New devs follow same pattern

### For Projects
- **Reliability:** Tests always run
- **Documentation:** Always up to date
- **Releases:** Automated and consistent
- **Quality:** Maintained over time

---

## Implementation Plan

### Phase 1: Basic Workflow (Week 1)
- [ ] Branch creation automation
- [ ] PR template enforcement
- [ ] Conventional commit validation
- [ ] Basic CI/CD setup

### Phase 2: Quality Gates (Week 2)
- [ ] TypeScript checking
- [ ] Linting enforcement
- [ ] Build verification
- [ ] Test running

### Phase 3: Advanced Features (Week 3)
- [ ] Visual regression testing
- [ ] E2E test integration
- [ ] Release automation
- [ ] CHANGELOG generation

### Phase 4: Team Features (Week 4)
- [ ] Code review assignments
- [ ] Approval workflows
- [ ] Status reporting
- [ ] Metrics dashboard

---

## Example: Complete Feature Workflow

```typescript
// Agent detects intent to build something new
agent.onDetectNewWork(async () => {
  // 1. Planning phase
  const issue = await agent.createIssue({
    title: await agent.prompt("What are you building?"),
    template: "feature_spec",
  });

  const spec = await agent.editSpecification(issue);
  await agent.requestApproval(spec);

  // 2. Setup phase
  const branch = await agent.createBranch({
    type: "feat",
    name: agent.slugify(issue.title),
  });

  // 3. Development phase
  agent.watchForCommits(async (commit) => {
    await agent.validateCommit(commit);
    await agent.runQuickTests();
  });

  // 4. Pre-PR phase
  const checks = await agent.runPrePRChecks();
  if (!checks.allPassed) {
    agent.blockPR(checks.failures);
    return;
  }

  // 5. PR phase
  const pr = await agent.createPR({
    issue: issue.number,
    branch: branch.name,
    draft: true,
  });

  // 6. Testing phase
  const tests = await agent.runFullTests();
  if (tests.passed) {
    await pr.markReady();
    await agent.requestReview(pr);
  }

  // 7. Merge phase
  await pr.onApproved(async () => {
    await agent.mergePR(pr);
    await agent.cleanupBranch(branch);
    await agent.closeIssue(issue);
  });

  // 8. Release phase (if applicable)
  if (agent.shouldRelease(pr)) {
    await agent.createRelease();
  }
});
```

---

**Status:** Specification complete, ready for implementation in v2.1.0
**Dependencies:** GitHub MCP, Playwright MCP, Puppeteer MCP
**Estimated Effort:** 2-3 weeks for full implementation
**Priority:** HIGH - Foundational for proper development workflow
