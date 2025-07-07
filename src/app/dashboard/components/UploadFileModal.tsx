
import { UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { Document, PersonalDocument } from "../types";
import { Modal } from "./Modal";

export const UploadFileModal = ({
    document,
    onClose,
  }: {
    document: Document | PersonalDocument;
    onClose: () => void;
  }) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
  
    const handleUpload = () => {
      setUploading(true);
    };
  
    useEffect(() => {
      if (uploading) {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setTimeout(onClose, 500);
              return 100;
            }
            return prev + 10;
          });
        }, 200);
        return () => clearInterval(interval);
      }
    }, [uploading, onClose]);
  
    return (
      <Modal onClose={onClose}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Subir Archivo
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Subiendo para:{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {document.type || document.name}
            </span>
          </p>
        </div>
        <div className="p-6">
          {!uploading ? (
            <div
              className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 transition-colors hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              onClick={handleUpload}
            >
              <UploadCloud className="mb-4 h-12 w-12 text-gray-400" />
              <p className="font-semibold text-gray-700 dark:text-gray-200">
                Arrastra y suelta o haz clic
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                para seleccionar un archivo
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Subiendo archivo...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-500 dark:text-gray-400">
                {progress}%
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
          >
            {uploading ? "Subiendo..." : "Cancelar"}
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            Subir Archivo
          </button>
        </div>
      </Modal>
    );
  };
