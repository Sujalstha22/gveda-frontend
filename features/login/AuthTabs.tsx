"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuthMode } from "./loginTypes";

interface AuthTabsProps {
  mode: AuthMode;
  onSelectMode: (mode: AuthMode) => void;
}

export default function AuthTabs({ mode, onSelectMode }: AuthTabsProps) {
  return (
    <div className="relative flex items-center gap-8 border-b border-secondary/25 mb-6">
      <button
        type="button"
        onClick={() => onSelectMode("login")}
        className={`relative pb-3 text-sm sm:text-base font-antessa transition-colors cursor-pointer ${
          mode === "login"
            ? "text-primary font-semibold"
            : "text-primary/35 hover:text-primary font-medium"
        }`}
      >
        Login
        {mode === "login" && (
          <motion.div
            layoutId="activeAuthIndicator"
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="absolute -bottom-[1px] left-0  right-0 h-[2px] bg-primary"
          />
        )}
      </button>

      <button
        type="button"
        onClick={() => onSelectMode("signup")}
        className={`relative pb-3 text-sm sm:text-base font-antessa transition-colors cursor-pointer ${
          mode === "signup"
            ? "text-primary font-semibold"
            : "text-primary/35 hover:text-primary font-medium"
        }`}
      >
        Sign Up
        {mode === "signup" && (
          <motion.div
            layoutId="activeAuthIndicator"
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary"
          />
        )}
      </button>
    </div>
  );
}
