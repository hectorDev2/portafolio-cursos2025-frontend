"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  Palette,
  Home,
  Shield,
  LayoutDashboard,
  User,
} from "lucide-react";

export default function AppNavigation({
  isDarkMode,
  toggleTheme,
}: {
  isDarkMode: boolean;
  toggleTheme: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Botones de navegación */}
      <div className="fixed top-6 left-6 flex space-x-3 z-10">
        <button
          onClick={() => router.push("/")}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            pathname === "/"
              ? isDarkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-600 text-white"
              : isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          title="Inicio"
        >
          <Home className="w-6 h-6" />
        </button>
        <button
          onClick={() => router.push("/auth")}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            pathname === "/auth"
              ? isDarkMode
                ? "bg-purple-600 text-white"
                : "bg-purple-600 text-white"
              : isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          title="Autenticación"
        >
          <Shield className="w-6 h-6" />
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            pathname === "/dashboard"
              ? isDarkMode
                ? "bg-indigo-600 text-white"
                : "bg-indigo-600 text-white"
              : isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          title="Dashboard"
        >
          <LayoutDashboard className="w-6 h-6" />
        </button>
        <button
          onClick={() => router.push("/profile")}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            pathname === "/profile"
              ? isDarkMode
                ? "bg-emerald-600 text-white"
                : "bg-emerald-600 text-white"
              : isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          title="Perfil de Usuario"
        >
          <User className="w-6 h-6" />
        </button>
        <button
          onClick={() => router.push("/palettes")}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            pathname === "/palettes"
              ? isDarkMode
                ? "bg-green-600 text-white"
                : "bg-green-600 text-white"
              : isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          title="Paletas de Colores"
        >
          <Palette className="w-6 h-6" />
        </button>
      </div>
      {/* Botón de Toggle Tema */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-10 ${
          isDarkMode
            ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
            : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
        }`}
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </button>
    </>
  );
}
