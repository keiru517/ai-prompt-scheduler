export interface ICountry {
  code: string;
  name: string;
  iso: string;
}

export interface INewPrompt {
  title: string;
  prompt: string;
  frequency: string;
  time: string;
  sendToSelf: boolean;
  selectedContacts: number;
}

export interface IContact {
  id: string;
  name: string;
  phone: string;
  selected: boolean;
}

export interface IScheduleData {
  frequency: string;
  time: string;
  repeatEvery: number;
  selectedDays: string[];
}

export interface IPrompt {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  isScheduled: boolean;
  author?: string;
  lastSent?: string;
  recipients?: number;
}

export interface IPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  tokens: string;
  tokensLimit: number;
  popular: boolean;
  features: string[];
}

export type IPlanFrequency = "monthly" | "annual";

export interface IPlans {
  monthly: IPlan[];
  annual: IPlan[];
}
