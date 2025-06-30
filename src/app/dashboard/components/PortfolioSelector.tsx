import React from "react";
import { Plus } from "lucide-react";
// import Portfolio from "../page"; // Remove this line if not needed for value usage

// Define Portfolio type here or import it from the correct module
type Portfolio = {
  id: string;
  courseName: string;
  courseCode: string;
  semester: string;
  status: string;
  completionPercentage: number;
};

export default function PortfolioSelector({
  portfolios,
  selectedPortfolio,
  setSelectedPortfolio,
  setShowNewPortfolioModal,
  getStatusColor,
  getStatusIcon,
  getStatusText,
}: {
  portfolios: Portfolio[];
  selectedPortfolio: string;
  setSelectedPortfolio: (id: string) => void;
  setShowNewPortfolioModal: (show: boolean) => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusText: (status: string) => string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Portafolios Activos
        </h3>
        <button
          onClick={() => setShowNewPortfolioModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Portafolio
        </button>
      </div>
      <div className="space-y-3">
        {portfolios.map((portfolio) => (
          <div
            key={portfolio.id}
            onClick={() => setSelectedPortfolio(portfolio.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedPortfolio === portfolio.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {portfolio.courseName}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {portfolio.courseCode} - {portfolio.semester}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`flex items-center space-x-1 ${getStatusColor(portfolio.status)}`}
                >
                  {getStatusIcon(portfolio.status)}
                  <span className="text-sm font-medium">
                    {getStatusText(portfolio.status)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {portfolio.completionPercentage}%
                  </div>
                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${portfolio.completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
