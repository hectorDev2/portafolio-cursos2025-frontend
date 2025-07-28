"use client";

import React, { useState } from "react";
import AuthHeader from "./components/AuthHeader";
import AuthForm from "./components/AuthForm";
import AuthToggle from "./components/AuthToggle";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Simple Alert Component
export const Alert = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) => {
  if (!message) return null;
  const baseClasses = "p-4 rounded-md text-white text-center mb-4";
  const typeClasses = type === "success" ? "bg-green-500" : "bg-red-500";
  return <div className={`${baseClasses} ${typeClasses}`}>{message}</div>;
};

export default function LoginPage({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (v: boolean) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null); // Reset alert on new submission
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setAlert({
          message: "¡Inicio de sesión exitoso! Redirigiendo...",
          type: "success",
        });
        Cookies.set("token", data.access_token, { expires: 1 }); // Save token to cookie
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setAlert({
          message: data.message || "Error en el inicio de sesión",
          type: "error",
        });
      }
    } catch (error) {
      setAlert({
        message: "No se pudo conectar con el servidor.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthHeader />
        <div className="flex ">
          <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
        <div className="rounded-3xl shadow-2xl p-8 border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
          {alert && <Alert message={alert.message} type={alert.type} />}
          <AuthForm
            isLogin={true}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
