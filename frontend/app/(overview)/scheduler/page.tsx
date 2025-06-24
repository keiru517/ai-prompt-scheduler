"use client";

import { useState } from "react";
import {
  Calendar,
  Star,
  Plus,
  Clock,
  Users,
  MoreHorizontal,
  Edit2,
  Moon,
  Sun,
  X,
  User,
  ContactIcon as ContactsIcon,
  Search,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
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

interface Prompt {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  isScheduled: boolean;
  author?: string;
  lastSent?: string;
  recipients?: number;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  selected: boolean;
}

interface ScheduleData {
  frequency: string;
  time: string;
  repeatEvery: number;
  selectedDays: string[];
}

const mockPrompts: Prompt[] = [
  {
    id: "1",
    title: "Daily Wellness Check",
    description:
      "Send me a motivational message about staying healthy and productive today",
    isActive: true,
    isScheduled: false,
    lastSent: "183 days ago",
    recipients: 3,
  },
  {
    id: "2",
    title: "Weekly Team Update",
    description:
      "Generate a summary of this week's accomplishments and goals for next week",
    isActive: false,
    isScheduled: false,
    author: "Sarah Johnson",
    lastSent: "189 days ago",
    recipients: 4,
  },
  {
    id: "3",
    title: "Monthly Goal Review",
    description:
      "Help me reflect on this month's progress and set intentions for next month",
    isActive: true,
    isScheduled: false,
    lastSent: "196 days ago",
    recipients: 1,
  },
  {
    id: "4",
    title: "Mindfulness Reminder",
    description:
      "Take 5 minutes to practice mindfulness. Focus on your breath and let go of today's stress.",
    isActive: true,
    isScheduled: false,
    author: "Michael Chen",
    lastSent: "182 days ago",
    recipients: 0,
  },
];

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    selected: false,
  },
  {
    id: "2",
    name: "Michael Chen",
    phone: "+1 (555) 234-5678",
    selected: false,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    phone: "+1 (555) 345-6789",
    selected: true,
  },
  { id: "4", name: "David Kim", phone: "+1 (555) 456-7890", selected: false },
  {
    id: "5",
    name: "Lisa Thompson",
    phone: "+44 20 7946 0958",
    selected: false,
  },
];

const daysOfWeek = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

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

export default function SchedulerListPage() {
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
  const [isEditScheduleModalOpen, setIsEditScheduleModalOpen] = useState(false);
  const [editingPromptId, setEditingPromptId] = useState<string | null>(null);
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    frequency: "weekly",
    time: "08:00",
    repeatEvery: 1,
    selectedDays: [],
  });
  const [newPrompt, setNewPrompt] = useState({
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
    useState<Prompt | null>(null);

  const togglePromptStatus = (id: string) => {
    setPrompts((prev) =>
      prev.map((prompt) =>
        prompt.id === id ? { ...prompt, isActive: !prompt.isActive } : prompt
      )
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

  const removeSelectedContact = (contactId: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId ? { ...contact, selected: false } : contact
      )
    );
  };

  const toggleDaySelection = (dayId: string) => {
    setScheduleData((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(dayId)
        ? prev.selectedDays.filter((day) => day !== dayId)
        : [...prev.selectedDays, dayId],
    }));
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

  const handleUpdateSchedule = () => {
    console.log("Updating schedule for prompt:", editingPromptId, scheduleData);
    setIsEditScheduleModalOpen(false);
    setEditingPromptId(null);
  };

  const handlePromptClick = (prompt: Prompt) => {
    setSelectedPromptDetails(prompt);
    setIsPromptDetailsModalOpen(true);
  };

  const getSelectedContacts = () =>
    contacts.filter((contact) => contact.selected);

  const getFilteredContacts = () => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
    );
  };

  const handleSaveContacts = () => {
    const selectedCount = getSelectedContacts().length;
    setNewPrompt((prev) => ({ ...prev, selectedContacts: selectedCount }));
    setIsContactsModalOpen(false);
  };

  const getStatusBadge = (prompt: Prompt) => {
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
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
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Your Prompts</h2>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Button>
          </div>

          {/* Prompts List */}
          <div className="space-y-4">
            {prompts.map((prompt) => (
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
                        className="data-[state=checked]:bg-purple-600"
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
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
                      {prompt.lastSent && (
                        <span>Last sent {prompt.lastSent}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Create Prompt Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Create AI Prompt
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCreateModalOpen(false)}
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
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

      {/* Select Contacts Modal */}
      <Dialog open={isContactsModalOpen} onOpenChange={setIsContactsModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
              Select Recipients
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsContactsModalOpen(false)}
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
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

      {/* Edit Schedule Modal */}
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditScheduleModalOpen(false)}
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
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

      {/* Prompt Details Modal */}
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
    </div>
  );
}
