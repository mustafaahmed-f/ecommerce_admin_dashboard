"use client";

import { createContext, useContext } from "react";

interface initialStateType {
  user: any;
}

const initialState: initialStateType = {
  user: null,
};

const userContext = createContext<initialStateType>(initialState);

interface UserProviderProps {
  children: React.ReactNode;
  user: any;
}

function UserProvider({ children, user }: UserProviderProps) {
  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUserContext must be used within a user provider");
  }
  return context;
}

export default UserProvider;
