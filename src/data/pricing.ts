export const PRICING_PLANS = {
  starter: {
    name: "🌟 Starter Plan",
    subtitle: "Quick launch with templates",
    price: 100,
    monthlyFee: 15,
    features: [
      "Pre-built templates only",
      "Basic customization",
      "Hosting included",
      "Free domain",
      "Text/image updates only"
    ]
  },
  essential: {
    name: "✨ Essential Plan",
    subtitle: "Basic website with maintenance",
    price: 160,
    monthlyFee: 30,
    setup: [
      "50% upfront ($80)",
      "50% upon completion ($80)",
      "Up to 5 pages"
    ],
    monthlySupport: [
      "Hosting included",
      "Basic updates (code only)",
      "Optional domain (+$5/mo)",
      "Complex updates: $15/request"
    ]
  },
  standard: {
    name: "💎 Standard Plan",
    subtitle: "One-time fee, self-hosted",
    price: 350,
    features: [
      "Up to 5 custom pages",
      "50% upfront ($175)",
      "50% upon delivery ($175)",
      "Complete source code",
      "Self-hosting guide included"
    ]
  },
  professional: {
    name: "🚀 Professional Plan",
    subtitle: "Advanced features + support",
    price: 650,
    monthlyFee: 55,
    coreFeatures: [
      "Database & user authentication",
      "Admin dashboard access",
      "Accept payments",
      "AI integrations available",
      "Custom animations"
    ],
    monthlyBenefits: [
      "Premium hosting included",
      "Priority support & updates",
      "Free domain registration"
    ]
  },
  enterprise: {
    name: "🏆 Enterprise Plan",
    subtitle: "Full ownership, one-time fee",
    price: 1800,
    features: [
      "All Professional features",
      "Full source code ownership",
      "Deployment assistance",
      "30 days premium support",
      "Self-hosting documentation"
    ],
    paymentTerms: [
      "50% upfront ($900)",
      "50% upon delivery ($900)"
    ]
  }
}
