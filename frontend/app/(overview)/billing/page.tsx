"use client";

import { useState } from "react";
import {
  Calendar,
  Star,
  CreditCard,
  Zap,
  Building2,
  Check,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { Progress } from "@/components/ui/progress";

export type Plan = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  tokens: string;
  tokensLimit: number;
  popular: boolean;
  features: string[];
};

export type PlanFrequency = "monthly" | "annual";

export type Plans = {
  monthly: Plan[];
  annual: Plan[];
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-8 h-8 p-0 rounded-full bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-purple-600 dark:text-purple-400" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-purple-600 dark:text-purple-400" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );

  const currentUsage = {
    tokensUsed: 1250,
    tokensLimit: 5000,
    resetDate: "7/16/2025",
    messagesSent: 8,
    plan: "Free Plan",
  };

  const plans: Plans = {
    monthly: [
      {
        id: "pro-monthly",
        name: "Pro Monthly",
        price: 19,
        tokens: "50k",
        tokensLimit: 50000,
        popular: true,
        features: [
          "Up to 50,000 tokens/month",
          "Unlimited prompts",
          "Priority SMS delivery",
          "Advanced scheduling",
          "Email support",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 99,
        tokens: "250k",
        tokensLimit: 250000,
        popular: false,
        features: [
          "Up to 250,000 tokens/month",
          "Unlimited prompts",
          "White-label SMS",
          "Custom scheduling",
          "Dedicated support",
          "API access",
        ],
      },
    ],
    annual: [
      {
        id: "pro-annual",
        name: "Pro Annual",
        price: 190, // $19 * 12 * 0.83 (17% discount)
        originalPrice: 228,
        tokens: "50k",
        tokensLimit: 50000,
        popular: true,
        features: [
          "Up to 50,000 tokens/month",
          "Unlimited prompts",
          "Priority SMS delivery",
          "Advanced scheduling",
          "Email support",
        ],
      },
      {
        id: "enterprise-annual",
        name: "Enterprise Annual",
        price: 990, // $99 * 12 * 0.83 (17% discount)
        originalPrice: 1188,
        tokens: "250k",
        tokensLimit: 250000,
        popular: false,
        features: [
          "Up to 250,000 tokens/month",
          "Unlimited prompts",
          "White-label SMS",
          "Custom scheduling",
          "Dedicated support",
          "API access",
        ],
      },
    ],
  };

  const usagePercentage =
    (currentUsage.tokensUsed / currentUsage.tokensLimit) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                  <Star className="w-1.5 h-1.5 text-purple-500 fill-purple-500" />
                </div>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              AI Scheduler
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Token Counter */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Tokens: <span className="font-medium">1250 / 5000</span>
            </div>

            {/* User Avatars and Theme Toggle */}
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs dark:bg-blue-900 dark:text-blue-300">
                  A
                </AvatarFallback>
              </Avatar>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Billing & Subscription
              </h2>
            </div>
          </div>

          {/* Current Usage Section */}
          <Card className="mb-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Current Usage
                </h3>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                >
                  {currentUsage.plan}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Token Usage */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tokens used this month
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {currentUsage.tokensUsed.toLocaleString()} /{" "}
                    {currentUsage.tokensLimit.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={usagePercentage}
                  className="h-2 bg-gray-200 dark:bg-gray-700"
                />
              </div>

              {/* Usage Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tokens reset on
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentUsage.resetDate}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Messages sent
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentUsage.messagesSent}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Your Plan Section */}
          <div className="space-y-6">
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

            {/* Plan Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {plans[billingCycle].map((plan) => (
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
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
