"use client";

import React, { useState } from "react";
import LoginPage from "./loginPage";
import RegisterPage from "./registerPage";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {isLogin ? (
        <LoginPage isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <RegisterPage isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </div>
  );
}
