# Contributing to Aceternity Automation Sanity

Thank you for your interest in contributing! This project aims to be the fastest way to build production-ready websites with Next.js, Sanity CMS, and premium UI components.

---

## 🎯 How Can I Contribute?

### 1. Report Bugs

**Before submitting a bug report:**
- Check existing [GitHub Issues](https://github.com/mautomo/aceternity-automation-sanity/issues)
- Verify you're using the latest version
- Test with a clean install if possible

**When submitting a bug report, include:**
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/error messages
- Environment details (OS, Node version, package versions)

### 2. Suggest Features

We love new ideas! Please:
- Check [GitHub Discussions](https://github.com/mautomo/aceternity-automation-sanity/discussions) first
- Explain the problem your feature solves
- Describe your proposed solution
- Consider if it fits the project's scope and vision

### 3. Submit Code

**Types of contributions we're looking for:**
- 🐛 Bug fixes
- ✨ New Aceternity component integrations
- 📚 Documentation improvements
- 🎨 New templates
- 🤖 Agent/skill enhancements
- 🔧 Developer experience improvements
- ⚡ Performance optimizations

---

## 🚀 Development Setup

### Prerequisites

- **Node.js:** 18.17+ or 20.3+
- **Package Manager:** npm or pnpm
- **Sanity Account:** Free at [sanity.io](https://www.sanity.io)
- **Supabase Account:** Free at [supabase.com](https://supabase.com)

### Initial Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/aceternity-automation-sanity.git
cd aceternity-automation-sanity

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Run setup wizard (optional)
npm run setup:aceternity

# 5. Start development server
npm run dev
```

### Environment Variables

Required in `.env.local`:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
SANITY_API_READ_TOKEN=your-read-token

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Brand (optional)
NEXT_PUBLIC_BRAND_NAME="Your Project"
NEXT_PUBLIC_BRAND_PRIMARY_COLOR="#00d71c"
```

---

## 📝 Code Guidelines

### General Principles

1. **Type Safety First** - Full TypeScript, no `any`
2. **Performance Matters** - Consider bundle size and runtime performance
3. **Accessibility** - WCAG AA minimum
4. **Documentation** - Code should be self-documenting with clear comments
5. **Consistency** - Follow existing patterns in the codebase

### Code Style

We use ESLint and TypeScript for code quality:

```bash
# Check types
npm run typecheck

# Run linter
npm run lint

# Build (includes type checking)
npm run build
```

**Key conventions:**
- Use functional components with hooks
- Prefer named exports for components
- Use `const` for React components
- Props should have explicit TypeScript interfaces
- File names: `kebab-case.tsx` for components
- Component names: `PascalCase`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new sparkles background component
fix: correct type error in hero block
docs: update GROQ query examples
refactor: simplify schema builder logic
test: add validation for supabase connection
chore: update dependencies
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code restructuring (no feature change)
- `perf`: Performance improvement
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

---

## 🧩 Contributing Components

### Adding an Aceternity Component

1. **Copy component to project:**
   ```bash
   # Place in appropriate category folder
   components/aceternity/[category]/component-name.tsx
   ```

2. **Fix imports:**
   ```typescript
   // Change from:
   import { motion } from "framer-motion";

   // To:
   import { motion } from "motion/react";
   ```

3. **Run integration script:**
   ```bash
   npm run aceternity:integrate -- component-name "Display Name" "Description" IconName
   ```

4. **Test the component:**
   - Verify in design system: http://localhost:3005/design-system
   - Check Sanity Studio integration
   - Test all props and variations
   - Verify responsive behavior

5. **Document the component:**
   - Add to component README
   - Include usage examples
   - Document all props
   - Add screenshots

### Creating a New Block

Follow the SanityBlocks pattern (3-file approach):

**1. Schema** (`sanity/schemas/blocks/your-block.ts`):
```typescript
import { defineType } from 'sanity';
import { Icon } from 'lucide-react';

export default defineType({
  name: 'yourBlock',
  title: 'Your Block',
  type: 'object',
  icon: Icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    // More fields...
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Your Block',
      };
    },
  },
});
```

**2. Component** (`components/blocks/your-block.tsx`):
```typescript
import { PAGE_QUERYResult } from "@/sanity.types";

type YourBlockProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: "yourBlock" }
>;

export default function YourBlock({ title }: YourBlockProps) {
  return (
    <section>
      {title && <h2>{title}</h2>}
    </section>
  );
}
```

**3. Query** (`sanity/queries/your-block.ts`):
```typescript
import { defineQuery } from 'next-sanity';

export const YOUR_BLOCK_QUERY = defineQuery(`
  _type == "yourBlock" => {
    _type,
    _key,
    title,
  }
`);
```

**4. Register everything:**
- Add schema to `sanity/schema.ts`
- Add component to `components/blocks/index.tsx`
- Add query fragment to `sanity/queries/page.ts`
- Run `npm run typegen`

---

## 🤖 Contributing Agents/Skills

### Agent Structure

Place in `.claude/agents/agent-name.md`:

```markdown
# Agent Name

## Mission
Clear statement of agent's purpose

## Core Responsibilities
1. First responsibility
2. Second responsibility

## Technical Approach
Details on how the agent works

## Success Criteria
- [ ] Measurable outcome 1
- [ ] Measurable outcome 2
```

### Skill Structure

Place in `.claude/skills/skill-name/`:
- `SKILL.md` - Main skill definition
- `prompt.txt` - Skill prompt (if applicable)
- `examples/` - Example files

---

## 📋 Pull Request Process

1. **Create a branch:**
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make your changes:**
   - Write clear, focused commits
   - Follow code guidelines
   - Add tests if applicable
   - Update documentation

3. **Before submitting:**
   ```bash
   # Verify types
   npm run typecheck

   # Run linter
   npm run lint

   # Test build
   npm run build

   # Test Supabase (if applicable)
   npm run test:supabase
   ```

4. **Submit pull request:**
   - Clear, descriptive title
   - Reference related issues
   - Describe changes made
   - Include screenshots for UI changes
   - List breaking changes (if any)

5. **PR template:**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Tested locally
   - [ ] Types pass
   - [ ] Build succeeds
   - [ ] No console errors

   ## Screenshots (if applicable)

   ## Related Issues
   Fixes #123
   ```

---

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR with UI changes:

- [ ] Test in Chrome, Firefox, Safari
- [ ] Test responsive behavior (mobile, tablet, desktop)
- [ ] Check dark mode (if applicable)
- [ ] Verify no console errors
- [ ] Test with screen reader (basic check)
- [ ] Verify loading states
- [ ] Test error states

### Automated Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build verification
npm run build

# Supabase tests
npm run test:supabase
```

---

## 📚 Documentation

### What to Document

- **New features:** Usage examples, API reference
- **Configuration:** Environment variables, options
- **Workflows:** Step-by-step guides
- **Troubleshooting:** Common issues and solutions

### Documentation Standards

- Use clear, concise language
- Include code examples
- Add screenshots for visual features
- Link to related documentation
- Keep it up to date

---

## 🎨 Design Guidelines

### Aceternity Components

- Maintain original component behavior
- Adapt styling to fit Sanity integration
- Document all props thoroughly
- Include usage examples
- Test all animation states

### UI/UX Principles

- **Clarity:** Obvious purpose and function
- **Consistency:** Match existing patterns
- **Performance:** Fast and responsive
- **Accessibility:** Keyboard navigation, screen readers
- **Feedback:** Loading states, error messages

---

## 🐛 Reporting Security Issues

**Do NOT** open public GitHub issues for security vulnerabilities.

Instead, email: security@vconic.com

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

---

## 💬 Communication

### Where to Ask Questions

- **General questions:** [GitHub Discussions](https://github.com/mautomo/aceternity-automation-sanity/discussions)
- **Bug reports:** [GitHub Issues](https://github.com/mautomo/aceternity-automation-sanity/issues)
- **Feature requests:** [GitHub Discussions](https://github.com/mautomo/aceternity-automation-sanity/discussions)

### Response Times

- We aim to respond to issues within 48 hours
- PRs are reviewed within 1 week
- Complex changes may take longer

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Thank You!

Every contribution, no matter how small, makes this project better. We appreciate your time and effort!

**Questions?** Open a [discussion](https://github.com/mautomo/aceternity-automation-sanity/discussions) and we'll help you out.

---

**Last Updated:** January 2025
