import { LogIn, UserPlus } from "lucide-react";
import React from "react";

interface AuthToggleProps {
  isLogin: boolean;
  setIsLogin: (v: boolean) => void;
}

export default function AuthToggle({ isLogin, setIsLogin }: AuthToggleProps) {
  return (
    <div
      className="flex rounded-2xl p-2 mb-8 bg-gray-50 dark:bg-gray-700 transition-all duration-500"
      style={{
        transitionProperty: "opacity, transform",
        animation: "fadeInSlide .5s",
      }}
    >
      <style>{`
        @keyframes fadeInSlide {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <button
        onClick={() => setIsLogin(true)}
        className={`flex-1 flex items-center justify-center py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
          isLogin
            ? "bg-white dark:bg-gray-600 text-blue-700 dark:text-blue-400 shadow-md transform scale-105"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        <LogIn className="w-5 h-5 mr-2" />
        Iniciar Sesión
      </button>
      <button
        onClick={() => setIsLogin(false)}
        className={`flex-1 flex items-center justify-center py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
          !isLogin
            ? "bg-white dark:bg-gray-600 text-purple-700 dark:text-purple-400 shadow-md transform scale-105"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        <UserPlus className="w-5 h-5 mr-2" />
        Registrarse
      </button>
    </div>
  );
}
