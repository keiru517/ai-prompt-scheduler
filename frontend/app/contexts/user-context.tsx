"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { IUser, IUserContextType } from "@/lib/definition";
import { userLogout } from "../action";
import { useTheme } from "next-themes";

const UserContext = createContext<IUserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUserState] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setTheme } = useTheme();

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("ai-scheduler-user");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUserState(parsedUser);
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      localStorage.removeItem("ai-scheduler-user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save user to localStorage whenever user state changes
  const setUser = (newUser: IUser | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("ai-scheduler-user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("ai-scheduler-user");
    }
  };

  const updateUser = (updates: Partial<IUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    }
  };

  const logout = async () => {
    // You might want to call an API endpoint to invalidate the session
    await userLogout();
    setUser(null);
    setTheme("light");

    console.log("User logged out");
    router.push("/");
  };

  const isAuthenticated = user !== null && user.isVerified;

  const value: IUserContextType = {
    user,
    setUser,
    isAuthenticated,
    logout,
    updateUser,
  };

  // Don't render children until we've loaded the user state
  if (isLoading) {
    return (
      // TODO: user state loading
      // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      //   <div className="text-center space-y-4">
      //     <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      //     <p className="text-gray-600">Loading...</p>
      //   </div>
      // </div>
      <></>
    );
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
