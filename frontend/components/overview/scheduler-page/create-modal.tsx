"use client";

import { User, ContactIcon as ContactsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { INewPrompt } from "@/lib/definition";

export default function CreateModal({
  newPrompt,
  setNewPrompt,
  isCreateModalOpen,
  setIsCreateModalOpen,
  setIsContactsModalOpen,
}: {
  newPrompt: INewPrompt;
  setNewPrompt: React.Dispatch<React.SetStateAction<INewPrompt>>;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (isCreateModalOpen: boolean) => void;
  setIsContactsModalOpen: (isContactsModalOpen: boolean) => void;
}) {
  return (
    <>
      {" "}
      {/* Create Prompt Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Create AI Prompt
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Prompt Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Prompt Title
              </label>
              <Input
                placeholder="e.g. Daily Weather Update"
                value={newPrompt.title}
                onChange={(e) =>
                  setNewPrompt((prev) => ({ ...prev, title: e.target.value }))
                }
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-purple-500 dark:focus:border-purple-500"
              />
            </div>

            {/* AI Prompt */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                AI Prompt
              </label>
              <Textarea
                placeholder="What question do you want AI to answer? e.g. What's the weather outside today and what should I wear?"
                value={newPrompt.prompt}
                onChange={(e) =>
                  setNewPrompt((prev) => ({ ...prev, prompt: e.target.value }))
                }
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-purple-500 dark:focus:border-purple-500 min-h-[100px] resize-none"
              />
            </div>

            {/* Schedule */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Schedule
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Frequency */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Frequency
                  </label>
                  <Select
                    value={newPrompt.frequency}
                    onValueChange={(value) =>
                      setNewPrompt((prev) => ({ ...prev, frequency: value }))
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select frequency" />
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
                      <SelectItem
                        value="custom"
                        className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Custom
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    Time
                  </label>
                  <div className="relative">
                    <Input
                      type="time"
                      value={newPrompt.time}
                      onChange={(e) =>
                        setNewPrompt((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recipients */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Recipients
              </h3>

              {/* You */}
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    You
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Send to yourself
                  </div>
                </div>
                <Checkbox
                  checked={newPrompt.sendToSelf}
                  onCheckedChange={(checked) =>
                    setNewPrompt((prev) => ({ ...prev, sendToSelf: !!checked }))
                  }
                  className="border-gray-400 dark:border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
              </div>

              {/* Contacts */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <ContactsIcon className="w-4 h-4" />
                    <span>Contacts</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {newPrompt.selectedContacts} selected
                  </span>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setIsContactsModalOpen(true)}
                  className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
                >
                  <ContactsIcon className="w-4 h-4 mr-2" />
                  Select Contacts
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                className="flex-1 bg-white dark:bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle create prompt logic here
                  console.log("Creating prompt:", newPrompt);
                  setIsCreateModalOpen(false);
                  // Reset form
                  setNewPrompt({
                    title: "",
                    prompt: "",
                    frequency: "",
                    time: "",
                    sendToSelf: true,
                    selectedContacts: 0,
                  });
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Create Prompt
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
