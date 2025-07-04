"use client";

import React, { useState } from "react";
import {
  BookOpen,
  FileText,
  PenTool,
  GraduationCap,
  Users,
  Upload,
  Eye,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageSquare,
  Settings,
  LogOut,
  User,
  Download,
  Search,
  Filter,
  BarChart3,
  X,
  FolderPlus,
} from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  type: string;
}

interface Portfolio {
  id: string;
  courseName: string;
  courseCode: string;
  semester: string;
  status: "complete" | "incomplete" | "review";
  completionPercentage: number;
  lastModified: string;
}

interface NewPortfolioItem {
  title: string;
  description: string;
  file: File | null;
  section: string;
}

const DashboardPage = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("1");
  const [activeSection, setActiveSection] = useState<string>("silabos");
  const [showNewPortfolioModal, setShowNewPortfolioModal] = useState(false);
  const [showNewItemModal, setShowNewItemModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [newItem, setNewItem] = useState<NewPortfolioItem>({
    title: "",
    description: "",
    file: null,
    section: "silabos",
  });
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

  const sections = [
    {
      id: "silabos",
      name: "Sílabos",
      icon: BookOpen,
      color: "blue",
      description: "Documentos del plan de estudios y cronograma del curso",
    },
    {
      id: "materiales",
      name: "Materiales",
      icon: FileText,
      color: "green",
      description: "Presentaciones, lecturas y recursos didácticos",
    },
    {
      id: "practicas",
      name: "Prácticas",
      icon: PenTool,
      color: "purple",
      description: "Ejercicios prácticos y laboratorios",
    },
    {
      id: "examenes",
      name: "Exámenes",
      icon: GraduationCap,
      color: "red",
      description: "Evaluaciones parciales y finales",
    },
    {
      id: "trabajos",
      name: "Trabajos Estudiantiles",
      icon: Users,
      color: "orange",
      description: "Proyectos y trabajos realizados por estudiantes",
    },
  ];

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

  const getSectionColor = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    switch (section?.color) {
      case "blue":
        return "from-blue-500 to-blue-600";
      case "green":
        return "from-green-500 to-green-600";
      case "purple":
        return "from-purple-500 to-purple-600";
      case "red":
        return "from-red-500 to-red-600";
      case "orange":
        return "from-orange-500 to-orange-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewItem({ ...newItem, file });
  };

  const handleCreateItem = () => {
    // Here you would typically send the data to your backend
    console.log("Creating new portfolio item:", newItem);

    // Reset form and close modal
    setNewItem({
      title: "",
      description: "",
      file: null,
      section: "silabos",
    });
    setShowNewItemModal(false);

    // Show success message (you could implement a toast notification here)
    alert("Elemento agregado exitosamente al portafolio");
  };

  const handleDeleteFile = (sectionId: string, fileId: string) => {
    setFilesBySection((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].filter((file) => file.id !== fileId),
    }));
  };

  const currentPortfolio = portfolios.find((p) => p.id === selectedPortfolio);
  const currentSection = sections.find((s) => s.id === activeSection);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y título */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sistema de Portafolios Académicos
                </h1>
              </div>
            </div>

            {/* Acciones del usuario */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Search className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {teacherName}
                  </span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="py-1">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Settings className="w-4 h-4 mr-3" />
                        Configuración
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <LogOut className="w-4 h-4 mr-3" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

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
          {/* Selector de Portafolio */}
          <div className="lg:col-span-2">
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
                              style={{
                                width: `${portfolio.completionPercentage}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Estadísticas Rápidas */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Portafolios
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portfolios.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Completos
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portfolios.filter((p) => p.status === "complete").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Comentarios
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    3
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        {currentPortfolio && (
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
            {/* Sidebar de Secciones */}
            <div className="mb-6 lg:mb-0 lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Secciones del Portafolio
                </h3>
                <nav className="flex flex-row lg:flex-col gap-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`flex-1 lg:w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors min-w-0 ${
                          isActive
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-sm font-medium truncate">
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
                      <button
                        onClick={() => setShowNewItemModal(true)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Elemento
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
                    {filesBySection[activeSection]?.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          No hay archivos en esta sección
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          ¡Comienza agregando tu primer archivo y mantén tu
                          portafolio organizado!
                        </p>
                        <button
                          onClick={() => setShowNewItemModal(true)}
                          className="flex items-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Subir Archivo
                        </button>
                      </div>
                    ) : (
                      filesBySection[activeSection]?.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white break-words whitespace-pre-line max-w-[180px] sm:max-w-xs md:max-w-sm lg:max-w-md">
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
                              onClick={() =>
                                handleDeleteFile(activeSection, file.id)
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Zona de Retroalimentación */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <MessageSquare className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Retroalimentación del Evaluador
              </h3>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="font-medium text-orange-800 dark:text-orange-300 mb-1">
                    Dr. Carlos Mendoza - Coordinador Académico
                  </p>
                  <p className="text-orange-700 dark:text-orange-400 text-sm mb-2">
                    Hace 2 días
                  </p>
                  <p className="text-orange-800 dark:text-orange-300">
                    Excelente organización del material. Se recomienda incluir
                    más ejemplos prácticos en la sección de materiales y
                    actualizar el cronograma de evaluaciones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

      {/* Modal para Agregar Elemento al Portafolio */}
      {showNewItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header del Modal */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <FolderPlus className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Agregar Elemento al Portafolio
                  </h3>
                </div>
                <button
                  onClick={() => setShowNewItemModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Selector de Sección */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Selecciona la sección del portafolio
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isSelected = newItem.section === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() =>
                          setNewItem({ ...newItem, section: section.id })
                        }
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <div
                            className={`w-8 h-8 bg-gradient-to-r ${getSectionColor(section.id)} rounded-lg flex items-center justify-center mr-3`}
                          >
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {section.name}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {section.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Formulario */}
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Título del elemento
                  </label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) =>
                      setNewItem({ ...newItem, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ej: Sílabo del curso 2024-I"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Describe brevemente el contenido del archivo..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Archivo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        {newItem.file
                          ? newItem.file.name
                          : "Selecciona un archivo"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        PDF, DOC, PPT, XLS, ZIP hasta 10MB
                      </p>
                    </label>
                  </div>
                </div>
              </form>

              {/* Botones de Acción */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowNewItemModal(false)}
                  className="px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateItem}
                  disabled={!newItem.title || !newItem.file}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Agregar Elemento
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
