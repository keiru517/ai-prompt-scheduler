"use client";

import type React from "react";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ICountry } from "@/lib/definition";

export default function SMSVerify({
  resendTimer,
  selectedCountry,
  phoneNumber,
  setCurrentScreen,
  setResendTimer,
}: {
  resendTimer: number;
  selectedCountry: ICountry;
  phoneNumber: string;
  setCurrentScreen: (currentScreen: "phone" | "verify") => void;
  setResendTimer: (resendTime: number) => void;
}) {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleBackToPhone = () => {
    setCurrentScreen("phone");
    setVerificationCode(["", "", "", "", ""]);
    setResendTimer(0);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerifyCode = () => {
    const code = verificationCode.join("");
    console.log("Verifying code:", code);
    // Handle verification logic here
  };

  const handleResendCode = () => {
    if (resendTimer === 0) {
      console.log("Resending code to:", selectedCountry.code + phoneNumber);
      setResendTimer(109);
      setVerificationCode(["", "", "", "", ""]);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
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
              onClick={handleBackToPhone}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">
              Verify Your Phone
            </h2>
            <p className="text-gray-600">Enter the 5-digit code we sent</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700 block text-center">
              Verification Code
            </Label>

            {/* 5-Digit Code Input */}
            <div className="flex justify-center gap-3">
              {verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-lg font-semibold border-2 ${
                    digit ? "border-purple-500 bg-purple-50" : "border-gray-200"
                  } focus:border-purple-500 focus:bg-purple-50`}
                />
              ))}
            </div>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerifyCode}
            disabled={verificationCode.some((digit) => !digit)}
            className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Verify Phone
          </Button>

          {/* Resend Code */}
          <div className="text-center">
            <Button
              variant="link"
              onClick={handleResendCode}
              disabled={resendTimer > 0}
              className="text-gray-500 hover:text-purple-600 disabled:text-gray-400"
            >
              {resendTimer > 0
                ? `Resend Code (${resendTimer}s)`
                : "Resend Code"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
