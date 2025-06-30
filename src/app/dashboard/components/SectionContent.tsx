import React from "react";
import { FileText, Eye, Download, Trash2, Upload, Filter } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  type: string;
}

interface Section {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function SectionContent({
  currentSection,
  mockFiles,
  activeSection,
  onDeleteFile,
}: {
  currentSection: Section | undefined;
  mockFiles: { [key: string]: FileItem[] };
  activeSection: string;
  onDeleteFile: (sectionId: string, fileId: string) => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header de la sección */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {currentSection && (
              <>
                <currentSection.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {currentSection.name}
                </h3>
              </>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              Subir Archivo
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Lista de archivos */}
      <div className="p-6">
        <div className="space-y-3">
          {mockFiles[activeSection]?.length ? (
            mockFiles[activeSection].map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {file.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {file.size} • Subido el {file.uploadDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                    onClick={() => onDeleteFile(activeSection, file.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No hay archivos en esta sección
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Comienza subiendo tu primer archivo para{" "}
                {currentSection?.name.toLowerCase()}.
              </p>
              <button className="flex items-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Upload className="w-4 h-4 mr-2" />
                Subir Primer Archivo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
