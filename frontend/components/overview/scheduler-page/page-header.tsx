"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PageHeader({
  setIsCreateModalOpen,
}: {
  setIsCreateModalOpen: (isCreateModalOpen: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Your Prompts
      </h2>
      <Button
        onClick={() => setIsCreateModalOpen(true)}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Create
      </Button>
    </div>
  );
}
