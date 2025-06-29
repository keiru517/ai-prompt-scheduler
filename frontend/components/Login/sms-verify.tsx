"use client";

import type React from "react";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { jwtDecode } from "jwt-decode";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ICountry, IDecodedToken } from "@/lib/definition";
import { verifySMS, logIn } from "@/app/action";
import { useUser } from "@/app/contexts/user-context";

export default function SMSVerify({
  resendTimer,
  selectedCountry,
  phoneNumber,
  firstName,
  lastName,
  isLoading,
  setIsLoading,
  setCurrentScreen,
  setResendTimer,
}: {
  resendTimer: number;
  selectedCountry: ICountry;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
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
  const [verifySMSError, setVerifySMSError] = useState("");
  const { setUser } = useUser();

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

  const handleVerifyCode = async () => {
    const code = verificationCode.join("");
    console.log("Verifying code:", code);
    // Handle verification logic here

    try {
      setIsLoading(true);

      const phone_number = selectedCountry.code + phoneNumber;
      const { success, error, data } = await verifySMS({
        phone_number,
        otp_code: code,
      });

      if (error) {
        setVerifySMSError("SMS Code is not correct. Please try again.");
        setResendTimer(0);
      }

      if (success) {
        if (!data?.access_token) return;
        const decoded: IDecodedToken = jwtDecode(data?.access_token);

        const userData = {
          phoneNumber: selectedCountry.code + phoneNumber,
          firstName: firstName || decoded.first_name,
          lastName: lastName || decoded.last_name,
          isVerified: true,
          createdAt: new Date().toISOString(),
        };
        setUser(userData);

        // router.push("/scheduler");
        window.location.href = "/scheduler";
      }
    } catch {
      setVerifySMSError("SMS Code is not correct. Please try again.");
      setResendTimer(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendTimer === 0) {
      console.log("Resending code to:", selectedCountry.code + phoneNumber);
      const phone_number = selectedCountry.code + phoneNumber;
      await logIn({ phone_number });

      setResendTimer(109);
      setVerificationCode(["", "", "", "", ""]);
      setVerifySMSError("");
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
            {isLoading ? "Verifying..." : "Verify Phone"}
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

            {verifySMSError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
                <span className="w-4 h-4 text-red-500">⚠</span>
                {verifySMSError}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
