"use client";

import { useState } from "react";

import { IPrompt, IContact, IScheduleData, INewPrompt } from "@/lib/definition";
import { mockPrompts, mockContacts } from "@/lib/constant";
import {
  PromptItem,
  CreateModal,
  PageHeader,
  SelectContactsModal,
  EditScheduleModal,
  PromptDetail,
} from "@/components/overview/scheduler-page";

export default function SchedulerListPage() {
  const [prompts, setPrompts] = useState<IPrompt[]>(mockPrompts);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
  const [isEditScheduleModalOpen, setIsEditScheduleModalOpen] = useState(false);
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [contacts, setContacts] = useState<IContact[]>(mockContacts);
  const [scheduleData, setScheduleData] = useState<IScheduleData>({
    frequency: "weekly",
    time: "08:00",
    repeatEvery: 1,
    selectedDays: [],
  });
  const [newPrompt, setNewPrompt] = useState<INewPrompt>({
    title: "",
    prompt: "",
    frequency: "",
    time: "",
    sendToSelf: true,
    selectedContacts: 0,
  });

  const [isPromptDetailsModalOpen, setIsPromptDetailsModalOpen] =
    useState(false);
  const [selectedPromptDetails, setSelectedPromptDetails] =
    useState<IPrompt | null>(null);

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <PageHeader setIsCreateModalOpen={setIsCreateModalOpen} />

        {/* Prompts List */}
        <div className="space-y-4">
          {prompts.map((prompt) => (
            <PromptItem
              key={prompt.id}
              prompt={prompt}
              setPrompts={setPrompts}
              setSelectedPromptDetails={setSelectedPromptDetails}
              setIsPromptDetailsModalOpen={setIsPromptDetailsModalOpen}
              setEditingPromptId={setEditingPromptId}
              setScheduleData={setScheduleData}
              setIsEditScheduleModalOpen={setIsEditScheduleModalOpen}
            />
          ))}
        </div>
      </div>

      <CreateModal
        newPrompt={newPrompt}
        setNewPrompt={setNewPrompt}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        setIsContactsModalOpen={setIsContactsModalOpen}
      />

      <SelectContactsModal
        contacts={contacts}
        setContacts={setContacts}
        isContactsModalOpen={isContactsModalOpen}
        setIsContactsModalOpen={setIsContactsModalOpen}
        setNewPrompt={setNewPrompt}
      />

      <EditScheduleModal
        scheduleData={scheduleData}
        editingPromptId={editingPromptId}
        setEditingPromptId={setEditingPromptId}
        setScheduleData={setScheduleData}
        isEditScheduleModalOpen={isEditScheduleModalOpen}
        setIsEditScheduleModalOpen={setIsEditScheduleModalOpen}
      />

      {/* Prompt Details Modal */}
      <PromptDetail
        selectedPromptDetails={selectedPromptDetails}
        isPromptDetailsModalOpen={isPromptDetailsModalOpen}
        setIsPromptDetailsModalOpen={setIsPromptDetailsModalOpen}
      />
    </div>
  );
}
