'use client'

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface MyContextValue {
  someValue: string;
  setSomeValue: (value: string) => void;
}

// Create the context
const MyContext = createContext<MyContextValue | null>(null);

// Create a custom hook to access the context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

// Create the provider component
export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [someValue, setSomeValue] = useState("default value");

  return (
    <MyContext.Provider value={{ someValue, setSomeValue }}>
      {children}
    </MyContext.Provider>
  );
};
