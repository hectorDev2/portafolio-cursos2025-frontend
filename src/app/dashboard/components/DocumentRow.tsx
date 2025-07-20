import { CheckCircle2, Eye, Upload, XCircle } from "lucide-react";
import { DocumentStatus } from "../types";

export const DocumentRow = ({
  name,
  status,
  icon,
  onUpload,
  onView,
}: {
  name: string;
  status: DocumentStatus;
  icon: React.ReactNode;
  onUpload: () => void;
  onView?: () => void;
}) => {
  const isUploaded = status === "uploaded";
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${isUploaded ? "bg-green-100 dark:bg-green-900/20" : "bg-gray-100 dark:bg-gray-700"}`}
        >
          {icon}
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
          <p
            className={`text-sm flex items-center gap-1.5 ${isUploaded ? "text-green-600" : "text-gray-500 dark:text-gray-400"}`}
          >
            {isUploaded ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            {isUploaded ? "Subido" : "Pendiente"}
          </p>
        </div>
      </div>
      <button
        onClick={isUploaded ? onView : onUpload}
        className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-2 transition-colors ${isUploaded ? "bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
      >
        {isUploaded ? (
          <Eye className="h-4 w-4" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
        {isUploaded ? "Ver" : "Subir"}
      </button>
    </div>
  );
};
