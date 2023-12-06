"use client";

import React, { useState, useEffect } from "react";
import GlobalSProvider from "../context/GlobalProvider";
import { Toaster } from "react-hot-toast";
import "../globals.css"

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 200);
  },[]);

  if (!isReady) {
    return <div className="w-full h-full flex items-center justify-center">
      <span className="loader"></span>
    </div>
  }

  return (
    <GlobalSProvider>
      <Toaster /> 
      {children}
    </GlobalSProvider>
  );
};

export default ContextProvider;
