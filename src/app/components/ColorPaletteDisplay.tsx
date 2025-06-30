import React from "react";
import { Sun, Moon } from "lucide-react";

const ColorPaletteDisplay = () => {
  const dayColors = [
    { name: "Fondo Principal", hex: "#dbeafe" },
    { name: "Fondo Medio", hex: "#e0e7ff" },
    { name: "Fondo Final", hex: "#f3e8ff" },
    { name: "Tarjeta Principal", hex: "#ffffff" },
    { name: "Campos Entrada", hex: "#f9fafb" },
    { name: "Borde Claro", hex: "#e5e7eb" },
    { name: "Borde Tarjeta", hex: "#f3f4f6" },
    { name: "Texto Principal", hex: "#111827" },
    { name: "Texto Secundario", hex: "#4b5563" },
    { name: "Texto Etiquetas", hex: "#374151" },
    { name: "Placeholder", hex: "#6b7280" },
    { name: "Iconos", hex: "#9ca3af" },
    { name: "Azul Principal", hex: "#2563eb" },
    { name: "Azul Oscuro", hex: "#1d4ed8" },
    { name: "Púrpura Principal", hex: "#9333ea" },
    { name: "Púrpura Oscuro", hex: "#7c3aed" },
    { name: "Botón Tema", hex: "#1f2937" },
  ];

  const nightColors = [
    { name: "Fondo Principal", hex: "#111827" },
    { name: "Fondo Medio", hex: "#1e3a8a" },
    { name: "Fondo Final", hex: "#581c87" },
    { name: "Tarjeta Principal", hex: "#1f2937" },
    { name: "Campos Entrada", hex: "#374151" },
    { name: "Campos Focus", hex: "#4b5563" },
    { name: "Borde Tarjeta", hex: "#374151" },
    { name: "Borde Campos", hex: "#4b5563" },
    { name: "Texto Principal", hex: "#ffffff" },
    { name: "Texto Secundario", hex: "#d1d5db" },
    { name: "Texto Etiquetas", hex: "#e5e7eb" },
    { name: "Placeholder", hex: "#9ca3af" },
    { name: "Iconos", hex: "#9ca3af" },
    { name: "Azul Claro", hex: "#60a5fa" },
    { name: "Púrpura Claro", hex: "#a78bfa" },
    { name: "Amarillo", hex: "#eab308" },
    { name: "Amarillo Hover", hex: "#fbbf24" },
  ];

  const ColorSwatch = ({
    color,
    textColor = "#000",
  }: {
    color: { name: string; hex: string };
    textColor?: string;
  }) => (
    <div className="flex flex-col items-center">
      <div
        className="w-20 h-20 rounded-lg shadow-lg border-2 border-gray-300"
        style={{ backgroundColor: color.hex }}
      />
      <div className="mt-2 text-center">
        <div className="text-xs font-semibold" style={{ color: textColor }}>
          {color.name}
        </div>
        <div className="text-xs font-mono mt-1" style={{ color: textColor }}>
          {color.hex.toUpperCase()}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Título Principal */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Paletas de Colores
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Colores para Modo Día y Modo Noche
          </p>
        </div>

        {/* Paleta de Día */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center mb-8">
              <Sun className="w-12 h-12 text-yellow-500 mr-4" />
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                Paleta Día
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-6">
              {dayColors.map((color, index) => (
                <ColorSwatch key={index} color={color} textColor="#374151" />
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900 rounded-2xl">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
                Características de la Paleta Día:
              </h3>
              <ul className="text-blue-800 dark:text-blue-100 text-sm space-y-1">
                <li>• Colores claros y luminosos</li>
                <li>• Fondos blancos y grises suaves</li>
                <li>• Alto contraste para mejor legibilidad</li>
                <li>• Acentos azules y púrpura vibrantes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Paleta de Noche */}
        <div className="mb-8">
          <div className="bg-gray-900 dark:bg-black rounded-3xl shadow-2xl p-8 border border-gray-700">
            <div className="flex items-center justify-center mb-8">
              <Moon className="w-12 h-12 text-blue-400 mr-4" />
              <h2 className="text-4xl font-bold text-white">Paleta Noche</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-6">
              {nightColors.map((color, index) => (
                <ColorSwatch key={index} color={color} textColor="#e5e7eb" />
              ))}
            </div>

            <div className="mt-8 p-6 bg-gray-800 dark:bg-gray-900 rounded-2xl border border-gray-700">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                Características de la Paleta Noche:
              </h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Colores oscuros y profundos</li>
                <li>• Reduce la fatiga visual nocturna</li>
                <li>• Fondos grises oscuros y negros</li>
                <li>• Acentos claros para mejor contraste</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Información de Uso */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Información de Implementación
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 rounded-2xl p-6">
                <Sun className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                  Modo Día
                </h4>
                <p className="text-yellow-700 dark:text-yellow-100 text-sm">
                  Ideal para uso diurno con colores claros que proporcionan
                  excelente legibilidad y una experiencia visual cómoda.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 rounded-2xl p-6">
                <Moon className="w-16 h-16 text-indigo-600 dark:text-indigo-200 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-indigo-800 dark:text-indigo-100 mb-3">
                  Modo Noche
                </h4>
                <p className="text-indigo-700 dark:text-indigo-100 text-sm">
                  Perfecto para uso nocturno con colores oscuros que reducen la
                  fatiga visual y mejoran la experiencia en ambientes con poca
                  luz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteDisplay;
