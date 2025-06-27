import { Star, Zap, Building2, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IPlan } from "@/lib/definition";

export default function PlanCard({
  plan,
  billingCycle,
}: {
  plan: IPlan;
  billingCycle: "monthly" | "annual";
}) {
  return (
    <>
      {" "}
      <Card
        key={plan.id}
        className={`relative bg-white dark:bg-gray-800 border-2 transition-all duration-200 hover:shadow-lg ${
          plan.popular
            ? "border-purple-500 dark:border-purple-400 shadow-lg"
            : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
        }`}
      >
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-purple-600 text-white px-3 py-1">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Most Popular
            </Badge>
          </div>
        )}

        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-2">
            {plan.name.includes("Pro") ? (
              <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            ) : (
              <Building2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
          </div>
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
            {plan.name}
          </h4>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${billingCycle === "annual" ? plan.price : plan.price}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              /{billingCycle === "annual" ? "year" : "month"}
            </span>
          </div>
          {billingCycle === "annual" && plan.originalPrice && (
            <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${plan.originalPrice}/year
            </div>
          )}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {plan.tokens} tokens
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Features List */}
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Subscribe Button */}
          <Button
            className={`w-full mt-6 ${
              plan.popular
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                : "bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
            }`}
            variant={plan.popular ? "default" : "outline"}
          >
            Subscribe
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
