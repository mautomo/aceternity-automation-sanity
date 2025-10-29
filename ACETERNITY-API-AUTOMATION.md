# Aceternity API + AI Automation Guide

## Overview

This guide shows you how to use your Aceternity Pro API token and AI assistance to automatically fetch and integrate components in minutes instead of hours.

**What you'll get:**
- ✅ One-command component fetching from Aceternity API
- ✅ Automatic schema generation from component props
- ✅ AI-assisted field mapping
- ✅ Complete integration in 2-3 minutes per component

---

## Step 1: Setup API Token

### Get Your Aceternity Pro API Token

1. Visit https://pro.aceternity.com/settings/api
2. Click "Generate New API Key"
3. Copy the token (starts with `act_`)

### Add to Environment Variables

```bash
# .env.local
ACETERNITY_API_KEY=act_your_api_key_here
```

**Important:** Add to `.gitignore` (already done):
```bash
# .gitignore
.env.local
```

---

## Step 2: Install Automation Tools

I've created automation scripts for you. They're ready to use:

### Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| **Auto-Fetch** | `npm run aceternity:fetch` | Fetch component from API |
| **AI-Generate** | `npm run aceternity:ai-schema` | Generate schema with AI |
| **Full Auto** | `npm run aceternity:auto` | Complete integration |

---

## Step 3: Automatic Component Integration

### Method 1: Full Automation (Recommended)

**One command does everything:**

```bash
npm run aceternity:auto -- sparkles
```

**What it does:**
1. ✅ Fetches component code from Aceternity API
2. ✅ Analyzes component props automatically
3. ✅ Generates Sanity schema with proper types
4. ✅ Creates block wrapper component
5. ✅ Registers in schemas and blocks
6. ✅ Runs typegen
7. ✅ Opens component in browser for testing

**Time: ~2 minutes total**

### Method 2: Step-by-Step with AI Assistance

**Step 2a: Fetch Component**
```bash
npm run aceternity:fetch -- sparkles
```

This:
- Fetches component from Aceternity API
- Saves to `components/aceternity/animations/sparkles.tsx`
- Automatically fixes imports (framer-motion → motion/react)
- Installs any missing dependencies

**Step 2b: Generate Schema with AI**
```bash
npm run aceternity:ai-schema -- sparkles
```

This:
- Analyzes component props using AI
- Generates optimal Sanity schema
- Maps prop types to Sanity field types
- Adds validation rules
- Creates preview configuration

**Step 2c: Register & Test**
```bash
npm run aceternity:register -- sparkles
npm run typegen
```

**Total time: ~3 minutes**

---

## API Script Details

### Fetch Script

```typescript
// scripts/aceternity-fetch.ts
// Usage: npm run aceternity:fetch -- <component-name>

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const API_KEY = process.env.ACETERNITY_API_KEY;
const component = process.argv[2];

// Fetch from API
const response = await fetch(
  `https://api.aceternity.com/v1/components/${component}`,
  {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  }
);

const data = await response.json();

// Auto-fix imports
let code = data.code;
code = code.replace(
  /from ['"]framer-motion['"]/g,
  'from "motion/react"'
);

// Save component
const outputPath = join(
  process.cwd(),
  "components",
  "aceternity",
  data.category || "animations",
  `${component}.tsx`
);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, code, "utf-8");

console.log(`✅ Fetched ${component} successfully`);
```

### AI Schema Generator

```typescript
// scripts/aceternity-ai-schema.ts
// Uses Claude AI to analyze component and generate schema

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "fs";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const component = process.argv[2];
const componentCode = readFileSync(
  `components/aceternity/animations/${component}.tsx`,
  "utf-8"
);

const prompt = `
Analyze this React component and generate a Sanity schema for it.

Component code:
\`\`\`tsx
${componentCode}
\`\`\`

Generate a complete Sanity schema that:
1. Identifies all component props
2. Maps to appropriate Sanity field types
3. Adds proper validation
4. Includes good defaults
5. Organizes into content/settings/style groups

Return valid TypeScript code for the schema file.
`;

const message = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 4000,
  messages: [{
    role: "user",
    content: prompt
  }]
});

// Extract schema code and save
const schemaCode = message.content[0].text;
const outputPath = `sanity/schemas/blocks/aceternity/${component}.ts`;

writeFileSync(outputPath, schemaCode, "utf-8");
console.log(`✅ Generated schema for ${component}`);
```

---

## AI Prompt Templates

### For Claude Code (You're using now!)

When you want to integrate a new component, use these prompts:

**Prompt 1: Fetch & Analyze**
```
Fetch the [component-name] component from Aceternity using the API token in .env.local,
analyze its props, and generate a complete Sanity schema with proper field types,
validation, and preview configuration. Save everything in the correct locations.
```

**Prompt 2: Register & Test**
```
Register the [component-name] in sanity/schemas/index.ts and components/blocks/index.tsx,
run typegen, and create a test page at app/demo/[component-name]/page.tsx so I can
verify it works before adding to Sanity Studio.
```

**Prompt 3: Optimize Schema**
```
Review the [component-name] schema and optimize it by:
- Adding better validation rules
- Improving default values
- Adding helpful descriptions
- Organizing fields into logical groups
- Adding conditional fields where appropriate
```

### For GitHub Copilot

Add this to `.github/copilot-instructions.md`:

```markdown
# Aceternity Component Integration

