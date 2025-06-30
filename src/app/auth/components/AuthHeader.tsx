import { Shield } from "lucide-react";

export default function AuthHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">
        <Shield className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
        Bienvenido
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Accede a tu cuenta o crea una nueva
      </p>
    </div>
  );
}
