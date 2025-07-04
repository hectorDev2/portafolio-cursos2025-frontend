"use client";

import React, { useState } from "react";
import AuthHeader from "./components/AuthHeader";
import AuthFooter from "./components/AuthFooter";
import AuthForm from "./components/AuthForm";
import AuthToggle from "./components/AuthToggle";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Login response:", data);
    } catch (error) {
      console.error("Login error:", error);
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
          <AuthForm
            isLogin={true}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
        <AuthFooter isLogin={true} setIsLogin={() => {}} />
      </div>
    </div>
  );
}
