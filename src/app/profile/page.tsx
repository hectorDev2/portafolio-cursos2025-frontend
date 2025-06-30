"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Edit3,
  Save,
  Camera,
  Shield,
  Key,
  Bell,
  Globe,
  Award,
  BookOpen,
  Clock,
  CheckCircle,
} from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  position: string;
  department: string;
  university: string;
  degree: string;
  specialization: string;
  experience: string;
  bio: string;
  profileImage: string;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  profileVisibility: "public" | "private" | "university";
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "personal" | "academic" | "security"
  >("personal");
  const [showImageModal, setShowImageModal] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    firstName: "María",
    lastName: "González",
    email: "maria.gonzalez@universidad.edu",
    phone: "+51 987 654 321",
    address: "Av. Universitaria 1801, San Miguel, Lima",
    birthDate: "1985-03-15",
    position: "Profesora Principal",
    department: "Ciencias de la Computación",
    university: "Universidad Nacional Mayor de San Marcos",
    degree: "Doctora en Ciencias de la Computación",
    specialization: "Algoritmos y Estructuras de Datos",
    experience: "15 años",
    bio: "Doctora en Ciencias de la Computación con más de 15 años de experiencia en docencia e investigación. Especializada en algoritmos, estructuras de datos y programación. Ha publicado más de 30 artículos en revistas indexadas y dirigido múltiples tesis de pregrado y posgrado.",
    profileImage:
      "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400",
  });

  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    profileVisibility: "university",
  });

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };

  const handleSecurityChange = (
    field: keyof SecuritySettings,
    value: boolean | string
  ) => {
    setSecuritySettings({ ...securitySettings, [field]: value });
  };

  const tabs = [
    { id: "personal", name: "Información Personal", icon: User },
    { id: "academic", name: "Información Académica", icon: GraduationCap },
    { id: "security", name: "Seguridad y Privacidad", icon: Shield },
  ];

  const achievements = [
    {
      title: "Portafolios Completos",
      count: 12,
      icon: CheckCircle,
      color: "green",
    },
    { title: "Años de Experiencia", count: 15, icon: Clock, color: "blue" },
    { title: "Cursos Impartidos", count: 8, icon: BookOpen, color: "purple" },
    { title: "Reconocimientos", count: 5, icon: Award, color: "orange" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setShowImageModal(true)}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      Dr. {profile.firstName} {profile.lastName}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">
                      {profile.position}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {profile.department} • {profile.university}
                    </p>
                  </div>
                  <button
                    onClick={isEditing ? handleSave : handleEdit}
                    className="mt-4 sm:mt-0 flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Guardar Cambios
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-5 h-5 mr-2" />
                        Editar Perfil
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="text-center">
                        <div
                          className={`w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                            achievement.color === "green"
                              ? "bg-green-100 dark:bg-green-900"
                              : achievement.color === "blue"
                                ? "bg-blue-100 dark:bg-blue-900"
                                : achievement.color === "purple"
                                  ? "bg-purple-100 dark:bg-purple-900"
                                  : "bg-orange-100 dark:bg-orange-900"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              achievement.color === "green"
                                ? "text-green-600 dark:text-green-400"
                                : achievement.color === "blue"
                                  ? "text-blue-600 dark:text-blue-400"
                                  : achievement.color === "purple"
                                    ? "text-purple-600 dark:text-purple-400"
                                    : "text-orange-600 dark:text-orange-400"
                            }`}
                          />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {achievement.count}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {achievement.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Cancel Button (only visible when editing) */}
            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <button className="w-4 h-4 mr-2" />
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      isActive
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {/* Personal Information Tab */}
            {activeTab === "personal" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Información Personal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <User className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            {profile.firstName}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Apellido
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <User className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            {profile.lastName}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Correo Electrónico
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={tempProfile.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Mail className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            {profile.email}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Teléfono
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={tempProfile.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Phone className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            {profile.phone}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Dirección
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            {profile.address}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Fecha de Nacimiento
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={tempProfile.birthDate}
                          onChange={(e) =>
                            handleInputChange("birthDate", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            {new Date(profile.birthDate).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                    Biografía
                  </h4>
                  {isEditing ? (
                    <textarea
                      value={tempProfile.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Describe tu experiencia profesional y académica..."
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-gray-900 dark:text-white leading-relaxed">
                        {profile.bio}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Academic Information Tab */}
            {activeTab === "academic" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Información Académica y Profesional
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cargo Actual
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.position}
                          onChange={(e) =>
                            handleInputChange("position", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            {profile.position}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Departamento
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.department}
                          onChange={(e) =>
                            handleInputChange("department", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            {profile.department}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Universidad
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.university}
                          onChange={(e) =>
                            handleInputChange("university", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <GraduationCap className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            {profile.university}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Grado Académico
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.degree}
                          onChange={(e) =>
                            handleInputChange("degree", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Award className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            {profile.degree}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Especialización
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.specialization}
                          onChange={(e) =>
                            handleInputChange("specialization", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            {profile.specialization}
                          </span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Años de Experiencia
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.experience}
                          onChange={(e) =>
                            handleInputChange("experience", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <Clock className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-gray-900 dark:text-white">
                            {profile.experience}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security and Privacy Tab */}
            {activeTab === "security" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Configuración de Seguridad
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <Key className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Autenticación de Dos Factores
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Agrega una capa extra de seguridad a tu cuenta
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorEnabled}
                          onChange={(e) =>
                            handleSecurityChange(
                              "twoFactorEnabled",
                              e.target.checked
                            )
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Notificaciones por Email
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Recibe alertas de seguridad por correo electrónico
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.emailNotifications}
                          onChange={(e) =>
                            handleSecurityChange(
                              "emailNotifications",
                              e.target.checked
                            )
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            Notificaciones por SMS
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Recibe alertas importantes por mensaje de texto
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.smsNotifications}
                          onChange={(e) =>
                            handleSecurityChange(
                              "smsNotifications",
                              e.target.checked
                            )
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Globe className="w-5 h-5 text-gray-400 mr-3" />
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Visibilidad del Perfil
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Controla quién puede ver tu información de perfil
                      </p>
                      <select
                        value={securitySettings.profileVisibility}
                        onChange={(e) =>
                          handleSecurityChange(
                            "profileVisibility",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="public">
                          Público - Visible para todos
                        </option>
                        <option value="university">
                          Universidad - Solo miembros de la universidad
                        </option>
                        <option value="private">Privado - Solo yo</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                    Cambiar Contraseña
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contraseña Actual
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirmar Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="••••••••"
                      />
                    </div>
                    <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                      Actualizar Contraseña
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cambiar Foto de Perfil
                </h3>
                <button
                  onClick={() => setShowImageModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <button className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600">
                  <img
                    src={profile.profileImage}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 mb-6">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profile-image-upload"
                  />
                  <label
                    htmlFor="profile-image-upload"
                    className="cursor-pointer"
                  >
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Selecciona una nueva imagen
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      JPG, PNG hasta 5MB
                    </p>
                  </label>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowImageModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => setShowImageModal(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Guardar Imagen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