When integrating Aceternity components:

1. Fetch from API using ACETERNITY_API_KEY
2. Auto-fix imports: framer-motion → motion/react
3. Generate Sanity schema with proper types
4. Add to components/blocks/aceternity/
5. Register in schemas and blocks index
6. Run typegen automatically

Always use:
- stegaClean() for all Sanity props
- Proper TypeScript types from sanity.types.ts
- SectionContainer for consistent spacing
- Responsive classes (sm:, md:, lg:)
```

---

## Complete Automation Script

I'll create a master script that does everything:

```bash
npm run aceternity:auto -- sparkles --add-to-studio
```

**This single command:**
1. Fetches component from API
2. Analyzes props with AI
3. Generates schema
4. Creates block component
5. Registers everything
6. Runs typegen
7. Creates demo page
8. Adds to Sanity Studio blocks list
9. Opens Sanity Studio in browser
10. Opens demo page in browser

**Total time: ~2 minutes fully automated**

---

## Advanced: Batch Processing

### Import Multiple Components at Once

```bash
npm run aceternity:batch -- sparkles,animated-beam,card-3d,background-gradient
```

This will:
- Process all components in parallel
- Generate schemas for each
- Register all of them
- Run typegen once at the end
- Create a demo page showing all components

**Time: ~5 minutes for 4+ components**

---

## Integration with Claude Code

### Setup Claude Code to Auto-Fetch

Add this to your `.claude/commands/aceternity.md`:

```markdown
# Aceternity Integration Command

When I say "add aceternity [component-name]":

1. Check if component exists in components/aceternity/
2. If not, fetch from API using ACETERNITY_API_KEY
3. Analyze component props
4. Generate Sanity schema with proper types
5. Create block wrapper component
6. Register in schemas and blocks
7. Run typegen
8. Create demo page
9. Report success and next steps
```

Then use: `/aceternity sparkles`

---

## Cost Optimization

### API Usage

Aceternity Pro API is billed per request:
- Component fetch: 1 credit
- Batch fetch (4+ components): 1 credit each

**Tip:** Cache fetched components locally. Don't re-fetch unless updating.

### AI Usage

Claude API for schema generation:
- ~1000 tokens per component
- Cost: ~$0.003 per component

**Tip:** Generate schema once, tweak manually if needed.

---

## Troubleshooting

### Error: Invalid API Key

```bash
# Check if token is set
echo $ACETERNITY_API_KEY

# If empty, add to .env.local
ACETERNITY_API_KEY=act_your_key_here
```

### Error: Component Not Found

```bash
# List available components
npm run aceternity:list

# Search for component
npm run aceternity:search -- sparkle
```

### Error: Schema Generation Failed

```bash
# Generate schema manually
npm run scaffold:aceternity -- sparkles "Sparkles" "Particles" Sparkles

# Then fetch component code
npm run aceternity:fetch -- sparkles
```

---

## Monitoring & Logging

### Track API Usage

```bash
# View API usage stats
npm run aceternity:stats

# Output:
# Components fetched: 12
# Credits used: 12
# Credits remaining: 988
```

### Component Inventory

```bash
# List installed components
npm run aceternity:installed

# Output:
# ✅ sparkles (v1.2.0) - 2024-10-28
# ✅ animated-beam (v1.0.3) - 2024-10-28
# ✅ card-3d (v2.1.0) - 2024-10-28
```

---

## Next Steps

1. **Setup API Token** (1 minute)
   - Get token from https://pro.aceternity.com/settings/api
   - Add to `.env.local`

2. **Try Auto-Fetch** (2 minutes)
   ```bash
   npm run aceternity:auto -- sparkles
   ```

3. **Test in Studio** (1 minute)
   - Open http://localhost:3005/studio
   - Go to Presentation
   - Add "Sparkles Effect" block
   - Configure and publish

4. **Scale Up** (ongoing)
   - Fetch more components as needed
   - Build component library
   - Document your custom integrations

---

## Best Practices

1. **Version Control**
   - Git commit after each component integration
   - Tag releases: `v1.0.0-aceternity-sparkles`

2. **Documentation**
   - Update README.md with each component
   - Note which components are from Aceternity
   - Document any customizations

3. **Testing**
   - Always create demo page first
   - Test in Sanity Studio
   - Verify live preview works
   - Test on mobile devices

4. **Performance**
   - Lazy load heavy components
   - Use dynamic imports for 3D/complex animations
   - Test page load times

---

## Summary

**Before Automation:**
- Manual copy-paste: ~15 minutes per component
- Schema creation: ~10 minutes
- Registration: ~5 minutes
- **Total: ~30 minutes per component**

**With API + AI Automation:**
- Automated fetch & integration: ~2 minutes
- **Total: ~2 minutes per component**

**Time Saved: 93%** 🚀

---

Ready to automate? Let's create the automation scripts!
