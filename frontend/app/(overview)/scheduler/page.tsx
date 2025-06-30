"use client";

import { useState, useEffect } from "react";

import { IPrompt, IContact, IScheduleData, INewPrompt } from "@/lib/definition";
import {
  PromptItem,
  CreateModal,
  PageHeader,
  SelectContactsModal,
  EditScheduleModal,
  PromptDetail,
} from "@/components/overview/scheduler-page";
import { getSchedulerList, getUserList } from "./action";
import { useUser } from "@/app/contexts/user-context";
import Spinner from "@/components/common-components/loading-spinner";

export default function SchedulerListPage() {
  const [prompts, setPrompts] = useState<IPrompt[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
  const [isEditScheduleModalOpen, setIsEditScheduleModalOpen] = useState(false);
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [contacts, setContacts] = useState<IContact[]>([]);
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
    sendToSelf: false,
    selectedContacts: 0,
  });

  const [isPromptDetailsModalOpen, setIsPromptDetailsModalOpen] =
    useState(false);
  const [selectedPromptDetails, setSelectedPromptDetails] =
    useState<IPrompt | null>(null);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchSchedulerList = async () => {
      setIsLoading(true);
      try {
        const { data, error, success } = await getSchedulerList();

        if (error) console.error(error);
        if (success && data) setPrompts(data.prompt_list);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedulerList();
  }, []);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const { data, error, success } = await getUserList();

        if (error) console.error(error);
        if (success && data) setContacts(data.user_list);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchUserList();
  }, []);

  if (isLoading) {
    return <Spinner content="Page Loading..." />;
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <PageHeader setIsCreateModalOpen={setIsCreateModalOpen} />

        {/* Prompts List */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2 space-y-4 elegant-scrollbar">
          {prompts && prompts.length > 0 ? (
            prompts.map((prompt) => (
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
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg border-l-4 border-l-gray-300 dark:border-l-gray-600 shadow-sm p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No Schedulers Exist
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create a new scheduler to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      <CreateModal
        contacts={contacts}
        phone_number={user?.phoneNumber}
        newPrompt={newPrompt}
        setNewPrompt={setNewPrompt}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        setIsContactsModalOpen={setIsContactsModalOpen}
        setPrompts={setPrompts}
        setContacts={setContacts}
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
        setPrompts={setPrompts}
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
