"use client";
import React from "react";
import AppNavigation from "./AppNavigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const shouldDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (shouldDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isNowDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isNowDark);
    localStorage.setItem("theme", isNowDark ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <>
      <AppNavigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      {children}
    </>
  );
}
