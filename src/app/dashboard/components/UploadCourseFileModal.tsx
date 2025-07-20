import { UploadCloud } from "lucide-react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cookies from "js-cookie";
import { Modal } from "./Modal";

export const UploadCourseFileModal = ({
  document,
  onClose,
  portfolioId,
  courseId,
  onUploadSuccess,
}: {
  document: { name: string; type: string };
  onClose: () => void;
  portfolioId: string;
  courseId: string;
  onUploadSuccess: () => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const cleanText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setProgress(0);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      let endpoint = "";
      let docType = "";

      try {
        docType = cleanText(document.type);
        endpoint = `/api/cursos/${courseId}/${docType}`;
        console.log(endpoint, "endpoint");

        const token = Cookies.get("token");
        const headers: Record<string, string> = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers,
          body: formData,
        });
        console.log(" ~ response:", response);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al subir el archivo");
        }

        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                onClose();
                onUploadSuccess();
              }, 500);
              return 100;
            }
            return prev + 10;
          });
        }, 100);
      } catch (err: any) {
        setError(err.message);
        setUploading(false);
      }
    },
    [document, portfolioId, courseId, onClose, onUploadSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled: uploading,
  });

  return (
    <Modal onClose={onClose}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Subir Archivo
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Subiendo para:{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {document.name}
          </span>
        </p>
      </div>
      <div className="p-6">
        {!uploading ? (
          <div
            {...getRootProps()}
            className={`flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/50"
                : "border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="mb-4 h-12 w-12 text-gray-400" />
            <p className="font-semibold text-gray-700 dark:text-gray-200">
              {isDragActive
                ? "Suelta el archivo aquí"
                : "Arrastra y suelta o haz clic"}
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
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            Error: {error}
          </p>
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
      </div>
    </Modal>
  );
};