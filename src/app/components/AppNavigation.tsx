"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Shield, LayoutDashboard, User, Settings } from "lucide-react";

export default function AppNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const isDarkMode = false;

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
          onClick={() => router.push("/admin")}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            pathname === "/admin"
              ? isDarkMode
                ? "bg-red-600 text-white"
                : "bg-red-600 text-white"
              : isDarkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          title="Dashboard Administrador"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
