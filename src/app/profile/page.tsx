"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  Camera,
} from "lucide-react";
import { useAuth } from "../shared/hooks/useAuth";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const { userId, token } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [tempProfile, setTempProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [error, setError] = useState("");
  const [localBirthDate, setLocalBirthDate] = useState<string>("");

  useEffect(() => {
    if (profile?.dateOfBirth) {
      // Solo en el cliente, formatea la fecha localmente
      setLocalBirthDate(
        new Date(profile.dateOfBirth).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    } else {
      setLocalBirthDate("");
    }
  }, [profile?.dateOfBirth]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError("No profile ID found");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error fetching profile data");
        }
        const data = await response.json();
        // Restaurar todos los datos relevantes
        const allowed = {
          name: data.name,
          email: data.email,
          profileImage: data.profileImage,
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          dateOfBirth: data.dateOfBirth || "",
          biography: data.biography || "",
        };
        setProfile(allowed);
        setTempProfile(allowed);
      } catch (err) {
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token, setLoading, setError, loading, userId]);

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };
  const handleSave = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tempProfile),
      });
      if (!response.ok) throw new Error("Error al guardar cambios");
      const updated = await response.json();
      // Restaurar todos los datos relevantes
      const allowed = {
        name: updated.name,
        email: updated.email,
        profileImage: updated.profileImage,
        phoneNumber: updated.phoneNumber || "",
        address: updated.address || "",
        dateOfBirth: updated.dateOfBirth || "",
        biography: updated.biography || "",
      };
      console.log(allowed, "🚀 ~ handleSave ~ allowed:", allowed);
      setProfile(allowed);
      setTempProfile(allowed);
      setIsEditing(false);
    } catch (err) {
      setError("No se pudo guardar el perfil");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };
  const handleInputChange = (field: string, value: string) => {
    // Permitir todos los campos relevantes
    if (
      [
        "name",
        "email",
        "profileImage",
        "phoneNumber",
        "address",
        "dateOfBirth",
        "biography",
      ].includes(field)
    ) {
      setTempProfile({ ...tempProfile, [field]: value });
    }
  };

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                  <img
                    src={
                      profile?.profileImage
                        ? profile.profileImage
                        : profile?.name
                          ? "https://ui-avatars.com/api/?name=" + profile?.name
                          : "https://ui-avatars.com/api/?name=Usuario"
                    }
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
                      {profile?.name || ""}
                    </h1>
                  </div>
                  <button
                    onClick={isEditing ? () => handleSave(userId!) : handleEdit}
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
              </div>
            </div>

            {/* Cancel Button (only visible when editing) */}
            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <span className="w-4 h-4 mr-2" />
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-8">
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
                        value={tempProfile?.name || ""}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <User className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900 dark:text-white">
                          {profile?.name}
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
                        value={tempProfile?.email || ""}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900 dark:text-white">
                          {profile?.email || ""}
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
                        value={tempProfile?.phoneNumber || ""}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900 dark:text-white">
                          {profile?.phoneNumber || ""}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dirección
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempProfile?.address || ""}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900 dark:text-white">
                          {profile?.address || ""}
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
                        value={tempProfile?.dateOfBirth || ""}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                        <span className="text-gray-900 dark:text-white">
                          {profile?.dateOfBirth
                            ? localBirthDate ||
                              new Date(profile.dateOfBirth)
                                .toISOString()
                                .split("T")[0]
                            : ""}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Biografía
                    </label>
                    {isEditing ? (
                      <textarea
                        value={tempProfile?.biography || ""}
                        onChange={(e) =>
                          handleInputChange("biography", e.target.value)
                        }
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Describe tu experiencia profesional y académica..."
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-gray-900 dark:text-white leading-relaxed">
                          {profile?.biography || ""}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ...existing code... */}
            </div>
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
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600">
                  <img
                    src={
                      profile && profile.profileImage
                        ? profile.profileImage
                        : profile && profile.name
                          ? "https://ui-avatars.com/api/?name=" + profile.name
                          : "https://ui-avatars.com/api/?name=Usuario"
                    }
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
