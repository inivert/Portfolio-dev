"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PRICING_PLANS } from "@/data/pricing"
import { DATA } from "@/data/resume"
import { COMMON_STYLES, GRADIENTS, TRANSITIONS } from "@/constants/styles"
import Link from "next/link"
import { PricingPlan } from "@/components/ui/pricing-plan"
import { cn } from "@/lib/utils"

export function PricingDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={cn(
          COMMON_STYLES.button.base,
          COMMON_STYLES.button.primary,
          GRADIENTS.primary,
          TRANSITIONS.hover,
          TRANSITIONS.scale,
          'hover:shadow-lg'
        )}>
          View My Rates
        </button>
      </DialogTrigger>
      <DialogContent className={cn(
        COMMON_STYLES.container.dialog,
        TRANSITIONS.hover,
        "p-0" // Remove default padding for better control
      )}>
        {/* Header Section */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b px-6 py-4">
          <DialogHeader>
            <DialogTitle className={cn(
              'text-center text-3xl pb-2',
              GRADIENTS.primary,
              COMMON_STYLES.text.gradient
            )}>
              Choose Your Perfect Plan
            </DialogTitle>
            <p className="text-center text-muted-foreground">
              Select the plan that best fits your needs
            </p>
          </DialogHeader>
        </div>

        {/* Main Content */}
        <div className="px-6 py-4 space-y-8">
          {/* Pricing Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PricingPlan {...PRICING_PLANS.essential} />
            <PricingPlan {...PRICING_PLANS.standard} />
            <PricingPlan {...PRICING_PLANS.professional} />
            <PricingPlan {...PRICING_PLANS.enterprise} />
            <PricingPlan {...PRICING_PLANS.starter} />
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Important Information
              </span>
            </div>
          </div>

          {/* Legal Information */}
          <div className="space-y-6 text-sm">
            {/* Documentation Section */}
            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="font-medium text-foreground mb-3">Required Documentation</h3>
              <div className="space-y-4">
                <ul className="list-none space-y-2">
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2">📄</span>
                    Freelance Service Agreement
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="mr-2">🔒</span>
                    Non-Disclosure Agreement (NDA)
                  </li>
                </ul>
                <div className="text-xs text-muted-foreground/80 space-y-2 border-t pt-2">
                  <p className="font-medium">The Service Agreement includes:</p>
                  <ul className="grid grid-cols-2 gap-2">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Detailed scope of work
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Payment terms & schedule
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Delivery timeline
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Intellectual property rights
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Additional Considerations */}
            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="font-medium text-foreground mb-3">Additional Considerations</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-muted-foreground">
                  <span className="mr-2">💰</span>
                  50% upfront payment required to start
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="mr-2">💾</span>
                  Database and AI API costs not included
                </li>
                <li className="flex items-center text-muted-foreground">
                  <span className="mr-2">💼</span>
                  External service fees discussed during consultation
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t p-4 flex justify-center">
          <Link
            href={`https://wa.me/${DATA.contact.tel.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              "Hi! I'm interested in discussing a web development project. I'd like to schedule a consultation to discuss the details and costs."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center px-6 py-3 rounded-full",
              "bg-foreground text-background font-medium",
              TRANSITIONS.hover,
              "hover:opacity-90 hover:scale-105",
              "group"
            )}
          >
            Schedule a Consultation
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">
              →
            </span>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
