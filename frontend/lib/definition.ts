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

export interface ILogIn {
  phone_number: string;
}

export type ActionResult<T> = {
  data?: T;
  error?: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
  success: boolean;
};

export interface ILogInRes {
  message: string;
}

export interface IRegistRes {
  message: string;
}

export interface IError {
  code: string;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export interface IRegist {
  phone_number: string;
  first_name: string;
  last_name: string;
}

export interface IVerifySMS {
  phone_number: string;
  otp_code: string;
}

export interface IUser {
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  isVerified: boolean;
  createdAt?: string;
}

export interface IUserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  updateUser: (updates: Partial<IUser>) => void;
}
