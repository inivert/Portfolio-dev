"use client"

import { GRADIENTS, TRANSITIONS } from "@/constants/styles"
import { cn } from "@/lib/utils"

interface PricingPlanProps {
  name: string
  subtitle: string
  price: number
  monthlyFee?: number
  features?: string[]
  setup?: string[]
  monthlySupport?: string[]
  coreFeatures?: string[]
  monthlyBenefits?: string[]
  paymentTerms?: string[]
}

export function PricingPlan({
  name,
  subtitle,
  price,
  monthlyFee,
  features,
  setup,
  monthlySupport,
  coreFeatures,
  monthlyBenefits,
  paymentTerms,
}: PricingPlanProps) {
  return (
    <div className={cn(
      "group rounded-xl border p-6",
      TRANSITIONS.hover,
      "hover:border-foreground/50 hover:bg-accent/50"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className={cn(
            "text-2xl font-bold",
            GRADIENTS.primary,
            "bg-clip-text text-transparent"
          )}>
            ${price}
          </p>
          {monthlyFee && (
            <p className="text-sm text-muted-foreground">+ ${monthlyFee}/mo</p>
          )}
          {!monthlyFee && price > 0 && (
            <p className="text-sm text-muted-foreground">one-time</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {features && (
          <div>
            <p className="text-sm font-medium mb-2 text-foreground/90">📦 What&apos;s Included</p>
            <ul className="list-none text-sm text-muted-foreground space-y-1.5">
              {features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {setup && (
          <div>
            <p className="text-sm font-medium mb-2 text-foreground/90">🚀 Initial Setup</p>
            <ul className="list-none text-sm text-muted-foreground space-y-1.5">
              {setup.map((item) => (
                <li key={item} className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {monthlySupport && (
          <div>
            <p className="text-sm font-medium mb-2 text-foreground/90">🛠 Monthly Support</p>
            <ul className="list-none text-sm text-muted-foreground space-y-1.5">
              {monthlySupport.map((item) => (
                <li key={item} className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {coreFeatures && (
          <div>
            <p className="text-sm font-medium mb-2 text-foreground/90">💫 Core Features</p>
            <ul className="list-none text-sm text-muted-foreground space-y-1.5">
              {coreFeatures.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {monthlyBenefits && (
          <div>
            <p className="text-sm font-medium mb-2 text-foreground/90">🛡 Monthly Benefits</p>
            <ul className="list-none text-sm text-muted-foreground space-y-1.5">
              {monthlyBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {paymentTerms && (
          <div>
            <p className="text-sm font-medium mb-2 text-foreground/90">💰 Payment Terms</p>
            <ul className="list-none text-sm text-muted-foreground space-y-1.5">
              {paymentTerms.map((term) => (
                <li key={term} className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
} 