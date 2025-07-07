"use client";

import React, { useState } from "react";
import AuthHeader from "./components/AuthHeader";
import AuthFooter from "./components/AuthFooter";
import AuthForm from "./components/AuthForm";
import AuthToggle from "./components/AuthToggle";

// Simple Alert Component
const Alert = ({
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

export default function RegisterPage({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: (v: boolean) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setAlert({
          message: "¡Registro exitoso! Ahora puedes iniciar sesión.",
          type: "success",
        });
        setTimeout(() => {
          setIsLogin(true); // Switch to login view
        }, 2000);
      } else {
        const errorMessage = Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message;
        setAlert({
          message: errorMessage || "Error en el registro",
          type: "error",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <div className="flex  justify-center">
          <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
        <div className="rounded-3xl shadow-2xl p-8 border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
          {alert && <Alert message={alert.message} type={alert.type} />}
          <AuthForm
            isLogin={isLogin}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
        <AuthFooter isLogin={false} setIsLogin={setIsLogin} />
      </div>
    </div>
  );
}
