
import React from "react";

export const SectionCard = ({
  title,
  children,
  actionButton,
}: {
  title: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <div className="p-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        {actionButton}
      </div>
      <div className="px-6 pb-6">
        {children}
      </div>
    </div>
  );
};
