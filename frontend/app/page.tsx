"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Calendar, Star } from "lucide-react";

import { countries } from "@/lib/constant";
import PhoneVerify from "@/components/login/phone-verify";
import SMSVerify from "@/components/login/sms-verify";
import SignUp from "@/components/login/singup";

export default function PhoneVerificationPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [currentScreen, setCurrentScreen] = useState<
    "phone" | "verify" | "signup"
  >("phone");
  const [resendTimer, setResendTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          {/* AI Scheduler Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-purple-500 fill-purple-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Scheduler
            </h1>
            <p className="text-gray-600 text-lg">
              Smart prompts, delivered on time
            </p>
          </div>
        </div>

        {currentScreen === "phone" ? (
          <>
            <PhoneVerify
              selectedCountry={selectedCountry}
              phoneNumber={phoneNumber}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setSelectedCountry={setSelectedCountry}
              setPhoneNumber={setPhoneNumber}
              setCurrentScreen={setCurrentScreen}
              setResendTimer={setResendTimer}
            />
          </>
        ) : currentScreen === "signup" ? (
          <SignUp
            selectedCountry={selectedCountry}
            phoneNumber={phoneNumber}
            isLoading={isLoading}
            firstName={firstName}
            lastName={lastName}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setIsLoading={setIsLoading}
            setCurrentScreen={setCurrentScreen}
            setResendTimer={setResendTimer}
          />
        ) : (
          <SMSVerify
            resendTimer={resendTimer}
            selectedCountry={selectedCountry}
            phoneNumber={phoneNumber}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setCurrentScreen={setCurrentScreen}
            setResendTimer={setResendTimer}
            firstName={firstName}
            lastName={lastName}
          />
        )}
      </div>
    </div>
  );
}
