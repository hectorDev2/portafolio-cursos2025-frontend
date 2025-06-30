import React from "react";
import { MessageSquare, User } from "lucide-react";

export default function FeedbackSection() {
  return (
    <div className="mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center mb-4">
          <MessageSquare className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Retroalimentación del Evaluador
          </h3>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="font-medium text-orange-800 dark:text-orange-300 mb-1">
                Dr. Carlos Mendoza - Coordinador Académico
              </p>
              <p className="text-orange-700 dark:text-orange-400 text-sm mb-2">
                Hace 2 días
              </p>
              <p className="text-orange-800 dark:text-orange-300">
                &quot;Excelente organización del material. Se recomienda incluir
                más ejemplos prácticos en la sección de materiales y actualizar
                el cronograma de evaluaciones.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
