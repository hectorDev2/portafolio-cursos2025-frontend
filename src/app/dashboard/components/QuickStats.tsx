import React from "react";
import { BarChart3, CheckCircle, MessageSquare } from "lucide-react";
import type { Portfolio } from "../page";

export default function QuickStats({
  portfolios,
}: {
  portfolios: Portfolio[];
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Portafolios
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {portfolios.length}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Completos
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {portfolios.filter((p) => p.status === "complete").length}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comentarios
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
