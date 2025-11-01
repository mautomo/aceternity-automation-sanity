import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { join } from "path";

// Load environment variables from .env.local
const envPath = join(process.cwd(), ".env.local");
const envFile = readFileSync(envPath, "utf-8");
const envVars: Record<string, string> = {};

envFile.split("\n").forEach((line) => {
  const match = line.match(/^([^=:#]+)=["']?([^"'\n]+)["']?$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const client = createClient({
  projectId: "48d67bgs",
  dataset: "production",
  apiVersion: "2024-10-25",
  token: envVars.SANITY_API_DEVELOPER_TOKEN,
  useCdn: false,
});

async function integrateMichaelHomepage() {
  console.log("🎨 Integrating Aceternity components into Michael version homepage...\n");

  try {
    // Fetch current Michael version page
    const page = await client.getDocument("michael-version-page");

    if (!page) {
      console.log("⚠️  Michael version page not found!");
      return;
    }

    console.log(`📄 Current page has ${page.blocks?.length || 0} blocks\n`);

    // Get current blocks
    const blocks = page.blocks || [];

    console.log("Current block structure:");
    blocks.forEach((block: any, index: number) => {
      console.log(`  ${index + 1}. ${block._type} ${block.title || block.tagLine || ""}`);
    });

    console.log("\n🔧 Updating blocks with Aceternity components...\n");

    // Strategy: Add Aceternity components while keeping existing content
    // We'll enhance specific sections with Aceternity effects

    const updatedBlocks = blocks.map((block: any, index: number) => {
      // Block 1: Hero - Keep as is (hero-1 is fine)
      // Block 7: Timeline - Replace timeline-row with aceternity.timeline
      if (index === 6 && block._type === "timeline-row") {
        console.log(`  ✓ Enhancing block ${index + 1}: Timeline (aceternity.timeline)`);
        return {
          _type: "aceternity.timeline",
          _key: block._key || `aceternity-timeline-${Date.now()}`,
          title: "The 35-Year Journey",
          subtitle: "Born from Decades of Innovation",
          items: [
            {
              _key: "journey-1",
              _type: "object",
              year: "1989",
              title: "XMPP Origins",
              description: "Jeremie Miller creates the first open messaging protocol",
            },
            {
              _key: "journey-2",
              _type: "object",
              year: "2000s",
              title: "Enterprise Adoption",
              description: "Standards-based messaging enters the enterprise",
            },
            {
              _key: "journey-3",
              _type: "object",
              year: "2019",
              title: "vCon Specification",
              description: "IETF draft-petrie-vcon establishes conversation container standard",
            },
            {
              _key: "journey-4",
              _type: "object",
              year: "2024",
              title: "VConic Platform",
              description: "Production-ready platform built on open standards",
            },
          ],
          padding: { top: true, bottom: true },
          colorVariant: "background",
        };
      }

      // Block 9: Core Capabilities - Replace grid-row with aceternity.bento-grid
      if (index === 8 && block._type === "grid-row") {
        console.log(`  ✓ Enhancing block ${index + 1}: Core Capabilities (aceternity.bento-grid)`);
        return {
          _type: "aceternity.bento-grid",
          _key: block._key || `aceternity-bento-${Date.now()}`,
          title: "Six Core Capabilities",
          items: [
            {
              _key: "capability-1",
              _type: "object",
              title: "Platform Fluid",
              description: "Works with every conversation system. No vendor lock-in, ever.",
              className: "md:col-span-2",
            },
            {
              _key: "capability-2",
              _type: "object",
              title: "Security First",
              description: "Cryptographically signed. Bank-level encryption. Zero-trust architecture.",
              className: "md:col-span-1",
            },
            {
              _key: "capability-3",
              _type: "object",
              title: "Omnichannel Native",
              description: "Voice, video, chat, email. All in one unified format.",
              className: "md:col-span-1",
            },
            {
              _key: "capability-4",
              _type: "object",
              title: "Performance Optimized",
              description: "Built for scale. Handles millions of conversations without breaking a sweat.",
              className: "md:col-span-2",
            },
            {
              _key: "capability-5",
              _type: "object",
              title: "Compliance Ready",
              description: "GDPR, CCPA, HIPAA. Built-in consent management and data governance.",
              className: "md:col-span-1",
            },
            {
              _key: "capability-6",
              _type: "object",
              title: "Instantly Portable",
              description: "Export anytime. Your data, your control, your timeline.",
              className: "md:col-span-1",
            },
          ],
          padding: { top: true, bottom: true },
          colorVariant: "background",
        };
      }

      // Block 13: Closing Statement - Replace with aceternity.text-generate-effect
      if (index === 12 && block._type === "section-header") {
        console.log(`  ✓ Enhancing block ${index + 1}: Closing CTA (aceternity.text-generate-effect)`);
        return {
          _type: "aceternity.text-generate-effect",
          _key: block._key || `aceternity-text-generate-${Date.now()}`,
          title: "The Decision",
          text: "This isn't just software. It's your competitive edge. While your competitors lose 98% of their conversations, you'll capture 100%.",
          duration: 0.8,
          filter: true,
          padding: { top: true, bottom: true },
          colorVariant: "background",
          className: "text-4xl md:text-6xl font-bold text-center",
        };
      }

      // Keep all other blocks as-is
      return block;
    });

    // Update the page
    await client
      .patch("michael-version-page")
      .set({ blocks: updatedBlocks })
      .commit();

    console.log("\n✅ Michael version homepage updated successfully!\n");
    console.log("📊 Summary of changes:");
    console.log("   • Timeline enhanced with Aceternity scroll animation");
    console.log("   • Core Capabilities upgraded to Bento Grid");
    console.log("   • Closing statement now uses Text Generate Effect");
    console.log("\n🌐 View your enhanced homepage:");
    console.log("   http://localhost:3005/michael-version\n");

  } catch (error) {
    console.error("❌ Failed to update Michael version page:", error);
  }
}

integrateMichaelHomepage().catch(console.error);
