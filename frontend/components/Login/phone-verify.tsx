"use client";

import type React from "react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { countries } from "@/lib/constant";
import { ICountry } from "@/lib/definition";
import { logIn } from "@/app/action";

export default function PhoneVerify({
  selectedCountry,
  phoneNumber,
  isLoading,
  setIsLoading,
  setSelectedCountry,
  setPhoneNumber,
  setCurrentScreen,
  setResendTimer,
}: {
  selectedCountry: ICountry;
  phoneNumber: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setSelectedCountry: (selectedCountry: ICountry) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setCurrentScreen: (currentScreen: "phone" | "verify" | "signup") => void;
  setResendTimer: (resendTimer: number) => void;
}) {
  const [phoneNumberVerifyError, setPhoneNumberVerifyError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneNumberVerifyError("");
    setPhoneError("");

    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }

    setIsLoading(true);

    try {
      const phone_number = selectedCountry.code + phoneNumber;
      const { data, error } = await logIn({ phone_number });
      if (error) {
        setPhoneNumberVerifyError(
          "Failed to verify phone number. Please try again."
        );
      }

      if (data?.message === "VERIFY_CODE_SENT") setCurrentScreen("verify");
      else if (data?.message === "REGISTER_REQUIRED")
        setCurrentScreen("signup");

      setResendTimer(109); // Start 109 second countdown
    } catch {
      setPhoneNumberVerifyError(
        "Failed to verify phone number. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    if (phoneNumber === "") return false;
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, "");

    // Check if phone number has appropriate length (7-15 digits)
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      setPhoneError("Phone number must be between 7-15 digits");
      return false;
    }

    // Basic format validation - ensure it contains only numbers, spaces, dashes, parentheses, and plus
    const phoneRegex = /^[+]?[\d\s\-$$$$]+$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Please enter a valid phone number format");
      return false;
    }

    setPhoneError("");
    return true;
  };
  return (
    <>
      {" "}
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2 pb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Enter Your Phone Number
          </h2>
          <p className="text-gray-600">
            {"We'll send you a verification code"}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </Label>

              <div className="flex gap-2">
                {/* Country Code Selector */}
                <Select
                  value={selectedCountry.iso}
                  onValueChange={(value) => {
                    const country = countries.find((c) => c.iso === value);
                    if (country) setSelectedCountry(country);
                  }}
                >
                  <SelectTrigger className="w-32 h-12 border-2 border-gray-200 focus:border-purple-500">
                    <div className="flex items-center gap-2">
                      <Image
                        src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                        alt={selectedCountry.name}
                        width={20}
                        height={16}
                        className="w-5 h-4 object-cover rounded-sm bg-white border"
                      />{" "}
                      <span className="text-sm font-medium">
                        {selectedCountry.code}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {countries.map((country) => (
                      <SelectItem
                        key={country.iso}
                        value={country.iso}
                        className="flex items-center justify-between py-3 px-3 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Image
                            src={`https://flagcdn.com/w40/${country.iso}.png`}
                            alt={selectedCountry.name}
                            width={20}
                            height={16}
                            className="w-5 h-4 object-cover rounded-sm bg-white border"
                          />
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">
                              {country.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {country.code}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Phone Number Input */}
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (phoneError) {
                      validatePhoneNumber(e.target.value);
                    }
                  }}
                  onBlur={() => validatePhoneNumber(phoneNumber)}
                  className="flex-1 h-12 border-2 border-gray-200 focus:border-purple-500 text-base"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {phoneError && (
              <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span className="w-4 h-4 text-red-500">⚠</span>
                {phoneError}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? "Checking..." : "Send Verification Code"}
            </Button>
            {phoneNumberVerifyError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
                <span className="w-4 h-4 text-red-500">⚠</span>
                {phoneNumberVerifyError}
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  );
}
