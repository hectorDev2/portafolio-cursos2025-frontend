
import { Eye, Upload } from "lucide-react";
import { personalDocumentsData } from "../data";
import { PersonalDocument } from "../types";

export const PersonalDocuments = ({
    onUpload,
  }: {
    onUpload: (doc: PersonalDocument) => void;
  }) => {
    return (
      <div className="flex flex-1 flex-col gap-4">
        {personalDocumentsData.map((doc: PersonalDocument) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-2 text-gray-600 dark:text-gray-300">
                <doc.icon className="h-5 w-5" />
              </div>
              <p className="font-medium text-gray-900 dark:text-white">
                {doc.name}
              </p>
            </div>
            <button
              onClick={() => onUpload(doc)}
              className="h-8 w-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors active:scale-95"
            >
              {doc.action === "Upload" ? (
                <Upload className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
      </div>
    );
  };
