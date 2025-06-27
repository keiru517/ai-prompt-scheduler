"use client";

import type React from "react";
import { Calendar, Star, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

export default function Header() {
  return (
    <>
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
    </>
  );
}
