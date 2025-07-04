"use client";
import React, { useState } from "react";
import {
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  UserCheck,
  UserX,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Shield,
  GraduationCap,
  Building,
  Award,
  Activity,
  PieChart,
  Target,
  Zap,
  Globe,
  Database,
  Server,
  HardDrive,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "teacher" | "admin" | "evaluator";
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  portfolios: number;
}

interface Portfolio {
  id: string;
  courseName: string;
  courseCode: string;
  teacherName: string;
  semester: string;
  status: "complete" | "incomplete" | "review";
  completionPercentage: number;
  lastModified: string;
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
    "overview" | "users" | "portfolios" | "semesters"
  >("overview");
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSemesterModal, setShowSemesterModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock data
  const stats = {
    totalUsers: 245,
    activeUsers: 198,
    totalPortfolios: 156,
    completedPortfolios: 89,
    pendingReviews: 23,
    activeSemesters: 2,
    systemUptime: "99.9%",
    storageUsed: "2.3 TB",
  };

  const users: User[] = [
    {
      id: "1",
      name: "Dr. María González",
      email: "maria.gonzalez@universidad.edu",
      role: "teacher",
      status: "active",
      lastLogin: "2024-01-15 14:30",
      portfolios: 3,
    },
    {
      id: "2",
      name: "Prof. Carlos Mendoza",
      email: "carlos.mendoza@universidad.edu",
      role: "evaluator",
      status: "active",
      lastLogin: "2024-01-15 09:15",
      portfolios: 0,
    },
    {
      id: "3",
      name: "Dra. Ana Rodríguez",
      email: "ana.rodriguez@universidad.edu",
      role: "teacher",
      status: "inactive",
      lastLogin: "2024-01-10 16:45",
      portfolios: 2,
    },
    {
      id: "4",
      name: "Admin Sistema",
      email: "admin@universidad.edu",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 15:00",
      portfolios: 0,
    },
  ];

