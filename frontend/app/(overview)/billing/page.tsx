"use client";

import { useState } from "react";

import {
  PageHeader,
  CurrentUsageSection,
  PlanCard,
  PlanSectionHeader,
} from "@/components/overview/billing";
import { currentUsage, plans } from "@/lib/constant";

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );

  const usagePercentage =
    (currentUsage.tokensUsed / currentUsage.tokensLimit) * 100;

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <PageHeader />

        {/* Current Usage Section */}
        <CurrentUsageSection usagePercentage={usagePercentage} />

        {/* Upgrade Your Plan Section */}
        <div className="space-y-6">
          <PlanSectionHeader
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
          />

          {/* Plan Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {plans[billingCycle].map((plan) => (
              <PlanCard key={plan.id} plan={plan} billingCycle={billingCycle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
