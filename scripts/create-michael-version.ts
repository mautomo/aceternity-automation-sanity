import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { join } from "path";

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

const michaelContent = {
  _type: "page",
  _id: "michael-version-page",
  title: "Michael Donovan Homepage Version",
  slug: {
    _type: "slug",
    current: "michael-version",
  },
  meta_title: "Your conversations are your most valuable asset - VConic",
  meta_description: "Unlock the full potential of your conversations with VConic. The Conversational OS has arrived to transform how you operate.",
  blocks: [
    // Section 1: Hero - Michael Donovan Version (Business-Focused)
    {
      _type: "hero-1",
      _key: "hero1",
      padding: { top: true, bottom: true },
      colorVariant: "background",
      tagLine: "The Conversational OS",
      title: "Your conversations are your most valuable asset.",
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "It's time to unlock their full potential.",
            },
          ],
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Every conversation across every channel is waiting to transform how you operate. ",
            },
            {
              _type: "span",
              text: "The Conversational OS has arrived.",
              marks: ["strong"],
            },
          ],
        },
      ],
      links: [
        {
          _type: "link",
          _key: "cta1",
          text: "Explore VConic",
          href: "/solutions",
          variant: "default",
        },
        {
          _type: "link",
          _key: "cta2",
          text: "GitHub Repo",
          href: "https://github.com/vcon-dev",
          variant: "outline",
        },
      ],
    },

    // Section 2: Logo Cloud
    {
      _type: "logo-cloud-1",
      _key: "logo-cloud",
      padding: { top: true, bottom: false },
      colorVariant: "background",
      title: "Trusted by Industry Leaders",
      images: [], // Logos will be uploaded via Sanity Studio
    },

    // Section 3: Core Value Propositions
    {
      _type: "grid-row",
      _key: "value-props",
      padding: { top: true, bottom: true },
      colorVariant: "background",
      layout: "three-column",
      columns: [
        {
          _type: "grid-card",
          _key: "card1",
          title: "Data Independence",
          description:
            "Move seamlessly between platforms. Your conversation history travels with you, always accessible, always yours.",
        },
        {
          _type: "grid-card",
          _key: "card2",
          title: "Unified Intelligence",
          description:
            "Transform scattered conversations into strategic insights. Every interaction becomes searchable, analyzable, actionable.",
        },
        {
          _type: "grid-card",
          _key: "card3",
          title: "Effortless Compliance",
          description:
            "Automatic consent tracking across all channels. Governance that works as fast as you do.",
        },
      ],
    },

    // Section 4: Paradigm Shift
    {
      _type: "section-header",
      _key: "paradigm",
      padding: { top: true, bottom: true },
      colorVariant: "muted",
      heading: "The future of communication isn't about choosing platforms.",
      subheading: "It's about owning your data.",
    },

    // Section 5: Timeline
    {
      _type: "timeline-row",
      _key: "journey",
      padding: { top: true, bottom: true },
      colorVariant: "background",
      heading: "The 35-Year Journey",
      timelines: [
        {
          _type: "timeline",
          _key: "t1",
          title: "1989",
          tagLine: "A journey begins",
          body: [{ _type: "block", children: [{ _type: "span", text: "The foundation is laid" }] }],
        },
        {
          _type: "timeline",
          _key: "t2",
          title: "1990s-2010s",
          tagLine: "Decades of Insights",
          body: [{ _type: "block", children: [{ _type: "span", text: "Patterns formulated" }] }],
        },
        {
          _type: "timeline",
          _key: "t3",
          title: "2010s",
          tagLine: "Innovation Accelerates",
          body: [{ _type: "block", children: [{ _type: "span", text: "Standards crystallize" }] }],
        },
        {
          _type: "timeline",
          _key: "t4",
          title: "2024",
          tagLine: "Convergence complete",
          body: [{ _type: "block", children: [{ _type: "span", text: "35 years of expertise" }] }],
        },
        {
          _type: "timeline",
          _key: "t5",
          title: "Now",
          tagLine: "VConic Emerges",
          body: [{ _type: "block", children: [{ _type: "span", text: "The culmination" }] }],
        },
      ],
    },

    // Section 6: The Realization
    {
      _type: "section-header",
      _key: "realization",
      padding: { top: true, bottom: true },
      colorVariant: "muted",
      heading: "What if every conversation became a building block for something greater?",
    },

    // Section 7: Conversational OS
    {
      _type: "section-header",
      _key: "conversational-os-header",
      padding: { top: true, bottom: false },
      colorVariant: "background",
      heading: "The Conversational OS",
      subheading: "A new approach to data that's been hiding in plain sight.",
    },

    {
      _type: "split-row",
      _key: "conversational-os",
      padding: { top: false, bottom: true },
      colorVariant: "background",
      splitColumns: [
        {
          _type: "split-content",
          _key: "col1",
          title: "Conserver",
          tagLine: "Small and nimble, while enormously powerful",
          body: [
            {
              _type: "block",
              children: [
                { _type: "span", text: "• Nimble yet powerful" }
              ]
            },
            {
              _type: "block",
              children: [
                { _type: "span", text: "• Lightweight architecture" }
              ]
            },
            {
              _type: "block",
              children: [
                { _type: "span", text: "• Enterprise-grade security" }
              ]
            },
          ],
        },
        {
          _type: "split-content",
          _key: "col2",
          title: "vCon Standard",
          tagLine: "The foundation of conversational freedom",
          body: [
            {
              _type: "block",
              children: [
                { _type: "span", text: "• IETF draft specification" }
              ]
            },
            {
              _type: "block",
              children: [
                { _type: "span", text: "• Open-source foundation" }
              ]
            },
            {
              _type: "block",
              children: [
                { _type: "span", text: "• Industry-wide compatibility" }
              ]
            },
          ],
        },
      ],
    },

    // Section 8: Six Core Capabilities
    {
      _type: "grid-row",
      _key: "capabilities",
      padding: { top: true, bottom: true },
      colorVariant: "muted",
      layout: "three-column",
      columns: [
        {
          _type: "grid-card",
          _key: "cap1",
          title: "Platform Fluid",
          description: "Seamlessly integrate with any system. Your data flows where you need it.",
        },
        {
          _type: "grid-card",
          _key: "cap2",
          title: "Security First",
          description: "Impenetrable encryption. Lightweight footprint. Heavyweight protection.",
        },
        {
          _type: "grid-card",
          _key: "cap3",
          title: "Omnichannel Native",
          description: "Every platform with words. One unified standard.",
        },
        {
          _type: "grid-card",
          _key: "cap4",
          title: "Performance Optimized",
          description: "Process millions of conversations instantly.",
        },
        {
          _type: "grid-card",
          _key: "cap5",
          title: "Compliance Ready",
          description: "Built-in consent management and governance.",
        },
        {
          _type: "grid-card",
          _key: "cap6",
          title: "Instantly Portable",
          description: "Your complete conversation history. Ready when you are.",
        },
      ],
    },

    // Section 9: The Evolution (Split comparison)
    {
      _type: "section-header",
      _key: "evolution-header",
      padding: { top: true, bottom: false },
      colorVariant: "background",
      heading: "The Evolution",
      subheading: "From fragmented to unified conversation intelligence",
    },

    {
      _type: "split-row",
      _key: "evolution",
      padding: { top: false, bottom: true },
      colorVariant: "background",
      splitColumns: [
        {
          _type: "split-content",
          _key: "col1",
          title: "Traditional Approach",
          body: [
            {
              _type: "block",
              children: [
                { _type: "span", text: "• Multiple platforms, multiple formats" }
              ]
            },
            {
              _type: "block",
              children: [
                { _type: "span", text: "• Conversations in isolated systems" }
              ]
            },
            {
              _type: "block",
              children: [
                { _type: "span", text: "• Complex compliance management" }
              ]
            },
            {
              _type: "block",
              children: [
                { _type: "span", text: "• Limited data accessibility" }
              ]
            },
          ],
        },
        {
          _type: "split-content",
          _key: "col2",
          title: "With VConic",
          body: [
            {
              _type: "block",
              children: [
                { _type: "span", text: "• One standard, endless possibilities" }
              ]
            },
            {
              _type: "block",
              children: [
                { _type: "span", text: "• Unified conversation intelligence" }
              ]
            },
            {
              _type: "block",
              children: [
                { _type: "span", text: "• Automated governance & consent" }
              ]
            },
            {
              _type: "block",
              children: [
                { _type: "span", text: "• Complete data sovereignty" }
              ]
            },
          ],
        },
      ],
    },

    // Section 10: Industry Applications
    {
      _type: "section-header",
      _key: "industries-header",
      padding: { top: true, bottom: false },
      colorVariant: "muted",
      heading: "Leading the Evolution",
    },

    {
      _type: "grid-row",
      _key: "industries",
      padding: { top: false, bottom: true },
      colorVariant: "muted",
      layout: "three-column",
      columns: [
        {
          _type: "grid-card",
          _key: "ind1",
          title: "Contact Centers",
          description: "Transform every interaction into actionable intelligence.",
        },
        {
          _type: "grid-card",
          _key: "ind2",
          title: "CPaaS Providers",
          description: "Offer true data portability as a competitive advantage.",
        },
        {
          _type: "grid-card",
          _key: "ind3",
          title: "Enterprises",
          description: "Unified governance across all communication channels.",
        },
      ],
    },

    // Section 11: Closing Statement
    {
      _type: "section-header",
      _key: "closing",
      padding: { top: true, bottom: true },
      colorVariant: "background",
      heading: "This isn't just Software. It's your competitive Edge.",
    },

    // Section 12: The Opportunity (Stats as grid cards)
    {
      _type: "grid-row",
      _key: "opportunity",
      padding: { top: true, bottom: true },
      colorVariant: "muted",
      layout: "three-column",
      columns: [
        {
          _type: "grid-card",
          _key: "stat1",
          title: "2.7 trillion",
          description: "conversations ready to unlock",
        },
        {
          _type: "grid-card",
          _key: "stat2",
          title: "Infinite",
          description: "integration possibilities",
        },
        {
          _type: "grid-card",
          _key: "stat3",
          title: "1",
          description: "universal standard",
        },
      ],
    },

    // Section 13: Partner. Build. Join.
    {
      _type: "grid-row",
      _key: "final-cta",
      padding: { top: true, bottom: true },
      colorVariant: "background",
      layout: "three-column",
      columns: [
        {
          _type: "grid-card",
          _key: "cta1",
          title: "Experience VConic",
          description: "See it in action. Start your journey today.",
        },
        {
          _type: "grid-card",
          _key: "cta2",
          title: "Partner With Us",
          description: "Integrate the vCon standard. Empower your customers.",
        },
        {
          _type: "grid-card",
          _key: "cta3",
          title: "Explore the Standard",
          description: "Review the IETF draft. Join the open-source community.",
        },
      ],
    },

    // Section 14: Developer Quickstart
    {
      _type: "cta-1",
      _key: "developer-cta",
      padding: { top: true, bottom: true },
      colorVariant: "primary",
      heading: "Start Today",
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Deploy in seconds. Speak with system architects. Download technical specifications.",
            },
          ],
        },
      ],
      links: [
        {
          _type: "link",
          _key: "l1",
          text: "Book a Call",
          href: "/contact",
          variant: "default",
        },
        {
          _type: "link",
          _key: "l2",
          text: "Download Whitepaper",
          href: "/whitepaper",
          variant: "outline",
        },
      ],
    },

    // Section 15: Newsletter
    {
      _type: "form-newsletter",
      _key: "newsletter",
      padding: { top: true, bottom: true },
      colorVariant: "background",
      heading: "Join the Evolution",
      description: "Be the first to know about platform updates, new features, and industry insights.",
    },
  ],
};

async function createMichaelVersion() {
  try {
    console.log("📄 Creating Michael Donovan version page...\n");

    const result = await client.createOrReplace(michaelContent);

    console.log("✅ Michael Donovan version created!");
    console.log(`   Document ID: ${result._id}`);
    console.log(`   Title: ${result.title}`);
    console.log(`   Slug: ${result.slug.current}`);
    console.log(`   Blocks: ${result.blocks.length} sections`);
    console.log("\n✅ Page is live at http://localhost:3005/michael-version");
    console.log("✅ Edit in Studio at http://localhost:3005/studio");
    console.log("\n💡 Note: Logo cloud section is empty - add logos in Studio");
  } catch (error: any) {
    console.error("❌ Failed to create Michael version:", error.message);
    process.exit(1);
  }
}

createMichaelVersion();
