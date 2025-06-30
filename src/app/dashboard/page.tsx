"use client";
import React, { useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import PortfolioSelector from "./components/PortfolioSelector";
import QuickStats from "./components/QuickStats";
import SectionContent from "./components/SectionContent";
import FeedbackSection from "./components/FeedbackSection";
import {
  BookOpen,
  FileText,
  PenTool,
  GraduationCap,
  Users,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

export interface FileItem {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  type: string;
}

export interface Portfolio {
  id: string;
  courseName: string;
  courseCode: string;
  semester: string;
  status: "complete" | "incomplete" | "review";
  completionPercentage: number;
  lastModified: string;
}

const sections = [
  { id: "silabos", name: "Sílabos", icon: BookOpen, color: "blue" },
  { id: "materiales", name: "Materiales", icon: FileText, color: "green" },
  { id: "practicas", name: "Prácticas", icon: PenTool, color: "purple" },
  { id: "examenes", name: "Exámenes", icon: GraduationCap, color: "red" },
  {
    id: "trabajos",
    name: "Trabajos Estudiantiles",
    icon: Users,
    color: "orange",
  },
];

const mockFiles: { [key: string]: FileItem[] } = {
  silabos: [
    {
      id: "1",
      name: "Silabo_CS301_2024I.pdf",
      size: "2.3 MB",
      uploadDate: "2024-01-15",
      type: "pdf",
    },
    {
      id: "2",
      name: "Cronograma_Actividades.xlsx",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      type: "excel",
    },
  ],
  materiales: [
    {
      id: "3",
      name: "Clase01_Introduccion.pptx",
      size: "4.2 MB",
      uploadDate: "2024-01-13",
      type: "powerpoint",
    },
    {
      id: "4",
      name: "Lectura_Algoritmos.pdf",
      size: "3.1 MB",
      uploadDate: "2024-01-12",
      type: "pdf",
    },
  ],
  practicas: [
    {
      id: "5",
      name: "Practica01_Arrays.pdf",
      size: "1.5 MB",
      uploadDate: "2024-01-11",
      type: "pdf",
    },
  ],
  examenes: [
    {
      id: "6",
      name: "Examen_Parcial_2024I.pdf",
      size: "2.8 MB",
      uploadDate: "2024-01-10",
      type: "pdf",
    },
  ],
  trabajos: [
    {
      id: "7",
      name: "Proyecto_Final_Grupo1.zip",
      size: "4.9 MB",
      uploadDate: "2024-01-09",
      type: "zip",
    },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "complete":
      return "text-green-600 dark:text-green-400";
    case "incomplete":
      return "text-orange-600 dark:text-orange-400";
    case "review":
      return "text-blue-600 dark:text-blue-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "complete":
      return <CheckCircle className="w-5 h-5" />;
    case "incomplete":
      return <AlertCircle className="w-5 h-5" />;
    case "review":
      return <Clock className="w-5 h-5" />;
    default:
      return <AlertCircle className="w-5 h-5" />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "complete":
      return "Completo";
    case "incomplete":
      return "Incompleto";
    case "review":
      return "En Revisión";
    default:
      return "Desconocido";
  }
};

const DashboardPage = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("1");
  const [activeSection, setActiveSection] = useState<string>("silabos");
  const [showNewPortfolioModal, setShowNewPortfolioModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [filesBySection, setFilesBySection] = useState<{
    [key: string]: FileItem[];
  }>(mockFiles);

  // Mock data
  const teacherName = "Dr. María González";
  const portfolios: Portfolio[] = [
    {
      id: "1",
      courseName: "Algoritmos y Estructuras de Datos",
      courseCode: "CS-301",
      semester: "2024-I",
      status: "complete",
      completionPercentage: 100,
      lastModified: "2024-01-15",
    },
    {
      id: "2",
      courseName: "Programación Web",
      courseCode: "CS-205",
      semester: "2024-I",
      status: "incomplete",
      completionPercentage: 75,
      lastModified: "2024-01-10",
    },
    {
      id: "3",
      courseName: "Base de Datos",
      courseCode: "CS-302",
      semester: "2024-I",
      status: "review",
      completionPercentage: 90,
      lastModified: "2024-01-12",
    },
  ];

  const currentPortfolio = portfolios.find((p) => p.id === selectedPortfolio);
  const currentSection = sections.find((s) => s.id === activeSection);

  const handleDeleteFile = (sectionId: string, fileId: string) => {
    setFilesBySection((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].filter((file) => file.id !== fileId),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader
        teacherName={teacherName}
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bienvenida */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Bienvenido, {teacherName}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona tus portafolios académicos y mantén organizados todos tus
            materiales de enseñanza.
          </p>
        </div>
        {/* Selector de Portafolio y Estadísticas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PortfolioSelector
              portfolios={portfolios}
              selectedPortfolio={selectedPortfolio}
              setSelectedPortfolio={setSelectedPortfolio}
              setShowNewPortfolioModal={setShowNewPortfolioModal}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              getStatusText={getStatusText}
            />
          </div>
          <QuickStats portfolios={portfolios} />
        </div>
        {/* Contenido Principal */}
        {currentPortfolio && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar de Secciones */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Secciones del Portafolio
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                          isActive
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="text-sm font-medium">
                          {section.name}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
            {/* Área de Contenido */}
            <div className="lg:col-span-3">
              <SectionContent
                currentSection={currentSection}
                mockFiles={filesBySection}
                activeSection={activeSection}
                onDeleteFile={handleDeleteFile}
              />
            </div>
          </div>
        )}
        {/* Zona de Retroalimentación */}
        <FeedbackSection />
      </div>
      {/* Modal para Nuevo Portafolio */}
      {showNewPortfolioModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Crear Nuevo Portafolio
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre del Curso
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ej: Programación Orientada a Objetos"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Código del Curso
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ej: CS-203"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Semestre Académico
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>2024-I</option>
                    <option>2024-II</option>
                    <option>2025-I</option>
                  </select>
                </div>
              </form>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowNewPortfolioModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowNewPortfolioModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Crear Portafolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
