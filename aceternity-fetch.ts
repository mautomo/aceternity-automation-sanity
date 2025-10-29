#!/usr/bin/env node
/**
 * Fetch Aceternity component from Pro API
 *
 * Usage:
 * npm run aceternity:fetch -- sparkles
 * npm run aceternity:fetch -- animated-beam --category animations
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { readFileSync } from "fs";

// Load environment variables
const envPath = join(process.cwd(), ".env.local");
let API_KEY = process.env.ACETERNITY_API_KEY;

if (!API_KEY && existsSync(envPath)) {
  const envFile = readFileSync(envPath, "utf-8");
  const match = envFile.match(/ACETERNITY_API_KEY=(.+)/);
  if (match) {
    API_KEY = match[1].trim().replace(/["']/g, "");
  }
}

interface FetchOptions {
  component: string;
  category?: string;
  force?: boolean;
}

async function fetchComponent(options: FetchOptions) {
  const { component, category = "animations", force = false } = options;

  console.log(`\n🔄 Fetching ${component} from Aceternity API...\n`);
  console.log("=".repeat(60));

  // Check API key
  if (!API_KEY) {
    console.error(\`\n❌ ERROR: ACETERNITY_API_KEY not found

Please add your API key to .env.local:

1. Get API key from: https://pro.aceternity.com/settings/api
2. Add to .env.local:
   ACETERNITY_API_KEY=act_your_key_here
3. Restart the script

\`);
    process.exit(1);
  }

  // Check if component already exists
  const outputPath = join(
    process.cwd(),
    "components",
    "aceternity",
    category,
    \`\${component}.tsx\`
  );

  if (existsSync(outputPath) && !force) {
    console.log(\`⚠️  Component already exists: \${outputPath}\`);
    console.log(\`   Use --force to overwrite\n\`);
    return;
  }

  try {
    // Fetch from Aceternity API
    console.log(\`📡 Requesting from Aceternity API...\`);

    // Note: This is a placeholder URL structure
    // Adjust based on actual Aceternity API documentation
    const apiUrl = \`https://api.aceternity.com/v1/components/\${component}\`;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: \`Bearer \${API_KEY}\`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.error(\`\n❌ ERROR: Invalid API key

Please check your ACETERNITY_API_KEY in .env.local
Get a new key from: https://pro.aceternity.com/settings/api
\`);
        process.exit(1);
      }

      if (response.status === 404) {
        console.error(\`\n❌ ERROR: Component "\${component}" not found

Try searching for available components:
npm run aceternity:search -- \${component}

Or browse: https://pro.aceternity.com/components
\`);
        process.exit(1);
      }

      throw new Error(\`API request failed: \${response.status} \${response.statusText}\`);
    }

    const data = await response.json();
    console.log(\`✅ Component fetched successfully\n\`);

    // Auto-fix imports
    console.log(\`🔧 Fixing imports...\`);
    let code = data.code || data.source || "";

    // Fix framer-motion imports
    code = code.replace(
      /from\s+['"]framer-motion['"]/g,
      'from "motion/react"'
    );

    // Fix path aliases if needed
    code = code.replace(
      /from\s+['"]@\/lib\/utils['"]/g,
      'from "@/lib/utils"'
    );

    console.log(\`✅ Imports fixed\n\`);

    // Create directory and save
    console.log(\`💾 Saving component...\`);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, code, "utf-8");
    console.log(\`✅ Saved to: \${outputPath}\n\`);

    // Check dependencies
    console.log(\`📦 Checking dependencies...\`);
    const deps = data.dependencies || [];

    if (deps.length > 0) {
      console.log(\`   Required dependencies:\`);
      deps.forEach((dep: string) => {
        console.log(\`   - \${dep}\`);
      });

      console.log(\`\n   Install with:\`);
      console.log(\`   npm install \${deps.join(" ")}\n\`);
    } else {
      console.log(\`✅ No additional dependencies needed\n\`);
    }

    // Success summary
    console.log("=".repeat(60));
    console.log(\`\n✅ SUCCESS! Component fetched and saved\n\`);
    console.log(\`📝 NEXT STEPS:\n\`);
    console.log(\`1. Generate Sanity schema:\`);
    console.log(\`   npm run aceternity:ai-schema -- \${component}\n\`);
    console.log(\`2. Or use full automation:\`);
    console.log(\`   npm run aceternity:auto -- \${component}\n\`);
    console.log(\`3. Or scaffold manually:\`);
    console.log(\`   npm run scaffold:aceternity -- \${component} "Display Name" "Description"\n\`);

  } catch (error: any) {
    console.error(\`\n❌ ERROR: Failed to fetch component\n\`);
    console.error(error.message);

    if (error.cause) {
      console.error(\`\nCause: \${error.cause}\`);
    }

    console.error(\`\n💡 TROUBLESHOOTING:\n\`);
    console.error(\`1. Check API key is valid\`);
    console.error(\`2. Verify component name is correct\`);
    console.error(\`3. Check internet connection\`);
    console.error(\`4. Try browsing: https://pro.aceternity.com/components\n\`);

    process.exit(1);
  }
}

// Parse arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error(\`
Usage: npm run aceternity:fetch -- <component-name> [options]

Options:
  --category <name>    Category folder (default: animations)
  --force              Overwrite if exists

Examples:
  npm run aceternity:fetch -- sparkles
  npm run aceternity:fetch -- card-3d --category cards
  npm run aceternity:fetch -- animated-beam --force

Available at: https://pro.aceternity.com/components
\`);
  process.exit(1);
}

const component = args[0];
const category = args.includes("--category")
  ? args[args.indexOf("--category") + 1]
  : "animations";
const force = args.includes("--force");

fetchComponent({ component, category, force });