  const portfolios: Portfolio[] = [
    {
      id: "1",
      courseName: "Algoritmos y Estructuras de Datos",
      courseCode: "CS-301",
      teacherName: "Dr. María González",
      semester: "2024-I",
      status: "complete",
      completionPercentage: 100,
      lastModified: "2024-01-15",
    },
    {
      id: "2",
      courseName: "Programación Web",
      courseCode: "CS-205",
      teacherName: "Dr. María González",
      semester: "2024-I",
      status: "incomplete",
      completionPercentage: 75,
      lastModified: "2024-01-10",
    },
    {
      id: "3",
      courseName: "Base de Datos",
      courseCode: "CS-302",
      teacherName: "Dra. Ana Rodríguez",
      semester: "2024-I",
      status: "review",
      completionPercentage: 90,
      lastModified: "2024-01-12",
    },
  ];

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900";
      case "teacher":
        return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900";
      case "evaluator":
        return "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 dark:text-green-400";
      case "inactive":
        return "text-red-600 dark:text-red-400";
      case "pending":
        return "text-orange-600 dark:text-orange-400";
      case "complete":
        return "text-green-600 dark:text-green-400";
      case "incomplete":
        return "text-orange-600 dark:text-orange-400";
      case "review":
        return "text-blue-600 dark:text-blue-400";
      case "upcoming":
        return "text-blue-600 dark:text-blue-400";
      case "completed":
        return "text-gray-600 dark:text-gray-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "inactive":
        return <UserX className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "complete":
        return <CheckCircle className="w-4 h-4" />;
      case "incomplete":
        return <AlertCircle className="w-4 h-4" />;
      case "review":
        return <Eye className="w-4 h-4" />;
      case "upcoming":
        return <Calendar className="w-4 h-4" />;
      case "completed":
        return <Award className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    color,
  }: any) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <div
              className={`flex items-center mt-2 ${trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {trend === "up" ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", name: "Resumen General", icon: BarChart3 },
              { id: "users", name: "Gestión de Usuarios", icon: Users },
              {
                id: "portfolios",
                name: "Gestión de Portafolios",
                icon: BookOpen,
              },
              { id: "semesters", name: "Gestión de Semestres", icon: Calendar },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
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
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total de Usuarios"
                value={stats.totalUsers}
                icon={Users}
                trend="up"
                trendValue="+12%"
                color="bg-gradient-to-r from-blue-500 to-blue-600"
              />
              <StatCard
                title="Usuarios Activos"
                value={stats.activeUsers}
                icon={UserCheck}
                trend="up"
                trendValue="+8%"
                color="bg-gradient-to-r from-green-500 to-green-600"
              />
              <StatCard
                title="Total Portafolios"
                value={stats.totalPortfolios}
                icon={BookOpen}
                trend="up"
                trendValue="+15%"
                color="bg-gradient-to-r from-purple-500 to-purple-600"
              />
              <StatCard
                title="Portafolios Completos"
                value={stats.completedPortfolios}
                icon={CheckCircle}
                trend="up"
                trendValue="+22%"
                color="bg-gradient-to-r from-orange-500 to-orange-600"
              />
            </div>

            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Revisiones Pendientes"
                value={stats.pendingReviews}
                icon={Clock}
                color="bg-gradient-to-r from-yellow-500 to-yellow-600"
              />
              <StatCard
                title="Semestres Activos"
                value={stats.activeSemesters}
                icon={Calendar}
                color="bg-gradient-to-r from-indigo-500 to-indigo-600"
              />
              <StatCard
                title="Tiempo de Actividad"
                value={stats.systemUptime}
                icon={Server}
                color="bg-gradient-to-r from-teal-500 to-teal-600"
              />
              <StatCard
                title="Almacenamiento Usado"
                value={stats.storageUsed}
                icon={HardDrive}
                color="bg-gradient-to-r from-pink-500 to-pink-600"
              />
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activity Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Actividad del Sistema
                  </h3>
                  <Activity className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Inicios de Sesión
                    </span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        85%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Subidas de Archivos
                    </span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: "72%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        72%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Evaluaciones
                    </span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: "58%" }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        58%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Actividad Reciente
                  </h3>
                  <Zap className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        Nuevo usuario registrado
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Hace 5 minutos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        Portafolio completado
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Hace 15 minutos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        Archivo subido al sistema
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Hace 30 minutos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Gestión de Usuarios
              </h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar usuarios..."
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <Filter className="w-4 h-4" />
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
              <div className="overflow-x-auto">
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
                        Último Acceso
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
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.name}
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
                            {user.role === "admin"
                              ? "Administrador"
                              : user.role === "teacher"
                                ? "Docente"
                                : "Evaluador"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`flex items-center ${getStatusColor(user.status)}`}
                          >
                            {getStatusIcon(user.status)}
                            <span className="ml-2 text-sm font-medium">
                              {user.status === "active"
                                ? "Activo"
                                : user.status === "inactive"
                                  ? "Inactivo"
                                  : "Pendiente"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {user.portfolios}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex items-center space-x-1 ${getStatusColor(portfolio.status)}`}
                    >
                      {getStatusIcon(portfolio.status)}
                      <span className="text-sm font-medium">
                        {portfolio.status === "complete"
                          ? "Completo"
                          : portfolio.status === "incomplete"
                            ? "Incompleto"
                            : "En Revisión"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {portfolio.courseName}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Código:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {portfolio.courseCode}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Docente:
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {portfolio.teacherName}
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
                        Progreso
                      </span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {portfolio.completionPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full"
                        style={{ width: `${portfolio.completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Última modificación: {portfolio.lastModified}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Semesters Tab */}
        {activeTab === "semesters" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Crear Nuevo Usuario
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ej: Dr. Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="juan.perez@universidad.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rol
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="teacher">Docente</option>
                    <option value="evaluator">Evaluador</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </form>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Crear Usuario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Semester Modal */}
      {showSemesterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Crear Nuevo Semestre
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre del Semestre
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ej: 2024-II"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha de Fin
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </form>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowSemesterModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowSemesterModal(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Crear Semestre
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
