import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PlanSectionHeader({
  billingCycle,
  setBillingCycle,
}: {
  billingCycle: "monthly" | "annual";
  setBillingCycle: (billingCycle: "monthly" | "annual") => void;
}) {
  return (
    <>
      {" "}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Upgrade Your Plan
        </h3>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <Button
            variant={billingCycle === "monthly" ? "default" : "ghost"}
            size="sm"
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 text-sm ${
              billingCycle === "monthly"
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === "annual" ? "default" : "ghost"}
            size="sm"
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-2 text-sm relative ${
              billingCycle === "annual"
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Annual
            <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 py-0">
              Save 17%
            </Badge>
          </Button>
        </div>
      </div>
    </>
  );
}
