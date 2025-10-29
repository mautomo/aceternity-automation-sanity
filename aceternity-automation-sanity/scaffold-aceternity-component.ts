#!/usr/bin/env node
/**
 * Scaffold a new Aceternity component with Sanity CMS integration
 *
 * Usage:
 * npm run scaffold:aceternity -- sparkles "Sparkles Effect" "Animated particle background"
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

interface ComponentConfig {
  name: string;
  displayName: string;
  description: string;
  icon: string;
}

function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-");
}

function generateSchema(config: ComponentConfig): string {
  const { name, displayName, description, icon } = config;
  const kebabName = toKebabCase(name);

  return `import { defineField, defineType } from "sanity";
import { ${icon} } from "lucide-react";

export default defineType({
  name: "aceternity-${kebabName}",
  title: "${displayName}",
  type: "object",
  icon: ${icon},
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Settings" },
    { name: "style", title: "Style" },
  ],
  fields: [
    // Content
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      description: "For organization only (not displayed on frontend)",
      group: "content",
    }),

    // Settings
    defineField({
      name: "intensity",
      title: "Effect Intensity",
      type: "number",
      description: "Intensity of the effect (1-10)",
      initialValue: 5,
      validation: (rule) => rule.min(1).max(10),
      group: "settings",
    }),

    // Style
    defineField({
      name: "colorVariant",
      title: "Color Variant",
      type: "colorVariant",
      initialValue: "background",
      group: "style",
    }),
    defineField({
      name: "padding",
      title: "Section Padding",
      type: "sectionPadding",
      group: "style",
    }),
  ],
  preview: {
    select: {
      title: "title",
      intensity: "intensity",
    },
    prepare({ title, intensity }) {
      return {
        title: title || "${displayName}",
        subtitle: \`Intensity: \${intensity || 5}\`,
        media: ${icon},
      };
    },
  },
});
`;
}

function generateBlockComponent(config: ComponentConfig): string {
  const { name, displayName } = config;
  const kebabName = toKebabCase(name);
  const pascalName = toPascalCase(name);
  const typeName = \`Aceternity\${pascalName}\`;

  return `"use client";

import { ${pascalName}Core } from "@/components/aceternity/animations/${kebabName}";
import { ${typeName} } from "@/sanity.types";
import { stegaClean } from "@sanity/client/stega";
import { cn } from "@/lib/utils";
import SectionContainer from "@/components/ui/section-container";

export default function ${pascalName}Block({
  title,
  intensity,
  colorVariant,
  padding,
}: ${typeName}) {
  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div className="relative">
        {/* Add your Aceternity component here */}
        <${pascalName}Core
          intensity={stegaClean(intensity) || 5}
          className="w-full h-full"
        />

        {/* Content overlay (optional) */}
        {title && (
          <div className="relative z-10">
            <h2 className="text-4xl font-bold">{title}</h2>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
`;
}

function generateReadmeEntry(config: ComponentConfig): string {
  const { name, displayName, description } = config;
  const kebabName = toKebabCase(name);
  const today = new Date().toISOString().split("T")[0];

  return `
## ${displayName}

**Schema:** \`sanity/schemas/blocks/aceternity/${kebabName}.ts\`
**Component:** \`components/blocks/aceternity/${kebabName}-block.tsx\`
**Core:** \`components/aceternity/animations/${kebabName}.tsx\`

**Description:** ${description}

**Added:** ${today}

**Status:** ⚠️ Needs Aceternity core component implementation

**Next Steps:**
1. Add Aceternity core component to \`components/aceternity/animations/${kebabName}.tsx\`
2. Customize schema fields in \`sanity/schemas/blocks/aceternity/${kebabName}.ts\`
3. Update block component props in \`components/blocks/aceternity/${kebabName}-block.tsx\`
4. Register in \`sanity/schemas/index.ts\`
5. Register in \`components/blocks/index.tsx\`
6. Run \`npm run typegen\`

`;
}

function scaffoldComponent(config: ComponentConfig) {
  const { name } = config;
  const kebabName = toKebabCase(name);
  const pascalName = toPascalCase(name);

  console.log(\`\n🚀 Scaffolding Aceternity Component: \${pascalName}\n\`);
  console.log("=".repeat(60));

  // 1. Create schema
  const schemaPath = join(
    process.cwd(),
    "sanity",
    "schemas",
    "blocks",
    "aceternity",
    \`\${kebabName}.ts\`
  );

  if (existsSync(schemaPath)) {
    console.log(\`⚠️  Schema already exists: \${schemaPath}\`);
  } else {
    mkdirSync(join(process.cwd(), "sanity", "schemas", "blocks", "aceternity"), {
      recursive: true,
    });
    writeFileSync(schemaPath, generateSchema(config), "utf-8");
    console.log(\`✅ Created schema: \${schemaPath}\`);
  }

  // 2. Create block component
  const blockPath = join(
    process.cwd(),
    "components",
    "blocks",
    "aceternity",
    \`\${kebabName}-block.tsx\`
  );

  if (existsSync(blockPath)) {
    console.log(\`⚠️  Block component already exists: \${blockPath}\`);
  } else {
    mkdirSync(join(process.cwd(), "components", "blocks", "aceternity"), {
      recursive: true,
    });
    writeFileSync(blockPath, generateBlockComponent(config), "utf-8");
    console.log(\`✅ Created block component: \${blockPath}\`);
  }

  // 3. Create placeholder for core component
  const corePath = join(
    process.cwd(),
    "components",
    "aceternity",
    "animations",
    \`\${kebabName}.tsx\`
  );

  if (!existsSync(corePath)) {
    mkdirSync(join(process.cwd(), "components", "aceternity", "animations"), {
      recursive: true,
    });
    const placeholder = \`"use client";

// TODO: Add Aceternity \${pascalName} component code here
// Source: https://ui.aceternity.com/components or https://pro.aceternity.com/components

export function \${pascalName}Core() {
  return (
    <div>
      <p>Placeholder for \${pascalName} - Add Aceternity component code</p>
    </div>
  );
}
\`;
    writeFileSync(corePath, placeholder, "utf-8");
    console.log(\`⚠️  Created placeholder core component: \${corePath}\`);
    console.log(\`   → Add Aceternity code from https://ui.aceternity.com\`);
  }

  // 4. Output next steps
  console.log("\n" + "=".repeat(60));
  console.log("✅ Scaffolding complete!\n");
  console.log("📝 NEXT STEPS:\n");
  console.log(\`1. Add Aceternity core component code:\`);
  console.log(\`   → Edit: components/aceternity/animations/\${kebabName}.tsx\`);
  console.log(\`   → Copy from: https://ui.aceternity.com/components\n\`);
  console.log(\`2. Customize schema fields:\`);
  console.log(\`   → Edit: sanity/schemas/blocks/aceternity/\${kebabName}.ts\n\`);
  console.log(\`3. Register schema:\`);
  console.log(\`   → Add to: sanity/schemas/index.ts\`);
  console.log(\`   → Import: import aceternity\${pascalName} from "./blocks/aceternity/\${kebabName}"\`);
  console.log(\`   → Add to blocks array\n\`);
  console.log(\`4. Register component:\`);
  console.log(\`   → Add to: components/blocks/index.tsx\`);
  console.log(\`   → Import: import \${pascalName}Block from "./aceternity/\${kebabName}-block"\`);
  console.log(\`   → Add to blockComponents: "aceternity-\${kebabName}": \${pascalName}Block\n\`);
  console.log(\`5. Generate types:\`);
  console.log(\`   → Run: npm run typegen\n\`);
  console.log(\`6. Test in Sanity Studio:\`);
  console.log(\`   → Studio → Presentation → Add Block → Search "\${config.displayName}"\n\`);

  // 5. Update README
  const readmeEntry = generateReadmeEntry(config);
  console.log("📄 Add to documentation:");
  console.log("   → components/aceternity/README.md");
  console.log(readmeEntry);
}

// Main execution
const args = process.argv.slice(2);

if (args.length < 3) {
  console.error(\`
Usage: npm run scaffold:aceternity -- <name> "<display-name>" "<description>" [icon]

Examples:
  npm run scaffold:aceternity -- sparkles "Sparkles Effect" "Animated particle background" Sparkles
  npm run scaffold:aceternity -- animated-beam "Animated Beam" "Connection visualization" Zap
  npm run scaffold:aceternity -- card-3d "3D Card" "Interactive 3D card effect" Box

Arguments:
  name          - Component name (kebab-case, e.g., "sparkles", "animated-beam")
  display-name  - Display name in Sanity (e.g., "Sparkles Effect")
  description   - Component description
  icon          - Optional Lucide icon name (default: "Component")

Available icons: https://lucide.dev/icons
\`);
  process.exit(1);
}

const config: ComponentConfig = {
  name: args[0],
  displayName: args[1],
  description: args[2],
  icon: args[3] || "Component",
};

scaffoldComponent(config);
