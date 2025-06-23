"use client";

import type React from "react";
import Image from "next/image";

import { useState } from "react";
import { Calendar, Star } from "lucide-react";
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
import { countries } from "@/lib/countries";

export default function PhoneVerificationPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "Sending verification code to:",
      selectedCountry.code + phoneNumber
    );
    // Handle form submission here
  };

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

        {/* Phone Verification Form */}
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
                            <div className="flex items-center h-full gap-2">
                              <span className="font-medium text-sm">
                                {country.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({country.code})
                              </span>
                            </div>
                          </div>
                          {/* {selectedCountry.iso === country.iso && (
                            <Check className="w-4 h-4 text-purple-600" />
                          )} */}
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
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 h-12 border-2 border-gray-200 focus:border-purple-500 text-base"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Send Verification Code
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
