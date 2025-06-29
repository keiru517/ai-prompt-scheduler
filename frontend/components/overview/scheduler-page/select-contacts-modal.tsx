"use client";

import { useState } from "react";
import { X, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { IContact, INewPrompt } from "@/lib/definition";
import { useUser } from "@/app/contexts/user-context";

export default function SelectContactsModal({
  contacts,
  setContacts,
  isContactsModalOpen,
  setIsContactsModalOpen,
  setNewPrompt,
}: {
  contacts: IContact[];
  setContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
  isContactsModalOpen: boolean;
  setIsContactsModalOpen: (isContactsModalOpen: boolean) => void;
  setNewPrompt: React.Dispatch<React.SetStateAction<INewPrompt>>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();

  const getSelectedContacts = () =>
    contacts.filter((contact) => contact.selected);

  const removeSelectedContact = (contactId: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId ? { ...contact, selected: false } : contact
      )
    );
  };

  const getFilteredContacts = () => {
    return contacts.filter(
      (contact) =>
        contact.phone !== user?.phoneNumber &&
        (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.includes(searchQuery))
    );
  };

  const toggleContactSelection = (contactId: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? { ...contact, selected: !contact.selected }
          : contact
      )
    );
  };

  const handleSaveContacts = () => {
    const selectedCount = getSelectedContacts().length;
    setNewPrompt((prev) => ({ ...prev, selectedContacts: selectedCount }));
    setIsContactsModalOpen(false);
  };
  return (
    <>
      <Dialog open={isContactsModalOpen} onOpenChange={setIsContactsModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Select Recipients
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Selected Contacts */}
            {getSelectedContacts().length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Selected ({getSelectedContacts().length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getSelectedContacts().map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      <span>{contact.name}</span>
                      <button
                        onClick={() => removeSelectedContact(contact.id)}
                        className="hover:bg-purple-700 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-purple-500 dark:focus:border-purple-500"
              />
            </div>

            {/* Contacts List */}
            <div className="max-h-80 overflow-y-auto space-y-2">
              {getFilteredContacts().map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => toggleContactSelection(contact.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    contact.selected
                      ? "bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500"
                      : "bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {contact.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {contact.phone}
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      contact.selected
                        ? "bg-purple-600 border-purple-600"
                        : "border-gray-300 dark:border-gray-500"
                    }`}
                  >
                    {contact.selected && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsContactsModalOpen(false)}
                className="flex-1 bg-white dark:bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveContacts}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Save ({getSelectedContacts().length})
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
