"use client";
import React from "react";
import AppNavigation from "./AppNavigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

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
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AppNavigation />
      {children}
    </>
  );
}
