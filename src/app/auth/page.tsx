"use client";

import React, { useState } from "react";
import AuthHeader from "./components/AuthHeader";
import AuthToggle from "./components/AuthToggle";
import AuthForm from "./components/AuthForm";
import AuthFooter from "./components/AuthFooter";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthHeader />
        <div className="rounded-3xl shadow-2xl p-8 border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
          <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />
          <AuthForm
            isLogin={isLogin}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
        <AuthFooter isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </div>
  );
}
