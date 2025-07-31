"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  Calendar,
  Settings,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Eye,
  Shield,
  Trash2,
} from "lucide-react";
import {
  getRoleColor,
  getStatusColor,
  getStatusIcon,
} from "./components/StatusHelpers";
import UserModal from "./components/UserModal";
import SemesterModal from "./components/SemesterModal";
import ConfirmAlert from "./components/ConfirmAlert";
import Cookies from "js-cookie";
import { useAuth } from "../shared/hooks/useAuth";

interface Portfolio {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  semester: string;
  createdAt: string;
  updatedAt: string;
  cursos?: any[];
  feedbacks?: any[];
}

interface Semester {
  id: string;
  name: string;
  startDate: string;

  endDate: string;
  status: "active" | "upcoming" | "completed";
  portfolios: number;
  teachers: number;
}

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<
    "users" | "portfolios" | "semesters"
  >("users");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSemesterModal, setShowSemesterModal] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const { userId, token, rol } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"role" | "createdAt" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  const semesters: Semester[] = [
    {
      id: "1",
      name: "2024-I",
      startDate: "2024-03-01",
      endDate: "2024-07-31",
      status: "active",
      portfolios: 156,
      teachers: 45,
    },
    {
      id: "2",
      name: "2024-II",
      startDate: "2024-08-01",
      endDate: "2024-12-31",
      status: "upcoming",
      portfolios: 0,
      teachers: 0,
    },
    {
      id: "3",
      name: "2023-II",
      startDate: "2023-08-01",
      endDate: "2023-12-31",
      status: "completed",
      portfolios: 134,
      teachers: 42,
    },
  ];

  const fetchUsers = async () => {
    try {
      const responseUsers = await fetch("/api/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!responseUsers.ok) throw new Error("Error al obtener usuarios");
      const data = await responseUsers.json();
      setUsers(data);
    } catch (error) {
      // Puedes mostrar un mensaje de error aquí si lo deseas
    }
  };
  const fetchPortfolios = async () => {
    try {
      const token = Cookies.get("token");
      const responsePortfolios = await fetch("/api/portfolios/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!responsePortfolios.ok)
        throw new Error("Error al obtener portafolios");
      const dataPortfolios = await responsePortfolios.json();
      setPortfolios(dataPortfolios);
    } catch (error) {
      // Puedes mostrar un mensaje de error aquí si lo deseas
    }
  };
  useEffect(() => {
    if (rol !== "ADMINISTRADOR") {
      window.location.href = "/dashboard";
      return;
    }
    fetchUsers();
    fetchPortfolios();
  }, []);

  // Filtrar y ordenar usuarios
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedUsers = [...filteredUsers];
  if (sortBy) {
    sortedUsers.sort((a, b) => {
      if (sortBy === "role") {
        if (a.role < b.role) return sortOrder === "asc" ? -1 : 1;
        if (a.role > b.role) return sortOrder === "asc" ? 1 : -1;
        return 0;
      }
      if (sortBy === "createdAt") {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
  }

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setShowConfirmAlert(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      const token = Cookies.get("token");
      const response = await fetch(`/api/user/${userToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userToDelete));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setShowConfirmAlert(false);
      setUserToDelete(null);
    }
  };

  // Exportar lista de usuarios filtrados y ordenados a CSV
  const exportUsersCSV = () => {
    const headers = [
      "Nombre",
      "Apellido",
      "Correo",
      "Rol",
      "Estado",
      "Fecha de Creación",
    ];
    const rows = sortedUsers.map((user) => [
      user.name,
      user.lastName,
      user.email,
      user.role,
      "Activo", // Puedes ajustar según tu lógica de estado
      user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-",
    ]);
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.map((cell) => `"${cell ?? ""}"`).join(",") + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "usuarios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    // ...existing code...
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-2 sm:py-0">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Panel de Administración
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sistema de Gestión de Portafolios Académicos
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-2">
            {[
              { id: "users", name: "Gestión de Usuarios", icon: Users },
              {
                id: "portfolios",
                name: "Gestión de Portafolios",
                icon: BookOpen,
              },
              { id: "semesters", name: "Gestión de Semestres", icon: Calendar },
            ].map(
              (tab: { id: string; name: string; icon: React.ElementType }) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() =>
                      setActiveTab(
                        tab.id as "users" | "portfolios" | "semesters"
                      )
                    }
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.name}
                  </button>
                );
              }
            )}
          </nav>
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Gestión de Usuarios
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o correo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <button
                  className={`p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg ${sortBy === "role" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                  onClick={() => {
                    setSortBy("role");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Ordenar por Rol
                </button>
                <button
                  className={`p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg ${sortBy === "createdAt" ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                  onClick={() => {
                    setSortBy("createdAt");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Ordenar por Fecha
                </button>
                <button
                  onClick={exportUsersCSV}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </button>
                <button
                  onClick={() => setShowUserModal(true)}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Usuario
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto w-full">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Rol
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        fecha de creacion
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Portafolios
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {sortedUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {user.name?.charAt(0)}
                                {user.lastName?.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.name} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                          >
                            {user.role === "ADMINISTRADOR"
                              ? "Administrador"
                              : user.role === "DOCENTE"
                                ? "Docente"
                                : user.role === "EVALUADOR"
                                  ? "Evaluador"
                                  : user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`flex items-center text-green-600 dark:text-green-400`}
                          >
                            <span className="ml-2 text-sm font-medium">
                              Activo
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {/* Aquí podrías mostrar la cantidad de portafolios si tu API lo provee */}
                          {user.Portfolio?.length || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Portfolios Tab */}
        {activeTab === "portfolios" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Gestión de Portafolios
              </h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar portafolios..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {portfolios?.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {portfolio.semester}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {portfolio.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {portfolio.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Docente ID:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {portfolio.teacherId}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Semestre:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {portfolio.semester}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">
                        Creado
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {portfolio.createdAt
                          ? new Date(portfolio.createdAt).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">
                        Actualizado
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {portfolio.updatedAt
                          ? new Date(portfolio.updatedAt).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Cursos: {portfolio.cursos?.length || 0} | Feedbacks:{" "}
                    {portfolio.feedbacks?.length || 0}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Semesters Tab */}
        {activeTab === "semesters" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Gestión de Semestres
              </h2>
              <button
                onClick={() => setShowSemesterModal(true)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Semestre
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {semesters.map((semester) => (
                <div
                  key={semester.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {semester.name}
                    </h3>
                    <div
                      className={`flex items-center space-x-1 ${getStatusColor(semester.status)}`}
                    >
                      {getStatusIcon(semester.status)}
                      <span className="text-sm font-medium">
                        {semester.status === "active"
                          ? "Activo"
                          : semester.status === "upcoming"
                            ? "Próximo"
                            : "Completado"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Inicio:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {semester.startDate}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Fin:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {semester.endDate}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {semester.portfolios}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        Portafolios
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {semester.teachers}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">
                        Docentes
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Ver Detalles
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Modal */}
      <UserModal
        show={showUserModal}
        onClose={() => setShowUserModal(false)}
        onUserAdded={fetchUsers}
      />

      {/* Semester Modal */}
      <SemesterModal
        show={showSemesterModal}
        onClose={() => setShowSemesterModal(false)}
      />
      <ConfirmAlert
        show={showConfirmAlert}
        onClose={() => setShowConfirmAlert(false)}
        onConfirm={confirmDeleteUser}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que quieres eliminar a este usuario? Esta acción no se puede deshacer."
      />
    </div>
  );
};

export default AdminDashboardPage;
