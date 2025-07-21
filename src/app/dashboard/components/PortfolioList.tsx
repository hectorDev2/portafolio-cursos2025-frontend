import { Plus } from "lucide-react";
import { Portfolio } from "../types";

type PortfolioListProps = {
  portfolios: Portfolio[];
  selectedPortfolioId: string | number | null;
  onSelectPortfolio: (id: string | number) => void;
  onOpenCreateModal: () => void;
};

export const PortfolioList = ({
  portfolios,
  selectedPortfolioId,
  onSelectPortfolio,
  onOpenCreateModal,
}: PortfolioListProps) => {
  return (
    <div className="flex h-1/2 flex-col rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Mis Portafolios
        </h2>
        <button
          className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-600 text-white transition-transform active:scale-95 hover:bg-blue-700"
          onClick={onOpenCreateModal}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="flex flex-col gap-2">
          {portfolios.map((portfolio: Portfolio) => (
            <button
              key={portfolio.id}
              onClick={() => onSelectPortfolio(portfolio.id)}
              className={`relative w-full text-left rounded-md p-3 transition-all duration-200 ${selectedPortfolioId === portfolio.id ? "bg-blue-50 dark:bg-blue-900/30" : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700"}`}
            >
              {selectedPortfolioId === portfolio.id && (
                <span className="absolute left-0 top-0 h-full w-1 rounded-l-md bg-blue-600" />
              )}
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {portfolio.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
