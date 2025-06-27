"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ICountry } from "@/lib/definition";
import { regist } from "@/app/action";

export default function SignUp({
  selectedCountry,
  phoneNumber,
  isLoading,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  setIsLoading,
  setCurrentScreen,
  setResendTimer,
}: {
  selectedCountry: ICountry;
  phoneNumber: string;
  isLoading: boolean;
  firstName: string;
  lastName: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCurrentScreen: (currentScreen: "phone" | "verify" | "signup") => void;
  setResendTimer: (resendTimer: number) => void;
}) {
  const [registError, setRegistError] = useState("");

  const handleBackToPhoneFromSignup = () => {
    setCurrentScreen("phone");
    setFirstName("");
    setLastName("");
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRegistError("");

    try {
      const phone_number = selectedCountry.code + phoneNumber;
      const { error, success } = await regist({
        phone_number,
        first_name: firstName,
        last_name: lastName,
      }); // Create new user profile

      if (error) {
        setRegistError("Failed to verify phone number. Please try again.");
      }

      if (success) {
        setCurrentScreen("verify");
        setResendTimer(109);
      }
    } catch {
      setRegistError("Failed to Regist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {" "}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-4 pb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToPhoneFromSignup}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Complete Your Profile
            </h2>
            <p className="text-gray-600">
              Tell us your name to personalize your experience
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSignupSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-purple-500 text-base"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-purple-500 text-base"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              disabled={isLoading || !firstName.trim() || !lastName.trim()}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? "Creating Profile..." : "Continue"}
            </Button>

            {registError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
                <span className="w-4 h-4 text-red-500">⚠</span>
                {registError}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  );
}
