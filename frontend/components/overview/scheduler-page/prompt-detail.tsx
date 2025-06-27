"use client";

import { BarChart3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IPrompt } from "@/lib/definition";

export default function PromptDetail({
  selectedPromptDetails,
  isPromptDetailsModalOpen,
  setIsPromptDetailsModalOpen,
}: {
  selectedPromptDetails: IPrompt | null;
  isPromptDetailsModalOpen: boolean;
  setIsPromptDetailsModalOpen: (isPromptDetailsModalOpen: boolean) => void;
}) {
  return (
    <>
      {" "}
      <Dialog
        open={isPromptDetailsModalOpen}
        onOpenChange={setIsPromptDetailsModalOpen}
      >
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Prompt Details
              </DialogTitle>
            </div>
            {/* <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsPromptDetailsModalOpen(false)}
        className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-white"
      >
        <X className="h-4 w-4" />
      </Button> */}
          </DialogHeader>

          {selectedPromptDetails && (
            <div className="space-y-6">
              {/* Subtitle */}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Token usage, costs, and delivery statistics for &quot;
                {selectedPromptDetails.title}
                &quot;
              </p>
              {/* Token Usage */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Token Usage
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Tokens per message
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ~150
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Average generation cost
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total tokens used
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      1,350
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Lifetime usage
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Analysis */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Cost Analysis
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-1">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Per message
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      $0.003
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      This month
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      $0.27
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Total cost
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      $2.43
                    </div>
                  </div>
                </div>
              </div>

              {/* Send History */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Send History
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total messages sent
                    </span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      9
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      First sent:
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      Nov 15, 2024
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Last sent:
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      Last sent 183 days ago
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Success rate:
                    </span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      100%
                    </span>
                  </div>
                </div>
              </div>

              {/* Recipients */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Recipients
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Active recipients
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedPromptDetails.recipients || 0}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-4">
                <Button
                  onClick={() => setIsPromptDetailsModalOpen(false)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
