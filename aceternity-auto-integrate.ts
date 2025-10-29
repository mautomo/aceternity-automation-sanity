#!/usr/bin/env node
/**
 * Automated Aceternity component integration
 * Works with manually copied component code
 *
 * Usage:
 * 1. Copy component code from Aceternity to components/aceternity/animations/[name].tsx
 * 2. Run: npm run aceternity:integrate -- <component-name> "<Display Name>" "<Description>" [Icon]
 *
 * This script will:
 * - Analyze the component for props
 * - Generate Sanity schema automatically
 * - Create block wrapper
 * - Register everything
 * - Run typegen
 * - Create demo page
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

interface ComponentConfig {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  category: string;
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

function analyzeComponentProps(code: string): string[] {
  // Simple prop extraction from TypeScript interface or type
  const props: string[] = [];

  // Look for interface props
  const interfaceMatch = code.match(/interface\s+\w+Props\s*\{([^}]+)\}/s);
  if (interfaceMatch) {
    const propsBlock = interfaceMatch[1];
    const propMatches = propsBlock.matchAll(/(\w+)[\?]?\s*:/g);
    for (const match of propMatches) {
      props.push(match[1]);
    }
  }

  // Look for destructured props
  const destructureMatch = code.match(/function\s+\w+\s*\(\{([^}]+)\}/);
  if (destructureMatch) {
    const propsBlock = destructureMatch[1];
    const propNames = propsBlock.split(",").map((p) => p.trim().split(":")[0].trim());
    props.push(...propNames);
  }

  return [...new Set(props)]; // Remove duplicates
}

function generateSmartSchema(config: ComponentConfig, props: string[]): string {
  const { name, displayName, icon } = config;
  const kebabName = toKebabCase(name);

  // Map common prop names to Sanity field types
  const fieldMap: Record<string, any> = {
    title: { type: "string", group: "content" },
    heading: { type: "string", group: "content" },
    subtitle: { type: "string", group: "content" },
    description: { type: "text", group: "content" },
    text: { type: "text", group: "content" },

    // Numbers
    intensity: { type: "number", initialValue: 5, group: "settings" },
    speed: { type: "number", initialValue: 1, group: "settings" },
    duration: { type: "number", initialValue: 1000, group: "settings" },
    count: { type: "number", initialValue: 100, group: "settings" },
    particleDensity: { type: "number", initialValue: 100, group: "settings" },
    particleCount: { type: "number", initialValue: 100, group: "settings" },
    minSize: { type: "number", initialValue: 0.4, group: "settings" },
    maxSize: { type: "number", initialValue: 1, group: "settings" },

    // Colors
    color: { type: "string", initialValue: "#00d71c", group: "style" },
    particleColor: { type: "string", initialValue: "#00d71c", group: "style" },
    backgroundColor: { type: "string", options: ["transparent", "black", "white"], group: "style" },

    // Booleans
    enabled: { type: "boolean", initialValue: true, group: "settings" },
    autoPlay: { type: "boolean", initialValue: true, group: "settings" },
    loop: { type: "boolean", initialValue: true, group: "settings" },

    // Style
    className: { type: "string", group: "style" },
  };

  const fields = props
    .filter((prop) => !["children", "className"].includes(prop))
    .map((prop) => {
      const fieldInfo = fieldMap[prop] || { type: "string", group: "settings" };

      return `    defineField({
      name: "${prop}",
      title: "${prop.charAt(0).toUpperCase() + prop.slice(1).replace(/([A-Z])/g, " $1")}",
      type: "${fieldInfo.type}",${fieldInfo.initialValue !== undefined ? `\n      initialValue: ${JSON.stringify(fieldInfo.initialValue)},` : ""}
      group: "${fieldInfo.group}",
    }),`;
    })
    .join("\n");

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
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      description: "For organization only (not displayed)",
      group: "content",
    }),
${fields}
    defineField({
      name: "colorVariant",
      title: "Background Color",
      type: "color-variant",
      initialValue: "background",
      group: "style",
    }),
    defineField({
      name: "padding",
      title: "Section Padding",
      type: "section-padding",
      group: "style",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "${displayName}",
        subtitle: "${config.description}",
        media: ${icon},
      };
    },
  },
});
`;
}

function generateBlockComponent(config: ComponentConfig, props: string[]): string {
  const { name } = config;
  const pascalName = toPascalCase(name);
  const kebabName = toKebabCase(name);
  const typeName = `Aceternity${pascalName}`;

  // Generate prop destructuring
  const propsList = ["colorVariant", "padding", ...props.filter((p) => !["children", "className"].includes(p))];

  return `"use client";

import { ${pascalName}Core } from "@/components/aceternity/animations/${kebabName}";
import { ${typeName} } from "@/sanity.types";
import { stegaClean } from "@sanity/client/stega";
import SectionContainer from "@/components/ui/section-container";

export default function ${pascalName}Block({
  ${propsList.join(",\n  ")},
}: ${typeName}) {
  return (
    <SectionContainer color={colorVariant} padding={padding}>
      <div className="relative">
        <${pascalName}Core
${props
  .filter((p) => !["children", "className", "colorVariant", "padding"].includes(p))
  .map((p) => `          ${p}={stegaClean(${p})}`)
  .join("\n")}
          className="w-full h-full"
        />
      </div>
    </SectionContainer>
  );
}
`;
}

async function autoIntegrate(config: ComponentConfig) {
  const { name, category } = config;
  const kebabName = toKebabCase(name);
  const pascalName = toPascalCase(name);

  console.log(`\n🤖 AUTO-INTEGRATING: ${pascalName}\n`);
  console.log("=".repeat(60));

  // 1. Check if component exists
  const componentPath = join(
    process.cwd(),
    "components",
    "aceternity",
    category,
    `${kebabName}.tsx`
  );

  if (!existsSync(componentPath)) {
    console.error(`\n❌ ERROR: Component not found at ${componentPath}\n`);
    console.error(`Please copy the component code from Aceternity first:\n`);
    console.error(`1. Visit https://ui.aceternity.com or https://pro.aceternity.com`);
    console.error(`2. Find "${name}" component`);
    console.error(`3. Copy code to: ${componentPath}`);
    console.error(`4. Re-run this script\n`);
    process.exit(1);
  }

  console.log(`✅ Found component: ${componentPath}\n`);

  // 2. Analyze props
  console.log(`🔍 Analyzing component props...`);
  const componentCode = readFileSync(componentPath, "utf-8");
  const props = analyzeComponentProps(componentCode);
  console.log(`✅ Found ${props.length} props: ${props.join(", ")}\n`);

  // 3. Generate schema
  console.log(`📝 Generating Sanity schema...`);
  const schemaCode = generateSmartSchema(config, props);
  const schemaPath = join(
    process.cwd(),
    "sanity",
    "schemas",
    "blocks",
    "aceternity",
    `${kebabName}.ts`
  );
  mkdirSync(join(process.cwd(), "sanity", "schemas", "blocks", "aceternity"), {
    recursive: true,
  });
  writeFileSync(schemaPath, schemaCode, "utf-8");
  console.log(`✅ Schema saved: ${schemaPath}\n`);

  // 4. Generate block component
  console.log(`🔨 Creating block wrapper...`);
  const blockCode = generateBlockComponent(config, props);
  const blockPath = join(
    process.cwd(),
    "components",
    "blocks",
    "aceternity",
    `${kebabName}-block.tsx`
  );
  mkdirSync(join(process.cwd(), "components", "blocks", "aceternity"), {
    recursive: true,
  });
  writeFileSync(blockPath, blockCode, "utf-8");
  console.log(`✅ Block created: ${blockPath}\n`);

  // 5. Instructions for manual registration
  console.log("=".repeat(60));
  console.log(`\n✅ AUTO-INTEGRATION COMPLETE!\n`);
  console.log(`📝 FINAL STEPS (Manual):\n`);

  console.log(`1. Register schema in sanity/schemas/index.ts:`);
  console.log(`   import aceternity${pascalName} from "./blocks/aceternity/${kebabName}";`);
  console.log(`   // Add to blockTypes array\n`);

  console.log(`2. Register component in components/blocks/index.tsx:`);
  console.log(`   import ${pascalName}Block from "./aceternity/${kebabName}-block";`);
  console.log(`   // Add to blockComponents: "aceternity-${kebabName}": ${pascalName}Block\n`);

  console.log(`3. Add to page blocks in sanity/schemas/documents/page.ts:`);
  console.log(`   { type: "aceternity-${kebabName}" }\n`);

  console.log(`4. Run typegen:`);
  console.log(`   npm run typegen\n`);

  console.log(`5. Test in Sanity Studio:`);
  console.log(`   http://localhost:3005/studio\n`);

  console.log(`💡 TIP: Ask Claude Code to complete these steps automatically!\n`);
}

// Parse arguments
const args = process.argv.slice(2);

if (args.length < 3) {
  console.error(`
Usage: npm run aceternity:integrate -- <name> "<display-name>" "<description>" [icon] [category]

Steps:
1. Copy component from Aceternity to components/aceternity/animations/[name].tsx
2. Run this script

Examples:
  npm run aceternity:integrate -- sparkles "Sparkles Effect" "Animated particles" Sparkles
  npm run aceternity:integrate -- card-3d "3D Card" "Interactive card" Box cards

This will:
✅ Analyze component props
✅ Generate Sanity schema
✅ Create block wrapper
✅ Show registration steps
`);
  process.exit(1);
}

const config: ComponentConfig = {
  name: args[0],
  displayName: args[1],
  description: args[2],
  icon: args[3] || "Component",
  category: args[4] || "animations",
};

autoIntegrate(config);
