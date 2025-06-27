"use client";

import { Clock, Users, MoreHorizontal, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IPrompt, IScheduleData } from "@/lib/definition";

export default function PromptItem({
  prompt,
  setPrompts,
  setSelectedPromptDetails,
  setIsPromptDetailsModalOpen,
  setEditingPromptId,
  setScheduleData,
  setIsEditScheduleModalOpen,
}: {
  prompt: IPrompt;
  setPrompts: React.Dispatch<React.SetStateAction<IPrompt[]>>;
  setSelectedPromptDetails: (selectedPromptDetails: IPrompt | null) => void;
  setIsPromptDetailsModalOpen: (isPromptDetailsModalOpen: boolean) => void;
  setEditingPromptId: (editingPromptId: string | null) => void;
  setScheduleData: (scheduleData: IScheduleData) => void;
  setIsEditScheduleModalOpen: (isEditScheduleModalOpen: boolean) => void;
}) {
  const handlePromptClick = (prompt: IPrompt) => {
    setSelectedPromptDetails(prompt);
    setIsPromptDetailsModalOpen(true);
  };

  const togglePromptStatus = (id: string) => {
    setPrompts((prev) =>
      prev.map((prompt) =>
        prompt.id === id ? { ...prompt, isActive: !prompt.isActive } : prompt
      )
    );
  };

  const handleEditSchedule = (promptId: string) => {
    setEditingPromptId(promptId);
    // Load existing schedule data for the prompt
    setScheduleData({
      frequency: "weekly",
      time: "08:00",
      repeatEvery: 1,
      selectedDays: ["mon", "wed", "fri"],
    });
    setIsEditScheduleModalOpen(true);
  };

  const getStatusBadge = (prompt: IPrompt) => {
    if (!prompt.isActive) {
      return (
        <Badge variant="secondary" className="text-gray-600 bg-gray-100">
          Paused
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="text-green-600 bg-green-100">
        Active
      </Badge>
    );
  };
  return (
    <>
      {" "}
      <div
        key={prompt.id}
        className={`bg-white dark:bg-gray-800 rounded-lg border-l-4 ${
          prompt.isActive
            ? "border-l-purple-500"
            : "border-l-gray-300 dark:border-l-gray-600"
        } shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer`}
        onClick={() => handlePromptClick(prompt)}
      >
        <div className="p-6">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {prompt.title}
              </h3>
              {prompt.author && (
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Edit2 className="w-3 h-3" />
                  <span>by {prompt.author}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {getStatusBadge(prompt)}
              <Switch
                checked={prompt.isActive}
                onCheckedChange={() => togglePromptStatus(prompt.id)}
                onClick={(e) => e.stopPropagation()}
                className="data-[state=checked]:bg-purple-600"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleEditSchedule(prompt.id)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Schedule</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {prompt.description}
          </p>

          {/* Footer Row */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Not scheduled</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {prompt.recipients !== undefined && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{prompt.recipients}</span>
                </div>
              )}
              {prompt.lastSent && <span>Last sent {prompt.lastSent}</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
