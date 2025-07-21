import { Eye, FileText, Upload } from "lucide-react";

type DocumentCardProps = {
  document: {
    type: string;
    fileName?: string;
    // add other document properties if needed
  };
  onUpload: () => void;
};

export const DocumentCard = ({ document, onUpload }: DocumentCardProps) => {
  const hasFile = !!document.fileName;
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transform-gpu transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
            <FileText className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {document.type}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {hasFile ? document.fileName : "No subido"}
            </p>
          </div>
        </div>
        <button
          onClick={onUpload}
          className="h-8 w-8 flex items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {hasFile ? (
            <Eye className="h-4 w-4" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};
