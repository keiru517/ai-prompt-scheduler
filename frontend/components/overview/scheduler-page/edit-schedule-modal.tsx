"use client";

import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { IScheduleData } from "@/lib/definition";
import { daysOfWeek } from "@/lib/constant";

export default function EditScheduleModal({
  scheduleData,
  editingPromptId,
  setEditingPromptId,
  setScheduleData,
  isEditScheduleModalOpen,
  setIsEditScheduleModalOpen,
}: {
  scheduleData: IScheduleData;
  editingPromptId: string | null;
  setEditingPromptId: (editingPromptId: string | null) => void;
  setScheduleData: React.Dispatch<React.SetStateAction<IScheduleData>>;
  isEditScheduleModalOpen: boolean;
  setIsEditScheduleModalOpen: (isEditScheduleModalOpen: boolean) => void;
}) {
  const getRepeatUnit = () => {
    switch (scheduleData.frequency) {
      case "daily":
        return "day(s)";
      case "weekly":
        return "week(s)";
      case "monthly":
        return "month(s)";
      default:
        return "time(s)";
    }
  };

  const toggleDaySelection = (dayId: string) => {
    setScheduleData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(dayId)
        ? prev.selectedDays.filter((day) => day !== dayId)
        : [...prev.selectedDays, dayId],
    }));
  };

  const handleUpdateSchedule = () => {
    console.log("Updating schedule for prompt:", editingPromptId, scheduleData);
    setIsEditScheduleModalOpen(false);
    setEditingPromptId(null);
  };

  return (
    <Dialog
      open={isEditScheduleModalOpen}
      onOpenChange={setIsEditScheduleModalOpen}
    >
      <DialogContent className="sm:max-w-[450px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Schedule
            </DialogTitle>
          </div>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditScheduleModalOpen(false)}
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>

        <div className="space-y-6">
          {/* Frequency */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Frequency
            </label>
            <Select
              value={scheduleData.frequency}
              onValueChange={(value) =>
                setScheduleData((prev) => ({ ...prev, frequency: value }))
              }
            >
              <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectItem
                  value="daily"
                  className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Daily
                </SelectItem>
                <SelectItem
                  value="weekly"
                  className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Weekly
                </SelectItem>
                <SelectItem
                  value="monthly"
                  className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Monthly
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Time
            </label>
            <div className="relative">
              <Input
                type="time"
                value={scheduleData.time}
                onChange={(e) =>
                  setScheduleData((prev) => ({
                    ...prev,
                    time: e.target.value,
                  }))
                }
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-500"
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Repeat Every (for weekly/monthly) */}
          {scheduleData.frequency !== "daily" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Repeat every
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  value={scheduleData.repeatEvery}
                  onChange={(e) =>
                    setScheduleData((prev) => ({
                      ...prev,
                      repeatEvery: Number.parseInt(e.target.value) || 1,
                    }))
                  }
                  className="w-20 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {getRepeatUnit()}
                </span>
              </div>
            </div>
          )}

          {/* Days of the week (for weekly) */}
          {scheduleData.frequency === "weekly" && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Days of the week
              </label>
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day.id}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleDaySelection(day.id)}
                    className={`h-10 text-xs ${
                      scheduleData.selectedDays.includes(day.id)
                        ? "bg-purple-600 border-purple-600 text-white hover:bg-purple-700"
                        : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                    }`}
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditScheduleModalOpen(false)}
              className="flex-1 bg-white dark:bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateSchedule}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Update Schedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
