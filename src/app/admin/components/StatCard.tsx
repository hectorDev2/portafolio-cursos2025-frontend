import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  trend?: "up" | "down";
  trendValue?: string;
  color: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color,
}: StatCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        {trend && (
          <div
            className={`flex items-center mt-2 ${trend === "up" ? "text-green-600" : "text-red-600"}`}
          >
            {trend === "up" ? (
              <Icon className="w-4 h-4 mr-1" />
            ) : (
              <Icon className="w-4 h-4 mr-1" />
            )}
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default StatCard;
